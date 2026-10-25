import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import type { PostCategory, CommunityPost } from '../../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: Omit<CommunityPost, 'id' | 'likes' | 'commentsCount' | 'createdAt'>) => void;
}

export function CreatePostModal({ isOpen, onClose, onSubmit }: CreatePostModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<PostCategory>('win');
  const [prMetric, setPrMetric] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSubmit({
      authorName: 'Alex Vance',
      authorBadge: '⚡ Spark Athlete',
      category,
      title,
      content,
      prMetric: prMetric.trim() ? prMetric : undefined,
    });

    setTitle('');
    setContent('');
    setPrMetric('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Community Post"
      description="Share a personal record, ask a training question, or post a form check."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value as PostCategory)}
        >
          <option value="win">🏆 Win / PR Milestone</option>
          <option value="question">❓ Question & Programming</option>
          <option value="form_check">📹 Form Check</option>
          <option value="nutrition">🥗 Nutrition & High-Protein Meal</option>
          <option value="general">💬 General Training Discussion</option>
        </Select>

        <Input
          label="Title"
          placeholder="e.g. Hit a lifetime 100kg Bench Press PR!"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text-secondary">Post Content</label>
          <textarea
            rows={4}
            placeholder="Share the details, cues, or what double progression step got you here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-3 rounded-xl text-sm bg-bg-input border border-border-default text-text-primary focus:outline-none focus:border-accent-primary"
            required
          />
        </div>

        {category === 'win' && (
          <Input
            label="Milestone Metric (optional)"
            placeholder="e.g. 100 kg × 5 reps (+5 kg PR)"
            value={prMetric}
            onChange={(e) => setPrMetric(e.target.value)}
          />
        )}

        <div className="flex gap-2 justify-end pt-3">
          <Button type="button" variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md" disabled={!title.trim() || !content.trim()}>
            Publish Post
          </Button>
        </div>
      </form>
    </Modal>
  );
}
