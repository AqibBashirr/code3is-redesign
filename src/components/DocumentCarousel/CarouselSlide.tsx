// "use client";

// import { memo } from "react";
// import Image from "next/image";
// import ButtonLink from "../Buttons/ButtonLink";
// import { STACKS } from "@/constants/stacks";

// import type {
//   CarouselDocument,
//   CarouselRenderOverlayProps,
//   ImageFit,
//   OverlayPosition,
// } from "./types";

// interface CarouselSlideProps {
//   item: CarouselDocument;
//   index: number;
//   active: boolean;

//   imageHeight: string;
//   imageFit: ImageFit;

//   showOverlay: boolean;
//   showGradient: boolean;

//   showTitle: boolean;
//   showDescription: boolean;
//   showCategory: boolean;
//   showBadge: boolean;
//   showStacks: boolean;
//   showVisitButton: boolean;

//   visitButtonLabel: string;

//   overlayPosition: OverlayPosition;

//   renderOverlay?: (props: CarouselRenderOverlayProps) => React.ReactNode;
// }

// const overlayPositions: Record<OverlayPosition, string> = {
//   "top-left": "top-6 left-6 md:top-10 md:left-12",

//   "top-right": "top-6 right-6 md:top-10 md:right-12",

//   "bottom-left": "bottom-6 left-6 md:bottom-10 md:left-12",

//   "bottom-right": "bottom-6 right-6 md:bottom-10 md:right-12",

//   center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
// };

// function CarouselSlide({
//   item,
//   index,
//   active,

//   imageHeight,
//   imageFit,

//   showOverlay,
//   showGradient,

//   showTitle,
//   showDescription,
//   showCategory,
//   showBadge,
//   showStacks,
//   showVisitButton,

//   visitButtonLabel,

//   overlayPosition,

//   renderOverlay,
// }: CarouselSlideProps) {
//   return (
//     <div className="w-full shrink-0 snap-center">
//       <div className="relative">
//         {/* IMAGE */}

//         <div className={`relative overflow-hidden ${imageHeight}`}>
//           <Image
//             src={item.image}
//             alt={item.alt ?? item.title ?? ""}
//             width={item.width ?? 1400}
//             height={item.height ?? 676}
//             priority={index === 0}
//             loading={index === 0 ? "eager" : "lazy"}
//             className={`h-full w-full ${
//               imageFit === "cover" ? "object-cover" : "object-contain"
//             }`}
//           />

//           {showGradient && (
//             <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
//           )}
//         </div>

//         {/* CUSTOM OVERLAY */}

//         {renderOverlay ? (
//           renderOverlay({
//             item,
//             active,
//             index,
//           })
//         ) : (
//           <>
//             {/* BADGE */}

//             {showBadge && item.badge && (
//               <div className="absolute top-6 right-6 rounded-md border border-white/40 bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur-md">
//                 {item.badge}
//               </div>
//             )}

//             {/* CATEGORY */}

//             {showCategory && item.category && (
//               <div className="absolute right-6 top-6 rounded-md border border-white/40 bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur-md">
//                 {item.category}
//               </div>
//             )}

//             {/* OVERLAY */}

//             {showOverlay && (
//               <div className={`absolute ${overlayPositions[overlayPosition]}`}>
//                 {showTitle && item.title && (
//                   <h2 className="text-[clamp(20px,3vw,36px)] font-semibold uppercase tracking-[0.15em] text-white">
//                     {item.title}
//                   </h2>
//                 )}

//                 {showDescription && item.description && (
//                   <p className="mt-2 max-w-xl text-white/90">
//                     {item.description}
//                   </p>
//                 )}

//                 {showStacks && item.stacks?.length && (
//                   <div className="mt-5 flex flex-wrap gap-4">
//                     {item.stacks.map((stack) => (
//                       <Image
//                         key={stack}
//                         src={STACKS[stack as keyof typeof STACKS]}
//                         alt={stack}
//                         width={38}
//                         height={38}
//                         className="h-8 w-8 md:h-10 md:w-10"
//                       />
//                     ))}
//                   </div>
//                 )}

//                 {showVisitButton && item.urlLink && (
//                   <ButtonLink
//                     href={item.urlLink}
//                     target="_blank"
//                     variant="outline"
//                     className="mt-6 border-white text-white hover:border-black hover:text-black"
//                   >
//                     {item.ctaLabel ?? visitButtonLabel}
//                   </ButtonLink>
//                 )}
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default memo(CarouselSlide);
