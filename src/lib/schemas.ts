import { z } from 'zod';

export const awardSchema = z.object({
  id: z.string(),
  year: z.string().nullable(),
  image: z.string().nullable(),
  name: z.string().nullable(),
  prize: z.string().nullable(),
  team: z.string().nullable(),
  members: z.array(z.string()).default([]),
  date: z
    .object({
      start: z.string().nullable(),
      end: z.string().nullable().optional(),
    })
    .nullable(),
  prizemoney: z.string().nullable(),
});

export const faqSchema = z.object({
  id: z.string(),
  question: z.string().nullable(),
  order: z.number().nullable(),
  answer: z.string().nullable(),
});

export const memberSchema = z.object({
  id: z.string(),
  position: z.string().nullable(),
  image: z.string().nullable(),
  name: z.string().nullable(),
  generation: z.string().nullable(),
  class: z.string().nullable(),
  description: z.string().nullable(),
  lunaGeneration: z.string().nullable(),
});

export const projectSchema = z.object({
  id: z.string(),
  public_url: z.string().nullable(),
  year: z.string().nullable(),
  image: z.string().nullable(),
  name: z.string().nullable(),
  description: z.string().nullable(),
  awards: z.array(z.object({ id: z.string(), name: z.string() })).default([]),
});

export const informationSchema = z.object({
  contests: z.string(),
  projects: z.string(),
  prizemoney: z.string(),
});

export type Award = z.infer<typeof awardSchema>;
export type Faq = z.infer<typeof faqSchema>;
export type Member = z.infer<typeof memberSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Information = z.infer<typeof informationSchema>;
