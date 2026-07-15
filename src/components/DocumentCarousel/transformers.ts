import type { Project, Media } from "@/types/payload-types";
import type { CarouselDocument } from "./types";

/**
 * Extracts the URL from a Media object or returns the string as-is
 */
function getMediaUrl(media: string | Media | null | undefined): string {
  if (!media) return "";
  if (typeof media === "string") return media;
  return media.url || "";
}

/**
 * Normalizes a Payload CMS Project to a CarouselDocument
 * Handles all variations of populated/unpopulated relations
 */
export function projectToCarouselDocument(project: Project): CarouselDocument {
  const imageUrl = getMediaUrl(project.image);
  const imageObj =
    typeof project.image === "object" ? project.image : undefined;

  return {
    id: project.id,
    title: project.title,
    description: project.description || undefined,
    image: project.image || imageUrl,
    alt: typeof project.image === "object" ? project.image?.alt : undefined,
    width: imageObj?.width || 1400,
    height: imageObj?.height || 676,
    badge: project.badge || undefined,
    category: project.category,
    stacks: project.stacks?.map((stack) => {
      if (typeof stack === "string") {
        return stack;
      }
      return stack;
    }),
    cta: project.cta
      ? {
          href: project.cta.href || "#",
          label: project.cta.label || undefined,
        }
      : undefined,
  };
}

/**
 * Converts an array of Payload CMS Projects to CarouselDocuments
 */
export function projectsToCarouselDocuments(
  projects: Project[],
): CarouselDocument[] {
  return projects.map(projectToCarouselDocument);
}
