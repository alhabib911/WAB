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
  description: string;
  responsibility: string;
  location: string;
  workMode: string; // Onsite, Remote
  type: string;     // Full-time, Part-time
  deadline: string;
  salary: string;
  applyEmail: string;
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  bloodGroup: string;
  nid: string;
  division: string;
  district: string;
  thana: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  artisan: string;
}
