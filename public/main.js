// Foursquare API Info
const clientId = 'IKARGHU2ON41HG2NDFSZJWQ0A52OXHRUVXVT1SCSSGKSPMEK';
const clientSecret = 'MO20H35A4RRCNJIAHQD0BAYOFVUGO1V5R1TKK1K1HUAUJZ5F';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// APIXU Info
const apiKey = 'b89aa22be222482391964702192206';
const forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4"), $("#weather5"), $("#weather6"), $("#weather7")];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//function get current date
function yyyymmdd() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const mm = month < 10 ? '0' + month : month;
    const dd = day < 10 ? '0' + day : day;
    return '' + year + mm + dd;
}
const curDate = yyyymmdd();

//AJAX functions:
const getVenues = async () => {
    const city = $input.val();
    const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=${curDate}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
            console.log(venues);
            return venues;
        }
    } catch(error) {
        console.log(error);
    }
}

const getForecast = async() => {
    const city = $input.val();
    const urlToFetch = `${forecastUrl}${apiKey}&q=${city}&days=7&hour=11`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const days = jsonResponse.forecast.forecastday;
            console.log(days);
            return days;
        }
    } catch(error) {
        console.log(error);
    }
}


// Render functions:
const renderVenues = (venues) => {
    $venueDivs.forEach(($venue, index) => {
        const venue = venues[index];
        const venueIcon = venue.categories[0].icon;
        const type = venue.categories[0].shortName;
        const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
        let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc, type);
        $venue.append(venueContent);
    });
    $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const renderForecast = (days) => {
    $weatherDivs.forEach(($day, index) => {
        const currentDay = days[index];
        let weatherContent = createWeatherHTML(currentDay);
        $day.append(weatherContent);
    });
};

const executeSearch = () => {
    $venueDivs.forEach(venue => venue.empty());
    $weatherDivs.forEach(day => day.empty());
    $destination.empty();
    $container.css("visibility", "visible");
    getVenues().then(venues => renderVenues(venues));
    getForecast().then(forecast => renderForecast(forecast));
    return false;
};

$submit.click(executeSearch);
