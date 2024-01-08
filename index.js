const time = document.querySelector('.time');
const dateNode = document.querySelector('.date');
const name = document.querySelector('.name');
const greeting = document.querySelector('.greeting');

const showDate = () => {
  const date = new Date();
  const options = {month: 'long', day: 'numeric', weekday: "long"};
  const currentDate = date.toLocaleDateString('en', options);
  dateNode.textContent = currentDate;
}

const getTimeOfDay = () => {
  const date = new Date();
  const hour = date.getHours();
  if(hour >= 0 && hour < 6){
      return 'nigh';
  }else if(hour >= 6 && hour < 12){
      return 'morning';
  }else if(hour >= 12 && hour < 18){
      return 'afternoon';
  }else{
      return 'evening';
  }
}

const showGreeting = () => {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  greeting.textContent = greetingText;
}

const showTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();  
  time.textContent = currentTime;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}

showTime();

function setLocalStorageName() {
  localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorageName)

function getLocalStorageName() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorageName);


//bg_slider
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

const getRandomNum = (max) => {
  return Math.floor(Math.random() * max);
};

let imgNum = getRandomNum(20) + 1;

const slidePrevHandleClick = () => {
  imgNum--; 
  if(imgNum == 0){
    imgNum = 20;
  }
  if(String(imgNum).length < 2){
    imgNum = `0${String(imgNum)}`;
  }
  setBg();
}
slidePrev.addEventListener('click', slidePrevHandleClick);

const slideNextHandleClick = () => {
  imgNum++;
  if(imgNum == 21){
    imgNum = 1;
  }
  if(String(imgNum).length < 2){
    imgNum = `0${String(imgNum)}`;
  }
  setBg();
}
slideNext.addEventListener('click', slideNextHandleClick);

const setBg = () => {
  if(String(imgNum).length < 2){
    imgNum = `0${String(imgNum)}`;
  }
  const img = new Image();
  let timeOfDay = getTimeOfDay();
  if(getTimeOfDay() === 'nigh'){
    timeOfDay = 'evening'
  }
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${imgNum}.jpg`;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${img.src})`;
  }
}

setBg();


//weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

function setLocalStorageCity() {
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorageCity)

function getLocalStorageCity() {
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
  getWeather();
}
window.addEventListener('load', getLocalStorageCity);

async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=c0193ff9a3d1bbc47b79cbd9fd0a283a&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  console.log(data);
  if(data.message === "city not found"){
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add('hidden');
    temperature.textContent = "Error! City not found";
    weatherDescription.classList.add('hidden');
    wind.classList.add('hidden');
    humidity.classList.add('hidden');
  }else if(data.message === "Nothing to geocode"){
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add('hidden');
    temperature.textContent = "Error! Nothing to geocode";
    weatherDescription.classList.add('hidden');
    wind.classList.add('hidden');
    humidity.classList.add('hidden');
  }else{
    weatherIcon.classList.remove('hidden');
    temperature.classList.remove('hidden');
    weatherDescription.classList.remove('hidden');
    wind.classList.remove('hidden');
    humidity.classList.remove('hidden');
    
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${data.main.humidity} m/s`;
    humidity.textContent = `Humidity: ${Math.floor(data.wind.speed)}%`;
  }
}

getWeather();

city.addEventListener('change', getWeather);

//quotes
const quotes = [
	{ 
		"quote" : "And today, tomorrow, not everyone can watch. Or rather, not only everyone can watch, few can do it", 
		"author" : "Vitaliy Klichko" 
	},
	{
		"quote" : "A lie can travel halfway around the world while the truth is putting on its shoes", 
		"author" : "Mark Twain"
	},
    {
		"quote" : "Wise men speak because they have something to say; fools because they have to say something", 
		"author" : "Platon"
	},
    {
		"quote" : "Chop your own wood and it will warm you twice", 
		"author" : "Henry Ford"
	},
    {
		"quote" : "I do not care what you think about me. I do not think about you at all", 
		"author" : "Coco Chanel"
	},
    {
		"quote" : "In the End, we will remember not the words of our enemies, but the silence of our friends", 
		"author" : "Martin Luther King"
	},
    {
		"quote" : "The weak can never forgive. Forgiveness is the attribute of the strong", 
		"author" : "Mahatma Gandhi"
	},
    {
		"quote" : "Success is the ability to go from failure to failure without losing your enthusiasm", 
		"author" : "Winston Churchill"
	},
    {
		"quote" : "Everyone praises the Liberal Democratic Party and me. This is what democracy is", 
		"author" : "Vladimir Zhirinovsky"
	}
]

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotes() {   
  const random = getRandomNum(9);

  quote.textContent = quotes[random].quote;
  author.textContent = quotes[random].author;
}
getQuotes();

changeQuote.addEventListener('click', getQuotes);

//audio
const playList = [
  {      
    title: 'Aqua Caelestis',
    src: 'assets/sounds/Aqua Caelestis.mp3',
    duration: '00:58'
  },  
  {      
      title: 'Ennio Morricone',
      src: 'assets/sounds/Ennio Morricone.mp3',
      duration: '01:37'
  }, 
  {      
      title: 'Summer Wind',
      src: 'assets/sounds/Summer Wind.mp3',
      duration: '01:50'
  }, 
  {      
    title: 'River Flows In You',
    src: 'assets/sounds/River Flows In You.mp3',
    duration: '03:50'
  }
]

const audio = document.querySelector('audio');
const play = document.querySelector('.play');
const playNextButton = document.querySelector('.play-next');
const playPrevButton = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');

playList.forEach(element => {
  const li = document.createElement('li');
  li.textContent = element.title;
  li.classList.add('play-item');
  playListContainer.append(li);
});
const playItems = document.querySelectorAll('.play-item');

let isPlay = false;
let playNum = 0;

function playAudio() {
  audio.currentTime = 0;
  audio.play();
  playItems[playNum].classList.add('item-active');
}

function pauseAudio() {
  audio.pause();
}

const playHandleClick = () => {
  if(isPlay){
    play.classList.remove('pause');
    pauseAudio();
  }else{
    playAudio();
    play.classList.add('pause');
  }
  isPlay = !isPlay;
}

play.addEventListener('click', playHandleClick);

const playNext = () => {
  playNum++;
  if(playNum > 3){
    playNum = 0;
    playItems[3].classList.remove('item-active');
  }
  audio.src = playList[playNum].src;
  if(isPlay === false){
    playAudio();
    play.classList.add('pause');
    isPlay = true;
  }else{
    playAudio();
  }
  playItems[playNum - 1].classList.remove('item-active');
  playItems[playNum].classList.add('item-active');
}
playNextButton.addEventListener('click', playNext);

const playPrev = () => {
  playNum--;
  if(playNum < 0){
    playNum = 3;
    playItems[0].classList.remove('item-active');
  }
  audio.src = playList[playNum].src;
  if(isPlay === false){
    playAudio();
    play.classList.add('pause');
    isPlay = true;
  }else{
    playAudio();
  }
  playItems[playNum + 1].classList.remove('item-active');
  playItems[playNum].classList.add('item-active');
}
playPrevButton.addEventListener('click', playPrev);

audio.addEventListener('ended', playNext)
