"use client";

import { useEffect } from "react";
import useDesigner from "@/hooks/useDesigner";
import { ElementsType, FormElement, FormElementInstance } from "@/components/builder/FormElements";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { LuSeparatorHorizontal } from "react-icons/lu";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const type: ElementsType = "SpacerField";

const extraAttributes = {
  height: 20, // px
};

const propertiesSchema = z.object({
  height: z.number().min(5).max(200),
});

export const SpacerFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes
  }),
  designerButtonElement: {
    icon: LuSeparatorHorizontal,
    label: "Spacer"
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { height } = element.extraAttributes;
  
  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <Label className="text-muted-foreground">Spacer: {height}px</Label>
      <LuSeparatorHorizontal className="w-8 h-8" />
    </div>
  );
}

function FormComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;

  const { height } = element.extraAttributes;
  
  return <div style={{ height, width: "100%" }}></div>
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;

  const { updateElement } = useDesigner();
  const { height } = element.extraAttributes;

  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: { height }
  });

  useEffect(() => form.reset(element.extraAttributes), [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { height } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        height
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => e.preventDefault()}
        onBlur={form.handleSubmit(applyChanges)}
        className="space-y-3">
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (px): {form.watch("height")}</FormLabel>
              <FormControl className="pt-2">
                <Slider
                  defaultValue={[field.value]}
                  min={5}
                  max={200}
                  step={1}
                  onValueChange={([value]) =>field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
