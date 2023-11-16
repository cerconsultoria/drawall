import { StateDependency } from "states/types";
import { ToolbarItem } from "./item";

export const ToolbarItemAbstract = ToolbarItem;

export class Toolbar {
    #items: ToolbarItem[] = [];

    addItem(item: ToolbarItem){
        this.#items.push(item);
    }

    draw(prop: StateDependency){
        const container = document.createElement("div");
        container.style.display = "flex";
        // container.style.backgroundColor = "red";
        container.style.flexDirection = "row";
        container.style.justifyContent = "space-between";

        const onClickFactory = (el: HTMLElement, item: ToolbarItem) => (evt: MouseEvent) => {
            item.onClick(evt, prop);
        }

        this.#items.forEach(item => {
            const el = item.draw()
            el.container.addEventListener("click", onClickFactory(el.container, item));
            container.appendChild(el.container);
        })

        return container;
    }
}
