import { FeatureSection } from "./feature-section";
import { HeroSection } from "./hero-section";
import { ProductPreviewSection } from "./product-preview-section";

import * as styles from "./home.css";

// Public page: no auth checks here. The global AppHeader (root layout)
// shows guest or user actions on its own.
export function LandingPageContent() {
  return (
    <>
      <main>
        <HeroSection />
        <ProductPreviewSection />
        <FeatureSection />
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          ShopFlow · Simple shopping. Fast checkout.
        </div>
      </footer>
    </>
  );
}
