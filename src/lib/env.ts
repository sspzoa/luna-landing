import { z } from 'zod';

/**
 * NOTE: The previous `.env.local` key was `NOTION_API_KEY`.
 * This project now follows portfolio-v9 and reads `NOTION_TOKEN`.
 * The Notion endpoints used are database queries (`/databases/{id}/query`),
 * not data sources, so the IDs below are database IDs.
 */
const envSchema = z.object({
  NOTION_TOKEN: z.string().min(1, 'NOTION_TOKEN is required'),
  AWARDS_DATABASE_ID: z.string().min(1, 'AWARDS_DATABASE_ID is required').default('5c6c5d4aa4e24a1ba18aee280fcfc39a'),
  QNA_DATABASE_ID: z.string().min(1, 'QNA_DATABASE_ID is required').default('5153a7c657844eebaa62b737c726447d'),
  MEMBERS_DATABASE_ID: z.string().min(1, 'MEMBERS_DATABASE_ID is required').default('3d3cae4b3b50481497a6c52f61413921'),
  INFORMATION_DATABASE_ID: z
    .string()
    .min(1, 'INFORMATION_DATABASE_ID is required')
    .default('564bbb8126ca46a69e44288548d99fa2'),
  PROJECTS_DATABASE_ID: z
    .string()
    .min(1, 'PROJECTS_DATABASE_ID is required')
    .default('f73e99abb9ea4817b2d6c6333d152242'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('\n');
  throw new Error(`Environment variable validation failed:\n${issues}`);
}

export const env = parsed.data;
