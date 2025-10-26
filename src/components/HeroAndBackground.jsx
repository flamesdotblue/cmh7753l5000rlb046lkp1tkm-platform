import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function HeroAndBackground() {
  const containerRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const onMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setTilt({ x: (px - 0.5) * 10, y: (py - 0.5) * -10 })
  }

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => !p), 2000)
    return () => clearInterval(id)
  }, [])
  const [pulse, setPulse] = useState(false)

  const headline = 'Fast. Fair. Friendly.'

  return (
    <section id="top" className="relative min-h-[92vh] pt-24 md:pt-28 overflow-hidden">
      {/* Dynamic background layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Holographic grid */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px, 40px 40px',
          backgroundPosition: '0 0, 0 0'
        }} />
        {/* Orbiting gradient orbs */}
        <motion.div
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-red-600/30 blur-3xl"
          animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-red-900/30 blur-3xl"
          animate={{ rotate: -360 }} transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
        />
        {/* Floating particles */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div key={i} className="absolute w-0.5 h-0.5 bg-white/70 rounded-full"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, opacity: 0 }}
            animate={{ y: ['0%', '-80%'], opacity: [0, 1, 0] }}
            transition={{ duration: 8 + Math.random() * 8, repeat: Infinity, delay: Math.random() * 2 }}
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      <div ref={containerRef} onMouseMove={onMouseMove} className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* 3D parallax tile stack */}
          <div className="order-2 lg:order-1">
            <div className="relative perspective-[1200px]">
              <motion.div
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateX: tilt.y, rotateY: tilt.x }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="relative w-full max-w-xl aspect-[4/3] mx-auto"
              >
                {[0,1,2].map((d, i) => (
                  <div key={i} className={`absolute inset-0 rounded-2xl border border-white/10 ${i===2 ? 'bg-white/[0.02]' : 'bg-white/[0.01]'} shadow-[0_0_60px_rgba(239,68,68,0.25)]`} style={{ transform: `translateZ(${(i+1)*-35}px) translate(${i*8}px, ${i*8}px)` }} />
                ))}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600/20 to-transparent" />
                {/* Animated lightning square */}
                <motion.div
                  className="absolute left-6 top-6 w-16 h-16 rounded-md"
                  animate={{ boxShadow: pulse ? '0 0 48px 8px rgba(239,68,68,0.6)' : '0 0 12px 2px rgba(239,68,68,0.3)' }}
                  transition={{ duration: 0.8 }}
                  style={{ background: 'conic-gradient(from 0deg, rgba(255,255,255,0.2), rgba(239,68,68,1), rgba(255,255,255,0.2))' }}
                />
                {/* Holographic field */}
                <div className="absolute right-8 bottom-8 w-40 h-40 rounded-xl bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.35),transparent_60%)] border border-white/10" />
              </motion.div>
            </div>
          </div>

          {/* Hero content */}
          <div className="order-1 lg:order-2 text-center lg:text-left space-y-6">
            <div className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">Student Ride-Sharing Community</div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              {headline.split('').map((ch, i) => (
                <motion.span key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.04, type: 'spring', stiffness: 200, damping: 18 }}>
                  {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              ))}
            </h1>
            <p className="text-white/70 max-w-xl mx-auto lg:mx-0">
              Find ride mates on your campus. Split fares fairly. Build reputation with ELO. No driver marketplace — just students helping students.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <button disabled className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white/60 cursor-not-allowed" aria-disabled>
                Coming Soon
              </button>
              <a href="https://forms.gle/example" target="_blank" rel="noreferrer" className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 active:scale-95 transition shadow-[0_0_24px_rgba(239,68,68,0.35)]" data-cursor>
                Join Waitlist
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
