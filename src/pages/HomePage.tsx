import HeroSection from "../components/home/HeroSection";
import ParallaxStory from "../components/home/ParallaxStory";
import ScentQuiz from "../components/home/ScentQuiz";
import ShowoffCollection from "../components/home/ShowoffCollection";
import SignatureExperience from "../components/home/SignatureExperience";
import LuxuryIngredients from "../components/home/LuxuryIngredients";
import FeaturedCollection from "../components/home/FeaturedCollection";
import EditorialTestimonials from "../components/home/EditorialTestimonials";
import Newsletter from "../components/home/Newsletter";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ScentQuiz />
      <ParallaxStory />
      <ShowoffCollection />
      <SignatureExperience />
      <LuxuryIngredients />
      <FeaturedCollection />
      <EditorialTestimonials />
      <Newsletter />
    </main>
  );
}
