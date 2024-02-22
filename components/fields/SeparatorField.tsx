"use client";

import { ElementsType, FormElement, FormElementInstance } from "@/components/builder/FormElements";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RiSeparator } from "react-icons/ri";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerButtonElement: {
    icon: RiSeparator,
    label: "Separator"
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  
  validate: () => true
};

function DesignerComponent({ elementInstance}: { elementInstance: FormElementInstance }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Separator field</Label>
      <Separator />
    </div>
  );
}

function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {  
  return <Separator />;
}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  return <p>No properties for this element</p>;
}
