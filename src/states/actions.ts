import { curry } from "ramda";
import { zoom } from "actions";
import { StateDependency } from "./types";


export const actionsStore = ({get, set}: StateDependency) => {
   return {
    get zoom(){
        const {stage, layer} = get()
        return curry(zoom)(stage, layer);
    }
   }
}
