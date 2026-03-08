import type { Award, Information, Member, Project, QnA } from '@/types';
import { atom } from 'jotai';

export const awardsAtom = atom<Award[]>([]);
export const membersAtom = atom<Member[]>([]);
export const projectsAtom = atom<Project[]>([]);
export const qnaAtom = atom<QnA[]>([]);
export const informationAtom = atom<Information[]>([]);

export const isDataLoadingAtom = atom<boolean>(true);

export const isDataInitializedAtom = atom<boolean>(false);
