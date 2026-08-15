"use client";

import { useEffect } from "react";
import type LiquidGlass from "liquid-glass-js";

// Propriétés internes de liquid-glass-js (non exposées dans le .d.ts public)
type GlassInternals = LiquidGlass & { glassEl?: HTMLElement | null; lensEl?: HTMLElement | null };

interface LiquidGlassLensProps {
  targetRef: React.RefObject<HTMLElement | null>;
  onActive?: (active: boolean) => void;
}

export default function LiquidGlassLens({ targetRef, onActive }: LiquidGlassLensProps) {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let glass: LiquidGlass | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let frameId: number;
    let safetyTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let lastScrollY = window.scrollY;
    let disposed = false;

    const handleScroll = () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        if (!glass || !targetRef.current) return;
        const r = targetRef.current.getBoundingClientRect();
        glass.moveTo(r.left, r.top);
        if (Math.abs(window.scrollY - lastScrollY) >= 24) {
          lastScrollY = window.scrollY;
          glass.refresh();
        }
      });
    };

    const waitForStablePosition = (el: HTMLElement): Promise<DOMRect> => {
      return new Promise((resolve) => {
        let prevY = el.getBoundingClientRect().y;
        let stableFrames = 0;
        let animId: number;
        let timeoutId: ReturnType<typeof setTimeout>;

        const done = (rect: DOMRect) => {
          cancelAnimationFrame(animId);
          clearTimeout(timeoutId);
          resolve(rect);
        };

        const check = () => {
          if (disposed) {
            done(el.getBoundingClientRect());
            return;
          }
          const r = el.getBoundingClientRect();
          if (Math.abs(r.y - prevY) < 0.5) {
            stableFrames++;
            if (stableFrames >= 3) {
              done(r);
              return;
            }
          } else {
            stableFrames = 0;
          }
          prevY = r.y;
          animId = requestAnimationFrame(check);
        };

        timeoutId = setTimeout(() => {
          done(el.getBoundingClientRect());
        }, 2000);

        animId = requestAnimationFrame(check);
      });
    };

    const init = async () => {
      if (!targetRef.current) return;
      
      try {
        const mod = await import("liquid-glass-js");
        const LiquidGlass = mod.default;
        
        if (!targetRef.current || disposed) return;

        const rect = await waitForStablePosition(targetRef.current);
        if (!targetRef.current || disposed) return;
        
        glass = new LiquidGlass({
          width: rect.width,
          height: rect.height,
          radius: rect.height / 2,
          scale: 10,
          depth: 24,
          curvature: 4,
          convexity: 1,
          chroma: 2,
          blur: 4,
          glow: 0.18,
          edge: 0.8,
          specAngle: 315,
          tint: document.documentElement.classList.contains("dark") ? 0.22 : 0.15,
          tintColor: document.documentElement.classList.contains("dark") ? "#081120" : "#ffffff",
          background: document.getElementById("contenu") ?? document.body,
          draggable: false,
          zIndex: 40,
          x: rect.left,
          y: rect.top,
        });

        onActive?.(true);

        // Appliquer pointer-events: none sur les conteneurs créés pour que la nav reste cliquable
        const g = glass as GlassInternals;
        if (g.glassEl) g.glassEl.style.pointerEvents = "none";
        if (g.lensEl) g.lensEl.style.pointerEvents = "none";

        window.addEventListener("scroll", handleScroll, { passive: true });

        safetyTimeoutId = setTimeout(() => {
          if (!glass || !targetRef.current) return;
          const r = targetRef.current.getBoundingClientRect();
          glass.moveTo(r.left, r.top);
          glass.refresh();
        }, 1000);

        resizeObserver = new ResizeObserver(() => {
          if (!targetRef.current || !glass) return;
          const r = targetRef.current.getBoundingClientRect();
          glass.set({ width: r.width, height: r.height, radius: r.height / 2 });
          glass.moveTo(r.left, r.top);
          glass.refresh();
        });
        resizeObserver.observe(targetRef.current);

        mutationObserver = new MutationObserver(() => {
          if (!glass) return;
          const isDark = document.documentElement.classList.contains("dark");
          glass.set({
            tintColor: isDark ? "#081120" : "#ffffff",
            tint: isDark ? 0.22 : 0.15,
          });
          glass.refresh();
        });
        mutationObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      } catch (err) {
        onActive?.(false);
        console.warn("liquid-glass indisponible, fallback CSS", err);
      }
    };

    init();

    return () => {
      disposed = true;
      onActive?.(false);
      if (frameId) cancelAnimationFrame(frameId);
      if (safetyTimeoutId) clearTimeout(safetyTimeoutId);
      window.removeEventListener("scroll", handleScroll);
      if (resizeObserver) resizeObserver.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
      if (glass) glass.destroy();
    };
  }, [targetRef, onActive]);

  return null;
}
