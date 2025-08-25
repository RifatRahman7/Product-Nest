// app/page.js
import HeroSlider from "./Components/HeroSlider";
import ProductHighlights from "./Components/ProductHighlights";

export default function Home() {
  return (
    <main className="mt-5">
      <HeroSlider />
      <ProductHighlights />
    </main>
  );
}
