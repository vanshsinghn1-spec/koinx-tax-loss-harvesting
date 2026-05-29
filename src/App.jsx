import { useEffect, useCallback } from "react";
import { HarvestingProvider, useHarvesting } from "./context/HarvestingContext";
import { fetchHoldings, fetchCapitalGains } from "./api/mockApi";
import Header from "./components/Header/Header";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import Disclaimer from "./components/Disclaimer/Disclaimer";
import CapitalGainsCard from "./components/CapitalGainsCard/CapitalGainsCard";
import HoldingsTable from "./components/HoldingsTable/HoldingsTable";
import { Loader, ErrorState } from "./components/Loader/Loader";
import "./App.css";

function AppContent() {
  const {
    capitalGains,
    afterHarvestingGains,
    savings,
    loading,
    error,
    setData,
    setError,
    setLoading,
  } = useHarvesting();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [holdingsData, capitalGainsData] = await Promise.all([
        fetchHoldings(),
        fetchCapitalGains(),
      ]);
      setData(holdingsData, capitalGainsData);
    } catch (err) {
      setError(err.message || "Failed to load data");
    }
  }, [setData, setError, setLoading]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={loadData} />;
  }

  const preGains = capitalGains?.capitalGains;

  return (
    <div className="app__content">
      {/* Title */}
      <div className="app__title-row app__animated">
        <h1 className="app__title">Tax Harvesting</h1>
        <span className="app__badge">FY 24-25</span>
        <HowItWorks />
      </div>

      {/* Disclaimer */}
      <div className="app__disclaimer app__animated app__animated--delay-1">
        <Disclaimer />
      </div>

      {/* Capital Gains Cards */}
      {preGains && afterHarvestingGains && (
        <div className="gains-cards-container app__animated app__animated--delay-2">
          <CapitalGainsCard
            variant="pre"
            title="Pre Harvesting"
            stcg={preGains.stcg}
            ltcg={preGains.ltcg}
          />
          <CapitalGainsCard
            variant="post"
            title="After Harvesting"
            stcg={afterHarvestingGains.stcg}
            ltcg={afterHarvestingGains.ltcg}
            savings={savings}
          />
        </div>
      )}

      {/* Holdings Table */}
      <div className="app__animated app__animated--delay-3">
        <HoldingsTable />
      </div>
    </div>
  );
}

function App() {
  return (
    <HarvestingProvider>
      <div className="app">
        <Header />
        <AppContent />
      </div>
    </HarvestingProvider>
  );
}

export default App;
