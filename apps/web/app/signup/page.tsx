import * as styles from "@/features/auth/components/auth-form.css";
import {
  SignupForm,
} from "@/features/auth/components/signup-form";

export default function SignupPage() {
  return (
    <main className={styles.page}>
      <SignupForm />
    </main>
  );
}
