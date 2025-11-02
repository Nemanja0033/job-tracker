import { importFile } from "@/actions/formActions";
import { Button } from "@/components/ui/button";

export function FileImportForm() {
  return (
    <form action={importFile} className="flex gap-2 justify-end">
      <input
        type="file"
        id="text"
        accept=".txt"
        className="hidden"
        name="text"
      />
      <label htmlFor="text">
        <Button type="button" asChild>
          <span>+ Import Text</span>
        </Button>
      </label>
      <Button type="submit">Submit</Button>
    </form>
  );
}
