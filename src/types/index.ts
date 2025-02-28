// src/types/index.ts
export interface NotionSortOption {
  property: string;
  direction: 'ascending' | 'descending';
}

export interface NotionResponse {
  results: any[];
  has_more: boolean;
  next_cursor: string | null;
}

export interface Member {
  id: string;
  position?: string;
  image?: string;
  name?: string;
  generation?: string;
  class?: string;
  description?: string;
  lunaGeneration?: string;
}

export interface Award {
  id: string;
  year?: string;
  image?: string;
  name?: string;
  prize?: string;
  team?: string;
  members?: string[];
  date?: {
    start: string;
    end?: string;
  };
}

export interface Project {
  id: string;
  public_url: string;
  year?: string;
  image?: string;
  name?: string;
  description?: string;
  awards?: Array<{ id: string; name: string }>;
}

export interface QnA {
  id: string;
  question?: string;
  answer?: string;
}

export interface Information {
  id: string;
  moto?: string;
  contests?: string;
  projects?: string;
  rewards?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

// Additional utility types for the application
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

// State related types
export interface AppState {
  isLoading: boolean;
  isInitialized: boolean;
  error: ApiError | null;
}

// Filter types
export interface MemberFilters {
  generation?: string;
  position?: string;
  class?: string;
}

export interface ProjectFilters {
  year?: string;
  hasAwards?: boolean;
}

export interface AwardFilters {
  year?: string;
  team?: string;
}