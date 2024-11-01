// components/Header.tsx
// import { Mic } from "lucide-react";
// import Link from "next/link";

// const Header = () => {
//   return (
//     <header className="bg-primary/100 shadow-xs fixed top-0 left-0 right-0 z-10 px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm ">
//       <Link className="flex items-center" href="#">
//         <Mic className="h-8 w-8 text-primary" />
//         <span className="ml-2 text-2xl font-bold text-white">TranscribeAI</span>
//       </Link>
//       <nav className="ml-auto flex gap-6">
//         <Link
//           className="text-sm font-medium text-gray-700 hover:text-primary transition duration-300"
//           href="#features"
//         >
//           Features
//         </Link>
//         <Link
//           className="text-sm font-medium text-gray-700 hover:text-primary transition duration-300"
//           href="#how-it-works"
//         >
//           How It Works
//         </Link>
//         <Link
//           className="text-sm font-medium text-gray-700 hover:text-primary transition duration-300"
//           href="#pricing"
//         >
//           Pricing
//         </Link>
//         <Link
//           className="text-sm font-medium text-gray-700 hover:text-primary transition duration-300"
//           href="#faq"
//         >
//           FAQ
//         </Link>
//       </nav>
//     </header>
//   );
// };

// export default Header;
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";

// export default function Header() {
//   return (
//     <header className="w-full border-b bg-primary/100 shadow-sm fixed top-0 left-0 right-0 z-10">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         <div className="flex items-center space-x-4">
//           <Link className="flex items-center space-x-2" href="#">
//             <div className="h-8 w-8 rounded bg-white" />
//             <span className="text-xl font-bold text-white">TranscribeAI</span>
//           </Link>
//           <nav className="hidden space-x-4 md:flex text-secondary">
//             <Link className="text-sm font-medium  hover:text-gray-900" href="#">
//               MacOS
//             </Link>
//             <Link className="text-sm font-medium  hover:text-gray-900" href="#">
//               Web
//             </Link>
//             <Link className="text-sm font-medium  hover:text-gray-900" href="#">
//               iOS
//             </Link>
//             <Link className="text-sm font-medium  hover:text-gray-900" href="#">
//               Android
//             </Link>
//           </nav>
//         </div>
//         <div className="flex items-center space-x-4">
//           <nav className="hidden space-x-4 md:flex text-secondary">
//             <Link className="text-sm font-medium  hover:text-gray-900" href="#">
//               Updates
//             </Link>
//             <Link className="text-sm font-medium  hover:text-gray-900" href="#">
//               Pricing
//             </Link>
//           </nav>
//           <Link
//             className="inline-flex items-center space-x-1 text-sm font-medium text-white hover:text-white"
//             href="/register"
//           >
//             <span>Sign In</span>
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }
"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  // Animation variants
  const logoVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 50, delay: 0.2 },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        delay: 0.4,
        staggerChildren: 0.2,
      },
    },
  };

  const signInButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, delay: 0.6 },
    },
  };

  return (
    <motion.header
      className="w-full border-b-[1px] border-primary/50 shadow-sm  z-50 backdrop-blur-md absolute top-0 left-0 right-0"
      initial="hidden"
      animate="visible"
      variants={navItemVariants}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Animated Logo */}
        <motion.div
          className="flex items-center space-x-4"
          variants={logoVariants}
        >
          <Link className="flex items-center space-x-2" href="#">
            <div className="h-8 w-8 rounded bg-white" />
            <span className="text-xl font-bold text-white">TranscribeAI</span>
          </Link>
        </motion.div>

        {/* Animated Navigation */}
        <motion.nav
          className="hidden md:flex space-x-6 text-secondary"
          variants={navItemVariants}
        >
          <Link
            className="text-sm font-medium hover:text-white transition duration-300"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-white transition duration-300"
            href="#how-it-works"
          >
            How It Works
          </Link>
          <Link
            className="text-sm font-medium hover:text-white transition duration-300"
            href="#pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:text-white transition duration-300"
            href="#faq"
          >
            FAQ
          </Link>
        </motion.nav>

        {/* Sign In Button */}
        <motion.div
          className="flex items-center space-x-4"
          variants={signInButtonVariants}
        >
          <Link
            className="inline-flex items-center space-x-1 text-sm font-medium text-white hover:text-gray-200 transition duration-300 bg-primary py-1 px-2 rounded-2xl"
            href="/register"
          >
            <span>Sign In</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
}
