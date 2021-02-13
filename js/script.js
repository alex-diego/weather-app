const App = {
  search() {
    const city = DOM.input.value;
    const key = '55ad43d6f008f8766ad4b6c58faa27d9';
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;

    if (city === "") {
      alert("Por Favor digite o nome de uma cidade!");
      return;
    }

    const getWeather = async () => {
      const response = await fetch(api)
      const data = await response.json()

      return data
    }

    getWeather().then((data) => {
      DOM.renderLayout(data)
    })
  }
}

const DOM = {
  input: document.querySelector('input.search-city'),
  container: document.querySelector('.container'),

  toggleContainer() {
    DOM.container.classList.add('initial');
  },

  renderLayout(data) {
    const layout = `
    <div class="info-container">
      <div class="main-info">
        <h1 class="city">${data.name}</h1>
        <h2 class="degrees">${Number(data.main.temp).toFixed(0)}<span>Cº</span></h2>
      </div>
      <div class="icon-container">
        <img src="./img/icons/${data.weather[0].icon}.png" alt="${data.weather[0].description}" class="icon">
      </div>
    </div>
    <div class="min-max-container">
      <span class="min-max">MIN - MAX</span>
      <div class="info-bar">
        <span>${data.main.temp_min}Cº</span>
        <div class="bar-container">
          <div class="blue-bar"></div>
          <div class="red-bar"></div>
        </div>
        <span>${data.main.temp_max}Cº</span>
      </div>
    </div>
    `

    DOM.container.innerHTML = layout;
    DOM.toggleContainer();
  }
}