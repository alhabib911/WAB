export interface Donor {
  id: string;
  name: string;
  amount: number;
  method: string;
}

export interface ImpactLocation {
  id: string;
  name: string;
  x: number;
  y: number;
  title: string;
  description: string;
  imageUrl: string;
  donationGoal: number;
  raisedAmount: number;
  donorCount: number;
  benefitedCount: number;
  donors: Donor[];
}

export interface JobPost {
  id: string;
  title: string;
  description: string;
  responsibility: string;
  location: string;
  workMode: string;
  type: string;
  deadline: string;
  salary: string;
  applyEmail: string;
  status?: string;
  postedByRole?: string;
  postedBy?: string;
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

declare global {
  interface Window {
    showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
    lang: 'bn' | 'en';
    t: (bnText: string, enText: string) => string;
    setLanguage: (lang: 'bn' | 'en') => void;
  }
}
