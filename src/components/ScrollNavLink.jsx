import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../utils/scrollToSection';

const ScrollNavLink = ({ sectionId, children, className = '', onClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    onClick?.();

    const onHome = location.pathname === '/' || location.pathname === '';

    if (onHome) {
      scrollToSection(sectionId);
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <a href={`#${sectionId}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default ScrollNavLink;
