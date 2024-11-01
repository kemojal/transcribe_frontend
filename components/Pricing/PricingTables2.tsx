// "use client";
// import { cn } from "@/lib/utils";
// import { motion } from "framer-motion";
// import { CheckIcon, EuroIcon } from "lucide-react";
// import React, { useState } from "react";

// type BilledType = "monthly" | "annually";

// const pricingData: OfferCardProps[] = [
//   {
//     title: "Starter",
//     description: "For small teams",
//     price: {
//       monthly: 0,
//       annually: 0,
//     },
//     features: ["10 users included", "2 GB of storage", "Email support"],
//     infos: ["30 users included", "15 GB of storage", "Phone and email support"],
//   },
//   {
//     title: "Pro",
//     description: "For medium-sized businesses",
//     price: {
//       monthly: 9,
//       annually: 5,
//     },
//     features: [
//       "20 users included",
//       "10 GB of storage",
//       "Priority email support",
//     ],
//     infos: ["30 users included", "15 GB of storage", "Phone and email support"],
//     isBestValue: true,
//   },
//   {
//     title: "Enterprise",
//     description: "For large businesses",
//     price: {
//       monthly: 14,
//       annually: 12,
//     },
//     features: [
//       "30 users included",
//       "15 GB of storage",
//       "Phone and email support",
//     ],
//     infos: ["30 users included", "15 GB of storage", "Phone and email support"],
//   },
//   {
//     title: "Enterprise",
//     description: "For large businesses",
//     price: {
//       monthly: 59,
//       annually: 49,
//     },
//     features: [
//       "30 users included",
//       "15 GB of storage",
//       "Phone and email support",
//     ],
//     infos: ["30 users included", "15 GB of storage", "Phone and email support"],
//   },
// ];

// export default function ManyOffersVariant1() {
//   const [selectedBilledType, setSelectedBilledType] =
//     useState<BilledType>("monthly");
//   function handleSwitchTab(tab: BilledType) {
//     setSelectedBilledType(tab);
//   }
//   return (
//     <div className="flex flex-col gap-4 items-center ">
//       <SelectOfferTab
//         handleSwitchTab={handleSwitchTab}
//         selectedBilledType={selectedBilledType}
//       />
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-7xl">
//         {pricingData.map((offer) => (
//           <OfferCard
//             key={offer.title}
//             {...offer}
//             selectedBilledType={selectedBilledType}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// type OfferCardProps = {
//   title: string;
//   description: string;
//   price: {
//     monthly: number;
//     annually: number;
//   };
//   features: string[];
//   infos?: string[];
//   isBestValue?: boolean;
// };

// const OfferCard = ({
//   title,
//   description,
//   price,
//   features,
//   infos,
//   isBestValue,
//   selectedBilledType,
// }: OfferCardProps & {
//   selectedBilledType: BilledType;
// }) => {
//   function getAnnualPrice() {
//     return price.annually * 12;
//   }
//   return (
//     <div
//       className={cn(
//         "rounded-2xl border  hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden dark:bg-neutral-800/50 bg-neutral-800/95 hover:bg-neutral-800/100 h-full transform-gpu",
//         "dark:text-neutral-400 text-white",
//         isBestValue ? "border-[#ed8445]" : "border-neutral-500/50 "
//       )}
//     >
//       <div
//         className={cn("p-6")}
//         style={
//           isBestValue
//             ? {
//                 background:
//                   "radial-gradient(58.99% 10.42% at 50% 100.46%, rgba(251, 188, 5, .07) 0, transparent 100%), radial-gradient(135.76% 66.69% at 92.19% -3.15%, rgba(251, 5, 153, .1) 0, transparent 100%), radial-gradient(127.39% 38.15% at 22.81% -2.29%, rgba(239, 145, 84, .4) 0, transparent 100%)",
//               }
//             : {}
//         }
//       >
//         <div className="text-lg font-semiboldtext-neutral-200">{title}</div>
//         <div className="mt-2 text-sm text-neutral-400">{description}</div>
//         <div className="mt-4">
//           <div className="text-4xl font-semibold text-neutral-200">
//             {price[selectedBilledType]}
//             <EuroIcon className="inline size-5" />
//           </div>
//           <div className="text-sm text-neutral-400">
//             {selectedBilledType === "monthly"
//               ? "billed monthly"
//               : `${getAnnualPrice()}€ billed annually`}
//           </div>
//         </div>

