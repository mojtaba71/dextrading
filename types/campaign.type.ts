export interface ICampaign {
  name: string;
  description: string;
  duration: string;
  specialOffer: SpecialOffer;
  eligibility: Eligibility;
}

export interface SpecialOffer {
  originalPrice: number;
  discountedPrice: number;
  discountDuration: string;
}

export interface Eligibility {
  address: string;
  isEligible: boolean;
}
