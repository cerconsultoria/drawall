import { Toolbar } from "entities";
import { StateDependency } from "./types";
import "css/toolbar.css";


export const toolbarStore = (prop: StateDependency) => {
    const {get, set} = prop;
   return {
    container: null,
    get build(){
        const { container, toolbar } = get();
        return (toolbarArg?: Toolbar) => {
            const toolbarContainer = document.createElement("div");
            toolbarContainer.style.display = "flex";
            toolbarContainer.style.width = "99.8%";
            toolbarContainer.style.height = "300px";
            toolbarContainer.style["border"] = "1px solid black";
            toolbarContainer.style.borderTopLeftRadius = "12px";
            toolbarContainer.style.borderTopRightRadius = "12px";

            if(toolbar){
                const toolbarInner = toolbarArg.draw(prop);
                toolbarContainer.appendChild(toolbarInner);
            }

            container.appendChild(toolbarContainer);
            set({toolbar: {...toolbar, container: toolbarContainer}});
        }
    }
   }
}
