// components/PricingSection.tsx
// import { Tabs } from "@radix-ui/react-tabs";
// import { TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Check } from "lucide-react";
// import { Button } from "../ui/button";
// import ManyOffersVariant1 from "../Pricing/PricingTables2";
// import PricingCard from "../Pricing/PricingCard";

// // Pricing plans data
// const pricingPlans = [
//   {
//     title: "Basic",
//     description: "For individuals and small projects",
//     priceMonthly: "$9.99/mo",
//     priceAnnual: "$95.90/yr",
//     features: [
//       "5 hours of transcription",
//       "Standard support",
//       "48-hour turnaround",
//     ],
//   },
//   {
//     title: "Pro",
//     description: "For growing businesses",
//     priceMonthly: "$24.99/mo",
//     priceAnnual: "$239.90/yr",
//     features: [
//       "20 hours of transcription",
//       "Priority support",
//       "24-hour turnaround",
//       "Custom vocabulary",
//     ],
//   },
//   {
//     title: "Enterprise",
//     description: "For large organizations",
//     priceMonthly: "Custom",
//     priceAnnual: "Custom",
//     features: [
//       "Unlimited transcription",
//       "24/7 premium support",
//       "12-hour turnaround",
//       "API access",
//       "Custom integration",
//     ],
//   },
// ];

// // PricingSection Component
// const PricingSection = () => {
//   return (
//     <section
//       id="pricing"
//       className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white"
//     >
//       <div className="container px-4 md:px-6">
//         <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
//           Simple, Transparent Pricing
//         </h2>
//         <ManyOffersVariant1 />
//       </div>
//     </section>
//   );
// };

// export default PricingSection;

import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import ManyOffersVariant1 from "../Pricing/PricingTables2";

// PricingSection Component
const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12 sm:text-5xl text-gray-800">
          Simple, Transparent Pricing
        </h2>
        <ManyOffersVariant1 />
      </div>
    </section>
  );
};

export default PricingSection;
