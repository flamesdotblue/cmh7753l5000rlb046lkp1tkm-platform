import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Loader from './components/Loader'
import Nav from './components/Nav'
import HeroAndBackground from './components/HeroAndBackground'
import Sections from './components/Sections'
import { Github } from 'lucide-react'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [cursorActive, setCursorActive] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const smoothX = useSpring(cursorX, { stiffness: 500, damping: 40 })
  const smoothY = useSpring(cursorY, { stiffness: 500, damping: 40 })

  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p = Math.min(100, p + Math.floor(Math.random() * 7) + 3)
      setProgress(p)
      if (p >= 100) {
        clearInterval(interval)
        const t = setTimeout(() => setLoaded(true), 400)
        return () => clearTimeout(t)
      }
    }, 80)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    const onEnterInteractive = () => setCursorActive(true)
    const onLeaveInteractive = () => setCursorActive(false)

    window.addEventListener('mousemove', onMove)
    // Delegate hover state for cursor morph
    const interactiveSelectors = ['a', 'button', '[data-cursor]']
    const onOver = (e) => {
      if (interactiveSelectors.some((sel) => e.target.closest(sel))) setCursorActive(true)
    }
    const onOut = (e) => {
      if (interactiveSelectors.some((sel) => e.target.closest(sel))) setCursorActive(false)
    }
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
    }
  }, [cursorX, cursorY])

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const height = document.body.scrollHeight - window.innerHeight
      setScrollProgress(height > 0 ? scrolled / height : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const msg = 'ORIX: Fast. Fair. Friendly. — 你好 • नमस्ते • مرحبا • Hola • Bonjour • こんにちは • 안녕하세요'
    const fun = () => console.log(`%c${msg}`, 'color:#ff3b3b;font-weight:800;font-size:12px')
    const id = setInterval(fun, 4000)
    fun()
    return () => clearInterval(id)
  }, [])

  const cursorScale = useSpring(cursorActive ? 1.3 : 1, { stiffness: 300, damping: 20 })

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-red-600/40 selection:text-white">
      {!loaded && <Loader progress={progress} />}

      {loaded && (
        <>
          {/* Thin scroll progress bar */}
          <div className="fixed inset-x-0 top-0 z-[80] h-1 bg-red-600/10">
            <motion.div className="h-full bg-red-600" style={{ width: `${Math.max(2, Math.round(scrollProgress * 100))}%` }} />
          </div>

          <Nav />
          <HeroAndBackground />
          <Sections />

          {/* Footer with logo grid */}
          <footer className="relative z-10 border-t border-white/10 bg-black/60 backdrop-blur-sm">
            <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-between">
              <div className="flex items-center gap-4">
                <div className="grid grid-cols-2 gap-1">
                  {['O','R','I','X'].map((c,i)=> (
                    <div key={i} className="size-5 md:size-6 grid place-items-center rounded-[2px] bg-gradient-to-br from-red-600 to-red-800 text-[9px] md:text-[10px] font-black">{c}</div>
                  ))}
                </div>
                <p className="text-xs md:text-sm text-white/70">© 2025 ORIX. Fast. Fair. Friendly.</p>
              </div>
              <div className="text-xs text-white/50">Made for university riders.</div>
            </div>
          </footer>

          {/* Floating GitHub avatar button */}
          <a
            href="https://github.com/founder" target="_blank" rel="noreferrer"
            className="fixed z-50 bottom-5 right-5 group"
            aria-label="Founder GitHub"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-red-600/30 blur-md opacity-0 group-hover:opacity-100 transition" />
              <div className="size-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center hover:scale-105 active:scale-95 transition" data-cursor>
                <Github className="text-white/90" />
              </div>
            </div>
          </a>

          {/* Custom lightning-inspired cursor */}
          <motion.div
            className="pointer-events-none fixed z-[100] mix-blend-screen"
            style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
          >
            <motion.div
              style={{ scale: cursorScale }}
              className="relative"
            >
              <div className="w-6 h-6 rotate-45 bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_30px_6px_rgba(239,68,68,0.45)] rounded-sm" />
              <div className="absolute inset-0 -z-10 blur-xl bg-red-500/40 rounded-full" />
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  )
}
