"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Content Creator",
    company: "CreativeMinds Studios",
    image: "/testimonials/sarah.jpg",
    content:
      "The accuracy of the transcriptions is incredible. It's saved me countless hours of manual work.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Podcast Host",
    company: "TechTalk Daily",
    image: "/testimonials/michael.jpg",
    content:
      "This platform has revolutionized our podcast production workflow. The AI is remarkably accurate.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Journalist",
    company: "Global News Network",
    image: "/testimonials/emily.jpg",
    content:
      "Fast, accurate, and incredibly user-friendly. It's become an essential tool in my reporting workflow.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Research Director",
    company: "Academic Institute",
    image: "/testimonials/david.jpg",
    content:
      "The accuracy in technical and academic content is outstanding. A game-changer for research interviews.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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
      id="testimonials"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      <motion.div style={{ opacity, scale }} className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            What Our Users Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Join thousands of satisfied users who have transformed their
            workflow with our AI transcription platform.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="relative bg-background/50 backdrop-blur-sm border border-primary/10 p-8 rounded-3xl group-hover:border-primary/20 transition-all duration-300">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-background flex items-center justify-center border border-primary/20">
                  <Quote className="w-4 h-4 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-lg mb-6 text-muted-foreground">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary p-[2px]">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
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

export default TestimonialsSection;
