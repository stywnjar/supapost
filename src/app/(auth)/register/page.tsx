import { AuthFooter, AuthHeader, RegisterForm } from "@/components/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <main>
      <AuthHeader title="Register" description="create account to continue" />
      <RegisterForm />
      <AuthFooter
        href="/login"
        description="already have account ? Login here"
      />
    </main>
  );
}
