"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Popover } from "./ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Card } from "./ui/card";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "./ui/button";

const AVATAR_PLACEHOLDER = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";

export default function AuthToggler() {
  const session = useSession();

  console.log("@session", session.data?.user?.image)
  return (
    <div>
      <Popover>
        <PopoverTrigger className="flex cursor-pointer p-2 rounded-lg hover:bg-gray-100 items-center gap-2">
          <img className="w-10 h-10 rounded-lg" src={session.status === 'unauthenticated' ? AVATAR_PLACEHOLDER : session.data?.user?.image as any} alt="" />
          <div className="grid place-items-start">
           {session.status === 'authenticated' ? (
            <>
             <span className="text-gray-600 text-sm">{session.data?.user?.name}</span>
             <span className="text-gray-600 text-[10px]">{session.data?.user?.email}</span>
            </>
           ): (
            <div className="grid gap-1">
             <div className="bg-gray-200 w-24 h-3 text-sm"></div>
             <div className="bg-gray-200 w-32 h-2 text-[11px]"></div>
            </div>
           )}
          </div>          
        </PopoverTrigger>
        <PopoverContent className="w-32">
          <Card className="p-3">
            {session.status === 'authenticated' ? (
              <Button onClick={() => signOut()}><LogOut />Logout</Button>
            ) : (
              <Button onClick={() => signIn('google')}><LogIn />Sign in</Button>
            )}
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  ) 
}
