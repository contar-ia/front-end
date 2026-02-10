export interface StoryGenerationRequest {
  theme: string;
  age_group: string;
  educational_value: string;
  setting: string;
  characters: string[];
}

export interface StoryGenerationResponse {
  story_markdown: string | null;
  issues: string[];
}
