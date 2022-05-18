interface AuthUser {
  name: string;
  email: string;
  _id: string;
  role: "buyer" | "seller";
}

declare namespace Express {
  interface Request {
    user?: AuthUser;
  }
}
