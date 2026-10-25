import { useState } from 'react';
import type { CommunityPost, PostCategory } from '../types';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CreatePostModal } from '../components/community/CreatePostModal';
import {
  Heart,
  MessageSquare,
  Trophy,
  HelpCircle,
  Video,
  Utensils,
  MessageCircle,
  Plus,
} from 'lucide-react';
import { formatTimeAgo } from '../lib/date-utils';

const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post_1',
    authorName: 'Marcus Vance',
    authorBadge: '⚡ Spark Athlete',
    category: 'win',
    title: 'Lifetime Bench Press Milestone: 100 kg × 5 reps!',
    content:
      'After stalling at 92.5kg for 3 weeks, the double progression engine recommended micro-loading 1.25kg plates and hitting 8 reps across all sets first. Today 100kg moved like an empty bar. Never skipping pauses again!',
    likes: 42,
    commentsCount: 9,
    hasLiked: false,
    prMetric: '100 kg × 5 reps',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    id: 'post_2',
    authorName: 'Sarah Jenkins',
    authorBadge: '🏆 PR Breaker',
    category: 'form_check',
    title: 'Romanian Deadlift: Hamstring tension feeling uneven on descent',
    content:
      'Can anyone check my cue? When hinging past knee level, my lower back feels slight fatigue instead of pure glute/hamstring stretch. Should I shorten range of motion or soften knees more?',
    likes: 18,
    commentsCount: 14,
    hasLiked: false,
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
  },
  {
    id: 'post_3',
    authorName: 'Dev Sharma',
    authorBadge: '🔥 14-Day Streak',
    category: 'nutrition',
    title: 'High-Protein Paneer Bhurji & Soya Bowl (52g Protein / 480 kcal)',
    content:
      'Quick Indian cutting recipe: 150g low fat paneer + 30g boiled soya chunks sautéed in cumin, turmeric, diced capsicum and tomato. Squeeze of fresh lemon at the end. Kept me full through my 4-hour deficit window!',
    likes: 31,
    commentsCount: 6,
    hasLiked: false,
    createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
  },
  {
    id: 'post_4',
    authorName: 'Elena Rostova',
    authorBadge: '⚡ Spark Athlete',
    category: 'question',
    title: 'V-Taper Split: Frequency of Lateral Raises per week?',
    content:
      'The V-Taper 6-day split has lateral raises programmed 3x a week with double progression. For side delts, does high frequency like this recover well for you guys?',
    likes: 24,
    commentsCount: 11,
    hasLiked: false,
    createdAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
  },
];

const CATEGORIES: { id: PostCategory | 'all'; label: string; icon?: any }[] = [
  { id: 'all', label: 'All' },
  { id: 'question', label: 'Question', icon: HelpCircle },
  { id: 'win', label: 'Win', icon: Trophy },
  { id: 'form_check', label: 'Form check', icon: Video },
  { id: 'nutrition', label: 'Nutrition', icon: Utensils },
  { id: 'general', label: 'General', icon: MessageCircle },
];

export function Community() {
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_POSTS);
  const [selectedCat, setSelectedCat] = useState<PostCategory | 'all'>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredPosts = posts.filter(
    (p) => selectedCat === 'all' || p.category === selectedCat
  );

  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiking = !p.hasLiked;
          return {
            ...p,
            hasLiked: isLiking,
            likes: isLiking ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  const handleAddPost = (
    newPostData: Omit<CommunityPost, 'id' | 'likes' | 'commentsCount' | 'createdAt'>
  ) => {
    const post: CommunityPost = {
      ...newPostData,
      id: `post_${Date.now()}`,
      likes: 1,
      commentsCount: 0,
      hasLiked: true,
      createdAt: new Date().toISOString(),
    };
    setPosts([post, ...posts]);
  };

  return (
    <div className="community-page space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      <PageHeader
        title="Community & Athlete Wins"
        subtitle="Connect with athletes pushing progressive overload, celebrate PR milestones, and ask questions"
        action={
          <Button
            variant="primary"
            size="sm"
            icon={<Plus size={14} className="stroke-[3]" />}
            onClick={() => setIsCreateOpen(true)}
          >
            Create Post
          </Button>
        }
      />

      {/* Category filter chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCat === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#7C3AED] text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-[#E9E4F0] hover:bg-neutral-50'
              }`}
            >
              {Icon && <Icon size={13} />}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Feed list */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} padding="md" className="border-[#E9E4F0] bg-white hover:shadow-xs transition-all">
            {/* Header: Author + Category */}
            <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100 mb-3.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-700 font-extrabold text-xs">
                  {post.authorName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-heading font-bold text-sm text-neutral-900">
                      {post.authorName}
                    </span>
                    {post.authorBadge && (
                      <span className="text-[10px] font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-200">
                        {post.authorBadge}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-neutral-400">
                    {formatTimeAgo(post.createdAt)}
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600 capitalize">
                {post.category.replace('_', ' ')}
              </span>
            </div>

            {/* Title & Body */}
            <h3 className="font-heading font-extrabold text-base text-neutral-900 mb-2">
              {post.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-3.5 whitespace-pre-line">
              {post.content}
            </p>

            {/* PR Metric Callout if applicable */}
            {post.prMetric && (
              <div className="p-3 rounded-xl bg-violet-50/80 border border-violet-200/80 flex items-center gap-2 mb-3.5 text-xs">
                <Trophy size={16} className="text-violet-600 shrink-0" />
                <span className="text-neutral-600 font-medium">Official Milestone:</span>
                <strong className="text-violet-700 font-mono font-extrabold">{post.prMetric}</strong>
              </div>
            )}

            {/* Footer actions: Like & Comments */}
            <div className="flex items-center gap-4 pt-3 border-t border-neutral-100 text-xs text-neutral-500">
              <button
                type="button"
                onClick={() => handleToggleLike(post.id)}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                  post.hasLiked ? 'text-rose-500 font-bold' : 'hover:text-neutral-900'
                }`}
              >
                <Heart size={15} className={post.hasLiked ? 'fill-rose-500 stroke-rose-500' : ''} />
                <span className="tabular-nums">{post.likes}</span>
              </button>

              <button
                type="button"
                className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                <MessageSquare size={14} />
                <span className="tabular-nums">{post.commentsCount} comments</span>
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleAddPost}
      />
    </div>
  );
}
