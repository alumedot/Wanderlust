const createVenueHTML = (name, location, iconSource, type) => {
    if (!location.hasOwnProperty('address')) {
        location.address = '';
    }

    return `<h2>${name}</h2>
  <img class="venueimage" src="${iconSource}"/>
  <div class="venueInfo">
      <h3>Type:</h3>
      <p>${type}</p>
      <h3>Address:</h3>
      <p>${location.address}</p>
      <p>${location.city}</p>
      <p>${location.country}</p>
  </div>`;
};

const createWeatherHTML = (currentDay) => {
    return `<h2> High: ${currentDay.day.maxtemp_c}</h2>
    <h2> Low: ${currentDay.day.mintemp_c}</h2>
    <img src="https://${currentDay.day.condition.icon}" class="weathericon" />
    <h2>${weekDays[(new Date(currentDay.date)).getDay()]}</h2>
    <h3> Sunrise: ${currentDay.astro.sunrise}</h3>
    <h3 class="sunset"> Sunset: ${currentDay.astro.sunset}</h3>`;
};