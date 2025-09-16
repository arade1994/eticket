export const NAVIGATION_LINKS = [
  {
    href: "/",
    label: "Tickets",
  },
  {
    href: "/orders",
    label: "Orders",
  },
  {
    href: "/users",
    label: "Users",
  },
  {
    href: "/auth/signout",
    label: "Sign out",
  },
];

export const ticketCategoriesOptions = [
  "Sport game",
  "Music event",
  "Theatre play",
  "Public transport",
  "Others",
].map((category) => ({
  value: category.toLowerCase(),
  label: category,
}));

export const statusOptions = [
  { value: "-", label: "Any status" },
  { value: "created", label: "Created" },
  { value: "cancelled", label: "Cancelled" },
  { value: "awaiting:payment", label: "Awaiting payment" },
  { value: "complete", label: "Complete" },
];
