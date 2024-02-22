import React from "react";
import { Separator } from "@/components/ui/separator";
import SidebarButtonElement from "./SidebarButtonElement";
import { FormElements } from "@/components/builder/FormElements";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function FormElementsSidebar() {
  return (
    <div>
      <p className="text-sm text-foreground/70 p-4">Drag and drop elements</p>
      <Separator />
      <Accordion type="multiple" defaultValue={["layout", "form"]} className="w-full">
        <AccordionItem value="layout">
          <AccordionTrigger className="px-4 text-sm text-muted-foreground col-span-1 md:col-span-3 my-2 place-self-start">
            Layout elements
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center">
            <SidebarButtonElement formElement={FormElements.TitleField} />
            <SidebarButtonElement formElement={FormElements.SubTitleField} />
            <SidebarButtonElement formElement={FormElements.ParagraphField} />
            <SidebarButtonElement formElement={FormElements.SeparatorField} />
            <SidebarButtonElement formElement={FormElements.SpacerField} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="form">
          <AccordionTrigger className="px-4 text-sm text-muted-foreground col-span-1 md:col-span-3 my-2 place-self-start">
            Form elements
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center">
            <SidebarButtonElement formElement={FormElements.TextField} />
            <SidebarButtonElement formElement={FormElements.NumberField} />
            <SidebarButtonElement formElement={FormElements.TextAreaField} />
            <SidebarButtonElement formElement={FormElements.DateField} />
            <SidebarButtonElement formElement={FormElements.SelectField} />
            <SidebarButtonElement formElement={FormElements.CheckboxField} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default FormElementsSidebar;
