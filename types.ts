export interface Donor {
  id: string;
  name: string;
  amount: number;
  method: string;
}

export interface ImpactLocation {
  id: string;
  name: string;
  x: number; // Percentage from left (0-100)
  y: number; // Percentage from top (0-100)
  title: string;
  description: string;
  imageUrl: string;
  donationGoal: number;
  raisedAmount: number;
  donorCount: number;
  benefitedCount: number; // Added field for benefited people
  donors: Donor[];
}

export interface JobPost {
  id: string;
  title: string;
  location: string;
  type: string;
  deadline: string;
  salary: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  artisan: string;
}