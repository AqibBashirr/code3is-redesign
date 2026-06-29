
import { variants } from "@/constants/ButtonVariants";
import { ComponentProps } from "react";

export type Link = {
  href: string;
};

export type CTAProps = {
  
  children?: React.ReactNode;
  variant?: keyof typeof variants;
  arrow?: boolean;
  className?: string;
} ;

export type CTAButtonProps = CTAProps &  ComponentProps<"button">
export type CTAButtonLinkProps = CTAProps &  Link & ComponentProps<'a'>

