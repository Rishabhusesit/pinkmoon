'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-hot-pink-950/20 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,61,158,0.1),transparent_70%)]" />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="font-display text-7xl md:text-9xl font-bold mb-6 gradient-text"
          >
            Only For The Prettiest Girl
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-hot-pink-200 font-light tracking-wide"
          >
            A beautiful journey begins here
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap gap-4 justify-center"
          >
            <motion.a
              href="/click-to-find-the-prettiest-face"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-hot-pink-500 to-hot-pink-700 rounded-full text-white font-semibold glow-pink hover:from-hot-pink-400 hover:to-hot-pink-600 transition-all"
            >
              Click To Find The Prettiest Face
            </motion.a>
            <motion.a
              href="/click-for-gift"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-hot-pink-500 to-hot-pink-700 rounded-full text-white font-semibold glow-pink hover:from-hot-pink-400 hover:to-hot-pink-600 transition-all"
            >
              Click For Gift
            </motion.a>
            <motion.a
              href="/secrets"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-hot-pink-500 to-hot-pink-700 rounded-full text-white font-semibold glow-pink hover:from-hot-pink-400 hover:to-hot-pink-600 transition-all"
            >
              Secrets
            </motion.a>
            <motion.a
              href="/wanna-hangout-2gether"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-hot-pink-500 to-hot-pink-700 rounded-full text-white font-semibold glow-pink hover:from-hot-pink-400 hover:to-hot-pink-600 transition-all"
            >
              Wanna Hangout 2gether?
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-32 h-32 bg-hot-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-40 h-40 bg-hot-pink-400/20 rounded-full blur-3xl"
        />
      </section>

      {/* Image Section 1 */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full h-[600px] md:h-[800px] rounded-2xl overflow-hidden glow-pink">
              <Image
                src="/images/image1.jpg"
                alt="Beautiful moment"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute bottom-8 left-8 right-8 md:left-12 md:right-12"
            >
              <h2 className="font-display text-4xl md:text-6xl text-white mb-4">
                Captured Moments
              </h2>
              <p className="text-lg md:text-xl text-hot-pink-100 max-w-2xl">
                Every moment is a treasure, every memory a gem. Here's to the beautiful times we share.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Text Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-5xl md:text-7xl mb-8 gradient-text">
              Forever & Always
            </h2>
            <p className="text-xl md:text-2xl text-hot-pink-100 leading-relaxed mb-6">
              In the quiet moments and the loud ones, in the sunshine and the starlight, 
              you are my constant, my joy, my everything.
            </p>
            <p className="text-lg md:text-xl text-hot-pink-200 leading-relaxed">
              This is our story, written in pink and painted with love.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Section 2 */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden glow-pink">
              <Image
                src="/images/image2.jpg"
                alt="Beautiful moment"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden glow-pink">
              <Image
                src="/images/image3.jpg"
                alt="Beautiful moment"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden glow-pink mb-12">
              <Image
                src="/images/image4.jpg"
                alt="Beautiful moment"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
            <h2 className="font-display text-5xl md:text-7xl mb-6 gradient-text">
              With All My Love
            </h2>
            <p className="text-xl md:text-2xl text-hot-pink-100 leading-relaxed">
              You are the moon that lights up my night, the pink that colors my world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-hot-pink-900/30">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-hot-pink-300 text-sm">
            Made with ❤️ and lots of pink
          </p>
        </div>
      </footer>
    </main>
  )
}
