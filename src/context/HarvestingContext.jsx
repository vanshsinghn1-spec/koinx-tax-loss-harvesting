import { createContext, useContext, useReducer, useMemo, useCallback } from "react";
import { getUniqueId } from "../utils/formatters";

const HarvestingContext = createContext(null);

const initialState = {
  holdings: [],
  capitalGains: null,
  selectedHoldings: new Set(),
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    case "SET_DATA":
      return {
        ...state,
        holdings: action.payload.holdings,
        capitalGains: action.payload.capitalGains,
        loading: false,
        error: null,
      };

    case "TOGGLE_HOLDING": {
      const newSelected = new Set(state.selectedHoldings);
      if (newSelected.has(action.payload)) {
        newSelected.delete(action.payload);
      } else {
        newSelected.add(action.payload);
      }
      return { ...state, selectedHoldings: newSelected };
    }

    case "TOGGLE_ALL": {
      const allIds = state.holdings.map((h) => getUniqueId(h));
      const allSelected = allIds.every((id) => state.selectedHoldings.has(id));
      const newSelected = allSelected ? new Set() : new Set(allIds);
      return { ...state, selectedHoldings: newSelected };
    }

    default:
      return state;
  }
}

export function HarvestingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleHolding = useCallback((id) => {
    dispatch({ type: "TOGGLE_HOLDING", payload: id });
  }, []);

  const toggleAll = useCallback(() => {
    dispatch({ type: "TOGGLE_ALL" });
  }, []);

  const setData = useCallback((holdings, capitalGains) => {
    dispatch({ type: "SET_DATA", payload: { holdings, capitalGains } });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: "SET_ERROR", payload: error });
  }, []);

  const setLoading = useCallback((loading) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  }, []);

  // Compute after-harvesting gains
  const afterHarvestingGains = useMemo(() => {
    if (!state.capitalGains) return null;

    const base = state.capitalGains.capitalGains;
    let stcgProfits = base.stcg.profits;
    let stcgLosses = base.stcg.losses;
    let ltcgProfits = base.ltcg.profits;
    let ltcgLosses = base.ltcg.losses;

    state.holdings.forEach((holding) => {
      const id = getUniqueId(holding);
      if (!state.selectedHoldings.has(id)) return;

      // Short-term
      if (holding.stcg.gain >= 0) {
        stcgProfits += holding.stcg.gain;
      } else {
        stcgLosses += Math.abs(holding.stcg.gain);
      }

      // Long-term
      if (holding.ltcg.gain >= 0) {
        ltcgProfits += holding.ltcg.gain;
      } else {
        ltcgLosses += Math.abs(holding.ltcg.gain);
      }
    });

    return {
      stcg: { profits: stcgProfits, losses: stcgLosses },
      ltcg: { profits: ltcgProfits, losses: ltcgLosses },
    };
  }, [state.capitalGains, state.holdings, state.selectedHoldings]);

  // Compute savings
  const savings = useMemo(() => {
    if (!state.capitalGains || !afterHarvestingGains) return 0;

    const base = state.capitalGains.capitalGains;
    const preNet =
      base.stcg.profits -
      base.stcg.losses +
      (base.ltcg.profits - base.ltcg.losses);
    const postNet =
      afterHarvestingGains.stcg.profits -
      afterHarvestingGains.stcg.losses +
      (afterHarvestingGains.ltcg.profits - afterHarvestingGains.ltcg.losses);

    return preNet - postNet;
  }, [state.capitalGains, afterHarvestingGains]);

  const value = {
    ...state,
    toggleHolding,
    toggleAll,
    setData,
    setError,
    setLoading,
    afterHarvestingGains,
    savings,
  };

  return (
    <HarvestingContext.Provider value={value}>
      {children}
    </HarvestingContext.Provider>
  );
}

export function useHarvesting() {
  const context = useContext(HarvestingContext);
  if (!context) {
    throw new Error("useHarvesting must be used within a HarvestingProvider");
  }
  return context;
}
