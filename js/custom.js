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


//==================================================================================================================================================
//Формы - "Конец"
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