//         <button
//           type="button"
//           className={cn(
//             "py-2.5 px-12 rounded-full my-12 text-neutral-50  items-center justify-center inline-flex w-full hover:scale-105 transition-all font-semibold tracking-tight border border-neutral-400/20 transform-gpu",
//             isBestValue
//               ? " bg-gradient-to-br from-[#f6d4a1] to-[#ed8445]"
//               : "bg-neutral-700  "
//           )}
//         >
//           Select
//         </button>
//         <p className={cn("text-sm font-semibold tracking-tight mb-4 ")}>
//           This plan include :
//         </p>
//         <ul className="space-y-2">
//           {features.map((feature) => (
//             <li key={feature} className="flex items-center gap-2">
//               <CheckIcon className="size-3.5 rounded-full stroke-neutral-300" />
//               <div className=" text-sm">{feature}</div>
//             </li>
//           ))}
//         </ul>
//         {infos && (
//           <>
//             <div className="my-6 h-px bg-neutral-600" />
//             <ul className="space-y-2">
//               {infos.map((feature) => (
//                 <li key={feature} className="flex items-center gap-2">
//                   <div className="size-1.5 bg-neutral-500 rounded-full" />
//                   <div className=" text-sm">{feature}</div>
//                 </li>
//               ))}
//             </ul>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export function SelectOfferTab({
//   handleSwitchTab,
//   selectedBilledType,
// }: Readonly<{
//   handleSwitchTab: (tab: BilledType) => void;
//   selectedBilledType: BilledType;
// }>) {
//   const OfferList = ["monthly", "annually"] as const;
//   return (
//     <nav className="flex flex-col sm:flex-row">
//       {OfferList.map((button, index) => (
//         <button
//           type="button"
//           key={button}
//           onClick={() => handleSwitchTab(button)}
//           className={cn(
//             " text-lg tracking-tight font-semibold py-2.5 px-6  relative whitespace-nowrap inline-flex w-fit   transition-colors capitalize transform-gpu",
//             selectedBilledType === button
//               ? "dark:text-neutral-50 text-neutral-700"
//               : "text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-300 hover:text-neutral-600 "
//           )}
//         >
//           {button}
//           {selectedBilledType === button && (
//             <motion.div
//               className="absolute top-0 left-0 right-0 bottom-0  -z-10 rounded-full  bg-neutral-200  dark:bg-neutral-800 "
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//               layout
//               layoutId="pricing-focused-element"
//             >
//               <div className=" size-full rounded-full" />
//             </motion.div>
//           )}
//         </button>
//       ))}
//     </nav>
//   );
// }

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, DollarSign, Euro } from "lucide-react";
import React, { useState } from "react";

type BilledType = "monthly" | "annually";

type OfferCardProps = {
  title: string;
  description: string;
  price: {
    monthly: number;
    annually: number;
  };
  features: string[];
  infos?: string[];
  isBestValue?: boolean;
};

const pricingData: OfferCardProps[] = [
  {
    title: "Free",
    description: "For individuals and small tasks",
    price: {
      monthly: 0,
      annually: 0,
    },
    features: [
      "Up to 60 minutes of transcription per month",
      "Basic audio formats",
      "Community support",
    ],
    infos: [
      "Automatic speech recognition",
      "Basic language support",
      "No file storage",
    ],
  },
  {
    title: "Basic",
    description: "For freelancers and small teams",
    price: {
      monthly: 5,
      annually: 3,
    },
    features: [
      "Up to 5 hours of transcription per month",
      "Advanced audio formats",
      "Email support",
    ],
    infos: [
      "Automatic and manual transcription",
      "Multi-language support",
      "10 GB file storage",
    ],
    isBestValue: true,
  },
  {
    title: "Pro",
    description: "For growing businesses",
    price: {
      monthly: 10,
      annually: 8,
    },
    features: [
      "Up to 20 hours of transcription per month",
      "High-quality audio formats",
      "Priority email support",
    ],
    infos: [
      "Automatic and manual transcription",
      "Multi-language support",
      "50 GB file storage",
    ],
  },
  {
    title: "Enterprise",
    description: "For large teams with extensive transcription needs",
    price: {
      monthly: 25,
      annually: 20,
    },
    features: [
      "Unlimited transcription",
      "Custom audio formats",
      "24/7 phone and email support",
    ],
    infos: [
      "Custom integrations",
      "Multi-language support",
      "Unlimited file storage",
      "Dedicated account manager",
    ],
  },
];

