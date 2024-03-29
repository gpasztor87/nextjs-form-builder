import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { HiSaveAs } from "react-icons/hi";
import useDesigner from "@/hooks/useDesigner";
import { updateFormContent as update } from "@/actions/form";
import { toast } from "@/components/ui/use-toast";

function SaveFormButton({ id }: { id: number }) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const jsonContent = JSON.stringify(elements);
      await update(id, jsonContent);

      toast({
        title: "Success",
        description: "Your form has been saved"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      });
    }
  };

  return (
    <Button
      variant="outline"
      className="gap-2"
      disabled={loading}
      onClick={() => startTransition(updateFormContent)}>
      <HiSaveAs className="h-4 w-4" />
      Save
    </Button>
  );
}

export default SaveFormButton;
