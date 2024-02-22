import React from "react";
import { TitleFieldFormElement } from "@/components/fields/TitleField";
import { SubTitleFieldFormElement } from "@/components/fields/SubTitleField";
import { ParagraphFieldFormElement } from "@/components/fields/ParagraphField";
import { SeparatorFieldFormElement } from "@/components/fields/SeparatorField";
import { SpacerFieldFormElement } from "@/components/fields/SpacerField";
import { TextFieldFormElement } from "@/components/fields/TextField";
import { NumberFieldFormElement } from "@/components/fields/NumberField";
import { TextAreaFieldFormElement } from "@/components/fields/TextAreaField";
import { DateFieldFormElement } from "@/components/fields/DateField";
import { SelectFieldFormElement } from "@/components/fields/SelectField";
import { CheckboxFieldFormElement } from "@/components/fields/CheckboxField";

export type ElementsType =
  | "TitleField" 
  | "SubTitleField" 
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField" 
  | "TextField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "CheckboxField"
  | "SelectField";

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerButtonElement: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  TextField: TextFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
};
