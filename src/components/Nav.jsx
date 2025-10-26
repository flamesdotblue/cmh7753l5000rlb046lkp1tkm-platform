import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [blur, setBlur] = useState(false)
  const [active, setActive] = useState('#top')

  useEffect(() => {
    const onScroll = () => setBlur(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['#why', '#how', '#safety']
    const handler = () => {
      const y = window.scrollY + window.innerHeight * 0.3
      let id = '#top'
      for (const sel of sections) {
        const el = document.querySelector(sel)
        if (!el) continue
        const r = el.getBoundingClientRect()
        const top = r.top + window.scrollY
        if (y >= top) id = sel
      }
      setActive(id)
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { href: '#why', label: 'Why Use ORIX' },
    { href: '#how', label: 'How It Works' },
    { href: '#safety', label: 'Safety' },
  ]

  return (
    <>
      <div className={`fixed top-2 left-1/2 -translate-x-1/2 z-[92] w-[95%] md:w-[92%] ${blur ? 'bg-white/7 backdrop-blur-xl' : 'bg-white/0 backdrop-blur-md'} border border-white/10 rounded-2xl transition-all shadow-[0_10px_40px_-20px_rgba(239,68,68,0.35)]` }>
        <div className="px-4 md:px-6 py-3 flex items-center justify-between">
          {/* Logo placeholder */}
          <a href="#top" className="flex items-center gap-3" aria-label="ORIX home" data-cursor>
            <div className="grid grid-cols-2 gap-0.5">
              {['O','R','I','X'].map((c,i)=> (
                <div key={i} className="size-4 md:size-5 grid place-items-center rounded-[2px] bg-gradient-to-br from-red-600 to-red-800 text-[8px] md:text-[9px] font-black">{c}</div>
              ))}
            </div>
            <span className="font-black tracking-wide">ORIX</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80 relative">
            {links.map(l => (
              <a key={l.href} href={l.href} className={`hover:text-white transition ${active===l.href ? 'text-white' : ''}`} data-cursor>
                {l.label}
              </a>
            ))}
            <a href="https://forms.gle/example" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-red-500 hover:brightness-110 active:scale-95 transition text-white shadow-[0_0_24px_rgba(239,68,68,0.35)]" data-cursor>
              Join Waitlist
            </a>
            <motion.span layoutId="underline" className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-red-400 to-red-600 rounded" style={{ width: 0 }} />
          </nav>

          <button className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10" onClick={()=>setOpen(true)} aria-label="Open menu" data-cursor>
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[91] transition ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-black/60 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={()=>setOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-xs bg-zinc-950 border-l border-white/10 transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="grid grid-cols-2 gap-0.5">
                {['O','R','I','X'].map((c,i)=> (
                  <div key={i} className="size-4 grid place-items-center rounded-[2px] bg-gradient-to-br from-red-600 to-red-800 text-[8px] font-black">{c}</div>
                ))}
              </div>
              <span className="font-black">ORIX</span>
            </div>
            <button className="p-2 rounded-lg bg-white/5 border border-white/10" onClick={()=>setOpen(false)} aria-label="Close menu" data-cursor>
              <X />
            </button>
          </div>
          <div className="p-4 space-y-3">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={()=>setOpen(false)} className={`block px-3 py-2 rounded-lg border border-white/10 ${active===l.href ? 'bg-white/10' : 'bg-white/5'}`} data-cursor>
                {l.label}
              </a>
            ))}
            <a href="https://forms.gle/example" target="_blank" rel="noreferrer" className="block text-center px-3 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500" data-cursor>
              Join Waitlist
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
