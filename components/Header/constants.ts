export const nav = [
  {
    id: "my_cars",
    path: "/cars",
    title: "Cars",
    auth: true,
  },
  {
    id: "log_in",
    path: "/log-in",
    title: "Log in",
    auth: false,
  },
  {
    id: "sign_up",
    path: "/sign-up",
    title: "Sign up",
    auth: false,
  },
  {
    id: "log_out",
    path: "",
    title: "Log out",
    type: "button",
    auth: true,
  },
] as const;
