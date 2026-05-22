import { ChevronDown } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useContactFlow } from '../../hooks/useContactFlow';

const UserProfileBadge = () => {
  const userProfile = useAppStore((s) => s.userProfile);
  const { requestProfileChange } = useContactFlow();

  if (!userProfile) return null;

  return (
    <button
      type="button"
      onClick={requestProfileChange}
      className="hidden md:inline-flex items-center gap-1.5 max-w-[200px] px-3 py-1.5 rounded-full bg-brand-beige/80 border border-brand-beige text-xs font-amsi font-bold text-brand-verde-oscuro hover:border-brand-naranja transition-colors truncate"
      title="Cambiar tipo de cliente"
    >
      <span className="truncate">Soy: {userProfile.label}</span>
      <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 opacity-60" />
    </button>
  );
};

export default UserProfileBadge;
