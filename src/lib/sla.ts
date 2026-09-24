// ============================================================
// sla.ts — Calcul d'échéances SLA en heures ouvrées
// Fuseau : Europe/Paris · Horaires : 9 h-18 h lun-ven hors JF
// Aucune dépendance npm — aucun import @/ — Node pur OK
// ============================================================

export const PARIS_TZ = "Europe/Paris";
export const OUVERTURE = 9;
export const FERMETURE = 18;
export const HEURES_PAR_JOUR = 9;

// ── Formateurs Intl réutilisables (instanciés une seule fois) ─

const _fmtParisParts = new Intl.DateTimeFormat("en-GB", {
  timeZone: PARIS_TZ,
  hour12: false,
  weekday: "short",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

const _fmtEcheance = new Intl.DateTimeFormat("fr-FR", {
  timeZone: PARIS_TZ,
  weekday: "short",
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

// ── Parties calendaires en heure de Paris ────────────────────

export interface ParisParts {
  annee: number;
  mois: number;
  jour: number;
  heure: number;
  minute: number;
  /** 1 = lundi … 7 = dimanche */
  jourSemaine: number;
}

const JOUR_SEMAINE_MAP: Record<string, number> = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7,
};

export function parisParts(d: Date): ParisParts {
  const parts = _fmtParisParts.formatToParts(d);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  const weekdayStr = get("weekday"); // "Mon", "Tue", …
  const annee = parseInt(get("year"), 10);
  const mois = parseInt(get("month"), 10);
  const jour = parseInt(get("day"), 10);
  let heure = parseInt(get("hour"), 10);
  const minute = parseInt(get("minute"), 10);

  // Intl hour12:false peut renvoyer "24" à minuit — normaliser
  if (heure === 24) heure = 0;

  const jourSemaine = JOUR_SEMAINE_MAP[weekdayStr] ?? 7;

  return { annee, mois, jour, heure, minute, jourSemaine };
}

// ── Décalage UTC↔Paris (en ms) ───────────────────────────────

function decalageParis(d: Date): number {
  // On lit l'heure mur Paris de d, on la convertit en ms depuis epoch UTC
  const { annee, mois, jour, heure, minute } = parisParts(d);
  const murMs =
    Date.UTC(annee, mois - 1, jour, heure, minute) +
    0; // minutes entières, ignorons les secondes
  // Décalage = heure mur − timestamp réel (arrondi à la minute)
  const rawMs = d.getTime();
  const rawMinutes = Math.round(rawMs / 60000) * 60000;
  return murMs - rawMinutes;
}

// ── Conversion heure mur Paris → instant UTC ─────────────────

export function fromParisWall(
  annee: number,
  mois: number,
  jour: number,
  heure: number,
  minute: number
): Date {
  const naive = Date.UTC(annee, mois - 1, jour, heure, minute);
  const off1 = decalageParis(new Date(naive));
  let t = naive - off1;
  const off2 = decalageParis(new Date(t));
  if (off2 !== off1) {
    t = naive - off2;
  }
  return new Date(t);
}

// ── Jours fériés français ────────────────────────────────────

const _feriesCache = new Map<number, Set<string>>();

/** Dimanche de Pâques (algorithme Meeus/Butcher) */
function dimanchePaques(annee: number): Date {
  const a = annee % 19;
  const b = Math.floor(annee / 100);
  const c = annee % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  // UTC midnight, no TZ ambiguity for a date
  return new Date(Date.UTC(annee, month - 1, day));
}

function addDays(d: Date, n: number): Date {
  return new Date(d.getTime() + n * 86400000);
}

function isoDate(d: Date): string {
  // YYYY-MM-DD en UTC (les dates de fêtes sont des jours civils UTC)
  return d.toISOString().slice(0, 10);
}

export function joursFeries(annee: number): Set<string> {
  if (_feriesCache.has(annee)) return _feriesCache.get(annee)!;

  const paques = dimanchePaques(annee);
  const lundiPaques = addDays(paques, 1);
  const ascension = addDays(paques, 39);
  const lundiPentecote = addDays(paques, 50);

  const dates = new Set<string>([
    `${annee}-01-01`,
    isoDate(lundiPaques),
    `${annee}-05-01`,
    `${annee}-05-08`,
    isoDate(ascension),
    isoDate(lundiPentecote),
    `${annee}-07-14`,
    `${annee}-08-15`,
    `${annee}-11-01`,
    `${annee}-11-11`,
    `${annee}-12-25`,
  ]);

  _feriesCache.set(annee, dates);
  return dates;
}

// ── Jour ouvré ? ─────────────────────────────────────────────

export function estJourOuvre(
  annee: number,
  mois: number,
  jour: number,
  jourSemaine: number
): boolean {
  if (jourSemaine >= 6) return false; // samedi (6) ou dimanche (7)
  const feries = joursFeries(annee);
  const key = `${annee}-${String(mois).padStart(2, "0")}-${String(jour).padStart(2, "0")}`;
  return !feries.has(key);
}

// ── Prochaine ouverture ───────────────────────────────────────

export function prochaineOuverture(d: Date): Date {
  const p = parisParts(d);

  // Si on est un jour ouvré dans la plage 9 h-18 h → on renvoie d
  if (
    estJourOuvre(p.annee, p.mois, p.jour, p.jourSemaine) &&
    p.heure >= OUVERTURE &&
    p.heure < FERMETURE
  ) {
    return d;
  }

  // Si on est un jour ouvré AVANT 9 h → même jour à 9 h
  if (
    estJourOuvre(p.annee, p.mois, p.jour, p.jourSemaine) &&
    p.heure < OUVERTURE
  ) {
    return fromParisWall(p.annee, p.mois, p.jour, OUVERTURE, 0);
  }

  // Sinon : avancer au jour suivant et boucler
  let candidat = new Date(d.getTime());
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // Sauter au début du jour suivant (00:01 UTC suffit pour recalculer)
    const pc = parisParts(candidat);
    const debutJourSuivant = fromParisWall(pc.annee, pc.mois, pc.jour, 23, 59);
    candidat = new Date(debutJourSuivant.getTime() + 120000); // +2 min → minuit passé

    const pn = parisParts(candidat);
    if (estJourOuvre(pn.annee, pn.mois, pn.jour, pn.jourSemaine)) {
      return fromParisWall(pn.annee, pn.mois, pn.jour, OUVERTURE, 0);
    }
  }
}

// ── Ajouter N heures ouvrées ─────────────────────────────────

export function ajouterHeuresOuvrees(depart: Date, heures: number): Date {
  let courant = prochaineOuverture(depart);
  let resteMinutes = Math.round(heures * 60);

  while (resteMinutes > 0) {
    const p = parisParts(courant);
    // Minutes disponibles jusqu'à 18 h
    const minutesJusquaFermeture =
      (FERMETURE - p.heure) * 60 - p.minute;

    if (resteMinutes <= minutesJusquaFermeture) {
      // On finit dans cette même plage ouvrée
      return new Date(courant.getTime() + resteMinutes * 60000);
    }

    // On consomme la fin de journée et on repart au lendemain ouvré
    resteMinutes -= minutesJusquaFermeture;

    // Avancer au jour ouvré suivant à 9 h
    const finJournee = fromParisWall(p.annee, p.mois, p.jour, FERMETURE, 0);
    courant = prochaineOuverture(new Date(finJournee.getTime() + 60000));
  }

  return courant;
}

// ── Parser un libellé de délai en heures ─────────────────────

export function parseDelaiEnHeures(label: unknown): number {
  // Défensif : accepte n'importe quel type en entrée
  const normalized = String(label ?? "")
    .replace(/\u00a0/g, " ")
    .replace(/\u202f/g, " ");

  // Match "Xh" → X heures
  const matchH = normalized.match(/(\d+)\s*h/i);
  if (matchH) return parseInt(matchH[1], 10);

  // Match "X j" / "X j." / "X jour" / "X jours" → X × 9 heures ouvrées
  const matchJ = normalized.match(/(\d+)\s*(?:jours?|j\.?)\b/i);
  if (matchJ) return parseInt(matchJ[1], 10) * HEURES_PAR_JOUR;

  // Fallback 48 h avec avertissement
  console.warn("[sla] délai non parsé:", label, "→ fallback 48 h");
  return 48;
}

// ── Calculer l'échéance SLA ───────────────────────────────────

export interface EcheanceSlaResult {
  echeance: Date;
  heures: number;
  delaiLabel: string;
}

export function echeanceSla(
  depart: Date,
  delaiLabel: string
): EcheanceSlaResult {
  const heures = parseDelaiEnHeures(delaiLabel);
  const echeance = ajouterHeuresOuvrees(depart, heures);
  return { echeance, heures, delaiLabel };
}

// ── Formater l'échéance en libellé court FR ───────────────────

export function formatEcheance(d: Date): string {
  // Ex. brut Intl : "jeu. 24/09, 16:00" (virgule avant l'heure)
  // On remplace ", " ou "," par " à "
  return _fmtEcheance.format(d).replace(/,\s*/, " à ");
}

// ── Heures ouvrées entre deux instants ───────────────────────

export function heuresOuvreesEntre(a: Date, b: Date): number {
  const ta = a.getTime();
  const tb = b.getTime();
  if (ta === tb) return 0;
  if (tb < ta) return -heuresOuvreesEntre(b, a);

  let totalMinutes = 0;
  let courant = prochaineOuverture(a);

  while (courant < b) {
    const p = parisParts(courant);
    const finJournee = fromParisWall(p.annee, p.mois, p.jour, FERMETURE, 0);
    const borneHaute = b < finJournee ? b : finJournee;

    const diffMs = borneHaute.getTime() - courant.getTime();
    totalMinutes += diffMs / 60000;

    if (borneHaute >= finJournee) {
      // Avancer au jour ouvré suivant
      courant = prochaineOuverture(new Date(finJournee.getTime() + 60000));
    } else {
      break;
    }
  }

  // Arrondir au quart d'heure
  const quarts = Math.round(totalMinutes / 15);
  return quarts * 15 / 60;
}
