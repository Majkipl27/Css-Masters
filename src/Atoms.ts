import { atom } from "jotai";
import getUserObject from "./lib/getUser";

export const userAtom = atom(getUserObject());