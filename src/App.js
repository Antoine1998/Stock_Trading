import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import StockOverViewPage from "./Pages/StockOverViewPage";
import StockDetailPage from "./Pages/StockDetailPage";

function App() {
  return (
    <main className="containers">
      <Router>
        <Routes>
            <Route path="/" element={<StockOverViewPage />} />

          <Route path="/detail/:symbol" element={<StockDetailPage />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
