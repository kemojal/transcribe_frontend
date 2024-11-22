"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How accurate is the AI transcription?",
    answer:
      "Our AI transcription service achieves over 95% accuracy across multiple languages and accents. The accuracy improves even further with clear audio input and professional recording conditions.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "We support all major audio and video formats including MP3, WAV, MP4, M4A, AAC, and many more. Files can be uploaded directly or imported from cloud storage services.",
  },
  {
    question: "How long does transcription take?",
    answer:
      "Most files are transcribed in less than their actual duration. For example, a 60-minute audio file typically takes 30-45 minutes to transcribe, depending on audio quality and server load.",
  },
  {
    question: "What languages are supported?",
    answer:
      "We currently support over 30 languages including English, Spanish, French, German, Chinese, Japanese, and many more. Our AI models are continuously trained to improve accuracy across all supported languages.",
  },
  {
    question: "How secure is my data?",
    answer:
      "We employ bank-level encryption for all file transfers and storage. Your files are encrypted at rest and in transit. We are GDPR compliant and never share your data with third parties.",
  },
  {
    question: "Can I edit the transcriptions?",
    answer:
      "Yes, our platform includes a full-featured editor that allows you to make corrections, add speaker labels, and format your transcript. Changes are saved automatically and can be exported in multiple formats.",
  },
];

const FAQSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <section
      ref={containerRef}
      className="py-24 relative overflow-hidden"
      id="faq"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      <motion.div style={{ opacity, scale }} className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need to know about our AI transcription service.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left"
              >
                <div className="relative bg-background/50 backdrop-blur-sm border border-primary/10 p-6 rounded-2xl group-hover:border-primary/20 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg pr-8">
                      {faq.question}
                    </h3>
                    <div className="absolute right-6 top-6">
                      {openIndex === index ? (
                        <Minus className="w-5 h-5 text-primary" />
                      ) : (
                        <Plus className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: openIndex === index ? "auto" : 0,
                      opacity: openIndex === index ? 1 : 0,
                      marginTop: openIndex === index ? 16 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                    className="overflow-hidden"
                  >
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </motion.div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-1/2 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            delay: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-1/2 -right-48 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
      </motion.div>
    </section>
  );
};

export default FAQSection;
