const express = require("express");
const router = express.Router();
const countriesService = require("../services/countriesService");

router.get("/available", async (request, response) => {
  try {
    const countries = await countriesService.getAvailableCountries();
    response.status(200).json(countries);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.get("/:countryCode", async (request, response) => {
  const { countryCode } = request.params;
  try {
    const countryInfo = await countriesService.getCountryInfo(countryCode);
    response.status(200).json(countryInfo);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = router;
