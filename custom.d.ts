interface AuthUser {
  name: string;
  email: string;
  _id: string;
}

declare namespace Express {
  interface Request {
    user?: AuthUser;
  }
}
