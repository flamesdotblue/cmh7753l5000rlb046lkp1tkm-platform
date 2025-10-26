import { motion } from 'framer-motion'
import { Shield, Users, Wallet, Gauge, Rocket, Sparkles, Clock, CheckCircle2, HeartHandshake } from 'lucide-react'

function FeatureBento() {
  const now = new Date()
  const target = new Date('2026-03-01T00:00:00Z')
  const base = new Date('2025-02-01T00:00:00Z')
  const progress = Math.min(100, Math.max(0, ((now - base) / (target - base)) * 100))

  const Card = ({ children, className = '' }) => (
    <motion.div
      whileHover={{ y: -6, rotateX: 1.5, rotateY: -1.5 }} whileTap={{ scale: 0.985 }}
      className={`relative rounded-2xl p-5 border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent" />
      <div className="pointer-events-none absolute -inset-[1px] rounded-2xl [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:exclude] p-[1px] bg-gradient-to-r from-white/10 to-white/0" />
      {children}
    </motion.div>
  )

  return (
    <section id="why" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black">Why Use ORIX</h2>
        <p className="text-white/70">Premium matching and safety-first design for student riders.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-600/20 border border-white/10"><Shield className="text-red-400"/></div>
            <div>
              <h3 className="font-bold">Verified Students Only</h3>
              <p className="text-sm text-white/70">Join with .edu email. Real people, real campuses.</p>
              <div className="mt-3 flex gap-4 text-xs">
                <span className="text-white/70">42 campuses</span>
                <span className="text-white/70">3.2k signups</span>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-600/20 border border-white/10"><Gauge className="text-red-400"/></div>
            <div>
              <h3 className="font-bold">ELO Reputation</h3>
              <p className="text-sm text-white/70">A transparent rating that adapts as you ride and share.</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-600/20 border border-white/10"><Wallet className="text-red-400"/></div>
            <div>
              <h3 className="font-bold">Fair Fare Splitting</h3>
              <p className="text-sm text-white/70">Split costs instantly. Save more riding together.</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-600/20 border border-white/10"><Rocket className="text-red-400"/></div>
            <div>
              <h3 className="font-bold">Instant Matching</h3>
              <p className="text-sm text-white/70">Smart filters pair you with ride mates in seconds.</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-600/20 border border-white/10"><HeartHandshake className="text-red-400"/></div>
            <div>
              <h3 className="font-bold">Community-Driven</h3>
              <p className="text-sm text-white/70">Meet classmates, build trust, and help new students explore.</p>
            </div>
          </div>
        </Card>
        <Card className="lg:col-span-1 md:col-span-2">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-600/20 border border-white/10"><Clock className="text-red-400"/></div>
            <div className="w-full">
              <h3 className="font-bold">Launching Soon</h3>
              <p className="text-sm text-white/70">Target: Feb–Mar 2026</p>
              <div className="mt-3 h-2 w-full bg-white/10 rounded overflow-hidden">
                <motion.div className="h-2 bg-gradient-to-r from-red-500 via-red-400 to-red-600" initial={{ width: 0 }} animate={{ width: `${progress.toFixed(0)}%` }} transition={{ duration: 1.2 }} />
              </div>
              <div className="text-right text-xs text-white/60 mt-1">{progress.toFixed(0)}%</div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { title: 'Download & Login', desc: 'Use your .edu email to verify.', icon: <Rocket /> },
    { title: 'Create a Ride', desc: 'Set origin, destination, time.', icon: <Sparkles /> },
    { title: 'Find Ride Mates', desc: 'Match instantly with classmates.', icon: <Users /> },
    { title: 'Share & Rate', desc: 'Split fare and rate with ELO.', icon: <Gauge /> },
  ]
  return (
    <section id="how" className="relative z-10 mx-auto max-w-7xl px-6 pb-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black">How It Works</h2>
        <p className="text-white/70">Four simple steps to safer, cheaper rides.</p>
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        {steps.map((s, i) => (
          <motion.div key={i} initial={{ y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.45 }} transition={{ delay: i * 0.08, type: 'spring', stiffness: 160, damping: 18 }}
            className="relative rounded-2xl p-5 border border-white/10 bg-white/5 backdrop-blur-xl text-center"
          >
            <div className="mx-auto size-16 grid place-items-center rounded-2xl bg-red-600/20 border border-white/10 mb-3 shadow-[0_0_30px_rgba(239,68,68,0.25)]">{s.icon}</div>
            <h3 className="font-bold">{s.title}</h3>
            <p className="text-sm text-white/70">{s.desc}</p>
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-2 w-6 h-[2px] bg-gradient-to-r from-red-600/70 to-transparent" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Safety() {
  const Card = ({ children }) => (
    <motion.div whileHover={{ rotateX: 2, rotateY: -2, y: -6 }} className="rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-red-600/10 to-transparent" />
      {children}
    </motion.div>
  )

  return (
    <section id="safety" className="relative z-10 mx-auto max-w-7xl px-6 pb-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black">Safety First with ELO System</h2>
        <p className="text-white/70">Trust is built into every ride.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-600/20 border border-white/10"><Shield className="text-red-400"/></div>
            <div>
              <h3 className="font-bold mb-2">ELO Rating Mechanics</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2"><CheckCircle2 className="size-4 text-red-400 mt-0.5"/> Performance-based score evolves after each ride</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="size-4 text-red-400 mt-0.5"/> Recent rides weigh more than older ones</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="size-4 text-red-400 mt-0.5"/> Transparent ranges for campus-wide trust</li>
              </ul>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-600/20 border border-white/10"><Users className="text-red-400"/></div>
            <div>
              <h3 className="font-bold mb-2">Student-to-Student Model</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2"><CheckCircle2 className="size-4 text-red-400 mt-0.5"/> No driver marketplace — ride with classmates only</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="size-4 text-red-400 mt-0.5"/> .edu verification required for access</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="size-4 text-red-400 mt-0.5"/> Safety prompts and check-ins built in</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="relative z-10 mx-auto max-w-4xl px-6 pb-24 text-center">
      <motion.h3 initial={{ backgroundPositionX: '0%' }} animate={{ backgroundPositionX: '100%' }} transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
        className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-[linear-gradient(90deg,#fff,#ef4444,#fff)] bg-[length:200%_100%]"
      >
        Ready to Join ORIX?
      </motion.h3>
      <p className="text-white/70 mt-3">We’re gearing up for launch. Be the first to know when ORIX hits your campus.</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <a href="https://forms.gle/example" target="_blank" rel="noreferrer" className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:brightness-110 active:scale-95 transition shadow-[0_0_24px_rgba(239,68,68,0.35)]" data-cursor>
          <span className="relative z-10">Join Waitlist</span>
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-white/20 opacity-0 hover:opacity-10 transition" />
        </a>
        <a href="#why" className="px-6 py-3 rounded-xl border border-white/20 hover:border-white/40 text-white/90" data-cursor>
          Learn More
        </a>
      </div>
    </section>
  )
}

export default function Sections() {
  return (
    <>
      <FeatureBento />
      <HowItWorks />
      <Safety />
      <FinalCTA />
    </>
  )
}
