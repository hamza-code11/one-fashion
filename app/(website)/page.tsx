import Hero from "@/components/website/home/Hero/Hero";
import CategoryShowcase from "@/components/website/home/CategoryShowcase/CategoryShowcase";
import NewArrivals from "@/components/website/home/NewArrivals/NewArrivals";
import PromoBanner from "@/components/website/home/PromoBanner/PromoBanner";
import StatsBar from "@/components/website/home/StatsBar/StatsBar";
import Collection from "@/components/website/home/Collection/Collection";
import InstagramGallery from "@/components/website/home/InstagramGallery/InstagramGallery";
import OurStory from "@/components/website/home/OurStory/OurStory";
import Newsletter from "@/components/website/home/Newsletter/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <NewArrivals />
      <PromoBanner />
      <StatsBar />
      <Collection />
      <OurStory />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
