"use client";
import { useState } from "react";
import PricingCard from "@/components/Pricing/PricingCard";
import PricingToggle from "@/components/Pricing/PricingToggle";
import { useRouter } from "next/navigation";
import ManyOffersVariant1 from "@/components/Pricing/PricingTables2";

const PricingPage = () => {
  const [seats, setSeats] = useState(5);
  const [isAnnual, setIsAnnual] = useState(false);
  const router = useRouter();

  const handleToggle = () => {
    setIsAnnual(!isAnnual);
  };

  const pricingPlans = [
    {
      title: "Lite",
      price: "$9.99",
      discountPrice: "$4.99/month",
      features: [
        "300 minutes per month",
        "Transcribe in 100+ languages",
        "Transcribe on mobile & web",
        "Audio & Video recording",
        "Speaker identification",
        "Translate transcriptions",
        "AI chat with transcriptions",
      ],
      buttonText: "Get Started",
      onButtonClick: () =>
        router.replace(
          "https://checkout.stripe.com/c/pay/cs_live_a16iyD3jkPp3RUqWXumPHvvStBLjPEkrnrpMe4092ObG4MFI6huautaHES#fid2cGd2ZndsdXFsamtQa2x0cGBrYHZ2QGtkZ2lgYSc%2FY2RpdmApJ2R1bE5gfCc%2FJ3VuWmlsc2BaMDRMU1xObEdGTkt3cE1CQkFIc2ZyZnRyT1JtcGBkaDxxbzY3YT1mZGFSSkNibUFBMmFDfzFocjx%2FZlA3QWhSMz1sb3ZiSWZsN3NJR25iXE92QzYzXHU3Ymc1NWpzbUN%2FMkxyJyknY3dqaFZgd3Ngdyc%2FcXdwYCknaWR8anBxUXx1YCc%2FJ3Zsa2JpYFpscWBoJyknYGtkZ2lgVWlkZmBtamlhYHd2Jz9xd3BgeCUl"
        ),
    },
    {
      title: "Premium",
      price: "$24.99",
      discountPrice: "$12.49/month",
      features: [
        "Everything in Lite Plan",
        "2400 minutes per month",
        "Record & Transcribe Zoom/MS Teams/Google Meet",
        "Advanced AI chat settings",
        "AI summaries of transcriptions",
        "AI content writing",
        "Zapier integration",
      ],
      isBestOffer: true,
      buttonText: "Get Premium Plan",
      onButtonClick: () => alert("Premium Plan Selected"),
    },
    {
      title: "Business",
      price: "$30",
      discountPrice: `$15/month/seat`,
      features: [
        "Everything in Premium, plus",
        "3000 minutes/seat/month",
        "Centralized billing",
        "User roles and permission settings",
        "Record online meetings with video",
        "Google Calendar & Outlook Calendar integration",
        "Premium customer support",
      ],
      seats: seats,
      buttonText: "Get Business Plan",
      onButtonClick: () => alert("Business Plan Selected"),
    },
    {
      title: "Enterprise",
      price: "Custom",
      discountPrice: "Custom",
      features: [
        "Custom seats and transcription quota",
        "API access",
        "Custom workflows",
        "Custom feature development",
        "Integration to internal & external systems",
        "Premium customer support",
        "Advanced security and compliance controls",
      ],
      buttonText: "Contact Us",
      onButtonClick: () => alert("Contact Us"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 w-full">
      {/* <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Access Exclusive Features with Premium Plans
        </h1>
        <PricingToggle isAnnual={isAnnual} onToggle={handleToggle} />

        <div className="flex flex-wrap justify-center gap-2">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index} // Always include a unique key when using .map()
              title={plan.title}
              price={plan.price}
              discountPrice={plan.discountPrice}
              features={plan.features}
              seats={plan.seats}
              buttonText={plan.buttonText}
              onButtonClick={plan.onButtonClick}
              isBestOffer={plan.isBestOffer}
              isAnnual={isAnnual}
            />
          ))}
        </div>
      </div> */}
      
        <ManyOffersVariant1 />
      
    </div>
  );
};

export default PricingPage;
