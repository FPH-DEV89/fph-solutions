'use client'

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import type { Project } from '@/data/projects'

function subscribeToMediaQuery(callback: () => void) {
  const mql = window.matchMedia('(min-width: 768px)')
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

function getDesktopSnapshot() {
  return window.matchMedia('(min-width: 768px)').matches
}

function getDesktopServerSnapshot() {
  return true
}

function useIsDesktop() {
  return useSyncExternalStore(
    subscribeToMediaQuery,
    getDesktopSnapshot,
    getDesktopServerSnapshot
  )
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -50 : 50,
    opacity: 0,
  }),
}

const reducedMotionVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
}

interface ProjectCarouselProps {
  projects: Project[]
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const isDesktop = useIsDesktop()
  const prefersReducedMotion = useReducedMotion()

  const perView = isDesktop ? 2 : 1
  const totalPages = Math.max(1, Math.ceil((projects?.length ?? 0) / perView))
  const safePage = currentPage % totalPages

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection)
      setCurrentPage((prev) => {
        if (newDirection > 0) {
          return (prev + 1) % totalPages
        }
        return (prev - 1 + totalPages) % totalPages
      })
    },
    [totalPages]
  )

  const next = useCallback(() => paginate(1), [paginate])
  const prev = useCallback(() => paginate(-1), [paginate])

  const goToPage = useCallback(
    (pageIndex: number) => {
      if (pageIndex === safePage) return
      setDirection(pageIndex > safePage ? 1 : -1)
      setCurrentPage(pageIndex)
    },
    [safePage]
  )

  useEffect(() => {
    if (isHovered || prefersReducedMotion || totalPages <= 1) return

    const interval = setInterval(() => {
      paginate(1)
    }, 5000)

    return () => clearInterval(interval)
  }, [isHovered, prefersReducedMotion, totalPages, paginate])

  if (!projects || projects.length === 0) {
    return null
  }

  const startIndex = safePage * perView
  const visibleProjects = projects.slice(startIndex, startIndex + perView)

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
    <div
      className="relative focus:outline-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Projets récents"
    >
      {/* Previous button */}
      {totalPages > 1 && (
        <button
          type="button"
          onClick={prev}
          aria-label="Projet précédent"
          className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-700 shadow-md backdrop-blur-sm transition-all hover:border-[#a855f7] hover:text-[#a855f7] hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7] dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:border-[#a855f7] dark:hover:text-[#a855f7]"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      )}

      {/* Cards container */}
      <div className="overflow-hidden rounded-2xl px-1 py-2">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={safePage}
            custom={direction}
            variants={prefersReducedMotion ? reducedMotionVariants : slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: prefersReducedMotion ? 0.15 : 0.35,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {visibleProjects.map((project) => (
              <div key={project.slug} className="h-full">
                <ProjectCard project={project} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next button */}
      {totalPages > 1 && (
        <button
          type="button"
          onClick={next}
          aria-label="Projet suivant"
          className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-700 shadow-md backdrop-blur-sm transition-all hover:border-[#a855f7] hover:text-[#a855f7] hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7] dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:border-[#a855f7] dark:hover:text-[#a855f7]"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      )}

      {/* Dots navigation */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => {
            const isActive = index === safePage
            return (
              <button
                key={index}
                type="button"
                onClick={() => goToPage(index)}
                aria-label={`Aller au groupe de projets ${index + 1}`}
                aria-current={isActive ? 'true' : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7] ${
                  isActive
                    ? 'w-8 bg-[#a855f7]'
                    : 'w-2.5 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600'
                }`}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
