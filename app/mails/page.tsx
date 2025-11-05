"use client"
import Loader from "@/components/Loader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchMails } from "@/features/mails/hooks/useFetchMails";

export default function MailsPags() {
  const { mails, isLoading } = useFetchMails();

  if(isLoading){
    return <Loader />
  }

  return (
    <main className="w-full h-screen flex justify-center items-start overflow-auto">
      <div className="w-5xl p-3 grid place-items-center gap-3">
        <span>mails</span>
        {mails.map((mail, i) => (
            <Card className="w-full h-auto" key={i}>
                <CardHeader>
                    <CardTitle className="font-normal">Sender: {mail.from}</CardTitle>
                </CardHeader>
                <CardDescription className="px-5 font-semibold text-lg">
                    <span>{mail.subject}</span>
                </CardDescription>
                <CardContent>
                    <p>{mail.snippet}</p>
                </CardContent>
            </Card>
        ))}
      </div>
    </main>
  );
}
