import React, { useState, useEffect } from "react";
import { apiURL } from "../util/api";
import './all-countries.css'
import Search from "../search/search";
import Filter from "../filter/filter";
import { Link } from "react-router-dom";

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getAllCountries = async () => {
    try {
      const all = await fetch(`${apiURL}/all`);
      if (!all.ok) throw new Error("Algo salió mal!");

      const data = await all.json();
      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByName = async (countryName) => {
    try {
      const name = await fetch(`${apiURL}/name/${countryName}`);
      if (!name.ok) throw new Error("Not found any country!");

      const data = await name.json();
      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByRegion = async (regionName) => {
    try {
      const region = await fetch(`${apiURL}/region/${regionName}`);
      if (!region.ok) throw new Error("Failed..........");

      const data = await region.json();
      setCountries(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(false);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <div className="wrapper_all-countries">
      <div className="search-and-filter">
        <div className="gabriel-m">
          <h3>HECHO POR GABRIEL MENSI</h3>
        </div>
        <div className="search">
          <Search onSearch={getCountryByName} />
        </div>
        <div className="gabriel-d">
          <h3>HECHO POR GABRIEL MENSI</h3>
        </div>
        <div className="filter">
          <Filter onSelect={getCountryByRegion} />
        </div>
      </div>

      <div className="country_cards">
        {isLoading && !error && <div className="loader">Cargando ⏳</div>}
        {error && !isLoading && <h4>{error}</h4>}

        {countries?.map((country) => (
          <Link to={`/country/${country.name.common}`}>
            <div className="country_card">
              <div className="country_img">
                <img src={country.flags.png} alt="" />
              </div>

              <div className="country_data">
                <h3>{country.name.common}</h3>
                <h6>
                  {" "}
                  Population:{" "}
                  {new Intl.NumberFormat().format(country.population)}
                </h6>
                <h6>Region: {country.region}</h6>
                <h6>Capital: {country.capital}</h6>
              </div>
            </div>

            
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCountries;