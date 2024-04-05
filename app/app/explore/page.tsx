import BlogPreviewSection from '@/components/explore/BlogPreview';
import CallToActionPreview from '@/components/explore/Cta';
import ProductShowcase from '@/components/explore/FeatureShowcase';
import LandingPage from '@/components/explore/LandingPage';
import TestimonialsSection from '@/components/explore/Testimonials';

export default async function Explore() {
  return (
    <>
      <LandingPage />
      <TestimonialsSection />
      <ProductShowcase />
      <BlogPreviewSection />
      <CallToActionPreview />
    </>
  );
}
