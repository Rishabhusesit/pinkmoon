'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ImageSectionProps {
  image: string
  title: string
  text: string
  priority?: boolean
}

export default function ImageSection({ image, title, text, priority = false }: ImageSectionProps) {
  return (
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
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority={priority}
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
              {title}
            </h2>
            <p className="text-lg md:text-xl text-hot-pink-100 max-w-2xl">
              {text}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
