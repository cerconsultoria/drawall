import { Toolbar } from "entities";
import Konva from "konva";

export interface InitMainStateOptions {
    width: number;
    height: number;
    toolbar?: Toolbar
}

export interface DrawallState {
    container: HTMLElement,
    stage: Konva.Stage,
    layer: Konva.Layer,
    actions: Partial<{
        zoom: (delta:number) => void
    }>,
    grid: Partial<{
        group: Konva.Group,
        build: () => void,
        hide: () => void
        show: () => void
    }>,
    toolbar: Partial<{
        container: HTMLDivElement,
        build: (toolbar?: Toolbar) => void
    }>,
    init: (options: InitMainStateOptions) => void
}

export interface StateDependency {
    get: () => DrawallState,
    set: (values: Partial<DrawallState>, options?: any) => void
}
