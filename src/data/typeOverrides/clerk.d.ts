export {};

declare global {
  interface CustomJwtSessionClaims {
    dbId?: string;
  }

  interface UserPublicMetadata {
    dbId?: string;
  }
}
