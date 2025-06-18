// lib/types.ts

export interface Ukm {
  id: number;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  imageUrl: string;
  manager: {
    id: string; 
    name: string;
    avatar: string;
  };
}

export interface Applicant {
  id: number;
  name: string;
  year: string;
  imageUrl: string;
}