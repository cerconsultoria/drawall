import { create } from 'zustand';
import Konva from 'konva';
import { zoom } from 'actions';
import { actionsStore } from './actions';
import { DrawallState, InitMainStateOptions } from './types';
import { gridStore } from './grid';
import { toolbarStore } from './toolbar';





export default create<DrawallState>((set, get, api) => ({
    container: null,
    stage: null,
    layer: null,
    actions: actionsStore({set, get}),
    grid: gridStore({set, get}),
    toolbar: toolbarStore({set, get}),
    init: (options: InitMainStateOptions) => {
        const { grid, toolbar } = get();

        const container: HTMLDivElement = document.createElement("drawall-container") as HTMLDivElement;
        container.style.display = "flex";
        container.style.flexDirection = "column-reverse";
        container.style.overflow = "hidden";
        container.style["max-width"] = `min(90vw, ${options.width}px)`;
        container.style["max-height"] = `min(90vh, ${options.height}px)`;

        const stage = new Konva.Stage({
            container,
            width: options.width,
            height: options.height,
            draggable: true
        })
        const layer = new Konva.Layer();
        set({container, stage, layer});

        toolbar.build(options.toolbar);
        grid.build();

        const circle = new Konva.Circle({
            fill: "red",
            radius: 200,
            x: 300,
            y: 300
        });

        const circle2 = new Konva.Circle({
            fill: "purple",
            radius: 100,
            x: 200,
            y: 100
        });


        layer.scale({
            x: 1,
            y: 1
        })

        layer.add(circle)
        layer.add(circle2)
        stage.addEventListener("wheel", (evt: WheelEvent) => {
            zoom(stage, layer, evt.deltaY);
        })
        stage.add(layer)



        stage.draw();

        container.querySelector("div").style.display = "block";
        container.querySelector("div").style.overflow = "hidden";
        container.querySelector("canvas").style.display = "block";
        container.querySelector("canvas").style.overflow = "hidden";
        container.querySelector("canvas").style.position = "relative";


        return container;
    }
}))
