"use client";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { sanitizeLabColors } from "@/helpers";
import { useState } from "react";
import Loader from "@/components/Loader";

const ExportToPdf = ({ tableRef, isDisabled }: { tableRef: any; isDisabled: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadPdf = async () => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 0));

    sanitizeLabColors(document.body);

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      await html2pdf()
        .set({ filename: "Applied_Job_List.pdf" })
        .from(tableRef)
        .save();
    } catch (err) {
      console.error("PDF export failed", err);
    }

    location.reload(); 
  };

  if (isLoading) {
    return <Loader type="WAITING_FOR_PDF" />;
  }

  return (
    <div>
      <Button disabled={isDisabled} onClick={handleDownloadPdf}>
        <Download />
        Export To PDF
      </Button>
    </div>
  );
};

export default ExportToPdf;
