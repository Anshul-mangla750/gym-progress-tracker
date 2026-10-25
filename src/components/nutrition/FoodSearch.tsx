import { useState, useMemo } from 'react';
import type { Food } from '../../types';
import { Modal } from '../ui/Modal';
import { FOOD_CATEGORIES } from '../../lib/constants';
import { Search, Plus } from 'lucide-react';
import { seedFoods } from '../../data/seed-foods';

interface FoodSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFood: (food: Food) => void;
}

export function FoodSearch({ isOpen, onClose, onSelectFood }: FoodSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFoods = useMemo(() => {
    return seedFoods.filter((f) => {
      const matchesQuery =
        query === '' ||
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.category.toLowerCase().includes(query.toLowerCase());

      const matchesCat = selectedCategory === 'all' || f.category === selectedCategory;
      return matchesQuery && matchesCat;
    });
  }, [query, selectedCategory]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Search Foods"
      description="Choose a food from verified database or Indian cuisine items"
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search chicken, oats, paneer, roti, dal, whey..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-bg-input border border-border-default text-text-primary text-sm focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20"
            autoFocus
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
              selectedCategory === 'all'
                ? 'bg-accent-primary text-black font-semibold'
                : 'bg-bg-elevated text-text-secondary hover:text-text-primary'
            }`}
          >
            All Foods
          </button>
          {FOOD_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === cat.value
                  ? 'bg-accent-primary text-black font-semibold'
                  : 'bg-bg-elevated text-text-secondary hover:text-text-primary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto space-y-2 pr-1">
          {filteredFoods.length === 0 ? (
            <div className="py-8 text-center text-text-muted text-sm">
              No foods found matching "{query}".
            </div>
          ) : (
            filteredFoods.map((food) => (
              <div
                key={food.id}
                onClick={() => {
                  onSelectFood(food);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-bg-secondary hover:bg-bg-elevated border border-border-default cursor-pointer transition-all duration-150 group"
              >
                <div>
                  <h4 className="font-heading font-semibold text-sm text-text-primary group-hover:text-accent-primary transition-colors">
                    {food.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                    <span className="text-text-secondary font-medium">
                      {food.calories} kcal ({food.servingBasis})
                    </span>
                    <span>•</span>
                    <span className="text-accent-primary font-semibold">P: {food.protein}g</span>
                    <span>•</span>
                    <span className="text-accent-secondary font-semibold">C: {food.carbohydrates}g</span>
                    <span>•</span>
                    <span className="text-warning font-semibold">F: {food.fat}g</span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-lg bg-bg-card border border-border-default flex items-center justify-center text-text-secondary group-hover:bg-accent-primary group-hover:text-black transition-colors shrink-0">
                  <Plus size={16} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
}
