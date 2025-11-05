"use client";

import { Button } from "./ui/button";

export default function GmailFetcher()  {
  const fetchGmail = async () => {
    const res = await fetch("/api/gmail");
    const data = await res.json();
    console.log("@mails", data);
  };

  return <Button onClick={fetchGmail}>Fetch Gmail</Button>;
};
