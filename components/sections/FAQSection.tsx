// // components/FAQSection.tsx

// import { Minus, Plus } from "lucide-react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "../ui/accordion";
// // import { HiPlus, HiMinus } from "react-icons/hi"; // Example icon library

// const faqItems = [
//   {
//     id: "item-1",
//     question: "How accurate is the transcription?",
//     answer:
//       "Our AI-powered transcription boasts up to 99% accuracy for clear audio. Factors like audio quality, accents, and background noise can affect accuracy.",
//   },
//   {
//     id: "item-2",
//     question: "What file formats do you support?",
//     answer:
//       "We support a wide range of audio and video formats, including MP3, WAV, MP4, AVI, and more. If you have a specific format, please contact our support team.",
//   },
//   {
//     id: "item-3",
//     question: "How secure is my data?",
//     answer:
//       "We take data security seriously. All files are encrypted during transfer and storage. We adhere to strict privacy policies and never share your data with third parties.",
//   },
//   {
//     id: "item-4",
//     question: "Can I edit the transcriptions?",
//     answer:
//       "Yes, we provide an easy-to-use editor where you can review and make changes to your transcriptions before finalizing them.",
//   },
//   {
//     id: "item-5",
//     question: "Do you offer an API for integration?",
//     answer:
//       "Yes, we offer API access for seamless integration with your existing workflows. This feature is available on our Enterprise plan.",
//   },
// ];

// const FAQSection = () => {
//   return (
//     <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
//       <div className="container px-4 md:px-6">
//         <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-center mb-12 text-gray-800">
//           Frequently Asked Questions
//         </h2>
//         <Accordion
//           type="single"
//           collapsible
//           className="w-full max-w-3xl mx-auto bg-white px-6 py-8 rounded-2xl"
//         >
//           {faqItems.map((item) => (
//             <AccordionItem key={item.id} value={item.id}>
//               <AccordionTrigger className="flex justify-between items-center p-4 bg-white   duration-300">
//                 <span className="text-lg font-semibold text-gray-800">
//                   {item.question}
//                 </span>
//                 {/* <span>
//                   <Plus className="w-5 h-5 text-gray-500 transition-transform duration-200 transform" />
//                   <Minus className="w-5 h-5 text-gray-500 transition-transform duration-200 transform hidden" />
//                 </span> */}
//               </AccordionTrigger>
//               <AccordionContent className="p-4 bg-gray-50 text-gray-700 border border-t-0 border-gray-200 transition-opacity duration-300">
//                 {item.answer}
//               </AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       </div>
//     </section>
//   );
// };

// export default FAQSection;

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqItems = [
  {
    id: "item-1",
    question: "How accurate is the transcription?",
    answer:
      "Our AI-powered transcription boasts up to 99% accuracy for clear audio. Factors like audio quality, accents, and background noise can affect accuracy.",
  },
  {
    id: "item-2",
    question: "What file formats do you support?",
    answer:
      "We support a wide range of audio and video formats, including MP3, WAV, MP4, AVI, and more. If you have a specific format, please contact our support team.",
  },
  {
    id: "item-3",
    question: "How secure is my data?",
    answer:
      "We take data security seriously. All files are encrypted during transfer and storage. We adhere to strict privacy policies and never share your data with third parties.",
  },
  {
    id: "item-4",
    question: "Can I edit the transcriptions?",
    answer:
      "Yes, we provide an easy-to-use editor where you can review and make changes to your transcriptions before finalizing them.",
  },
  {
    id: "item-5",
    question: "Do you offer an API for integration?",
    answer:
      "Yes, we offer API access for seamless integration with your existing workflows. This feature is available on our Enterprise plan.",
  },
];

const FAQItem = ({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqItems)[0];
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <motion.div
      initial={false}
      animate={{
        backgroundColor: isOpen
          ? "var(--accordion-active-bg)"
          : "var(--accordion-bg)",
      }}
      className={cn(
        "border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4",
        "transition-shadow duration-300 ease-in-out",
        isOpen ? "shadow-lg" : "shadow-sm hover:shadow-md"
      )}
    >
      <motion.button
        className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={onToggle}
        aria-expanded={isOpen}
        initial={false}
        animate={{
          backgroundColor: isOpen
            ? "var(--accordion-active-bg)"
            : "var(--accordion-bg)",
        }}
      >
        <div className="flex justify-between items-center">
          <motion.span
            className="text-lg font-semibold text-gray-900 dark:text-white"
            animate={{
              color: isOpen
                ? "var(--accordion-active-text)"
                : "var(--accordion-text)",
            }}
          >
            {item.question}
          </motion.span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </motion.div>
        </div>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-6 pt-0 text-gray-700 dark:text-gray-300">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQSection() {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  return (
    <section
      id="faq"
      className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-center mb-12 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {faqItems.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openItem === item.id}
              onToggle={() =>
                setOpenItem(openItem === item.id ? null : item.id)
              }
            />
          ))}
        </motion.div>
      </div>
      <style jsx global>{`
        :root {
          --accordion-bg: #ffffff;
          --accordion-text: #1a202c;
          --accordion-active-bg: #f7fafc;
          --accordion-active-text: #2b6cb0;
        }
        .dark {
          --accordion-bg: #2d3748;
          --accordion-text: #e2e8f0;
          --accordion-active-bg: #2a4365;
          --accordion-active-text: #63b3ed;
        }
      `}</style>
    </section>
  );
}
