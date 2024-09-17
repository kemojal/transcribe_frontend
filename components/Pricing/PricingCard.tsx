interface PricingCardProps {
  title: string;
  price: string;
  discountPrice: string;
  features: string[];
  seats?: number;
  buttonText: string;
  onButtonClick: () => void;
  isBestOffer?: boolean;
  isAnnual: boolean;
}

const PricingCard = ({
  title,
  price,
  discountPrice,
  features,
  seats,
  buttonText,
  onButtonClick,
  isBestOffer = false,
  isAnnual,
}: PricingCardProps) => {
  return (
    <div className="border rounded-lg shadow-xs p-6 bg-white w-full md:w-[22%] mx-2 relative overflow-hidden">
      {isBestOffer && (
        <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-md">
          Best Offer
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {/* <p className="text-gray-500 line-through">{price}</p>
        <p className="text-3xl font-bold text-blue-600 mb-4">{discountPrice}</p> */}
      <div className="mb-4 flex  flex-col">
        {isAnnual ? (
          <>
            <span className="text-gray-400 line-through text-sm">{price}</span>
            <span className="text-xl font-bold text-blue-600">
              {discountPrice}
            </span>
          </>
        ) : (
          <span className="text-xl font-bold">{price}</span>
        )}
      </div>
      {seats && (
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="number"
            min="1"
            value={seats}
            className="border px-2 py-1 rounded w-16"
            readOnly
          />
          <span>Seats</span>
        </div>
      )}
      <ul className="text-gray-600 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <span className="text-blue-500 mr-2">✔️</span> {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={onButtonClick}
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
