export type AuthUser = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export type AuthContext = {
  sessionId: string;
  user: AuthUser;
};