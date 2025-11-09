"use client";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Upload } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const initialFormState = {
  isSubmitting: false,
  isError: false,
  errorMessage: "",
  fileName: "",
};

export function FileImportForm({ isDisabled }: { isDisabled: boolean }) {
  const [formState, setFormState] = useState(initialFormState);
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ['jobs']});
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
    <form onSubmit={handleFormSubmit} className="flex justify-between items-center gap-2">
      {/* <span className="flex gap-2 text-xs text-gray-400 items-center"><Info size={15} /> Supported files to import is .txt files, and must contain "-" between each job title.</span> */}
      
      <div className="items-center gap-2 flex">
        {formState.isError && (
          <span className="text-red-500 text-sm ml-2">
            {formState.errorMessage}
          </span>
        )}
        <input
          disabled={isDisabled}
          type="file"
          id="text"
          accept=".txt"
          className="hidden"
          name="text"
        />
        <label htmlFor="text">
          <Button disabled={isDisabled} className={`${isDisabled && 'opacity-50'}`} type="button" asChild>
            <span><Upload /> Import</span>
          </Button>
        </label>
        <Button type="submit" disabled={formState.isSubmitting || isDisabled}>
          {formState.isSubmitting ? "Uploading..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
