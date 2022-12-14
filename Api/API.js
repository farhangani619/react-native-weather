const key = `aGKzJIvGomEcw4dXrxw2T67vkwilousA `;

export const searchLocation = (searchTerm) => {
    let API_URL = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${searchTerm}`;
    return fetch(API_URL, {
      method: "GET",
    });
};

export const searchWeather = (locationKey) => {
      let API_URL = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${key}`;
    //   let API_URL = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${key}`;
      return fetch(API_URL, {
        method: "GET",
      });
};

export const hourlyForecast = (locationKey) => {
    let API_URL = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${key}`;
      return fetch(API_URL, {
        method: "GET",
      });
}