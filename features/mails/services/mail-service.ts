export async function fetchGmail() {
    const res = await fetch("/api/gmail");
    const data = await res.json();
    console.log("@mails", data);
  };