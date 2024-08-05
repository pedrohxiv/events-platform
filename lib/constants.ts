export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Event",
    route: "/events/create",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

export const eventDefaultValues = {
  title: "",
  categoryId: "",
  description: "",
  imageUrl: "",
  location: "",
  startDateTime: undefined,
  endDateTime: undefined,
  price: "",
  isFree: false,
  url: "",
};
