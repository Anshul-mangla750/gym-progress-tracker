export type PostCategory =
  | 'question'
  | 'win'
  | 'form_check'
  | 'nutrition'
  | 'general';

export interface CommunityPost {
  id: string;
  authorName: string;
  authorBadge?: string;
  category: PostCategory;
  title: string;
  content: string;
  likes: number;
  commentsCount: number;
  hasLiked?: boolean;
  createdAt: string;
  prMetric?: string;
}
