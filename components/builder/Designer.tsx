"use client";

import React from "react";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import useDesigner from "@/hooks/useDesigner";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import DesignerSidebar from "@/components/builder/DesignerSidebar";
import { ElementsType, FormElements } from "@/components/builder/FormElements";
import { cn } from "@/lib/utils";
import { idGenerator } from "@/lib/idGenerator";
import DesignerElementWrapper from "./DesignerElementWrapper";

function Designer() {
  const { elements, addElement, removeElement, selectedElement, setSelectedElement } = useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true
    }
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const { isSidebarBtnElement, isDesignerElement } = active.data.current || {};
      const { isDesignerDropArea, isTopHalfDesignerElement, isBottomHalfDesignerElement } = over.data.current || {};

      if (isSidebarBtnElement && isDesignerDropArea) {
        const type = active.data.current?.type as ElementsType;
        const newElement = FormElements[type].construct(idGenerator());

        addElement(elements.length, newElement);
        return;
      }

      const isDroppingOverDesignerElement = isTopHalfDesignerElement || isBottomHalfDesignerElement;
      const droppingSidebarBtnOverDesignerElement = isSidebarBtnElement && isDroppingOverDesignerElement;
      if (droppingSidebarBtnOverDesignerElement) {
        const type = active.data.current?.type as ElementsType;
        const newElement = FormElements[type].construct(idGenerator());

        const overId = over.data.current?.elementId;
        const overElementIndex = elements.findIndex(el => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error("element not found");
        }

        let indexForNewElement = overElementIndex;
        if (isBottomHalfDesignerElement) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, newElement);
        return;
      }

      if (isBottomHalfDesignerElement || isTopHalfDesignerElement && isDesignerElement) {
        const activeId = active.data.current?.elementId;
        const overId = over.data.current?.elementId;

        const activeElementIndex = elements.findIndex(el => el.id === activeId);
        const overElementIndex = elements.findIndex(el => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("element not found");
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        let indexForNewElement = overElementIndex;
        if (isBottomHalfDesignerElement) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, activeElement);
      }
    }
  });

  return (
    <div className="flex w-full h-full">
      <div
        onClick={(e) => {
          if (selectedElement) setSelectedElement(null);
        }}
        className="w-full transition-all duration-300 ease-in-out p-4">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary ring-inset"  
          )}>
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl font-bold text-muted-foreground flex flex-grow items-center">Drop here</p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map(element => <DesignerElementWrapper key={element.id} element={element} />)}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}

export default Designer;
