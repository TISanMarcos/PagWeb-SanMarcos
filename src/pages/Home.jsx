import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToSection } from '../utils/scrollToSection';
import { getSectionFromPath } from '../constants/seo';

import HeroSection from '../components/home/HeroSection';
import QuickActionsSection from '../components/home/QuickActionsSection';
import BenefitsSection from '../components/home/BenefitsSection';
import PromotionsSection from '../components/home/PromotionsSection';
import BrandsMarqueeSection from '../components/home/BrandsMarqueeSection';
import AdditionalServicesSection from '../components/home/AdditionalServicesSection';
import DeliveryServiceSection from '../components/home/DeliveryServiceSection';
import CategoriesSection from '../components/home/CategoriesSection';
import FeaturedProductsSection from '../components/home/FeaturedProductsSection';
import CatalogFormSection from '../components/home/CatalogFormSection';
import CtaBanner from '../components/home/CtaBanner';
import AboutSection from '../components/home/AboutSection';
import BranchSection from '../components/home/BranchSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import Footer from '../components/Footer';
import { featureFlags } from '../constants/featureFlags';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const section = location.state?.scrollTo ?? getSectionFromPath(location.pathname);
    if (!section) return;

    const timer = setTimeout(() => {
      scrollToSection(section);
      if (location.state?.scrollTo) {
        window.history.replaceState({}, document.title);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname, location.state]);

  return (
    <div className="flex flex-col bg-brand-crema overflow-x-hidden w-full">
      <HeroSection />
      <QuickActionsSection />
      <BenefitsSection />
      {featureFlags.catalogFormSection && <CatalogFormSection />}
      <PromotionsSection />
      <BrandsMarqueeSection />
      <FeaturedProductsSection />
      <AdditionalServicesSection />
      <DeliveryServiceSection />
      {featureFlags.categoriesSection && <CategoriesSection />}
      <CtaBanner />
      <TestimonialsSection />
      <AboutSection />
      <BranchSection />
      <CtaBanner />
      <Footer />
    </div>
  );
};

export default Home;
