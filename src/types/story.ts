export interface StoryGenerationRequest {
  theme: string;
  age_group: string;
  educational_value: string;
  setting: string;
  characters: string[];
  title?: string;
  creator_id?: string;
}

export interface StoryGenerationResponse {
  story_markdown: string | null;
  issues: string[];
  story_id?: string | null;
}

export interface StoryListItem {
  id: string;
  creator_id: string;
  title: string;
  contents: string;
  created_at: string;
}

export interface StoryDetailResponse {
  id: string;
  creator_id: string;
  title: string;
  contents: string;
  created_at: string;
}

export interface StoryStatsResponse {
  created_count: number;
  reads_count: number;
  saved_count: number;
}
