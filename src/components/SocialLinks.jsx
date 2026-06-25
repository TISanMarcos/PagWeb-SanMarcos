import FacebookIcon from './icons/FacebookIcon';
import InstagramIcon from './icons/InstagramIcon';
import { SOCIAL_LINKS } from '../constants/social';

const SocialLinks = ({ className = '', size = 'lg' }) => {
  const isLarge = size === 'lg';
  const buttonClass = isLarge
    ? 'inline-flex items-center justify-center min-h-[3.5rem] min-w-[3.5rem] px-5 py-3.5 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.04] transition-all text-white'
    : 'inline-flex items-center justify-center h-10 w-10 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.06] transition-all text-white';
  const iconClass = isLarge ? 'h-10 w-10 sm:h-11 sm:w-11' : 'h-5 w-5';

  return (
    <div
      className={`flex items-center justify-center gap-4 sm:gap-5 flex-wrap ${className}`}
    >
      <a
        href={SOCIAL_LINKS.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visitar Facebook de San Marcos Mascotas"
        className={`${buttonClass} bg-[#1877F2] hover:brightness-110`}
      >
        <FacebookIcon className={iconClass} />
      </a>
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visitar Instagram de San Marcos Mascotas"
        className={`${buttonClass} bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] hover:brightness-110`}
      >
        <InstagramIcon className={iconClass} />
      </a>
    </div>
  );
};

export default SocialLinks;
