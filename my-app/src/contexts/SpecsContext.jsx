import { createSignal, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

const SpecsContext = createContext();

export function SpecsProvider(props) {
  const specsStore = createStore({});

  return (
    <SpecsContext.Provider value={specsStore}>
      {props.children}
    </SpecsContext.Provider>
  );
}

export function useSpecs() { return useContext(SpecsContext); }