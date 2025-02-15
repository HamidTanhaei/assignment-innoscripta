import { Article } from "@/types";

export type APIResult = {
  apiSources?: string[];
  articles: Article[];
  errors?: { source: string; }[];
}