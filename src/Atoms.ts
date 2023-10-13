import { atom } from "jotai";
import getUserObject from "./lib/getUser";

const userAtom = atom(getUserObject());
const headerHeightAtom = atom<number>(0);

export { userAtom, headerHeightAtom };
