import { StateDependency } from "./types";
import Konva from "konva";


export const gridStore = ({get, set}: StateDependency) => {
   return {
    group: null,
    hide(){
        const { grid } = get();
        grid.group.hide();
    },
    show(){
        const { grid } = get();
        grid.group.show();
    },
    get build(){
        const { stage, layer, grid } = get();
        return () => {
            const padding = 20;
            const width = stage.width();
            const height = stage.height();
            console.log(width, height)
            const group = new Konva.Group();
            for (var i = 0; i < width / padding; i++) {
                group.add(new Konva.Line({
                  points: [Math.round(i * padding) + 0.5, 0, Math.round(i * padding) + 0.5, height],
                  stroke: '#ddd',
                  strokeWidth: 1,
                }));
            }
            for (var j = 0; j < height / padding; j++) {
                group.add(new Konva.Line({
                  points: [0, Math.round(j * padding), width, Math.round(j * padding)],
                  stroke: '#ddd',
                  strokeWidth: 0.5,
                }));
            }
            layer.add(group)
            set({ grid: {...grid, group}})
        }
    }
   }
}
