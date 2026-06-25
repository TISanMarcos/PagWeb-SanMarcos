import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../utils/scrollToSection';
import { getSectionPath } from '../constants/seo';

const ScrollNavLink = ({ sectionId, children, className = '', onClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const sectionPath = getSectionPath(sectionId);
  const href = sectionPath ?? `/#${sectionId}`;

  const handleClick = (e) => {
    e.preventDefault();
    onClick?.();

    if (sectionPath) {
      if (location.pathname === sectionPath) {
        scrollToSection(sectionId);
      } else {
        navigate(sectionPath);
      }
      return;
    }

    const onHome = location.pathname === '/';

    if (onHome) {
      scrollToSection(sectionId);
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default ScrollNavLink;
