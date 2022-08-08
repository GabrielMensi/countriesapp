import React, { useState, useEffect } from "react";
import './country-details.css'
import { useParams } from "react-router-dom";
import { apiURL } from "../util/api";
import { Link } from "react-router-dom";

const CountryDetails = () => {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { countryName } = useParams();

  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const name = await fetch(`${apiURL}/name/${countryName}`);

        if (!name.ok) throw new Error("Could not found!");

        const data = await name.json();

        setCountry(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    getCountryByName();
  }, [countryName]);

  return (
    <div className="wrapper_country-details">
      <button>
        <Link class="link" to="/home">Home</Link>
      </button>

      {isLoading && !error && <div className="loader">Cargando ⏳</div>}
      {error && !isLoading && { error }}

      {country?.map((country, index) => (
        <div className="country-details_container" key={index}>
          <div className="country-details_img">
            <img src={country.flags.png} alt="" />
          </div>

          <div className="country-details_description">
            <h3>{country.name.common}</h3>

            <div className="country-details_description_items">
              <h5>
                Population:{" "}
                <span>
                  {new Intl.NumberFormat().format(country.population)}
                </span>
              </h5>
              <h5>
                Region: <span>{country.region}</span>
              </h5>
              <h5>
                Sub Region: <span>{country.subregion}</span>
              </h5>
              <h5>
                Capital: <span>{country.capital}</span>
              </h5>
              <h5>
                Area: <span>{new Intl.NumberFormat().format(country.area)}</span>
              </h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryDetails;