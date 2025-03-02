import type React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
