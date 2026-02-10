'use client'

import { motion } from 'framer-motion'

interface TextSectionProps {
  title: string
  paragraphs: string[]
}

export default function TextSection({ title, paragraphs }: TextSectionProps) {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-5xl md:text-7xl mb-8 gradient-text">
            {title}
          </h2>
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`text-xl md:text-2xl text-hot-pink-100 leading-relaxed ${
                index < paragraphs.length - 1 ? 'mb-6' : ''
              }`}
            >
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
