import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Card data for pricing/stacked cards component
export interface PricingCard {
  id: number;
  title: string;
  description: string;
  price: string; // e.g., "$0", "$9.99", "Custom"
  pricePeriod?: string; // e.g., "/month", "/year", "Contact us"
  features: string[];
  buttonText: string;
  color: string;
  isPopular?: boolean; // Optional badge for popular plans
}

export const cardData: PricingCard[] = [
  {
    id: 1,
    title: "Free",
    description: "Get started with basic features at no cost",
    price: "$0",
    pricePeriod: "/month",
    features: [
      "Up to 50 text enhancements/month",
      "Basic AI models",
      "Standard formatting options",
      "Community support",
      "Desktop app access"
    ],
    buttonText: "Get Started Free",
    color: "rgba(147, 51, 234, 0.8)", // purple
  },
  {
    id: 2,
    title: "Student",
    description: "Special pricing for students and learners",
    price: "$4.99",
    pricePeriod: "/month",
    features: [
      "Up to 500 text enhancements/month",
      "Advanced AI models",
      "All formatting options",
      "Priority email support",
      "Desktop app + web access",
      "Student discount (50% off)"
    ],
    buttonText: "Get Student Plan",
    color: "rgba(168, 85, 247, 0.8)", // lighter purple
    isPopular: true,
  },
  {
    id: 3,
    title: "Individual",
    description: "Perfect for personal use and professionals",
    price: "$9.99",
    pricePeriod: "/month",
    features: [
      "Unlimited text enhancements",
      "Premium AI models",
      "All formatting options",
      "Priority support",
      "Desktop app + web access",
      "Custom hotkeys",
      "Export options"
    ],
    buttonText: "Choose Individual",
    color: "rgba(192, 132, 252, 0.8)", // light purple
  },
  {
    id: 4,
    title: "School/University",
    description: "Solutions for educational institutions",
    price: "$49.99",
    pricePeriod: "/month",
    features: [
      "Unlimited enhancements",
      "All AI models included",
      "Team collaboration features",
      "Admin dashboard & user management",
      "Bulk licenses",
      "Dedicated support",
      "Custom integrations"
    ],
    buttonText: "Contact Sales",
    color: "rgba(216, 180, 254, 0.8)", // very light purple
  },
  {
    id: 5,
    title: "Company/Organisation",
    description: "Enterprise solutions for large teams",
    price: "Custom",
    pricePeriod: "",
    features: [
      "Everything in School/University",
      "Advanced analytics & reporting",
      "Custom AI model training",
      "API access",
      "SSO & advanced security",
      "Dedicated account manager",
      "SLA guarantee & support"
    ],
    buttonText: "Schedule Demo",
    color: "rgba(233, 213, 255, 0.8)", // lightest purple
  },
];

