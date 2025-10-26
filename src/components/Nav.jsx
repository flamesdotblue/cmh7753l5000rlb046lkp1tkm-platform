import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [blur, setBlur] = useState(false)

  useEffect(() => {
    const onScroll = () => setBlur(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#why', label: 'Why Use ORIX' },
    { href: '#how', label: 'How It Works' },
    { href: '#safety', label: 'Safety' },
  ]

  return (
    <>
      <div className={`fixed top-1 left-1/2 -translate-x-1/2 z-[90] w-[95%] md:w-[92%] ${blur ? 'backdrop-blur-xl bg-white/5' : 'backdrop-blur-md bg-white/0'} border border-white/10 rounded-2xl transition-all` }>
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

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            {links.map(l => (
              <a key={l.href} href={l.href} className="hover:text-white transition" data-cursor>{l.label}</a>
            ))}
            <a href="https://forms.gle/example" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 active:scale-95 transition text-white" data-cursor>
              Join Waitlist
            </a>
          </nav>

          <button className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10" onClick={()=>setOpen(true)} aria-label="Open menu" data-cursor>
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[95] transition ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={()=>setOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[78%] max-w-xs bg-zinc-950 border-l border-white/10 transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
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
              <a key={l.href} href={l.href} onClick={()=>setOpen(false)} className="block px-3 py-2 rounded-lg bg-white/5 border border-white/10" data-cursor>
                {l.label}
              </a>
            ))}
            <a href="https://forms.gle/example" target="_blank" rel="noreferrer" className="block text-center px-3 py-2 rounded-lg bg-red-600" data-cursor>
              Join Waitlist
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
