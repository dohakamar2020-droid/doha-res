import { Hero } from "@/components/home/Hero";
import { CategoryCards } from "@/components/home/CategoryCards";
import { FeaturedRecipes } from "@/components/home/FeaturedRecipes";
import { LatestRecipes } from "@/components/home/LatestRecipes";

export const metadata = {
  title: "الرئيسية",
  description: "عصرة | ASRA — وصفات عصائر عربية طازجة.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryCards />
      <FeaturedRecipes />
      <LatestRecipes />
    </>
  );
}
