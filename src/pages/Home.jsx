import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToSection } from '../utils/scrollToSection';

import HeroSection from '../components/home/HeroSection';
import QuickActionsSection from '../components/home/QuickActionsSection';
import BenefitsSection from '../components/home/BenefitsSection';
import BrandsMarqueeSection from '../components/home/BrandsMarqueeSection';
import WhySection from '../components/home/WhySection';
import AdditionalServicesSection from '../components/home/AdditionalServicesSection';
import CategoriesSection from '../components/home/CategoriesSection';
import FeaturedProductsSection from '../components/home/FeaturedProductsSection';
import CatalogFormSection from '../components/home/CatalogFormSection';
import CtaBanner from '../components/home/CtaBanner';
import BranchSection from '../components/home/BranchSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CommunitySection from '../components/home/CommunitySection';
import Footer from '../components/Footer';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const section = location.state?.scrollTo;
    if (section) {
      const timer = setTimeout(() => {
        scrollToSection(section);
        window.history.replaceState({}, document.title);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="flex flex-col bg-brand-crema">
      <HeroSection />
      <QuickActionsSection />
      <BenefitsSection />
      <BrandsMarqueeSection />
      <TestimonialsSection />
      <WhySection />
      <AdditionalServicesSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <CatalogFormSection />
      <CtaBanner />
      <BranchSection />
      <CommunitySection />
      <CtaBanner />
      <Footer />
    </div>
  );
};

export default Home;
