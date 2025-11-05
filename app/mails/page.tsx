"use client"
import Loader from "@/components/Loader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FiltersToolbar from "@/features/filters/components/FiltersToolbars";
import { useFilters } from "@/features/filters/hooks/useFilters";
import { Email, useFetchMails } from "@/features/mails/hooks/useFetchMails";

export default function MailsPags() {
  const { mails, isLoading } = useFetchMails();
  const { filteredData: mailsToDislplay, isStatusChanged, query, status, setQuery, setStatus, setIsStatusChanged } = useFilters(mails, "EMAIL");


  if(isLoading){
    return <Loader type="WAITING_FOR_PDF" />
  }

  return (
    <main className="w-full h-screen flex justify-center items-start overflow-auto">
      <div className="w-5xl p-3 grid place-items-center gap-3 mt-14">
        <FiltersToolbar filterType="EMAILS" isDisabled={false} searchTerm={query} status={status} handleSearch={(e) => setQuery(e.target.value)} showApplied={() => {}} showInterview={() => {}} showRejected={() => {}} reset={() => {}}  />
        {mailsToDislplay ? mailsToDislplay?.map((mail: Email, i: number) => (
            <Card className="w-full h-auto" key={i}>
                <CardHeader>
                    <CardTitle className="font-semibold">{mail.from}</CardTitle>
                </CardHeader>
                <CardDescription className="px-5 font-semibold text-lg">
                    <span>{mail.subject}</span>
                </CardDescription>
                <CardContent>
                    <p>{mail.snippet}</p>
                </CardContent>
            </Card>
        )) : null}
      </div>
    </main>
  );
}
