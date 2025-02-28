// src/store/index.ts
import { atom } from 'jotai';
import type {Award, Information, Member, Project, QnA} from "@/types";

// Individual data atoms
export const awardsAtom = atom<Award[]>([]);
export const membersAtom = atom<Member[]>([]);
export const projectsAtom = atom<Project[]>([]);
export const qnaAtom = atom<QnA[]>([]);
export const informationAtom = atom<Information[]>([]);

// Loading state atom
export const isDataLoadingAtom = atom<boolean>(true);

// Data initialization status atom
export const isDataInitializedAtom = atom<boolean>(false);