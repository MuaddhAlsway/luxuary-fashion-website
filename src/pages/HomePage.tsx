import HeroSection from "../components/home/HeroSection";
import HorizontalScroll from "../components/home/HorizontalScroll";
import ShowoffCollection from "../components/home/ShowoffCollection";
import SignatureExperience from "../components/home/SignatureExperience";
import LuxuryIngredients from "../components/home/LuxuryIngredients";
import FeaturedCollection from "../components/home/FeaturedCollection";
import EditorialTestimonials from "../components/home/EditorialTestimonials";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HorizontalScroll />
      <ShowoffCollection />
      <SignatureExperience />
      <LuxuryIngredients />
      <FeaturedCollection />
      <EditorialTestimonials />
    </main>
  );
}
