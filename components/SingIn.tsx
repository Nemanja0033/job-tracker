"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { User } from "lucide-react";

export default function SignInButton() {
  const session = useSession();

  return (
    <div>
      {session.status === 'unauthenticated' ? (
        <Button className="w-full" variant={'outline'} onClick={() => signIn("google")}><User />Sign in with Google</Button>
      ): (
        <Button className="w-full" variant={'outline'} onClick={() => signOut()}><User /> Logout</Button>
      )}
    </div>
  ) 
}
