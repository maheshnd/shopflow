import Link from "next/link";

import { buttonStyles } from "@shopflow/ui";

import * as styles from "./home.css";

export function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>ShopFlow</p>

          <h1 className={styles.heroTitle}>
            Simple shopping. Fast checkout.
          </h1>

          <p className={styles.heroText}>
            Browse everyday products and manage your orders in one place.
          </p>

          <div className={styles.heroActions}>
            {/* Points at the preview section until a /products route exists. */}
            <a
              href="#products"
              className={buttonStyles({ variant: "primary", size: "lg" })}
            >
              Shop Now
            </a>

            <Link
              href="/signup"
              className={buttonStyles({ variant: "secondary", size: "lg" })}
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
