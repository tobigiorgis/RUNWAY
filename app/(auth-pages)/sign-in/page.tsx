import Link from "next/link";
import { signInAction, signInWithGoogle } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GoogleSignInButton } from "@/components/Buttons/GoogleSignInButton";

export default async function Login(props: { searchParams: Promise<Message> }) {
  
  const searchParams = await props.searchParams;

  // async function handleSignInWithGoogle(response) {
  //   const { data, error } = await supabase.auth.signInWithIdToken({
  //     provider: 'google',
  //     token: response.credential,
  //   })
  // }

  return (
    <form className="flex-1 flex flex-col md:mt-40 w-full items-center justify-center">
      <h1 className="text-2xl font-medium flex md:w-1/4 items-start">Yoooo, welcome back!</h1>
      <p className="text-sm text-foreground flex md:w-1/4 items-start gap-2">
        First time here?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8 md:w-1/4">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" className="w-full focus:outline-none border-white" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          className="focus:outline-none border-white"
          placeholder="Your password"
          required
        />
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
      <span className="text-xs text-dark">or</span>
      <GoogleSignInButton/>
    </form>
  );
}
