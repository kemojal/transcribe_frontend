"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    description: "Perfect for trying out our service",
    features: [
      "5 hours of transcription per month",
      "Basic editing tools",
      "Standard support",
      "Export to TXT & DOC",
      "2 team members",
    ],
    gradient: "from-blue-500/20 to-indigo-500/20",
    hover: "from-blue-500 to-indigo-500",
  },
  {
    name: "Pro",
    price: { monthly: 29, annual: 290 },
    description: "For professionals and small teams",
    features: [
      "50 hours of transcription per month",
      "Advanced editing tools",
      "Priority support",
      "Export to all formats",
      "10 team members",
      "Custom vocabulary",
      "API access",
    ],
    gradient: "from-purple-500/20 to-pink-500/20",
    hover: "from-purple-500 to-pink-500",
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 99, annual: 990 },
    description: "For large organizations",
    features: [
      "Unlimited transcription",
      "Enterprise-grade security",
      "24/7 dedicated support",
      "Custom integrations",
      "Unlimited team members",
      "Advanced analytics",
      "SLA guarantee",
      "Custom deployment",
    ],
    gradient: "from-amber-500/20 to-orange-500/20",
    hover: "from-amber-500 to-orange-500",
  },
];

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden" id="pricing">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your transcription needs. Scale up or
            down as needed.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm ${
                !isAnnual ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Monthly
            </span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out ${
                isAnnual ? "bg-primary" : "bg-muted"
              }`}
            >
              <motion.div
                className="w-6 h-6 rounded-full bg-white shadow-sm"
                animate={{ x: isAnnual ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
            <span
              className={`text-sm ${
                isAnnual ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Annual <span className="text-xs text-primary">(-17%)</span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium px-4 py-1 rounded-full shadow-lg z-10">
                  Most Popular
                </div>
              )}

              <div
                className={`relative h-full bg-background/50 backdrop-blur-sm border border-primary/10 p-8 rounded-3xl transition-all duration-300 group-hover:border-primary/20`}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="relative">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      $
                      {isAnnual
                        ? (plan.price.annual / 12).toFixed(2)
                        : plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                    {isAnnual && (
                      <div className="text-sm text-primary mt-1">
                        Billed ${plan.price.annual}/year
                      </div>
                    )}
                  </div>

                  <Button
                    className={`w-full mb-8 bg-gradient-to-r from-primary/90 to-secondary/90 text-white hover:from-primary hover:to-secondary transition-all duration-300`}
                  >
                    Get Started
                  </Button>

                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div
                          className={`p-1 rounded-full bg-gradient-to-r ${plan.hover}`}
                        >
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
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
          className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
      </div>
    </section>
  );
};

export default PricingSection;
