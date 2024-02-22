import React, { useState } from "react";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { SidebarButtonElementDragOverlay } from "@/components/builder/SidebarButtonElement";
import { ElementsType, FormElements } from "@/components/builder/FormElements";
import useDesigner from "@/hooks/useDesigner";

function DragOverlayWrapper() {
  const { elements } = useDesigner();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => setDraggedItem(event.active),
    onDragCancel: () => setDraggedItem(null),
    onDragEnd: () => setDraggedItem(null)
  });

  if (!draggedItem) return null;

  let node;
  const isSidebarBtnElement = draggedItem.data.current?.isSidebarBtnElement;
  if (isSidebarBtnElement) {
    const type = draggedItem.data.current?.type as ElementsType;
    node = <SidebarButtonElementDragOverlay formElement={FormElements[type]} />
  }

  const isDesignerElement = draggedItem.data.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem.data.current?.elementId;
    const element = elements.find(element => element.id === elementId);
    if (!element) node = <div>Element not found</div>;
    else {
      const DesignedElementComponent = FormElements[element.type].designerComponent;
      node = (
        <div className="flex bg-accent border rounded-md h-[120px] px-4 py-2 opacity-80 pointer pointer-events-none">
          <DesignedElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return (
    <DragOverlay>{node}</DragOverlay>
  );
}

export default DragOverlayWrapper;
