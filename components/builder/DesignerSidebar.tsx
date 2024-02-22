import React from "react";
import useDesigner from "@/hooks/useDesigner";
import FormElementsSidebar from "@/components/builder/FormElementsSidebar";
import PropertiesFormSidebar from "@/components/builder/PropertiesFormSidebar";

function DesignerSidebar() {
  const { selectedElement } = useDesigner();

  return (
    <aside className="w-[420px] max-w-[420px] flex flex-col flex-grow gap-2 border-l-2 border-muted bg-background overflow-y-auto h-full">
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
}

export default DesignerSidebar;
