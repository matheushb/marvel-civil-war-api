import "dotenv/config";

export const PORT = process.env.PORT || (3000 as number);
export const NODE_ENV = process.env.NODE_ENV || ("development" as string);
export const JWT_SECRET =
  process.env.JWT_SECRET || ("supersecrettoken" as string);

export const MARVEL_TS = process.env.MARVEL_TS;
export const MARVEL_API_URL =
  process.env.MARVEL_API_URL || "https://gateway.marvel.com/v1/public";
export const MARVEL_API_KEY = process.env.MARVEL_API_KEY;
export const MARVEL_HASH = process.env.MARVEL_HASH;
