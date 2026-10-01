import { Card } from "@shopflow/ui";

import * as styles from "./home.css";

const features = [
  {
    icon: "⚡",
    title: "Fast Shopping",
    text: "Find what you need quickly and check out in a few steps.",
  },
  {
    icon: "🔒",
    title: "Secure Account",
    text: "Session-based sign-in with secure, HttpOnly cookies.",
  },
  {
    icon: "📦",
    title: "Track Orders",
    text: "Keep an eye on every order from one simple dashboard.",
  },
];

export function FeatureSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionHeading}>Why ShopFlow</h2>
        <p className={styles.sectionIntro}>
          Everything you need, nothing you don&apos;t.
        </p>

        <div className={styles.grid}>
          {features.map((feature) => (
            <Card key={feature.title}>
              <div className={styles.featureIcon} aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureText}>{feature.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
