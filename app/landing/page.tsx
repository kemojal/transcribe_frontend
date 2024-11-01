"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mic, FileAudio, Wand2, Lock, Zap, Check } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log("Submitted email:", email);
    setEmail("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Mic className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold text-primary">
            TranscribeAI
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#how-it-works"
          >
            How It Works
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#faq"
          >
            FAQ
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Transform Speech to Text with AI Precision
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Effortlessly transcribe audio and video with our cutting-edge
                  AI technology. Save time, boost productivity, and unlock the
                  power of your spoken content.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="max-w-lg flex-1"
                  />
                  <Button type="submit">Get Started</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  Start your free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Powerful Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <FileAudio className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Multi-format Support</CardTitle>
                </CardHeader>
                <CardContent>
                  Transcribe audio and video files in various formats, including
                  MP3, WAV, MP4, and more.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Wand2 className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>AI-Powered Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  Achieve up to 99% accuracy with our advanced machine learning
                  algorithms and natural language processing.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Lock className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Secure & Confidential</CardTitle>
                </CardHeader>
                <CardContent>
                  Your data is encrypted and protected. We prioritize your
                  privacy and adhere to strict security standards.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How It Works
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Upload</h3>
                <p className="text-muted-foreground">
                  Upload your audio or video file to our secure platform.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Transcribe</h3>
                <p className="text-muted-foreground">
                  Our AI processes your file and generates an accurate
                  transcript.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Edit & Export</h3>
                <p className="text-muted-foreground">
                  Review, edit, and export your transcript in various formats.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Simple, Transparent Pricing
            </h2>
            <Tabs defaultValue="monthly" className="w-full max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual">Annual (Save 20%)</TabsTrigger>
              </TabsList>
              <TabsContent value="monthly">
                <div className="grid gap-6 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic</CardTitle>
                      <CardDescription>
                        For individuals and small projects
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">$9.99/mo</p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> 5 hours of
                          transcription
                        </li>
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> Standard
                          support
                        </li>
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> 48-hour
                          turnaround
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Choose Plan</Button>
                    </CardFooter>
                  </Card>
                  <Card className="border-primary">
                    <CardHeader>
                      <CardTitle>Pro</CardTitle>
                      <CardDescription>For growing businesses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">$24.99/mo</p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> 20 hours of
                          transcription
                        </li>
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> Priority
                          support
                        </li>
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> 24-hour
                          turnaround
                        </li>
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> Custom
                          vocabulary
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Choose Plan</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Enterprise</CardTitle>
                      <CardDescription>For large organizations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">Custom</p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> Unlimited
                          transcription
                        </li>
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> 24/7 premium
                          support
                        </li>
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> 12-hour
                          turnaround
                        </li>
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> API access
                        </li>
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> Custom
                          integration
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Contact Sales</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="annual">
                <div className="grid gap-6 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic</CardTitle>
                      <CardDescription>
                        For individuals and small projects
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">$95.90/yr</p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> 5 hours of
                          transcription
                        </li>
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> Standard
                          support
                        </li>
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> 48-hour
                          turnaround
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Choose Plan</Button>
                    </CardFooter>
                  </Card>
                  <Card className="border-primary">
                    <CardHeader>
                      <CardTitle>Pro</CardTitle>
                      <CardDescription>For growing businesses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">$239.90/yr</p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> 20 hours of
                          transcription
                        </li>
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> Priority
                          support
                        </li>
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> 24-hour
                          turnaround
                        </li>
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> Custom
                          vocabulary
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Choose Plan</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Enterprise</CardTitle>
                      <CardDescription>For large organizations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">Custom</p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> Unlimited
                          transcription
                        </li>
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> 24/7 premium
                          support
                        </li>
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> 12-hour
                          turnaround
                        </li>
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> API access
                        </li>
                        <li className="flex items-center">
                          <Check className="text-primary mr-2" /> Custom
                          integration
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Contact Sales</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              What Our Customers Say
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Incredible Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  "TranscribeAI has revolutionized our podcast production. The
                  accuracy is unmatched, and it saves us hours of work every
                  week."
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    - Sarah J., Podcast Producer
                  </p>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Time-Saving Wonder</CardTitle>
                </CardHeader>
                <CardContent>
                  "As a journalist, quick and accurate transcriptions are
                  crucial. TranscribeAI delivers on both fronts, allowing me to
                  focus on crafting compelling stories."
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    - Mark T., Investigative Journalist
                  </p>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Game-Changer for Accessibility</CardTitle>
                </CardHeader>
                <CardContent>
                  "TranscribeAI has made our educational content accessible to a
                  wider audience. The accuracy and speed of transcriptions have
                  significantly improved our online courses."
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    - Dr. Emily R., Online Education Platform
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full max-w-3xl mx-auto"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How accurate is the transcription?
                </AccordionTrigger>
                <AccordionContent>
                  Our AI-powered transcription boasts up to 99% accuracy for
                  clear audio. Factors like audio quality, accents, and
                  background noise can affect accuracy.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  What file formats do you support?
                </AccordionTrigger>
                <AccordionContent>
                  We support a wide range of audio and video formats, including
                  MP3, WAV, MP4, AVI, and more. If you have a specific format,
                  please contact our support team.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How secure is my data?</AccordionTrigger>
                <AccordionContent>
                  We take data security seriously. All files are encrypted
                  during transfer and storage. We adhere to strict privacy
                  policies and never share your data with third parties.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Can I edit the transcriptions?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we provide an easy-to-use editor where you can review and
                  make changes to your transcriptions before finalizing them.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Do you offer an API for integration?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we offer API access for seamless integration with your
                  existing workflows. This feature is available on our
                  Enterprise plan.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2023 TranscribeAI. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Cookies
          </Link>
        </nav>
      </footer>
    </div>
  );
}
