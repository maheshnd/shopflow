export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

// export type AuthResponse = {
//   user: User;
// };

// export type LoginInput = {
//   email: string;
//   password: string;
// };

// export type SignupInput = {
//   name: string;
//   email: string;
//   password: string;
// };

import type {
  AuthResponse,
  LoginInput,
  SignupInput,
} from "@shopflow/contracts";

export type {
  AuthResponse,
  LoginInput,
  SignupInput,
};