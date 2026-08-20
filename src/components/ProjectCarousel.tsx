'use client'

import { useState, useEffect, useCallback, useSyncExternalStore, useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import type { Project } from '@/data/projects'

interface ProjectCarouselProps {
  projects: Project[]
}

// Anneau 3D Coverflow Compact : rayon, perspective, profondeur et inclinaison par tier responsive
const RING_CONFIGS = {
  mobile: { radius: 140, perspective: 1400, depth: -60, tilt: -12 },
  tablet: { radius: 280, perspective: 1700, depth: -130, tilt: -13 },
  desktop: { radius: 400, perspective: 2000, depth: -190, tilt: -14 },
} as const

type RingTier = keyof typeof RING_CONFIGS

const CARD_W = 'w-[120px] sm:w-[200px] lg:w-[250px]'
const STAGE_H = 'min-h-[360px] sm:min-h-[460px] lg:min-h-[540px]'

function subscribeToMediaQuery(callback: () => void) {
  const mqls = [
    window.matchMedia('(max-width: 639px)'),
    window.matchMedia('(min-width: 1024px)'),
  ]
  if (typeof mqls[0].addEventListener === 'function') {
    mqls.forEach((mql) => mql.addEventListener('change', callback))
  } else {
    mqls.forEach((mql) => mql.addListener(callback))
  }
  return () => {
    if (typeof mqls[0].removeEventListener === 'function') {
      mqls.forEach((mql) => mql.removeEventListener('change', callback))
    } else {
      mqls.forEach((mql) => mql.removeListener(callback))
    }
  }
}

function getTierSnapshot(): RingTier {
  if (typeof window === 'undefined') return 'desktop'
  if (window.matchMedia('(max-width: 639px)').matches) return 'mobile'
  if (window.matchMedia('(min-width: 1024px)').matches) return 'desktop'
  return 'tablet'
}

function getServerSnapshot(): RingTier {
  return 'desktop'
}

function useRingTier() {
  return useSyncExternalStore(subscribeToMediaQuery, getTierSnapshot, getServerSnapshot)
}

/** Distance angulaire la plus courte dans l'anneau (wrap fluide). */
function ringOffset(index: number, active: number, count: number) {
  if (count <= 0) return 0
  const half = count / 2
  let d = (index - active) % count
  if (d > half) d -= count
  if (d < -half) d += count
  return d
}

function normalizeAngle(a: number) {
  return ((a % 360) + 360) % 360
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragDelta, setDragDelta] = useState(0)

  const tier = useRingTier()
  const prefersReducedMotion = useReducedMotion()

  const count = projects?.length ?? 0
  const safeActive = count > 0 ? ((activeIndex % count) + count) % count : 0

  const ring = RING_CONFIGS[tier]
  const step = count > 0 ? 360 / count : 0

  // Drag & swipe avec inertie (framer-motion)
  const dragOffset = useMotionValue(0)

  // Tilt 3D au survol de la carte active (parallax)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const springTiltX = useSpring(tiltX, { stiffness: 300, damping: 25 })
  const springTiltY = useSpring(tiltY, { stiffness: 300, damping: 25 })

  // Refs de suivi de gesture pour le drag
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const lastXRef = useRef(0)
  const lastTimeRef = useRef(0)
  const velocityRef = useRef(0)
  const dragDistanceRef = useRef(0)

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return
      setActiveIndex((prev) => {
        const target = ((index % count) + count) % count
        const diff = ringOffset(target, prev, count)
        return (prev + diff + count) % count
      })
    },
    [count]
  )

  const next = useCallback(() => {
    if (count === 0) return
    setActiveIndex((prev) => (prev + 1) % count)
  }, [count])

  const prev = useCallback(() => {
    if (count === 0) return
    setActiveIndex((prev) => (prev - 1 + count) % count)
  }, [count])

  // Remise à zéro du tilt lors du changement de carte active
  useEffect(() => {
    tiltX.set(0)
    tiltY.set(0)
  }, [safeActive, tiltX, tiltY])

  // Auto-play : 5s, pause au survol / focus / drag / onglet caché
  useEffect(() => {
    if (isHovered || isFocused || isDragging || prefersReducedMotion || count <= 1) return

    let intervalId: ReturnType<typeof setInterval> | null = null

    const startTimer = () => {
      if (typeof document !== 'undefined' && document.hidden) return
      if (!intervalId) {
        intervalId = setInterval(() => {
          setActiveIndex((prev) => (prev + 1) % count)
        }, 5000)
      }
    }

    const stopTimer = () => {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimer()
      } else {
        startTimer()
      }
    }

    startTimer()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      stopTimer()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isHovered, isFocused, isDragging, prefersReducedMotion, count])

  if (count === 0) {
    return null
  }

  // Handlers pour le drag / swipe horizontal
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || count <= 1) return
    if (e.button !== 0) return
    const target = e.target as HTMLElement | null
    if (target?.closest('a') || target?.closest('button')) {
      return
    }
    startXRef.current = e.clientX
    lastXRef.current = e.clientX
    lastTimeRef.current = performance.now()
    velocityRef.current = 0
    dragDistanceRef.current = 0
    isDraggingRef.current = true
    setIsDragging(true)
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      // Ignorer si capture non supportée
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return
    const now = performance.now()
    const dt = Math.max(now - lastTimeRef.current, 1)
    const currentDx = e.clientX - lastXRef.current
    velocityRef.current = currentDx / dt
    lastXRef.current = e.clientX
    lastTimeRef.current = now

    const totalDx = e.clientX - startXRef.current
    dragDistanceRef.current = Math.max(dragDistanceRef.current, Math.abs(totalDx))
    const deg = totalDx * 0.25
    dragOffset.set(deg)
    setDragDelta(deg)
  }

  const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId)
      }
    } catch {
      // Ignorer
    }

    const totalDx = e.clientX - startXRef.current
    const vel = velocityRef.current

    // Snap sur seuil de distance (60px) ou vélocité d'inertie
    if (Math.abs(totalDx) > 60 || Math.abs(vel) > 0.35) {
      if (totalDx < 0 || vel < -0.35) {
        next()
      } else {
        prev()
      }
    }

    setIsDragging(false)
    setDragDelta(0)
    dragOffset.set(0)

    // Petit délai pour éviter que le clic de fin de drag n'active l'overlay
    setTimeout(() => {
      dragDistanceRef.current = 0
    }, 100)
  }

  // Handlers pour le tilt 3D sur la carte active
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || isDraggingRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    tiltY.set(px * 10)
    tiltX.set(-py * 10)
  }

  const handleCardMouseLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    }
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative focus:outline-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Projets récents"
    >
      {/* Bouton précédent */}
      {count > 1 && (
        <button
          type="button"
          onClick={prev}
          aria-label="Projet précédent"
          className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-zinc-300 bg-white/90 text-zinc-700 shadow-md backdrop-blur-sm transition-all hover:border-[#00d4ff] hover:text-[#00d4ff] hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff] dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:border-[#00d4ff] dark:hover:text-[#00d4ff]"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      )}

      {/* Scène 3D & surface de drag */}
      <div className="overflow-hidden pb-12">
        <div
          className={`relative ${STAGE_H} touch-pan-y ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ perspective: `${ring.perspective}px` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
        >
          {/* Halo lumineux cyan derrière l'anneau */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.12)_0%,transparent_65%)] blur-2xl"
          />

          {/* Anneau rotatif 3D */}
          <div
            className="absolute inset-0"
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              transform: prefersReducedMotion
                ? undefined
                : `translateZ(${ring.depth}px) rotateX(${ring.tilt}deg) rotateY(${-safeActive * step + dragDelta}deg)`,
              transition: prefersReducedMotion || isDragging
                ? 'none'
                : 'transform 0.85s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {projects.map((project, index) => {
              const angle = index * step
              const norm = normalizeAngle(angle)
              const offset = ringOffset(index, safeActive, count)
              const absOffset = Math.abs(offset)
              const isVisible = absOffset <= 2

              // Angle dans le repère caméra
              const worldAngle = normalizeAngle(angle - safeActive * step + dragDelta)
              const flip = worldAngle > 90 && worldAngle < 270 ? 180 : 0

              // Opacité selon la profondeur
              const cosA = Math.cos((norm * Math.PI) / 180)
              const depthFactor = (cosA + 1) / 2
              const opacity = prefersReducedMotion ? (index === safeActive ? 1 : 0.55) : 0.68 + depthFactor * 0.32

              // Compensation d'échelle de perspective
              const cardZ = ring.depth + ring.radius * Math.cos((worldAngle * Math.PI) / 180)
              const perspScale = ring.perspective / (ring.perspective - cardZ)
              const compScale = Math.min(1 / perspScale, 1.25)

              // Profondeur de champ (flou sur les cartes éloignées)
              const rawBlur = Math.max(0, absOffset - 0.5) * 1.2
              const blurPx = Math.min(rawBlur, 3)
              const blurFilter = !prefersReducedMotion && index !== safeActive && blurPx > 0
                ? `blur(${blurPx.toFixed(2)}px)`
                : undefined

              // Réflexion miroir dégradée sur les cartes visibles
              const reflectStyle = isVisible && !prefersReducedMotion
                ? 'below 8px linear-gradient(to bottom, transparent 55%, rgba(8,17,32,0.55))'
                : undefined

              if (prefersReducedMotion) {
                const flatOffset = index - safeActive
                return (
                  <div
                    key={project.slug}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `translate(-50%, -50%) translateX(${flatOffset * 62}%)`,
                      opacity: Math.abs(flatOffset) <= 1 ? 1 : 0,
                      transition: 'transform 0.5s ease, opacity 0.4s ease',
                      zIndex: 10 - Math.abs(flatOffset),
                      pointerEvents: flatOffset === 0 ? 'auto' : 'none',
                    }}
                  >
                    <div
                      inert={flatOffset !== 0}
                      aria-hidden={flatOffset !== 0}
                      className={`${CARD_W} h-[240px] sm:h-[300px] lg:h-[360px]`}
                    >
                      <ProjectCard project={project} className="h-full" />
                    </div>
                  </div>
                )
              }

              const isActive = index === safeActive

              return (
                <div
                  key={project.slug}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${ring.radius}px) rotateY(${flip}deg) scale(${compScale})`,
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    opacity,
                    zIndex: 10,
                    pointerEvents: 'auto',
                    transition: isDragging ? 'none' : 'transform 0.85s cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  <motion.div
                    inert={!isActive}
                    aria-hidden={!isActive}
                    onMouseMove={isActive ? handleCardMouseMove : undefined}
                    onMouseLeave={isActive ? handleCardMouseLeave : undefined}
                    style={{
                      WebkitBoxReflect: reflectStyle as React.CSSProperties['WebkitBoxReflect'],
                      filter: blurFilter,
                      rotateX: isActive ? springTiltX : 0,
                      rotateY: isActive ? springTiltY : 0,
                      transformStyle: 'preserve-3d',
                    }}
                    className={`${CARD_W} h-[240px] sm:h-[300px] lg:h-[360px] rounded-2xl transition-shadow duration-500 relative ${
                      isActive
                        ? 'shadow-[0_0_40px_-8px_rgba(0,212,255,0.45)] ring-1 ring-[#00d4ff]/30'
                        : 'shadow-[0_15px_35px_-12px_rgba(0,0,0,0.6)] select-none'
                    }`}
                  >
                    <ProjectCard project={project} className="h-full" />
                  </motion.div>

                  {/* Clic sur carte latérale pour la ramener devant (ignoré si drag) */}
                  {!isActive && (
                    <button
                      type="button"
                      onClick={() => {
                        if (dragDistanceRef.current > 8) return
                        goTo(index)
                      }}
                      aria-label={`Mettre en avant ${project.title}`}
                      className="absolute inset-0 z-10 cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff]"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bouton suivant */}
      {count > 1 && (
        <button
          type="button"
          onClick={next}
          aria-label="Projet suivant"
          className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-zinc-300 bg-white/90 text-zinc-700 shadow-md backdrop-blur-sm transition-all hover:border-[#00d4ff] hover:text-[#00d4ff] hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff] dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:border-[#00d4ff] dark:hover:text-[#00d4ff]"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      )}

      {/* Indicateurs de pagination (Dots) */}
      {count > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {projects.map((project, index) => {
            const isActive = index === safeActive
            return (
              <button
                key={project.slug}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Voir ${project.title}`}
                aria-current={isActive ? 'true' : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff] ${
                  isActive
                    ? 'w-8 bg-[#00d4ff] shadow-[0_0_10px_rgba(0,212,255,0.6)]'
                    : 'w-2.5 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600'
                }`}
              />
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
