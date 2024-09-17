import React from "react";

interface PricingToggleProps {
  isAnnual: boolean;
  onToggle: () => void;
}

const PricingToggle: React.FC<PricingToggleProps> = ({
  isAnnual,
  onToggle,
}) => {
  return (
    <div className="flex justify-center mb-8">
      <button
        className={`px-4 py-2 rounded-l-full ${
          !isAnnual ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
        onClick={onToggle}
      >
        Monthly
      </button>
      <button
        className={`px-4 py-2 rounded-r-full ${
          isAnnual ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
        onClick={onToggle}
      >
        Annual
      </button>
    </div>
  );
};

export default PricingToggle;
