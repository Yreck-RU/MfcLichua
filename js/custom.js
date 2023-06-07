"use strict"
//==================================================================================================================================================
//Бэграунд картинок - "Начало"
//==================================================================================================================================================
function ibg(){
	let ibg=document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if(ibg[i].querySelector('img')){
			ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
		}
	}
}
ibg();
//==================================================================================================================================================
//Бэграунд картинок - "Конец"
//==================================================================================================================================================



//==================================================================================================================================================
//Динамический адаптив - "Начало"
//==================================================================================================================================================

// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();

//==================================================================================================================================================
//Динамический адаптив - "Конец"
//==================================================================================================================================================



//==================================================================================================================================================
//Шапка - "Начало"
//==================================================================================================================================================

const iconMenu = document.querySelector('.burger-icon');
const iconMenuTwo = document.querySelector('.header-burger__icon');
const menuBody = document.querySelector('.header-burger');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
	iconMenuTwo.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

/*====================================*/

const headerSpoilers = document.querySelectorAll('[data-header-spoiler]');

if (headerSpoilers.length > 0) {
	for (let i = 0; i < headerSpoilers.length; i++) {
		let headerSpoiler = headerSpoilers[i];
		let headerSpoilerWrapper = document.querySelector(`#${headerSpoiler.dataset.headerSpoiler}`);
		
		headerSpoiler.addEventListener("click", function (e) {
			headerSpoiler.classList.toggle('_active');
			headerSpoilerWrapper.classList.toggle('_active');

			let headerSpoilerActives = headerSpoilerWrapper.querySelectorAll('._active');
			if (headerSpoilerActives) {
				for (let i = 0; i < headerSpoilerActives.length; i++) {
					let headerSpoilerActive = headerSpoilerActives[i];
					headerSpoilerActive.classList.remove("_active");
				}
			}
		});
	}
}

//==================================================================================================================================================
//Шапка - "Конец"
//==================================================================================================================================================



//==================================================================================================================================================
//Слайдеры - "Начало"
//==================================================================================================================================================

var swiper = new Swiper(".cases-slaider-swiper", {
	slidesPerView: "auto",
	spaceBetween: 30,
	slidesPerView: 3,
	scrollbar: {
		//el: ".cases-slaider-scrollbar",
		el: ".swiper-scrollbar",
		hide: true,
	},

	breakpoints: {
		319.1: {
			slidesPerView: 1,
		},
		620.1: {
			slidesPerView: 2,
		},
		1064.1: {
			slidesPerView: 3,
		},
	},
});

var swiperFore = new Swiper(".slaider-fore", {
	spaceBetween: 30,
	slidesPerView: 3,
	
	navigation: {
		prevEl: ".slaider-standart__button_left",
		nextEl: ".slaider-standart__button_right",
	},

	breakpoints: {
		319.1: {
			slidesPerView: 1,
		},
		620.1: {
			slidesPerView: 2,
		},
		1064.1: {
			slidesPerView: 3,
		},
	},
});
var swiperFiwe = new Swiper(".swiper-five", {
	spaceBetween: 30,
	slidesPerView: 3,
	
	navigation: {
		prevEl: ".slaider-standart__button-vedeo_left",
		nextEl: ".slaider-standart__button-vedeo_right",
	},

	breakpoints: {
		319.1: {
			slidesPerView: 1,
		},
		620.1: {
			slidesPerView: 2,
		},
		1064.1: {
			slidesPerView: 3,
		},
	},
});

const mediaQuery = window.matchMedia('(max-width: 768px)')
if (mediaQuery.matches) {
	var swiperTwo = new Swiper(".blog-swiper", {
		slidesPerView: "auto",
		spaceBetween: 30,
		slidesPerView: 3,
		scrollbar: {
			el: ".blog-swiper-scrollbar",
			hide: true,
		},

		breakpoints: {
			319.1: {
				slidesPerView: 1,
			},
			620.1: {
				slidesPerView: 2,
			},
			1064.1: {
				slidesPerView: 3,
			},
		},
	});
	var swiperTwree = new Swiper(".footer-standart-list", {
		slidesPerView: "auto",
		spaceBetween: 30,
		slidesPerView: 2,

		breakpoints: {
			319.1: {
				slidesPerView: 1,
			},
			540.1: {
				slidesPerView: 2,
			},
			620.1: {
				slidesPerView: 2,
			},
		},
		navigation: {
			prevEl: ".footer-standart-list__button-left",
			nextEl: ".footer-standart-list__button-right",
		},
	});
}

