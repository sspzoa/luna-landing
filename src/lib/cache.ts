import type { Award, Information, Member, Project, QnA } from '@/types';
import clientPromise from './mongodb';

export type CacheType = 'members' | 'awards' | 'projects' | 'qna' | 'information';

export interface CacheDocument<T> {
  _id?: string;
  type: CacheType;
  data: T[];
  createdAt: Date;
  updatedAt: Date;
}

const CACHE_COLLECTION = 'notion_cache';

export async function getCachedData<T>(type: CacheType): Promise<T[] | null> {
  try {
    const client = await clientPromise;
    const db = client.db('luna-landing');
    const collection = db.collection<CacheDocument<T>>(CACHE_COLLECTION);

    const cached = await collection.findOne({ type }, { sort: { updatedAt: -1 } });

    if (!cached) {
      return null;
    }

    return cached.data;
  } catch (error) {
    console.error(`Error getting cached data for ${type}:`, error);
    return null;
  }
}

export async function setCachedData<T>(type: CacheType, data: T[]): Promise<void> {
  try {
    const client = await clientPromise;
    const db = client.db('luna-landing');
    const collection = db.collection<CacheDocument<T>>(CACHE_COLLECTION);

    const now = new Date();

    await collection.replaceOne(
      { type },
      {
        type,
        data,
        createdAt: now,
        updatedAt: now,
      },
      { upsert: true },
    );
  } catch (error) {
    console.error(`Error setting cached data for ${type}:`, error);
    throw error;
  }
}

export async function getCacheInfo(): Promise<Record<string, { updatedAt: Date; count: number }> | null> {
  try {
    const client = await clientPromise;
    const db = client.db('luna-landing');
    const collection = db.collection<CacheDocument<any>>(CACHE_COLLECTION);

    const caches = await collection.find({}).toArray();

    const info: Record<string, { updatedAt: Date; count: number }> = {};

    for (const cache of caches) {
      info[cache.type] = {
        updatedAt: cache.updatedAt,
        count: cache.data.length,
      };
    }

    return info;
  } catch (error) {
    console.error('Error getting cache info:', error);
    return null;
  }
}
