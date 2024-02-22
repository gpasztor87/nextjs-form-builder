import React from "react";
import useDesigner from "@/hooks/useDesigner";
import { FormElements } from "./FormElements";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AiOutlineClose } from "react-icons/ai";

function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;

  const PropertiesForm = FormElements[selectedElement.type].propertiesComponent;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-4 py-2">
        <p className="text-sm text-foreground/70">Element properties</p>
        <Button size="icon" variant="ghost" onClick={() => setSelectedElement(null)}>
          <AiOutlineClose />
        </Button>
      </div>
      <Separator />
      <div className="p-4">
        <PropertiesForm elementInstance={selectedElement} />
      </div>
    </div>
  );
}

export default PropertiesFormSidebar;
