import { StateCreator, StoreApi } from "zustand";

type KeepProps<T, TFilter> = Pick<T, { [K in keyof T]: T[K] extends TFilter ? K : never }[keyof T]>;

export function combineStore<TNestedState, TOriginal, TKey extends keyof KeepProps<TOriginal, TNestedState>>(
  creator: StateCreator<TNestedState>,
  originalApi: StoreApi<TOriginal>,
  key: TKey
): Pick<TOriginal, TKey> {
  type InnerStore = TOriginal[TKey];

  const api: StoreApi<InnerStore> = {
    setState: nestedSetState(originalApi, key),
    getState: nestedGetState(originalApi, key),
    subscribe: (listener: (state: InnerStore, prevState: InnerStore) => void) => () => {
      return originalApi.subscribe((state, prevState) => {
        listener(state[key], prevState[key]);
      });
    },
    destroy: originalApi.destroy
  };

  // we need to cast it, because somehow typescript don't recognize that the TNestedState is the same as TOriginal[TKey]
  const nestedApi = api as StoreApi<TNestedState>;

  return { [key]: creator(nestedApi.setState, nestedApi.getState, nestedApi) } as Pick<TOriginal, TKey>;
}

function nestedGetState<TStore, TKey extends keyof TStore>(
  store: StoreApi<TStore>,
  key: TKey
): StoreApi<TStore[TKey]>["getState"] {
  return () => store.getState()[key];
}

function nestedSetState<TStore, TKey extends keyof TStore>(
  store: StoreApi<TStore>,
  key: TKey
): StoreApi<TStore[TKey]>["setState"] {
  return (partial, replace) => {
    const prevNestedState = nestedGetState(store, key)();
    const newPartial = partial instanceof Function ? partial(prevNestedState) : partial;
    const newNestedState: TStore[TKey] = replace ? newPartial as TStore[TKey] : { ...prevNestedState, ...newPartial };
    const prevState = store.getState();
    const newState: TStore = { ...prevState, [key]: newNestedState };
    store.setState(newState);
  };
}
