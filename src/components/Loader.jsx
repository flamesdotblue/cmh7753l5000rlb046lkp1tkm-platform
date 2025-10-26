import { motion } from 'framer-motion'

export default function Loader({ progress }) {
  return (
    <div className="fixed inset-0 z-[120] grid place-items-center bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.25),transparent_55%)]" />

      {/* Animated lightning motifs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-10 left-1/3 w-1/2 h-64 bg-[conic-gradient(from_0deg,rgba(255,255,255,0)_0deg,rgba(255,255,255,0.4)_20deg,rgba(255,255,255,0)_40deg)] blur-3xl"
      />

      <div className="relative flex flex-col items-center gap-8">
        {/* ORIX 2x2 logo grid placeholder */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 12 }}
          className="grid grid-cols-2 gap-2"
        >
          {['O','R','I','X'].map((c, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1 + i * 0.1, repeat: Infinity, repeatType: 'reverse' }}
              className="size-16 md:size-20 grid place-items-center rounded-md bg-gradient-to-br from-red-600 to-red-800 text-white text-2xl font-black shadow-[0_0_40px_rgba(239,68,68,0.45)]"
            >
              {c}
            </motion.div>
          ))}
        </motion.div>

        {/* Progress counter */}
        <div className="flex items-center gap-3">
          <div className="h-1 w-52 bg-white/10 rounded">
            <motion.div
              className="h-1 bg-red-500 rounded"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            />
          </div>
          <div className="tabular-nums text-white/80 text-sm">{progress}%</div>
        </div>
      </div>
    </div>
  )
}
