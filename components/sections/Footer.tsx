// import Link from "next/link";

// export default function Footer() {
//   const transcribeLinks = [
//     { name: "Home", href: "#" },
//     { name: "Updates", href: "#" },
//     { name: "Pricing", href: "#" },
//     { name: "Careers", href: "#" },
//     { name: "Suggestions", href: "#" },
//     { name: "Help Center", href: "#" },
//   ];

//   const appLinks = [
//     { name: "Go Pro ✨", href: "#" },
//     { name: "Open Source", href: "#" },
//     { name: "Cookies", href: "#" },
//     { name: "Privacy", href: "#" },
//     { name: "Terms", href: "#" },
//     { name: "Contact", href: "#" },
//   ];

//   const socialLinks = [
//     { name: "Mac", href: "#" },
//     { name: "Web", href: "#" },
//     { name: "iOS", href: "#" },
//     { name: "Android", href: "#" },
//     { name: "Sign in", href: "#" },
//   ];

//   const updatesLinks = [
//     { name: "GitHub", href: "#" },
//     { name: "LinkedIn", href: "#" },
//     { name: "Instagram", href: "#" },
//     { name: "X", href: "#" },
//   ];

//   const renderLinks = (links) =>
//     links.map((link, index) => (
//       <li key={index}>
//         <Link href={link.href}>{link.name}</Link>
//       </li>
//     ));

//   return (
//     <footer className="text-gray-300 py-12 px-4 bg-white">
//       <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
//         <div>
//           <h3 className="text-red-400 font-semibold mb-4">Transcribeai</h3>
//           <ul className="space-y-2">{renderLinks(transcribeLinks)}</ul>
//         </div>
//         <div>
//           <h3 className="text-blue-400 font-semibold mb-4">App</h3>
//           <ul className="space-y-2">{renderLinks(appLinks)}</ul>
//         </div>
//         <div>
//           <h3 className="text-green-400 font-semibold mb-4">Social</h3>
//           <ul className="space-y-2">{renderLinks(socialLinks)}</ul>
//         </div>
//         <div>
//           <h3 className="text-purple-400 font-semibold mb-4">Updates</h3>
//           <ul className="space-y-2">{renderLinks(updatesLinks)}</ul>
//         </div>
//       </div>
//       <div className="text-center mt-8 text-sm text-gray-500">
//         © Transcribeai 2024
//       </div>
//     </footer>
//   );
// }
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Twitter } from "lucide-react";

const footerSections = [
  {
    title: "Transcribeai",
    links: [
      { name: "Home", href: "/" },
      { name: "Updates", href: "/updates" },
      { name: "Pricing", href: "/pricing" },
      { name: "Careers", href: "/careers" },
      { name: "Suggestions", href: "/suggestions" },
      { name: "Help Center", href: "/help" },
    ],
  },
  {
    title: "App",
    links: [
      { name: "Go Pro ✨", href: "/pro" },
      { name: "Open Source", href: "/open-source" },
      { name: "Cookies", href: "/cookies" },
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Platforms",
    links: [
      { name: "Mac", href: "/mac" },
      { name: "Web", href: "/web" },
      { name: "iOS", href: "/ios" },
      { name: "Android", href: "/android" },
      { name: "Sign in", href: "/signin" },
    ],
  },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Instagram", href: "https://instagram.com", icon: Instagram },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Connect
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
                  aria-label={link.name}
                >
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8 text-center">
          <motion.p
            className="text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            © {new Date().getFullYear()} Transcribeai. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