export default function ManyOffersVariant1() {
  const [selectedBilledType, setSelectedBilledType] =
    useState<BilledType>("monthly");

  function handleSwitchTab(tab: BilledType) {
    setSelectedBilledType(tab);
  }

  return (
    <div className="flex flex-col gap-8 items-center py-12 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-900 text-center">
        Choose the right plan for your business
      </h2>
      <SelectOfferTab
        handleSwitchTab={handleSwitchTab}
        selectedBilledType={selectedBilledType}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {pricingData.map((offer) => (
          <OfferCard
            key={offer.title}
            {...offer}
            selectedBilledType={selectedBilledType}
          />
        ))}
      </div>
    </div>
  );
}

const OfferCard = ({
  title,
  description,
  price,
  features,
  infos,
  isBestValue,
  selectedBilledType,
}: OfferCardProps & {
  selectedBilledType: BilledType;
}) => {
  function getAnnualPrice() {
    return price.annually * 12;
  }

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-300 ease-in-out overflow-hidden",
        "bg-white shadow-lg text-gray-800 hover:shadow-xl transform hover:-translate-y-1",
        isBestValue
          ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50"
          : "border-gray-200"
      )}
    >
      <div
        className={cn("p-6", {
          "bg-gradient-to-br from-blue-50 to-white": isBestValue,
        })}
      >
        {isBestValue && (
          <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
            Best Value
          </span>
        )}
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
        <div className="mt-4">
          <div className="text-4xl font-bold text-gray-900 flex items-center">
            {price[selectedBilledType]}
            <DollarSign className="ml-1 h-6 w-6 text-gray-600" />
          </div>
          <p className="text-sm text-gray-500">
            {selectedBilledType === "monthly"
              ? "per month"
              : `${getAnnualPrice()}$ billed annually`}
          </p>
        </div>
        <button
          type="button"
          className={cn(
            "w-full py-2.5 px-6 rounded-full mt-6 text-white font-semibold tracking-wide border border-transparent transition-colors duration-200",
            isBestValue
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-800 hover:bg-gray-900"
          )}
        >
          Get started
        </button>
        <p className="text-sm font-semibold text-gray-900 mt-6 mb-3">
          What's included:
        </p>
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        {infos && (
          <>
            <div className="my-4 h-px bg-gray-200" />
            <ul className="space-y-2">
              {infos.map((info) => (
                <li key={info} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 bg-gray-400 rounded-full" />
                  <span className="text-sm text-gray-600">{info}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

function SelectOfferTab({
  handleSwitchTab,
  selectedBilledType,
}: Readonly<{
  handleSwitchTab: (tab: BilledType) => void;
  selectedBilledType: BilledType;
}>) {
  const OfferList = ["monthly", "annually"] as const;

  return (
    <nav className="flex p-1 bg-gray-100 rounded-full" role="tablist">
      {OfferList.map((button) => (
        <button
          type="button"
          key={button}
          onClick={() => handleSwitchTab(button)}
          className={cn(
            "text-sm font-medium py-2 px-4 relative whitespace-nowrap transition-colors capitalize transform-gpu rounded-full",
            selectedBilledType === button
              ? "text-white"
              : "text-gray-700 hover:text-gray-900"
          )}
          role="tab"
          aria-selected={selectedBilledType === button}
          aria-controls={`${button}-prices`}
        >
          {button}
          {selectedBilledType === button && (
            <motion.div
              className="absolute inset-0 bg-blue-600 rounded-full -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              layoutId="pricing-tab-background"
            />
          )}
        </button>
      ))}
    </nav>
  );
}
