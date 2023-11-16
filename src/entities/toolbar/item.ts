import { NotImplementedError } from "entities/error/notImplemented";
import { StateDependency } from "states/types";

export class ToolbarItem {
    #label = ""
    #image = ""
    container: HTMLElement

    constructor(label: string, image: string){
        this.#image = image;
        this.#label = label;
    }

    draw(){
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.justifyContent = "space-evenly";
        container.style.alignItems = "center";
        container.style.width = "63px";
        container.style.height = "100%";
        container.style.border = "1px solid transparent";
        container.style.borderRadius = "12px";
        container.style.gap = "2px";
        container.style.cursor = "pointer";

        const icon = document.createElement("img");
        icon.src = this.#image;
        icon.style.width = "25px";
        icon.style.height = "auto";
        container.appendChild(icon);

        const label = document.createElement("label");
        label.innerText = this.#label;
        label.style.width = "30px";
        label.style.height = "auto";
        container.appendChild(label);
        this.container = container;


        return this;
    }

    onClick(evt: MouseEvent, prop: StateDependency){
        throw new NotImplementedError()
    }


}
