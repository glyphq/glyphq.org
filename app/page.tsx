import { HomeCta } from "@/components/home-cta";
import { HomeDiscord } from "@/components/home-discord";
import { HomeFaq } from "@/components/home-faq";
import { HomeFeatures } from "@/components/home-features";
import { HomeHero } from "@/components/home-hero";
import { HomeProducts } from "@/components/home-products";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HomeHero />
      <div className="bg-background">
        <HomeFeatures />
        <HomeProducts />
        <HomeFaq />
        <HomeDiscord />
        <HomeCta />
      </div>
    </div>
  );
}
