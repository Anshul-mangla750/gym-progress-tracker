import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Smartphone, Share, PlusSquare, MoreVertical, Download, Zap } from 'lucide-react';

interface AddToHomeScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddToHomeScreenModal({ isOpen, onClose }: AddToHomeScreenModalProps) {
  const [activeTab, setActiveTab] = useState<'ios' | 'android'>('ios');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Detect iOS vs Android user agent
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.includes('iphone') || ua.includes('ipad')) {
      setActiveTab('ios');
    } else if (ua.includes('android')) {
      setActiveTab('android');
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        onClose();
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add EliteEngine to Home Screen"
      description="Enjoy the full app experience with instant loading, offline workouts, and full-screen display."
      maxWidth="md"
    >
      <div className="space-y-6 pt-2">
        {/* Device Switcher */}
        <div className="flex p-1 bg-bg-secondary rounded-xl border border-border-default">
          <button
            type="button"
            onClick={() => setActiveTab('ios')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'ios'
                ? 'bg-bg-elevated text-text-primary shadow-xs border border-border-subtle'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <Smartphone size={14} />
            <span>iPhone / iPad (Safari)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('android')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'android'
                ? 'bg-bg-elevated text-text-primary shadow-xs border border-border-subtle'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <Download size={14} />
            <span>Android (Chrome)</span>
          </button>
        </div>

        {/* Instructions */}
        {activeTab === 'ios' ? (
          <div className="space-y-3.5 bg-bg-secondary p-4 rounded-2xl border border-border-default">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent-primary-muted text-accent-primary font-extrabold text-xs flex items-center justify-center shrink-0 border border-accent-primary/20">
                1
              </span>
              <div className="text-xs text-text-secondary leading-relaxed">
                Open <strong className="text-text-primary">Safari</strong> and navigate to this website.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent-primary-muted text-accent-primary font-extrabold text-xs flex items-center justify-center shrink-0 border border-accent-primary/20">
                2
              </span>
              <div className="text-xs text-text-secondary leading-relaxed flex items-center gap-1.5 flex-wrap">
                Tap the <strong className="text-text-primary inline-flex items-center gap-1 bg-bg-elevated px-2 py-0.5 rounded border border-border-subtle"><Share size={12} /> Share</strong> button in Safari's bottom toolbar.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent-primary-muted text-accent-primary font-extrabold text-xs flex items-center justify-center shrink-0 border border-accent-primary/20">
                3
              </span>
              <div className="text-xs text-text-secondary leading-relaxed flex items-center gap-1.5 flex-wrap">
                Scroll down and tap <strong className="text-text-primary inline-flex items-center gap-1 bg-bg-elevated px-2 py-0.5 rounded border border-border-subtle"><PlusSquare size={12} /> Add to Home Screen</strong>.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent-primary-muted text-accent-primary font-extrabold text-xs flex items-center justify-center shrink-0 border border-accent-primary/20">
                4
              </span>
              <div className="text-xs text-text-secondary leading-relaxed">
                Tap <strong className="text-accent-primary font-bold">Add</strong> in the top-right corner.
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3.5 bg-bg-secondary p-4 rounded-2xl border border-border-default">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent-primary-muted text-accent-primary font-extrabold text-xs flex items-center justify-center shrink-0 border border-accent-primary/20">
                1
              </span>
              <div className="text-xs text-text-secondary leading-relaxed">
                Open <strong className="text-text-primary">Google Chrome</strong> on your Android device.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent-primary-muted text-accent-primary font-extrabold text-xs flex items-center justify-center shrink-0 border border-accent-primary/20">
                2
              </span>
              <div className="text-xs text-text-secondary leading-relaxed flex items-center gap-1.5 flex-wrap">
                Tap the <strong className="text-text-primary inline-flex items-center gap-1 bg-bg-elevated px-2 py-0.5 rounded border border-border-subtle"><MoreVertical size={12} /> ⋮ menu</strong> icon in the top right.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent-primary-muted text-accent-primary font-extrabold text-xs flex items-center justify-center shrink-0 border border-accent-primary/20">
                3
              </span>
              <div className="text-xs text-text-secondary leading-relaxed flex items-center gap-1.5 flex-wrap">
                Select <strong className="text-text-primary inline-flex items-center gap-1 bg-bg-elevated px-2 py-0.5 rounded border border-border-subtle"><Download size={12} /> Install app</strong> (or "Add to Home screen").
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent-primary-muted text-accent-primary font-extrabold text-xs flex items-center justify-center shrink-0 border border-accent-primary/20">
                4
              </span>
              <div className="text-xs text-text-secondary leading-relaxed">
                Tap <strong className="text-accent-primary font-bold">Install</strong> to add EliteEngine directly to your launcher.
              </div>
            </div>

            {deferredPrompt && (
              <div className="pt-2">
                <Button
                  variant="primary"
                  fullWidth
                  icon={<Zap size={15} className="fill-black" />}
                  onClick={handleInstallClick}
                >
                  Direct 1-Click Install Now
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end">
          <Button variant="secondary" size="md" onClick={onClose}>
            Got It
          </Button>
        </div>
      </div>
    </Modal>
  );
}