//==================================================================================================================================================
//Слайдеры - "Конец"
//==================================================================================================================================================



//==================================================================================================================================================
//Формы - "Начало"
//==================================================================================================================================================


document.addEventListener("DOMContentLoaded", function () {
    var phoneInputs = document.querySelectorAll('input[data-tel-input]');

    var getInputNumbersValue = function (input) {
        // Return stripped input value — just numbers
        return input.value.replace(/\D/g, '');
    }

    var onPhonePaste = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        var pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            var pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
                // formatting will be in onPhoneInput handler
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    var onPhoneInput = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            // Editing in the middle of input, not last symbol
            if (e.data && /\D/g.test(e.data)) {
                // Attempt to input non-numeric symbol
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    var onPhoneKeyDown = function (e) {
        // Clear input after remove last symbol
        var inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }
    for (var phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }
});

/*===============================*/

document.addEventListener("DOMContentLoaded", function () {
	const forms = document.querySelectorAll("._form");

	for (let i = 0; i < forms.length; i++) {
		let form = forms[i];

		form.addEventListener("submit", function (e) {
			e.preventDefault();
			let error = formValidate(form);

			if (error === 0) {
				form.submit();
			}
		});

		let formFeqInputs = form.querySelectorAll("._req");

		for (let i = 0; i < formFeqInputs.length; i++) {
			let formFeqInput = formFeqInputs[i];

			formFeqInput.parentElement.addEventListener( 'click', (e) => {
				for (let i = 0; i < formFeqInputs.length; i++) {
					let formFeqInput = formFeqInputs[i];
					if (formFeqInput.classList.contains('_error')) {
						formRemoveError(formFeqInput);
					}
				}
			})
		}

		function formValidate(form) {
			let error = 0;
			let formFeq = form.querySelectorAll("._req");

			for (var i = 0; i < formFeq.length; i++) {
				let input = formFeq[i];
				formRemoveError(input);

				if (input.classList.contains('_email')) {
					if (emailTest(input)) {
						formAddError(input);
						error++;
					}
				} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
					formAddError(input);
					error++;
				} else if (input.getAttribute("type") === "tel" && input.value != '') {
					if (!nomerTest(input.value)) {
						formAddError(input);
						error++
					}
				} else if (input.value === '') {
					formAddError(input);
					error++;
				}
			}

			return error;
		}

		function formAddError(input) {
			input.parentElement.classList.add("_error");
			input.classList.add("_error");
		}
		function formRemoveError(input) {
			input.parentElement.classList.remove("_error");
			input.classList.remove("_error");
		}
		function emailTest(input) {
			return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
		}
		function nomerTest(nomer) {
			if (true) {
				if (nomer[0] === "8" && nomer.length == 17) {
					return true;
				} else if (nomer[0] === "+" && nomerTestSimvol(nomer) === "7" && nomer.length > 17) {
					return true;
				}
			}
		}
		function nomerTestSimvol(nomer) {
			for (let i = 1; i < nomer.length; i++) {
				let simvol = nomer[i];

				if (+simvol > 0) {
					return simvol;
				}
			}
		}
	}
});



/*=============================*/





const inputFiles =  document.querySelectorAll('.input-field');

if (inputFiles) {
	for (let i = 0; i < inputFiles.length; i++) {
		let inputFile = inputFiles[i];
		let inputFileWrapper = inputFile.querySelector('.input-field__wrapper');

		inputFile.querySelector('input').addEventListener("change", function (e) {
			if (inputFile.querySelector('input').value && !inputFile.classList.contains('_active')) {
				inputFile.classList.add('_active');
			} else if (!inputFile.querySelector('input').value && inputFile.classList.contains('_active')) {
				inputFile.classList.remove('_active');
			}
		});
	}
}



/*=============================*/



const selectSingles = document.querySelectorAll('.select');

