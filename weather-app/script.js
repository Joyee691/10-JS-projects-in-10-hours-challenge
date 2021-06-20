const apikey = '3265874a2c77ae4a04bb96236a642d2f';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (city) =>
	`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(location) {
	const resp = await fetch(url(location), {
		origin: 'cors',
	});
	const respData = await resp.json();

	console.log('respData:', respData);

	addWeatherToPage(respData);
}

function addWeatherToPage(data) {
	const temp = KtoC(data.main.temp);
	// console.log(temp);

	const weather = document.createElement('div');
	weather.classList.add('weather');

	weather.innerHTML = `
  <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
  <small>${data.weather[0].main}</small>
  `;

  main.innerHTML = '';
  main.appendChild(weather);
}

function KtoC(K) {
	return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e)=>{
  e.preventDefault();

  const location = search.value;
  if(location) {
    getWeatherByLocation(location);
  }
})

