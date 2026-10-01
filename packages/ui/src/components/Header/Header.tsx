import type { ReactNode } from "react";

import * as styles from "./Header.css";

export type HeaderProps = {
  /** Logo / brand name, usually a link to the home page. */
  brand: ReactNode;
  /** Primary navigation links. */
  navigation?: ReactNode;
  /** Right-aligned actions (buttons, user info, ...). */
  actions?: ReactNode;
  /** Accessible name for the navigation landmark. */
  navigationLabel?: string;
};

/**
 * Generic page header layout. It only arranges the slots it is given —
 * apps decide what goes in them (e.g. auth-aware links).
 */
export function Header({
  brand,
  navigation,
  actions,
  navigationLabel = "Main",
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>{brand}</div>

        {navigation && (
          <nav aria-label={navigationLabel} className={styles.navigation}>
            {navigation}
          </nav>
        )}

        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </header>
  );
}
