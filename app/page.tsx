import { HeroSection } from '@/components/home/hero-section';
import { FeaturedCollections } from '@/components/home/featured-collections';
import { SocialProof } from '@/components/home/social-proof';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <SocialProof />
    </>
  );
}
