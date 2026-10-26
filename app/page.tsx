import { HomeCta } from "@/components/home-cta";
import { HomeFeatures } from "@/components/home-features";
import { HomeHero } from "@/components/home-hero";
import { HomeProducts } from "@/components/home-products";
import { HomeTrust } from "@/components/home-trust";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HomeHero />
      <HomeFeatures />
      <HomeProducts />
      <HomeTrust />
      <HomeCta />
    </div>
  );
}
