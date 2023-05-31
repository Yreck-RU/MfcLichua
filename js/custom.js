"use strict"
//==================================================================================================================================================
//Бэграунд картинок - "Начало"
//==================================================================================================================================================
let imageWebp = document.querySelector('.loading-screen-ditector');
let imageWebpOk = false;
if (imageWebp) {

	if (imageWebp.width + imageWebp.height == 0) {
		imageWebpOk = false;
	} else {
		imageWebpOk = true;
	}
}

function ibg(){
	let ibg=document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('._webp') && ibg[i].querySelector('._jpg')) {
			if(ibg[i].querySelector('._webp') && imageWebpOk == true){
				ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('._webp').getAttribute('src')+')';
				ibg[i].classList.add('_loaded');
			} else if(ibg[i].querySelector('._jpg') && imageWebpOk == false){
				ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('._jpg').getAttribute('src')+')';
				ibg[i].classList.add('_loaded');
			}
		} else {
			if(ibg[i].querySelector('img')){
				ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
			}
		}
	}
}
ibg();
//==================================================================================================================================================
//Бэграунд картинок - "Конец"
//==================================================================================================================================================





//==================================================================================================================================================
//Линивая загрусска - "Начало"
//==================================================================================================================================================
const lazyImages = document.querySelectorAll('img[data-src], source[data-srcset]');
const loadMapBlock = document.querySelector('._load-map');
const windowHeight = document.documentElement.clientHeight;

let lazyImagesPositions = [];
if (lazyImages.length > 0) {
	lazyImages.forEach(img => {
		if (img.dataset.src || img.dataset.srcset) {
			lazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset);
			lazyScrollCheck();
			ibg();
		}
	});
}

window.addEventListener("scroll", lazuScroll);
function lazuScroll() {
	if (document.querySelectorAll('img[data-src], source[data-srcset]').length > 0) {
		lazyScrollCheck();
		ibg();
	}
}

function lazyScrollCheck() {
	let imgIndex = lazyImagesPositions.findIndex(
		item => pageYOffset > item - windowHeight
	);
	if (imgIndex >= 0) {
		if (lazyImages[imgIndex].dataset.src) {
			lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
			lazyImages[imgIndex].removeAttribute('data-src');
		} else if (lazyImages[imgIndex].dataset.srcset) {
			lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
			lazyImages[imgIndex].removeAttribute('data-srcset');
		}
		delete lazyImagesPositions[imgIndex];
	}
}
//==================================================================================================================================================
//Линивая загрусска - "Начало"
//==================================================================================================================================================