"use client";
import { Button } from "@/components/ui/button";
// pages/terms.tsx
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ContentSidebar from "@/components/ContentSidebar";
import TermSection from "@/components/TermSection";
import Header from "@/components/sections/Header";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
const TermsOfService: NextPage = () => {
  const sections = [
    "Introduction",
    "Communications",
    "Purchases",
    "Contests, Sweepstakes and Promotions",
    "Refunds",
    "Content",
    "Prohibited Uses",
    "Changes To Service",
    "Amendments To Terms",
    "Waiver And Severability",
    "Acknowledgement",
    "Contact Us",
  ];

  const [activeSection, setActiveSection] = useState(sections[0]);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id.replace(/-/g, " "));
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleSectionClick = (section: string) => {
    const sectionId = section.toLowerCase().replace(/\s+/g, "-");
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* <Head>
        <title>Terms of Service | kemzapps Inc.</title>
        <meta name="description" content="Terms of Service for kemzapps Inc." />
      </Head> */}
      <motion.header
        className="w-full border-b-[1px] border-primary/50 shadow-sm  z-50 backdrop-blur-md bg-primary fixed top-0 left-0 right-0"
        initial="hidden"
        animate="visible"
        // variants={navItemVariants}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
          {/* Animated Logo */}
          <motion.div
            className="flex items-center space-x-4"
            // variants={logoVariants}
          >
            <Link className="flex items-center space-x-2" href="#">
              <div className="h-8 w-8 rounded bg-white" />
              <span className="text-xl font-bold text-white">TranscribeAI</span>
            </Link>
          </motion.div>

          {/* Animated Navigation */}
          <motion.nav
            className="hidden md:flex space-x-6 text-secondary"
            // variants={navItemVariants}
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
            // variants={signInButtonVariants}
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
      <div className="flex flex-col min-h-screen bg-white ">
        <header className="bg-white border-b border-gray-50 shadow-xs sticky top-0 z-10">
          <div className="container mx-auto px-4 py-6">
            <Link
              href="/"
              className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
            >
              kemzapps Inc.
            </Link>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <div className="sticky top-8">
                <ContentSidebar
                  sections={sections}
                  activeSection={activeSection}
                  onSectionClick={handleSectionClick}
                />
              </div>
            </div>

            <div className="max-w-4xl mx-auto lg:w-3/4">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">
                Terms of Service
              </h1>
              <div className="p-8 rounded-lg  space-y-8">
                <p className="text-xl font-semibold">
                  Last updated August 17, 2024
                </p>

                <TermSection title="1. Introduction" id={"introduction"}>
                  <p>
                    Welcome to kemzapps Inc. ("Company", "we", "our", "us")! As
                    you have just clicked our Terms of Service, please pause,
                    grab a cup of coffee and carefully read the following pages.
                    It will take you approximately 20 minutes.
                  </p>
                  <p className="mt-4">
                    These Terms of Service ("Terms", "Terms of Service") govern
                    your use of our web pages located at
                    http://www.transcribe_ai.com and our mobile application
                    kemzapps (together or individually "Service") operated by
                    kemzapps Inc.
                  </p>
                  <p className="mt-4">
                    Our Privacy Policy also governs your use of our Service and
                    explains how we collect, safeguard and disclose information
                    that results from your use of our web pages. Please read it
                    here [LINK].
                  </p>
                  <p className="mt-4">
                    Your agreement with us includes these Terms and our Privacy
                    Policy ("Agreements"). You acknowledge that you have read
                    and understood Agreements, and agree to be bound by them.
                  </p>
                  <p className="mt-4">
                    If you do not agree with (or cannot comply with) Agreements,
                    then you may not use the Service, but please let us know by
                    emailing at support@transcribe_ai.com so we can try to find
                    a solution. These Terms apply to all visitors, users and
                    others who wish to access or use Service.
                  </p>
                </TermSection>

                <TermSection title="2. Communications" id={"communications"}>
                  <p>
                    By creating an Account on our Service, you agree to
                    subscribe to newsletters, marketing or promotional materials
                    and other information we may send. However, you may opt out
                    of receiving any, or all, of these communications from us by
                    following the unsubscribe link or by emailing at
                    support@transcribe_ai.com.
                  </p>
                </TermSection>

                <TermSection title="3. Purchases" id={"purchases"}>
                  <p>
                    If you wish to purchase any product or service made
                    available through Service ("Purchase"), you may be asked to
                    supply certain information relevant to your Purchase
                    including, without limitation, your credit card number, the
                    expiration date of your credit card, your billing address,
                    and your shipping information.
                  </p>
                  <p className="mt-4">
                    You represent and warrant that: (i) you have the legal right
                    to use any credit card(s) or other payment method(s) in
                    connection with any Purchase; and that (ii) the information
                    you supply to us is true, correct and complete.
                  </p>
                </TermSection>

                <TermSection
                  title="4. Contests, Sweepstakes and Promotions"
                  id={"contests,-sweepstakes-and-promotions"}
                >
                  <p>
                    Any contests, sweepstakes or other promotions (collectively,
                    "Promotions") made available through Service may be governed
                    by rules that are separate from these Terms of Service. If
                    you participate in any Promotions, please review the
                    applicable rules as well as our Privacy Policy. If the rules
                    for a Promotion conflict with these Terms of Service,
                    Promotion rules will apply.
                  </p>
                </TermSection>

                <TermSection title="5. Refunds" id={"refunds"}>
                  <p>
                    We issue refunds for Contracts within 30 days of the
                    original purchase of the Contract.
                  </p>
                </TermSection>

                <TermSection title="6. Content" id={"content"}>
                  <p>
                    Our Service allows you to post, link, store, share and
                    otherwise make available certain information, text,
                    graphics, videos, or other material ("Content"). You are
                    responsible for Content that you post on or through Service,
                    including its legality, reliability, and appropriateness.
                  </p>
                </TermSection>

                <TermSection title="7. Prohibited Uses" id={"prohibited-uses"}>
                  <p>
                    You may use Service only for lawful purposes and in
                    accordance with Terms. You agree not to use Service:
                  </p>
                  <ul className="list-disc list-inside mt-2 ml-4">
                    <li>
                      In any way that violates any applicable national or
                      international law or regulation.
                    </li>
                    <li>
                      For the purpose of exploiting, harming, or attempting to
                      exploit or harm minors in any way by exposing them to
                      inappropriate content or otherwise.
                    </li>
                    <li>
                      To transmit, or procure the sending of, any advertising or
                      promotional material, including any "junk mail", "chain
                      letter," "spam," or any other similar solicitation.
                    </li>
                    <li>
                      To impersonate or attempt to impersonate Company, a
                      Company employee, another user, or any other person or
                      entity.
                    </li>
                    <li>
                      In any way that infringes upon the rights of others, or in
                      any way is illegal, threatening, fraudulent, or harmful,
                      or in connection with any unlawful, illegal, fraudulent,
                      or harmful purpose or activity.
                    </li>
                    <li>
                      To engage in any other conduct that restricts or inhibits
                      anyone's use or enjoyment of Service, or which, as
                      determined by us, may harm or offend Company or users of
                      Service or expose them to liability.
                    </li>
                  </ul>
                </TermSection>

                <TermSection
                  title="8. Changes To Service"
                  id={"changes-to-service"}
                >
                  <p>
                    We reserve the right to withdraw or amend our Service, and
                    any service or material we provide via Service, in our sole
                    discretion without notice. We will not be liable if for any
                    reason all or any part of Service is unavailable at any time
                    or for any period. From time to time, we may restrict access
                    to some parts of Service, or the entire Service, to users,
                    including registered users.
                  </p>
                </TermSection>

                <TermSection
                  title="9. Amendments To Terms"
                  id={"amendments-to-terms"}
                >
                  <p>
                    We may amend Terms at any time by posting the amended terms
                    on this site. It is your responsibility to review these
                    Terms periodically.
                  </p>
                  <p className="mt-4">
                    Your continued use of the Platform following the posting of
                    revised Terms means that you accept and agree to the
                    changes. You are expected to check this page frequently so
                    you are aware of any changes, as they are binding on you.
                  </p>
                  <p className="mt-4">
                    By continuing to access or use our Service after any
                    revisions become effective, you agree to be bound by the
                    revised terms. If you do not agree to the new terms, you are
                    no longer authorized to use Service.
                  </p>
                </TermSection>

                <TermSection
                  title="10. Waiver And Severability"
                  id={"waiver-and-severability"}
                >
                  <p>
                    No waiver by Company of any term or condition set forth in
                    Terms shall be deemed a further or continuing waiver of such
                    term or condition or a waiver of any other term or
                    condition, and any failure of Company to assert a right or
                    provision under Terms shall not constitute a waiver of such
                    right or provision.
                  </p>
                  <p className="mt-4">
                    If any provision of Terms is held by a court or other
                    tribunal of competent jurisdiction to be invalid, illegal or
                    unenforceable for any reason, such provision shall be
                    eliminated or limited to the minimum extent such that the
                    remaining provisions of Terms will continue in full force
                    and effect.
                  </p>
                </TermSection>

                <TermSection title="11. Acknowledgement" id={"acknowledgement"}>
                  <p>
                    BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU
                    ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND
                    AGREE TO BE BOUND BY THEM.
                  </p>
                </TermSection>

                <TermSection title="12. Contact Us" id={"contact-us"}>
                  <p>
                    Please send your feedback, comments, requests for technical
                    support:
                  </p>
                  <p className="mt-4">By email: support@transcribe_ai.com.</p>
                  <p className="mt-4">
                    By visiting this page on our website:
                    http://www.transcribe_ai.com/contact.
                  </p>
                </TermSection>
              </div>
            </div>
          </div>
        </main>
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} kemzapps Inc. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default TermsOfService;
