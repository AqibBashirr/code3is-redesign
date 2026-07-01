import { LightbulbIcon, PuzzleIcon, StickyNoteCheck } from "lucide-react";

export const CASE_STUDY = {
  projectName: "Harmain Service Platform",
  url: "#",
  img:'/images/case-study/harmain.png',
  processes: [
    {
      title: "Challenge",
      description:
        "Old fragmented system with difficult navigation and poor UX",
      icon: PuzzleIcon,
    },
    {
      title: "Solution",
      description:
        "Complete frontend redesign with structured flows and responsive UI",
      icon: LightbulbIcon,
    },
    {
      title: "Outcome",
      items: ["Faster navigation", "Better usability", "Cleaner experience"],
      icon:StickyNoteCheck,
    },
  ],
} as const;
