import { Modal } from './Modal';
import { HelpCircle, Sparkles, Dumbbell, UtensilsCrossed, Zap, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const handleContact = () => {
    toast.success('Support ticket created!', {
      description: 'Our coaching concierge team will reach out to Alex Vance within 2 hours.',
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#E8F7EC] text-[#079447] flex items-center justify-center">
            <HelpCircle size={18} />
          </div>
          <span className="font-heading font-black text-lg text-neutral-900">Help & Support</span>
        </div>
      }
      description="Quick guides, coach FAQs, and 24/7 concierge assistance."
      maxWidth="lg"
    >
      <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm text-neutral-700">
        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E4EDE7] space-y-1">
            <div className="flex items-center gap-2 font-bold text-neutral-900">
              <Dumbbell size={15} className="text-[#079447]" />
              <span>How does Progressive Overload work?</span>
            </div>
            <p className="text-neutral-600 text-xs leading-relaxed">
              EliteEngine automatically monitors your completed sets. When you hit the top of your target rep range with proper form, Jimm AI prompts a 2.5kg or 1-rep increase on your next workout.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E4EDE7] space-y-1">
            <div className="flex items-center gap-2 font-bold text-neutral-900">
              <UtensilsCrossed size={15} className="text-[#FF7A00]" />
              <span>How do I track meals and macros?</span>
            </div>
            <p className="text-neutral-600 text-xs leading-relaxed">
              Head to Food & Macros or tap "Log Meals →". Search over 20+ verified foods, customize serving portions in grams, and your daily calorie ring and macro bars update in real time.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E4EDE7] space-y-1">
            <div className="flex items-center gap-2 font-bold text-neutral-900">
              <Sparkles size={15} className="text-[#7540E8]" />
              <span>What is Jimm AI?</span>
            </div>
            <p className="text-neutral-600 text-xs leading-relaxed">
              Jimm is your 24/7 intelligent training partner. Ask him to generate periodized splits, suggest healthy post-workout snacks, or calculate rest timers tailored to your recovery.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#E8F7EC] border border-emerald-200 space-y-1">
            <div className="flex items-center gap-2 font-bold text-[#075B38]">
              <Zap size={15} className="text-[#079447]" />
              <span>Need 1-on-1 Athlete Support?</span>
            </div>
            <p className="text-[#075B38] text-xs leading-relaxed">
              As an athlete on EliteEngine Pro, you have direct priority access to human certified trainers and sports nutritionists.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={handleContact}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#079447] hover:bg-[#075B38] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Mail size={15} />
            <span>Contact Concierge</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl border border-[#E4EDE7] hover:bg-neutral-50 text-neutral-700 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
