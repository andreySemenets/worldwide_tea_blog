const tooltip = document.querySelector('.tooltip');
const countries = document.querySelectorAll('.country');
const popupBg = document.querySelector('.info__bg');
const popup = document.querySelector('.info');
const buttonToCountry = document.querySelector('.buttonToCountry');

countries.forEach((country) => {

	country.addEventListener('click', () => {
		popup.querySelector('.info__photo').setAttribute('src', country.dataset.photo);
		popup.querySelector('.info__title').innerText = country.dataset.title;
		popup.querySelector('.info__text').innerText = country.dataset.text;
		popupBg.classList.add('active');
	});

	country.addEventListener('mousemove', (event) => {
		tooltip.innerText = country.dataset.title;
		tooltip.style.top = (event.y + 20) + 'px';
		tooltip.style.left = (event.x + 20) + 'px';
	});

	country.addEventListener('mouseenter', () => {
		tooltip.style.display = 'block';
	});

	country.addEventListener('mouseleave', () => {
		tooltip.style.display = 'none';
	});

});

document.addEventListener('click', (event) => {
	if (event.target === popupBg) {
		popupBg.classList.remove('active');
	}
});


