import { Button } from "./button";

interface EventPackageCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
  features?: string[];
}

export default function EventPackageCard({
  title,
  description,
  price,
  image,
  features = [],
}: EventPackageCardProps) {
  return (
    <div className="bg-white rounded-[12px] shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="p-6">
        <h3 className="text-xl font-['Tiro_Gurmukhi'] font-semibold mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        {features.length > 0 && (
          <ul className="space-y-2 mb-4">
            {features.map((feature, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 flex items-center"
              >
                <span className="mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-semibold text-[#486968]">{price}</span>
          <Button className="bg-[#486968] text-white hover:bg-[#486968]/90">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
