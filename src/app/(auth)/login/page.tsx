import { AuthFooter, AuthHeader, LoginForm } from "@/components/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main>
      <AuthHeader title="Login" description="login use your account" />
      <LoginForm />
      <AuthFooter
        href="/register"
        description="doesn't have account yet? Register here"
      />
    </main>
  );
}
