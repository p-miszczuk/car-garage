export const elements = {
  login: [
    {
      id: "login",
      label: "Enter e-mail",
      type: "text",
      required: true,
    },
    {
      id: "password",
      label: "Enter password",
      type: "password",
      required: true,
    },
  ],
  signup: [
    {
      id: "login",
      label: "Enter e-mail",
      type: "text",
      required: true,
    },
    {
      id: "password",
      label: "Enter password",
      type: "password",
      required: true,
    },
    {
      id: "confirm",
      label: "Confirm password",
      type: "password",
      required: true,
    },
  ],
} as const;

export const FORM_TYPES = ["login", "signup"] as const;
