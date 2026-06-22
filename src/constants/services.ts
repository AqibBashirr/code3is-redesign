// constants/services-overview.ts

import {
  Blocks,
  Camera,
  Globe,
  Layers,
  Megaphone,
  MonitorSmartphone,
  PenTool,
  RefreshCcw,
  Sprout,
  SquareCode,
  SquareMousePointer,
  Tags,
} from "lucide-react";

export const SERVICES_OVERVIEW = [
  {
    title: "Build",
    services: [
      { label: "Web Development", icon: SquareCode },
      { label: "Landing Pages", icon: SquareMousePointer },
      { label: "Web Apps", icon: Globe },
    ],
  },
  {
    title: "Design",
    services: [
      { label: "UI/UX", icon: MonitorSmartphone },
      { label: "Branding", icon: Tags },
      { label: "Graphic Design", icon: PenTool },
    ],
  },
  {
    title: "Grow",
    services: [
      { label: "SEO", icon: Sprout },
      { label: "Meta / Google Ads", icon: Megaphone },
      { label: "Content", icon: Camera },
    ],
  },
  {
    title: "Scale",
    services: [
      { label: "Automation", icon: RefreshCcw },
      { label: "Hosting", icon: Layers },
      { label: "Integration", icon: Blocks },
    ],
  },
] as const;

export const SERVICES_OFFERED = [
  "INTEGRATION",
  "LANDING PAGES",
  "GOOGLE / META ADS",
  "AI VIDEOS",
  "WEB DEVELOPMENT",
  "WEB DESIGN",
  "GRAPHIC DESIGN",
  "BRANDING SYSTEM",
  "Corporate Identity",
  "AD CREATIVES",
  "AUTOMATION",
] as const;