if (selectSingles) {
	for (let i = 0; i < selectSingles.length; i++) {
		const selectSingle = selectSingles[i];
		const selectSingle_title = selectSingle.querySelector('.select-title');
		const selectSingle_labels = selectSingle.querySelectorAll('.select-content__label');

		// Toggle menu
		selectSingle_title.addEventListener('click', () => {
			if ('active' === selectSingle.getAttribute('data-state')) {
				//selectSingle.setAttribute('data-state', '');
			} else {
				selectSingle.setAttribute('data-state', 'active');
				if (selectSingle_title.classList.contains('__select__title-countries')) {

				}
			}
		});

		document.addEventListener( 'click', (e) => {
			let withinBoundaries = e.composedPath().includes(selectSingle_title);
			let withinBoundaries2 = e.composedPath().includes(selectSingle_labels);
			if ( ! withinBoundaries && ! withinBoundaries2) {
				selectSingle.setAttribute('data-state', '');
			}
			
		})

		// Close when click to option
		for (let i = 0; i < selectSingle_labels.length; i++) {
			let selectSingle_label = selectSingle_labels[i];
			selectSingle_labels[i].addEventListener('click', (evt) => {
				if (selectSingle_title.querySelector('input')) {
					selectSingle_title.querySelector('input').value = evt.target.textContent;
					//console.log(evt.target.textContent);
				}
				selectSingle.setAttribute('data-state', '');
			});
		}
	}
}

//==================================================



//==================================================================================================================================================
//Формы - "Конец"
//==================================================================================================================================================



//==================================================================================================================================================
//Спойлеры - "Начало"
//==================================================================================================================================================

const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(",")[0];
	});

	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	}

	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(",")[0];
	});

	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			const spollersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});

			matchMedia.addListener(function () {
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});
	}
	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		});
	}
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}
	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}
	function hideSpollersBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}
}

let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration)
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}


//==================================================================================================================================================
//Спойлеры - "Начало"
//==================================================================================================================================================



//==================================================================================================================================================
//Квиз - "Начало"
//==================================================================================================================================================

const kviz = document.querySelector("._kviz");

if (kviz) {
	const kvizItems = document.querySelectorAll(".test-item");
	const kvizButton = document.querySelector(".test-button");

	let kvizButtonDistance = document.querySelector("._kviz-distance");
	kvizButtonDistance.addEventListener("click", function (e) {
		for (let i = 0; i < kvizItems.length; i++) {
			if (kvizItems[i].classList.contains("_active")) {
				let testItemBloks = kvizItems[i].querySelectorAll(".test-item-blok");
				let validateBulen = false;
				for (let i = 0; i < testItemBloks.length; i++) {
					let testItemBlok = testItemBloks[i];
					let testItemBlokInput = testItemBlok.querySelector("input:checked");
					if (testItemBlokInput) {
						validateBulen = true;
						break;
					}
				}
				if (validateBulen) {
					kvizButton.classList.remove("_test-button_one-slaid");
					kvizItems[i].classList.remove("_error");
					kvizItems[i].classList.remove("_active");
					i = i + 1;
					kvizItems[i].classList.add("_active");
					if (kvizItems[i].classList.contains("_test-form")) {
						kvizButton.classList.add("_test-button_last-slaid");
					}
					break;
				} else {
					kvizItems[i].classList.add("_error");
					break;
				}
			}

		}
	});

	let kvizButtonBack = document.querySelector("._kviz-back");
	kvizButtonBack.addEventListener("click", function (e) {
		for (let i = 0; i < kvizItems.length; i++) {
			if (kvizItems[i].classList.contains("_active")) {
				if (i == 1) {
					kvizButton.classList.add("_test-button_one-slaid");
				}
				if (i != 0) {
					kvizButton.classList.remove("_test-button_last-slaid");
					kvizItems[i].classList.remove("_active");
					i = i - 1;
					kvizItems[i].classList.add("_active");
					break;
				}
			}

		}
	});
}

//==================================================================================================================================================
//Квиз - "Конец"
//==================================================================================================================================================



//==================================================================================================================================================
//Квиз - "Начало"
//==================================================================================================================================================


let vedeos = document.querySelectorAll("._vedeo");

if (vedeos) {
	for (var i = 0; i < vedeos.length; i++) {
		let vedeo = vedeos[i];
		vedeo.addEventListener("click", function (e) {
			vedeo.classList.toggle("_active");
		});
	}
}


//==================================================================================================================================================
//Квиз - "Конец"
//==================================================================================================================================================