export const elements = {
  login: [
    {
      id: "login",
      label: "Enter e-mail",
      type: "text",
    },
    {
      id: "password",
      label: "Enter password",
      type: "password",
    },
  ],
  signup: [
    {
      id: "login",
      label: "Enter e-mail",
      type: "text",
    },
    {
      id: "password",
      label: "Enter password",
      type: "password",
    },
    {
      id: "confirm",
      label: "Confirm password",
      type: "password",
    },
  ],
} as const;

export const FORM_TYPES = ["login", "signup"] as const;
