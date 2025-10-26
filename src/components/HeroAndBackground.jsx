import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function HeroAndBackground() {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setTilt({ x: (px - 0.5) * 12, y: (py - 0.5) * -12 })
  }

  const headline = 'Fast. Fair. Friendly.'

  useEffect(() => {
    // warm start for entrance particles
  }, [])

  return (
    <section id="top" className="relative min-h-[96vh] pt-24 md:pt-28 overflow-hidden">
      {/* Dynamic background: holographic grid + gradient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Grid with subtle parallax shimmer */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute inset-0" style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '38px 38px, 38px 38px',
          }} />
          <motion.div
            className="absolute inset-0"
            initial={{ backgroundPositionX: 0 }}
            animate={{ backgroundPositionX: ['0%', '100%'] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            style={{
              background: 'linear-gradient(90deg, rgba(239,68,68,0.08), transparent 20%, rgba(239,68,68,0.08) 40%, transparent 60%, rgba(239,68,68,0.08) 80%)',
              backgroundSize: '200% 100%'
            }}
          />
        </div>
        {/* Orbiting orbs */}
        <motion.div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-red-600/25 blur-3xl" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />
        <motion.div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-red-900/30 blur-3xl" animate={{ rotate: -360 }} transition={{ duration: 55, repeat: Infinity, ease: 'linear' }} />
        {/* Particles */}
        {Array.from({ length: 48 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/80 rounded-full"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, opacity: 0 }}
            animate={{ y: ['0%', '-90%'], opacity: [0, 1, 0] }}
            transition={{ duration: 9 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 2 }}
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      <div ref={ref} onMouseMove={onMouseMove} className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* 3D parallax tile stack */}
          <div className="order-2 lg:order-1">
            <div className="relative perspective-[1400px]">
              <motion.div
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateX: tilt.y, rotateY: tilt.x }}
                transition={{ type: 'spring', stiffness: 110, damping: 14 }}
                className="relative w-full max-w-xl aspect-[4/3] mx-auto"
              >
                {[0,1,2].map((d, i) => (
                  <div key={i} className={`absolute inset-0 rounded-2xl border border-white/10 ${i===2 ? 'bg-white/[0.03]' : 'bg-white/[0.015]'} shadow-[0_0_60px_rgba(239,68,68,0.25)]`} style={{ transform: `translateZ(${(i+1)*-38}px) translate(${i*10}px, ${i*10}px)` }} />
                ))}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600/25 to-transparent" />
                {/* Lightning square + shine */}
                <motion.div
                  className="absolute left-6 top-6 w-16 h-16 rounded-md overflow-hidden"
                  animate={{ boxShadow: ['0 0 12px 2px rgba(239,68,68,0.3)','0 0 54px 10px rgba(239,68,68,0.7)','0 0 12px 2px rgba(239,68,68,0.3)'] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg,rgba(255,255,255,0.2),rgba(239,68,68,1),rgba(255,255,255,0.2))]" />
                  <motion.div className="absolute -inset-6 rotate-45 bg-white/15" animate={{ x: ['-40%','60%'] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
                </motion.div>
                {/* Holographic field */}
                <div className="absolute right-8 bottom-8 w-44 h-44 rounded-xl bg-[radial-gradient(circle_at_30%_30%,rgba(239,68,68,0.35),transparent_60%)] border border-white/10" />
              </motion.div>
            </div>
          </div>

          {/* Hero content */}
          <div className="order-1 lg:order-2 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
              <span className="size-2 rounded-full bg-red-500 animate-pulse" /><span>Student Ride-Sharing Community</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              {headline.split('').map((ch, i) => (
                <motion.span key={i} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.035, type: 'spring', stiffness: 240, damping: 20 }} className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#fff,#ef4444,#fff)] bg-[length:200%_100%] animate-[bg-pan_8s_linear_infinite]">
                  {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              ))}
            </h1>
            <p className="text-white/70 max-w-xl mx-auto lg:mx-0">
              Find ride mates on your campus. Split fares fairly. Build reputation with ELO. No driver marketplace — just students helping students.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <button disabled className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white/60 cursor-not-allowed" aria-disabled data-cursor>
                Coming Soon
              </button>
              <a href="https://forms.gle/example" target="_blank" rel="noreferrer" className="relative px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:brightness-110 active:scale-95 transition shadow-[0_0_24px_rgba(239,68,68,0.35)]" data-cursor>
                <span className="relative z-10">Join Waitlist</span>
                <span className="pointer-events-none absolute inset-0 rounded-xl bg-white/20 opacity-0 hover:opacity-10 transition" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bg-pan { 0% { background-position-x: 0% } 100% { background-position-x: 200% } }
      `}</style>
    </section>
  )
}
