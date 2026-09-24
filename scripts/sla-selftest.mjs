// scripts/sla-selftest.mjs
// Test du module src/lib/sla.ts
// Usage : node --experimental-strip-types scripts/sla-selftest.mjs

const {
  ajouterHeuresOuvrees,
  echeanceSla,
  parseDelaiEnHeures,
  formatEcheance,
  joursFeries,
  fromParisWall,
  heuresOuvreesEntre,
  prochaineOuverture,
} = await import("../src/lib/sla.ts");

let passed = 0;
let failed = 0;

function assert(label, condition, detail = "") {
  if (condition) {
    console.log(`  ✅ OK  ${label}`);
    passed++;
  } else {
    console.log(`  ❌ KO  ${label}${detail ? " — " + detail : ""}`);
    failed++;
  }
}

function sameInstant(a, b) {
  return Math.abs(a.getTime() - b.getTime()) < 60000; // tolérance 1 min
}

console.log("\n══════════════════════════════════════════");
console.log(" SLA SELFTEST — src/lib/sla.ts");
console.log("══════════════════════════════════════════\n");

// ── 1. parseDelaiEnHeures ────────────────────────────────────

console.log("1. parseDelaiEnHeures");

assert(
  '"4 h ouvrées" → 4',
  parseDelaiEnHeures("4 h ouvrées") === 4
);
assert(
  '"48 h ouvrées" → 48',
  parseDelaiEnHeures("48 h ouvrées") === 48
);
assert(
  '"4 jours ouvrés" → 36',
  parseDelaiEnHeures("4 jours ouvrés") === 36
);
assert(
  '"5 jours ouvrés" → 45',
  parseDelaiEnHeures("5 jours ouvrés") === 45
);
assert(
  '"3 jours ouvrés" → 27',
  parseDelaiEnHeures("3 jours ouvrés") === 27
);
assert(
  '"n\'importe quoi" → 48 (défaut)',
  parseDelaiEnHeures("n'importe quoi") === 48
);
assert(
  '"3 j ouvrés" → 27 (variante j)',
  parseDelaiEnHeures("3 j ouvrés") === 27
);

// ── 2. ajouterHeuresOuvrees — cas simples ────────────────────

console.log("\n2. ajouterHeuresOuvrees — cas simples");

// Jeudi 24/09/2026 10:00 + 4 h → jeudi 24/09/2026 14:00
{
  const depart = fromParisWall(2026, 9, 24, 10, 0);
  const expected = fromParisWall(2026, 9, 24, 14, 0);
  const result = ajouterHeuresOuvrees(depart, 4);
  assert(
    "Jeu 24/09 10:00 + 4h → Jeu 24/09 14:00",
    sameInstant(result, expected),
    `got ${result.toISOString()}, expected ${expected.toISOString()}`
  );
}

// Jeudi 24/09/2026 16:00 + 4 h → vendredi 25/09/2026 11:00
{
  const depart = fromParisWall(2026, 9, 24, 16, 0);
  const expected = fromParisWall(2026, 9, 25, 11, 0);
  const result = ajouterHeuresOuvrees(depart, 4);
  assert(
    "Jeu 24/09 16:00 + 4h → Ven 25/09 11:00",
    sameInstant(result, expected),
    `got ${result.toISOString()}, expected ${expected.toISOString()}`
  );
}

// Vendredi 25/09/2026 17:00 + 4 h → lundi 28/09/2026 12:00
{
  const depart = fromParisWall(2026, 9, 25, 17, 0);
  const expected = fromParisWall(2026, 9, 28, 12, 0);
  const result = ajouterHeuresOuvrees(depart, 4);
  assert(
    "Ven 25/09 17:00 + 4h → Lun 28/09 12:00",
    sameInstant(result, expected),
    `got ${result.toISOString()}, expected ${expected.toISOString()}`
  );
}

// Samedi 26/09/2026 11:00 + 4 h → lundi 28/09/2026 13:00
{
  const depart = fromParisWall(2026, 9, 26, 11, 0);
  const expected = fromParisWall(2026, 9, 28, 13, 0);
  const result = ajouterHeuresOuvrees(depart, 4);
  assert(
    "Sam 26/09 11:00 + 4h → Lun 28/09 13:00",
    sameInstant(result, expected),
    `got ${result.toISOString()}, expected ${expected.toISOString()}`
  );
}

// ── 3. Passage de fin d'année ────────────────────────────────

console.log("\n3. ajouterHeuresOuvrees — passage fin d'année");

// Mercredi 30/12/2026 17:00 + 4 h → jeudi 31/12/2026 12:00
{
  const depart = fromParisWall(2026, 12, 30, 17, 0);
  const expected = fromParisWall(2026, 12, 31, 12, 0);
  const result = ajouterHeuresOuvrees(depart, 4);
  assert(
    "Mer 30/12/2026 17:00 + 4h → Jeu 31/12/2026 12:00",
    sameInstant(result, expected),
    `got ${result.toISOString()}, expected ${expected.toISOString()}`
  );
}

// Jeudi 31/12/2026 17:00 + 4 h → lundi 04/01/2027 12:00 (01/01 férié + week-end)
{
  const depart = fromParisWall(2026, 12, 31, 17, 0);
  const expected = fromParisWall(2027, 1, 4, 12, 0);
  const result = ajouterHeuresOuvrees(depart, 4);
  assert(
    "Jeu 31/12/2026 17:00 + 4h → Lun 04/01/2027 12:00 (01/01 férié)",
    sameInstant(result, expected),
    `got ${result.toISOString()}, expected ${expected.toISOString()}`
  );
}

