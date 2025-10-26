import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Nav from './components/Nav'
import Loader from './components/Loader'
import HeroAndBackground from './components/HeroAndBackground'
import Sections from './components/Sections'
import { Github } from 'lucide-react'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [cursorHot, setCursorHot] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 600, damping: 35 })
  const sy = useSpring(my, { stiffness: 600, damping: 35 })
  const scale = useSpring(cursorHot ? 1.3 : 1, { stiffness: 300, damping: 18 })

  useEffect(() => {
    let p = 0
    const tick = setInterval(() => {
      p = Math.min(100, p + Math.floor(Math.random() * 9) + 2)
      setProgress(p)
      if (p >= 100) {
        clearInterval(tick)
        setTimeout(() => setLoaded(true), 420)
      }
    }, 70)
    return () => clearInterval(tick)
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    const over = (e) => {
      const interactive = e.target.closest('a,button,[data-cursor]')
      setCursorHot(!!interactive)
    }
    const out = (e) => {
      const interactive = e.relatedTarget && (e.relatedTarget.closest && e.relatedTarget.closest('a,button,[data-cursor]'))
      if (!interactive) setCursorHot(false)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', over)
    window.addEventListener('mouseout', out)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mouseout', out)
    }
  }, [mx, my])

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const y = window.scrollY
      setScrollProgress(max > 0 ? y / max : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const msg = 'ORIX: Fast. Fair. Friendly. — 你好 • नमस्ते • مرحبا • Hola • Bonjour • こんにちは • 안녕하세요'
    const print = () => console.log(`%c${msg}`, 'color:#ff4040;font-weight:900;font-size:12px')
    print()
    const id = setInterval(print, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-red-600/40 selection:text-white">
      {!loaded && <Loader progress={progress} />}

      {loaded && (
        <>
          {/* Scroll progress bar */}
          <div className="fixed inset-x-0 top-0 z-[90] h-1 bg-white/5">
            <motion.div
              className="h-full rounded-r bg-gradient-to-r from-red-500 via-red-400 to-red-600"
              style={{ width: `${Math.max(2, Math.round(scrollProgress * 100))}%` }}
            />
          </div>

          <Nav />
          <HeroAndBackground />
          <Sections />

          {/* Footer */}
          <footer className="relative z-10 border-t border-white/10 bg-black/60 backdrop-blur-xl">
            <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-between">
              <div className="flex items-center gap-4">
                <div className="grid grid-cols-2 gap-1">
                  {['O','R','I','X'].map((c,i)=> (
                    <div key={i} className="size-5 md:size-6 grid place-items-center rounded-[3px] bg-gradient-to-br from-red-600 to-red-800 text-[9px] md:text-[10px] font-black shadow-[0_0_20px_rgba(239,68,68,0.4)]">{c}</div>
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
            className="fixed z-[95] bottom-5 right-5 group" aria-label="Founder GitHub" data-cursor
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-red-600/30 blur-md opacity-0 group-hover:opacity-100 transition" />
              <div className="size-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center hover:scale-105 active:scale-95 transition">
                <Github className="text-white/90" />
              </div>
            </div>
          </a>

          {/* Custom lightning cursor */}
          <motion.div
            className="pointer-events-none fixed z-[100] mix-blend-screen"
            style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
          >
            <motion.div style={{ scale }} className="relative">
              <div className="w-7 h-7 rotate-45 rounded-[3px] bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_40px_8px_rgba(239,68,68,0.55)]"></div>
              <div className="absolute -inset-4 -z-10 bg-red-500/25 blur-2xl rounded-full" />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[2px] h-6 bg-gradient-to-b from-red-500/90 to-transparent" />
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  )
}
