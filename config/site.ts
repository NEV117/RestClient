export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Web Client",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
  ],
  links: {
    github: "https://github.com/NEV117",
    twitter: "",
    docs: "",
    discord: "",
    sponsor: "",
  },
};
