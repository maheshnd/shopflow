import * as styles from "@/features/auth/components/auth-form.css";
import {
  LoginForm,
} from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <LoginForm />
    </main>
  );
}