// ── 4. joursFeries 2027 ─────────────────────────────────────

console.log("\n4. joursFeries(2027)");

const feries2027 = joursFeries(2027);
assert("2027-01-01 (Jour de l'an)", feries2027.has("2027-01-01"));
assert("2027-03-29 (Lundi de Pâques)", feries2027.has("2027-03-29"));
assert("2027-05-06 (Ascension)", feries2027.has("2027-05-06"));
assert("2027-05-17 (Lundi de Pentecôte)", feries2027.has("2027-05-17"));
assert("2027-07-14 (Fête nationale)", feries2027.has("2027-07-14"));
assert("2027-12-25 (Noël)", feries2027.has("2027-12-25"));

// ── 5. echeanceSla ───────────────────────────────────────────

console.log("\n5. echeanceSla()");

{
  const depart = fromParisWall(2026, 9, 24, 16, 0);
  const { echeance, heures } = echeanceSla(depart, "4 h ouvrées");
  const expected = fromParisWall(2026, 9, 25, 11, 0);
  assert(
    "echeanceSla(Jeu 24/09 16:00, '4 h ouvrées') → Ven 25/09 11:00",
    sameInstant(echeance, expected),
    `got ${echeance.toISOString()}, expected ${expected.toISOString()}`
  );
  assert("heures === 4", heures === 4, `got ${heures}`);
}

// ── 6. formatEcheance ────────────────────────────────────────

console.log("\n6. formatEcheance()");

{
  const d = fromParisWall(2026, 9, 25, 11, 0);
  const label = formatEcheance(d);
  assert(
    'formatEcheance contient "25/09"',
    label.includes("25/09"),
    `got "${label}"`
  );
  assert(
    'formatEcheance contient "11:00"',
    label.includes("11:00"),
    `got "${label}"`
  );
}

// ── 7. heuresOuvreesEntre — cas manquants ────────────────────

console.log("\n7. heuresOuvreesEntre — cas manquants");

// heuresOuvreesEntre(d, d) → 0 sur une date ouvrée (ne doit PAS crasher)
{
  const d = fromParisWall(2026, 9, 24, 10, 0); // jeudi ouvré
  let result;
  try {
    result = heuresOuvreesEntre(d, d);
    assert(
      "heuresOuvreesEntre(d, d) → 0 (date ouvrée, sans crash)",
      result === 0,
      `got ${result}`
    );
  } catch (e) {
    assert("heuresOuvreesEntre(d, d) — ne doit pas crasher (date ouvrée)", false, String(e));
  }
}

// heuresOuvreesEntre(d, d) → 0 sur un dimanche (ne doit PAS crasher)
{
  const d = fromParisWall(2026, 9, 27, 14, 0); // dimanche
  let result;
  try {
    result = heuresOuvreesEntre(d, d);
    assert(
      "heuresOuvreesEntre(d, d) → 0 (dimanche, sans crash)",
      result === 0,
      `got ${result}`
    );
  } catch (e) {
    assert("heuresOuvreesEntre(d, d) — ne doit pas crasher (dimanche)", false, String(e));
  }
}

// vendredi 17h → lundi 10h → 2 h ouvrées
// Ven: 17h-18h = 1h ; Lun: 9h-10h = 1h → total 2h
{
  const ven17 = fromParisWall(2026, 9, 25, 17, 0);
  const lun10 = fromParisWall(2026, 9, 28, 10, 0);
  const result = heuresOuvreesEntre(ven17, lun10);
  assert(
    "heuresOuvreesEntre(ven 17h, lun 10h) → 2 h",
    result === 2,
    `got ${result}`
  );
}

// lundi 10h → vendredi 17h → 43 h ouvrées (aller-retour)
// Lun: 10h-18h = 8h ; Mar+Mer+Jeu: 3×9h = 27h ; Ven: 9h-17h = 8h → 8+27+8 = 43h
{
  const lun10 = fromParisWall(2026, 9, 28, 10, 0);
  const ven17 = fromParisWall(2026, 10, 2, 17, 0);
  const result = heuresOuvreesEntre(lun10, ven17);
  assert(
    "heuresOuvreesEntre(lun 10h, ven 17h) → 43 h",
    result === 43,
    `got ${result}`
  );
}

// ── 8. prochaineOuverture — cas manquants ───────────────────

console.log("\n8. prochaineOuverture — cas manquants");

// samedi 11h → lundi 9h00
{
  const sam11 = fromParisWall(2026, 9, 26, 11, 0); // samedi
  const expected = fromParisWall(2026, 9, 28, 9, 0); // lundi 9h
  const result = prochaineOuverture(sam11);
  assert(
    "prochaineOuverture(sam 11h) → lun 9h00",
    sameInstant(result, expected),
    `got ${result.toISOString()}, expected ${expected.toISOString()}`
  );
}

// jeudi 18h30 → vendredi 9h00
{
  const jeu18h30 = fromParisWall(2026, 9, 24, 18, 30); // jeudi après fermeture
  const expected = fromParisWall(2026, 9, 25, 9, 0); // vendredi 9h
  const result = prochaineOuverture(jeu18h30);
  assert(
    "prochaineOuverture(jeu 18h30) → ven 9h00",
    sameInstant(result, expected),
    `got ${result.toISOString()}, expected ${expected.toISOString()}`
  );
}

// ── Bilan ────────────────────────────────────────────────────

console.log("\n══════════════════════════════════════════");
console.log(` Résultat : ${passed} OK  /  ${failed} KO  /  ${passed + failed} total`);
console.log("══════════════════════════════════════════\n");

if (failed > 0) {
  process.exit(1);
}
