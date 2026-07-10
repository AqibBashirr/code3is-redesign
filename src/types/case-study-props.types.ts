import { CaseStudy } from "./payload-types";

export type casestudyPropsPick = Pick<
  CaseStudy,
  "id" | "slug" | "title" | "titleHighlight" | "description" | "logo" | "number"
>;
