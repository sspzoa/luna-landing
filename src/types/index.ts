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
  prizemoney?: string;
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
  order?: number;
  answer?: string;
}

export interface Information {
  id: string;
  moto?: string;
  contests?: string;
  projects?: string;
  prizemoney?: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

export interface AppState {
  isLoading: boolean;
  isInitialized: boolean;
  error: ApiError | null;
}

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
