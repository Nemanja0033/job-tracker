"use client";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { File } from "lucide-react";

const initialFormState = {
  isSubmitting: false,
  isError: false,
  errorMessage: "",
  fileName: "",
};

export function FileImportForm() {
  const [formState, setFormState] = useState(initialFormState);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState((perv) => ({...perv, isSubmitting: true}));

    const form = e.currentTarget;
    const fileInput = form.elements.namedItem("text") as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!file) {
      setFormState({
        isSubmitting: false,
        isError: true,
        errorMessage: "No file selected",
        fileName: ""
      });
      return;
    }

    const formData = new FormData();
    formData.append("text", file);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        const message =
          typeof errorData?.error === "string"
            ? errorData.error
            : "Upload failed";
        throw new Error(message);
      }

      setFormState((perv) => ({...perv, isSubmitting: false}));
      window.location.reload();
    } catch (err: any) {
      setFormState({
        isSubmitting: false,
        isError: true,
        errorMessage: err.message || "Unexpected error",
        fileName: ''
      });
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
      {formState.isError && (
        <span className="text-red-500 text-sm ml-2">
          {formState.errorMessage}
        </span>
      )}
      <input
        type="file"
        id="text"
        accept=".txt"
        className="hidden"
        name="text"
      />
      <label htmlFor="text">
        <Button type="button" asChild>
          <span><File /> Import</span>
        </Button>
      </label>
      <Button type="submit" disabled={formState.isSubmitting}>
        {formState.isSubmitting ? "Uploading..." : "Submit"}
      </Button>
    </form>
  );
}
