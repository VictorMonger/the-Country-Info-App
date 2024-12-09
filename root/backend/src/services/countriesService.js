const axios = require("axios");

const {
  AVAILABLE_COUNTRIES_URL,
  COUNTRY_INFO_URL,
  COUNTRY_POPULATION_URL,
  COUNTRY_FLAG_URL,
} = process.env;

const getAvailableCountries = async () => {
  try {
    const response = await axios.get(AVAILABLE_COUNTRIES_URL);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch available countries");
  }
};

const getCountryInfo = async (countryCode) => {
  try {
    const bordersResponse = await axios.get(
      `${COUNTRY_INFO_URL}/${countryCode}`
    );

    const borderCountries = bordersResponse.data.borders;
    
    const populationResponse = await axios.post(COUNTRY_POPULATION_URL, {
      country: bordersResponse.data.commonName,
    });
    const populationData = populationResponse.data.data.populationCounts;

    const flagResponse = await axios.post(COUNTRY_FLAG_URL, {
      country: bordersResponse.data.commonName,
    });
    const flagUrl = flagResponse.data.data.flag;

    return {
      borders: borderCountries,
      population: populationData,
      flagUrl: flagUrl,
    };
  } catch (error) {
    throw new Error("Failed to fetch country info");
  }
};

module.exports = {
  getAvailableCountries,
  getCountryInfo,
};
