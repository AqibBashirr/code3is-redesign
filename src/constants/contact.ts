import { Phone,Mail,Location } from "@/assets/svg";
export const CONTACT_DETAILS = [
  {
    type: "phone",
    icon:Phone,
    label: "+91 9419225147",
    href: "tel:+919419225147",
  },
  {
    type: "email",
    icon:Mail,
    label: "contactc3@c3is.in",
    href: "mailto:contactc3@c3is.in",
  },
  {
    type: "address",
    icon:Location,
    label: "Batamaloo, Srinagar, Jammu & Kashmir 190009",
    href: "https://www.google.com/maps/place/Code3+Innovative+Solutions+(CODE3IS)/@34.081843,74.7900379,17z/data=!3m1!4b1!4m6!3m5!1s0x28ff79f6a14be061:0xfc491ed31106bfa0!8m2!3d34.0818386!4d74.7926128!16s%2Fg%2F11x73crvw5?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
  },
] as const;