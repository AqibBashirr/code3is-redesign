export interface HeadingType {
  title?: string;
  highlight: string;
}


export interface ImageType {
  src: string;
  alt: string;
  height?: number;
  width?: number;
}

export interface CaseStudySection {
  pill: string;
  heading: HeadingType;
  description: string[];
  image: ImageType; // Updated here
}

export interface CaseStudyMain {
  "Heading-h2": HeadingType;
  description: string[];
  challenge: CaseStudySection;
  approach: CaseStudySection;
  outcome: CaseStudySection;
}

export interface CaseStudy {
  number: number;
  logo:ImageType;
  Heading: HeadingType;
  description: string;
  main: CaseStudyMain;
  image: ImageType; 
}

export type CaseStudyData = Record<string, CaseStudy>;
