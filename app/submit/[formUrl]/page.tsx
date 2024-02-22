import React from "react";
import { getFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/builder/FormElements";
import FormSubmit from "@/components/submit/FormSubmit";

async function Page({ params }: { params: { formUrl: string }}) {
  const { formUrl } = params;
  const form = await getFormContentByUrl(formUrl);
  if (!form) {
    throw new Error("form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmit formUrl={formUrl} content={formContent} />;
}

export default Page;
