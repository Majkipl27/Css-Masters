import { atom } from "jotai";
import getUserObject from "./lib/getUser";

interface User {
  id: number;
  username: string;
  name: string | undefined;
  lastname: string | undefined;
  isBanned: boolean;
}

export const userAtom = atom<User>(getUserObject());