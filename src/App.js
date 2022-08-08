import "./app.css";
import { Routes, Route } from "react-router-dom";
import AllCountries from "./components/all-countries/all-countries";
import CountryDetails from "./components/country-details/country-details";

function App() {
  return (
    <>
      <header className="header">
        <div className="container">
          <h3>APP COUNTRIES</h3>
        </div>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<AllCountries />} />
          <Route path="/country/:countryName" element={<CountryDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;