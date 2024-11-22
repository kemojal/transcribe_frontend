"use client";
import { Button } from "@/components/ui/button";
// pages/privacy.tsx
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import TermSection from "@/components/TermSection";
import ContentSidebar from "@/components/ContentSidebar";

const PrivacyPolicy: NextPage = () => {
  const sections = [
    "Introduction",
    "Summary of Key Points",
    "What Information Do We Collect",
    "How Do We Process Your Information",
    "Process Your Information?",
    "Share Your Personal Information?",
    "Cookies and Tracking Technologies",
    "Artificial intelligence-based products",
    "Handle Your Social Logins",
    "How Long Do We Keep Your Information",
    "How Do We Keep Your Information Safe",
    "Do We Collect Information From Minors",
    "What Are Your Privacy Rights",
    "Controls For Do-Not-Track Features",
    "Do United States Residents Have Specific Privacy Rights",

    "Do Other Regions Have Specific Privacy Rights",
    "Do We Make Updates To This Notice",
    "How Can You Contact Us About This Notice",
    "How Can You Review, Update, Or Delete The Data We Collect From You",
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
      <Head>
        <title>Privacy Policy | kemzapps Inc.</title>
        <meta name="description" content="Privacy Policy for kemzapps Inc." />
      </Head>
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
                Privacy Policy
              </h1>
              <div className=" p-8 rounded  space-y-8">
                <p className="text-xl font-semibold">
                  Last updated August 17, 2024
                </p>

                <TermSection title="Introduction" id="introduction">
                  <p>
                    This privacy notice for kemzapps Inc. ("we," "us," or
                    "our"), describes how and why we might collect, store, use,
                    and/or share ("process") your information when you use our
                    services ("Services"), such as when you:
                  </p>
                  <ul className="list-disc list-inside mt-4 ml-4">
                    <li>
                      Visit our website at http://www.transcribe_ai.com, or any
                      website of ours that links to this privacy notice
                    </li>
                    <li>
                      Engage with us in other related ways, including any sales,
                      marketing, or events
                    </li>
                  </ul>
                  <p className="mt-4">
                    Questions or concerns? Reading this privacy notice will help
                    you understand your privacy rights and choices. If you do
                    not agree with our policies and practices, please do not use
                    our Services. If you still have any questions or concerns,
                    please contact us at privacy@transcribe_ai.com.
                  </p>
                </TermSection>

                <TermSection
                  title="Summary of Key Points"
                  id="summary-of-key-points"
                >
                  <p>
                    This summary provides key points from our privacy notice,
                    but you can find out more details about any of these topics
                    by clicking the link following each key point or by using
                    our table of contents below to find the section you are
                    looking for.
                  </p>
                  <ul className="list-disc list-inside mt-4 ml-4">
                    <li>What personal information do we process?</li>
                    <li>Do we process any sensitive personal information?</li>
                    <li>Do we receive any information from third parties?</li>
                    <li>How do we process your information?</li>
                    <li>
                      In what situations and with which parties do we share
                      personal information?
                    </li>
                    <li>How do we keep your information safe?</li>
                    <li>What are your rights?</li>
                    <li>How do you exercise your rights?</li>
                  </ul>
                </TermSection>

                <TermSection
                  title="1. What Information Do We Collect?"
                  id="what-information-do-we-collect"
                >
                  <h3 className="font-semibold mt-4">
                    Personal information you disclose to us
                  </h3>
                  <p>
                    We collect personal information that you voluntarily provide
                    to us when you register on the Services, express an interest
                    in obtaining information about us or our products and
                    Services, when you participate in activities on the
                    Services, or otherwise when you contact us.
                  </p>
                  <p className="mt-4">
                    <strong>Personal Information Provided by You.</strong> The
                    personal information that we collect depends on the context
                    of your interactions with us and the Services, the choices
                    you make, and the products and features you use. The
                    personal information we collect may include the following:
                  </p>
                  <ul className="list-disc list-inside mt-2 ml-4">
                    <li>names</li>
                    <li>email addresses</li>
                    <li>mailing addresses</li>
                    <li>usernames</li>
                    <li>passwords</li>
                    <li>phone numbers</li>
                    <li>billing addresses</li>
                    <li>debit/credit card numbers</li>
                    <li>contact or authentication data</li>
                  </ul>
                  <p className="mt-4">
                    <strong>Sensitive Information.</strong> We do not process
                    sensitive information.
                  </p>
                  <p className="mt-4">
                    <strong>Payment Data.</strong> We may collect data necessary
                    to process your payment if you make purchases, such as your
                    payment instrument number, and the security code associated
                    with your payment instrument. All payment data is stored by
                    paypal and stripe. You may find their privacy notice link(s)
                    here: https://www.paypal.com/us/legalhub/privacy-full and
                    https://stripe.com/privacy.
                  </p>
                  <p className="mt-4">
                    <strong>Social Media Login Data.</strong> We may provide you
                    with the option to register with us using your existing
                    social media account details, like your Facebook, X, or
                    other social media account.
                  </p>
                </TermSection>

                <TermSection
                  title="2. How Do We Process Your Information?"
                  id="how-do-we-process-your-information"
                >
                  <p>
                    We process your personal information for a variety of
                    reasons, depending on how you interact with our Services,
                    including:
                  </p>
                  <ul className="list-disc list-inside mt-4 ml-4">
                    <li>
                      To facilitate account creation and authentication and
                      otherwise manage user accounts.
                    </li>
                    <li>To save or protect an individual's vital interest.</li>
                  </ul>
                </TermSection>

                <TermSection
                  title="3. What Legal Bases Do We Rely On To Process Your Information?"
                  id="process-your-information"
                >
                  <p>
                    We only process your personal information when we believe it
                    is necessary and we have a valid legal reason (i.e., legal
                    basis) to do so under applicable law, like with your
                    consent, to comply with laws, to provide you with services
                    to enter into or fulfill our contractual obligations, to
                    protect your rights, or to fulfill our legitimate business
                    interests.
                  </p>
                  <p className="mt-4">
                    If you are located in the EU or UK, this section applies to
                    you. The General Data Protection Regulation (GDPR) and UK
                    GDPR require us to explain the valid legal bases we rely on
                    in order to process your personal information.
                  </p>
                </TermSection>

                <TermSection
                  title="4. When And With Whom Do We Share Your Personal Information?"
                  id="share-your-personal-information"
                >
                  <p>
                    We may share information in specific situations described in
                    this section and/or with the following third parties.
                  </p>
                  <p className="mt-4">
                    We may need to share your personal information in the
                    following situations:
                  </p>
                  <ul className="list-disc list-inside mt-2 ml-4">
                    <li>
                      <strong>Business Transfers.</strong> We may share or
                      transfer your information in connection with, or during
                      negotiations of, any merger, sale of company assets,
                      financing, or acquisition of all or a portion of our
                      business to another company.
                    </li>
                  </ul>
                </TermSection>

                <TermSection
                  title="5. Do We Use Cookies And Other Tracking Technologies?"
                  id="cookies-and-tracking-technologies"
                >
                  <p>
                    We may use cookies and similar tracking technologies (like
                    web beacons and pixels) to collect and store your
                    information. Specific information about how we use such
                    technologies and how you can refuse certain cookies is set
                    out in our Cookie Notice:
                    http://www.transcribe_ai.com/cookies.
                  </p>
                </TermSection>

                <TermSection
                  title="6. Do We Offer Artificial Intelligence-Based Products?"
                  id="artificial-intelligence-based-products"
                >
                  <p>
                    We offer products, features, or tools powered by artificial
                    intelligence, machine learning, or similar technologies
                    (collectively, "AI Products"). These tools are designed to
                    enhance your experience and provide you with innovative
                    solutions.
                  </p>
                </TermSection>

                <TermSection
                  title="7. How Do We Handle Your Social Logins?"
                  id="handle-your-social-logins"
                >
                  <p>
                    Our Services offer you the ability to register and log in
                    using your third-party social media account details (like
                    your Facebook or X logins). Where you choose to do this, we
                    will receive certain profile information about you from your
                    social media provider.
                  </p>
                </TermSection>

                <TermSection
                  title="8. How Long Do We Keep Your Information?"
                  id="how-long-do-we-keep-your-information"
                >
                  <p>
                    We will only keep your personal information for as long as
                    it is necessary for the purposes set out in this privacy
                    notice, unless a longer retention period is required or
                    permitted by law (such as tax, accounting, or other legal
                    requirements).
                  </p>
                </TermSection>

                <TermSection
                  title="9. How Do We Keep Your Information Safe?"
                  id="how-do-we-keep-your-information-safe"
                >
                  <p>
                    We have implemented appropriate and reasonable technical and
                    organizational security measures designed to protect the
                    security of any personal information we process. However,
                    despite our safeguards and efforts to secure your
                    information, no electronic transmission over the Internet or
                    information storage technology can be guaranteed to be 100%
                    secure.
                  </p>
                </TermSection>

                <TermSection
                  title="10. Do We Collect Information From Minors?"
                  id="do-we-collect-information-from-minors"
                >
                  <p>
                    We do not knowingly collect data from or market to children
                    under 18 years of age. By using the Services, you represent
                    that you are at least 18 or that you are the parent or
                    guardian of such a minor and consent to such minor
                    dependent's use of the Services.
                  </p>
                </TermSection>

                <TermSection
                  title="11. What Are Your Privacy Rights?"
                  id="what-are-your-privacy-rights"
                >
                  <p>
                    Depending on your location, you may have certain rights
                    regarding your personal information. These may include the
                    right to request access, correction, deletion, restriction
                    of processing, data portability, and the right to object to
                    processing.
                  </p>
                </TermSection>

                <TermSection
                  title="12. Controls For Do-Not-Track Features"
                  id="controls-for-do-not-track-features"
                >
                  <p>
                    Most web browsers and some mobile operating systems and
                    mobile applications include a Do-Not-Track ("DNT") feature
                    or setting you can activate to signal your privacy
                    preference not to have data about your online browsing
                    activities monitored and collected. At this stage, no
                    uniform technology standard for recognizing and implementing
                    DNT signals has been finalized.
                  </p>
                </TermSection>

                <TermSection
                  title="13. Do United States Residents Have Specific Privacy Rights?"
                  id="do-united-states-residents-have-specific-privacy-rights"
                >
                  <p>
                    If you are a resident of California, Colorado, Connecticut,
                    Delaware, Florida, Indiana, Iowa, Kentucky, Montana, New
                    Hampshire, New Jersey, Oregon, Tennessee, Texas, Utah, or
                    Virginia, you may have specific privacy rights regarding
                    your personal information.
                  </p>
                </TermSection>

                <TermSection
                  title="14. Do Other Regions Have Specific Privacy Rights?"
                  id="do-other-regions-have-specific-privacy-rights"
                >
                  <p>
                    Depending on your location, you may have additional privacy
                    rights. This section covers specific rights for residents of
                    Australia, New Zealand, and the Republic of South Africa.
                  </p>
                </TermSection>

                <TermSection
                  title="15. Do We Make Updates To This Notice?"
                  id="do-we-make-updates-to-this-notice"
                >
                  <p>
                    Yes, we will update this notice as necessary to stay
                    compliant with relevant laws. We may update this privacy
                    notice from time to time. The updated version will be
                    indicated by an updated "Revised" date and the updated
                    version will be effective as soon as it is accessible.
                  </p>
                </TermSection>

                <TermSection
                  title="16. How Can You Contact Us About This Notice?"
                  id="how-can-you-contact-us-about-this-notice"
                >
                  <p>
                    If you have questions or comments about this notice, you may
                    email us at privacy@transcribe_ai.com or contact us by post
                    at:
                  </p>
                  <address className="mt-4 not-italic">
                    kemzapps Inc.
                    <br />
                    __________
                    <br />
                    __________
                    <br />
                    Taiwan
                  </address>
                </TermSection>

                <TermSection
                  title="17. How Can You Review, Update, Or Delete The Data We Collect From You?"
                  id="how-can-you-review-update-or-delete-the-data-we-collect-from-you"
                >
                  <p>
                    Based on the applicable laws of your country or state of
                    residence in the US, you may have the right to request
                    access to the personal information we collect from you,
                    change that information, or delete it. To request to review,
                    update, or delete your personal information, please fill out
                    and submit a data subject access request.
                  </p>
                </TermSection>
              </div>
            </div>
          </div>
        </main>
        <footer className=" border-t border-gray-200 mt-12">
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

export default PrivacyPolicy;
