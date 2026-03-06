import { HeroSection } from '@/components/home/hero-section';
import { FeaturedCollections } from '@/components/home/featured-collections';
import { LookbookSection } from '@/components/home/lookbook-section';
import { SocialProof } from '@/components/home/social-proof';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <LookbookSection />
      <SocialProof />
    </>
  );
}
