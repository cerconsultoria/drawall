import Konva from "konva";

export const zoom = (stage: Konva.Stage, layer: Konva.Layer, deltaArg: number) => {
    const pointer = stage.getPointerPosition();
    const mousePointTo = {
        x: (pointer.x - layer.x()) / layer.attrs.scaleX,
        y: (pointer.y - layer.y()) / layer.attrs.scaleY,
    };
    const delta = deltaArg / 1000;
    const newScale = {
        x: layer.attrs.scaleX + delta,
        y: layer.attrs.scaleY + delta,
    }
    if(newScale.x < 0 || newScale.y < 0) return;
    layer.scale(newScale)
    const newPos = {
        x: pointer.x - mousePointTo.x * newScale.x,
        y: pointer.y - mousePointTo.y * newScale.y,
    };
    layer.position(newPos);
}
