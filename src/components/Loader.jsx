import { motion } from 'framer-motion'

export default function Loader({ progress }) {
  return (
    <div className="fixed inset-0 z-[120] grid place-items-center bg-black">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.25),transparent_55%)]" />

      {/* Lightning sweep */
      <motion.div
        initial={{ rotate: 0, opacity: 0.6 }}
        animate={{ rotate: 360, opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute w-[120vmax] h-[120vmax] bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.45),transparent_40%)] blur-3xl"
      />

      <div className="relative flex flex-col items-center gap-8">
        {/* ORIX 2x2 logo grid placeholder */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 140, damping: 12 }}
          className="grid grid-cols-2 gap-3"
        >
          {['O','R','I','X'].map((c, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0], boxShadow: [
                '0 0 20px rgba(239,68,68,0.25)',
                '0 0 50px rgba(239,68,68,0.55)',
                '0 0 20px rgba(239,68,68,0.25)'
              ]}}
              transition={{ duration: 1.2 + i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
              className="size-16 md:size-20 grid place-items-center rounded-lg bg-gradient-to-br from-red-600 to-red-800 text-white text-2xl font-black"
            >
              {c}
            </motion.div>
          ))}
        </motion.div>

        {/* Progress counter */}
        <div className="flex items-center gap-3">
          <div className="h-1 w-56 bg-white/10 rounded">
            <motion.div
              className="h-1 bg-gradient-to-r from-red-500 via-red-400 to-red-600 rounded"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.25 }}
            />
          </div>
          <div className="tabular-nums text-white/80 text-sm">{progress}%</div>
        </div>

        {/* Glitch tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.6, repeat: Infinity }}
          className="text-xs tracking-widest text-white/70"
        >
          FAST • FAIR • FRIENDLY
        </motion.div>
      </div>
    </div>
  )
}
