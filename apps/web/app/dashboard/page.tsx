import * as styles from "@/features/dashboard/components/dashboard-content.css";
import {
  DashboardContent,
} from "@/features/dashboard/components/dashboard-content";

export default function DashboardPage() {
  return (
    <main className={styles.page}>
      <DashboardContent />
    </main>
  );
}
