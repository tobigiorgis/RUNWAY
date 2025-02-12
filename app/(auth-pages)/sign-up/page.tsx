import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { GoogleSignInButton } from "@/components/Buttons/GoogleSignInButton";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col mx-auto mt-40 w-full items-center justify-center">
        <h1  className="font-bold text-xl md:w-1/4">Create a Runway account</h1>
        <p className="text-sm text text-foreground md:w-1/4">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8 md:w-1/4">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" className="bg-black text-white rounded px-2 py-1 mt-2 w-full focus:outline-none " required />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
            className="bg-black text-white rounded px-2 py-1 mt-2 w-full focus:outline-none "
          />
          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            Create account
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
        <span className="text-xs text-dark">or</span>
        <GoogleSignInButton/>
      </form>
      {/* <SmtpMessage /> */}
    </>
  );
}
