import Footer from '@/components/common/Footer';
import NavBar from '@/components/common/NavBar';
import BlogPreviewSection from '@/components/explore/BlogPreview';
import CallToActionPreview from '@/components/explore/Cta';
import ProductShowcase from '@/components/explore/FeatureShowcase';
import TestimonialsSection from '@/components/explore/Testimonials';
import LandingSection from '@/components/home/landingsection';

export default function Home() {
  return (
    <main>
      <NavBar />
      <LandingSection />
      <TestimonialsSection />
      <ProductShowcase />
      <BlogPreviewSection />
      <CallToActionPreview />
      {/* <BuildWithCreativity /> */}
      <Footer />
    </main>
  );
}
