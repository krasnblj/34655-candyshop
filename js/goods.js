'use strict';

// Константы
var MIN_AMOUT = 0;
var MAX_AMOUT = 20;
var MIN_PRICE = 100;
var MAX_PRICE = 1500;
var MIN_WEIGHT = 30;
var MAX_WEIGHT = 300;
var MIN_VALUE = 1;
var MAX_VALUE = 5;
var MIN_NUMBER = 10;
var MAX_NUMBER = 900;
var MIN_ENERGY = 70;
var MAX_ENERGY = 500;
var MAX_CARDS = 3;


var PRODUCTS_LIST = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var PRODUCTS_IMAGES = ['gum-cedar', 'gum-chile', 'gum-eggplant', 'gum-mustard', 'gum-portwine', 'gum-wasabi', 'ice-cucumber', 'ice-eggplant', 'ice-garlic', 'ice-italian', 'ice-mushroom', 'ice-pig', 'marmalade-beer', 'marmalade-caviar', 'marmalade-corn', 'marmalade-new-year', 'marmalade-sour', 'marshmallow-bacon', 'marshmallow-beer', 'marshmallow-shrimp', 'marshmallow-spicy', 'marshmallow-wine', 'soda-bacon', 'soda-celery', 'soda-cob', 'soda-garlic', 'soda-peanut-grapes', 'soda-russian'];
var PRODUCTS_CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];


// Выбор рандомного элемента массива
var getRandom = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};


// Функция целого рандомного числа в заданом диапазоне
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


// Функция рандомного булевого значения с равной вероятностью
var getRandomBoolean = function () {
  return (Math.random() > 0.5) ? true : false;
};


// Перемешивание массива по алгоритму Фишера-Йетса
var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = getRandomInteger(0, i);
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};


// Функция генерации ингридиентов
var getRandomContent = function (array) {
  // Перемешиваем ингредиенты в новом массиве
  var newArray = [];
  newArray = array.slice();
  newArray = shuffleArray(newArray);
  // Рандомно выбираем количество ингредиентов
  var contentLength = getRandomInteger(0, array.length);
  // Хотя бы один ингридиент должен быть
  var contentString = newArray[0];
  // Добавляем дальше, если ингредиентов больше 1
  if (contentLength > 0) {
    for (var i = 1; i < contentLength; i++) {
      contentString = contentString + ', ' + newArray[i];
    }
  }
  return contentString;
};


// Генерируем товары
var createItems = function () {
  var items = [];
  for (var i = 0; i < MAX_CARDS; i++) {
    items[i] = {
      'name': getRandom(PRODUCTS_LIST),
      'picture': 'img/cards/' + getRandom(PRODUCTS_IMAGES) + '.jpg',
      'amount': getRandomInteger(MIN_AMOUT, MAX_AMOUT),
      'price': getRandomInteger(MIN_PRICE, MAX_PRICE),
      'weight': getRandomInteger(MIN_WEIGHT, MAX_WEIGHT),
      'rating': {
        'value': getRandomInteger(MIN_VALUE, MAX_VALUE),
        'number': getRandomInteger(MIN_NUMBER, MAX_NUMBER)
      },
      'nutritionFacts': {
        'sugar': getRandomBoolean(),
        'energy': getRandomInteger(MIN_ENERGY, MAX_ENERGY),
        'contents': getRandomContent(PRODUCTS_CONTENTS)
      },
      // Добавляем ID для корзины
      'id': i
    };
  }
  return items;
};
var catalogItems = createItems();


// Функция добавления класса в зависимости от количества
var getAmountClass = function (amount) {
  var amountClass = '';
  if (amount > 5) {
    amountClass = 'card--in-stock';
  } else if (amount >= 1 && amount <= 5) {
    amountClass = 'card--little';
  } else if (amount === 0) {
    amountClass = 'card--soon';
  }
  return amountClass;
};


// Функция добавления класса в зависимости от рейтинга
var getRatingClass = function (rating) {
  var ratingClass = '';
  if (rating === 5) {
    ratingClass = 'stars__rating--five';
  } else if (rating === 4) {
    ratingClass = 'stars__rating--four';
  } else if (rating === 3) {
    ratingClass = 'stars__rating--three';
  } else if (rating === 2) {
    ratingClass = 'stars__rating--two';
  } else if (rating === 1) {
    ratingClass = 'stars__rating--one';
  }
  return ratingClass;
};


// Функция преобразования булево значения сахара в строку
var getSugarContent = function (sugar) {
  return sugar ? 'содержит сахар' : 'без сахара';
};


// Скрываем заглушку каталога
var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');
var catalogLoad = catalogCards.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');


// Записываем значения товаров в каталог
var createCatalog = function (items) {
  var fragment = document.createDocumentFragment();
  items.forEach(function (item) {
    var itemTpl = document.querySelector('#card').content.cloneNode(true);
    // Записываем data-id и data-amount для каждой карточки
    itemTpl.querySelector('.catalog__card').setAttribute('data-id', item.id);
    itemTpl.querySelector('.catalog__card').setAttribute('data-amount', item.amount);
    // Записываем класс от количества
    itemTpl.querySelector('.catalog__card').classList.remove('card--in-stock');
    itemTpl.querySelector('.catalog__card').classList.add(getAmountClass(item.amount));
    // Записываем src картинки
    itemTpl.querySelector('.card__img').src = item.picture;
    // Записываем имя товара
    itemTpl.querySelector('.card__title').textContent = item.name;
    // Записываем цену и вес
    itemTpl.querySelector('.card__price').innerHTML = item.price + ' <span class="card__currency">₽</span><span class="card__weight">/ ' + item.weight + ' Г</span>';
    // Записываем рейтинг и количество отзывов
    itemTpl.querySelector('.stars__rating').classList.remove('stars__rating--five');
    itemTpl.querySelector('.stars__rating').classList.add(getRatingClass(item.rating.value));
    itemTpl.querySelector('.star__count').textContent = item.rating.number;
    // Записываем сахар и калории
    itemTpl.querySelector('.card__characteristic').textContent = getSugarContent(item.nutritionFacts.sugar) + '. ' + item.nutritionFacts.energy + ' ккал';
    // Записываем ингрдиенты
    itemTpl.querySelector('.card__composition-list').textContent = item.nutritionFacts.contents;

    fragment.appendChild(itemTpl);
  });
  return fragment;
};
catalogCards.appendChild(createCatalog(catalogItems));


/* === Задание №16 === */
var catalogCardsAll = document.querySelectorAll('.catalog__card');

// Скрываем заглушку каталога
document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
document.querySelector('.catalog__cards .catalog__load').classList.add('visually-hidden');

var goodsWrap = document.querySelector('.goods__card-wrap');
var basketCards = document.querySelector('.goods__cards');
var goodsCardEmpty = basketCards.querySelector('.goods__card-empty');
var goodsCardTotal = goodsWrap.querySelector('.goods__total');

// Скрыть надпись пустоты корзины
var hideEmptyBasket = function () {
  basketCards.classList.remove('goods__cards--empty');
  goodsCardTotal.classList.remove('visually-hidden');
  goodsCardEmpty.classList.add('visually-hidden');
};

// Показать надпись пустоты корзины
var showEmptyBasket = function () {
  basketCards.classList.add('catalog__cards--load');
  goodsCardTotal.classList.add('visually-hidden');
  goodsCardEmpty.classList.remove('visually-hidden');
};

// Добавление в избранное
var addFavorite = document.querySelectorAll('.card__btn-favorite');
var onFavoriteButtonClick = function (evt) {
  evt.preventDefault();
  evt.target.classList.toggle('card__btn-favorite--selected');
};

addFavorite.forEach(function (item) {
  item.addEventListener('click', onFavoriteButtonClick);
});

// Добавление в корзину
catalogCardsAll.forEach(function (item, i) {
  item.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('card__btn')) {
      if (evt.currentTarget.classList.contains('card--soon')) {
        return;
      }
      addToCart(catalogCardsAll[i], i);
      hideEmptyBasket();
      basketCards.querySelectorAll('article').forEach(function (button) {
        button.addEventListener('click', onIncreaseButtonClick);
        button.addEventListener('click', onDecreaseButtonClick);
        button.addEventListener('click', onRemoveButtonClick);
      });
    }
  });
});

// Создание карточки товара в корзине
var totalPrice = 0;
var totalValue = 0;
var addToCart = function (target, i) {
  var dataAttributeId = basketCards.querySelector('[data-id="' + target.dataset.id + '"]');
  if (dataAttributeId === null) {
    var cardsBasket = catalogItems[i];
    var basketElement = document.querySelector('#card-order').content.cloneNode(true);
    basketElement.querySelector('.card-order__title').textContent = cardsBasket.name;
    basketElement.querySelector('.card-order__img').src = cardsBasket.picture;
    basketElement.querySelector('.card-order__price').textContent = cardsBasket.price + ' ₽';
    basketElement.querySelector('.card-order__count').value = 1;
    basketElement.querySelector('.goods_card').setAttribute('data-id', i);
    basketElement.querySelector('.goods_card').setAttribute('data-amount', catalogItems[i].amount);
    basketCards.appendChild(basketElement);
    totalPrice += cardsBasket.price;
    totalValue++;
    changeFooter(totalPrice, totalValue);
    changeHeader(totalPrice, totalValue);
  } else {
    var value = dataAttributeId.querySelector('.card-order__count');
    var amount = target.dataset.amount;
    increasePrice(value, amount, catalogItems[i].price);
    increaseValue(value, amount);
  }
};


var goodsPrice = goodsCardTotal.querySelector('.goods__total-count');
// Увеличить сумму всех товаров
var increasePrice = function (value, amount, price) {
  var basketElementPrice = document.querySelectorAll('.goods_card .card-order__price');
  if (value.value === amount) {
    return;
  }
  totalPrice += price;
  changeHeader(totalPrice, basketElementPrice.length);
  changeFooter(totalPrice, basketElementPrice.length);
  return;
};
// Уменьшить сумму всех товаров
var decreasePrice = function (price) {
  var basketElementPrice = document.querySelectorAll('.goods_card .card-order__price');
  totalPrice -= price;
  changeHeader(totalPrice, basketElementPrice.length);
  changeFooter(totalPrice, basketElementPrice.length);
};

// Увеличить количество всех товаров
var increaseValue = function (value, amount) {
  if (value.value !== amount) {
    value.value++;
  }
  return;
};
// Уменьштиь количество всех товаров
var decreaseValue = function (value) {
  return value.value--;
};

// Увеличить количество одного товара
var onIncreaseButtonClick = function (evt) {
  evt.preventDefault();
  var target = evt.target.closest('.card-order__btn--increase');
  var card = evt.target.closest('.card-order');
  // Оставялем из тэга цены только число и конвертируем в Integer в десятиричной
  var price = parseInt(card.querySelector('.card-order__price').textContent.split(' ')[0], 10);
  var value = card.querySelector('.card-order__count');
  var amount = card.dataset.amount;
  if (target === null) {
    return;
  }
  increasePrice(value, amount, price);
  increaseValue(value, amount);
};

// Уменьшить количество одного товара
var onDecreaseButtonClick = function (evt) {
  evt.preventDefault();
  var target = evt.target.closest('.card-order__btn--decrease');
  var card = evt.target.closest('.card-order');
  var price = parseInt(card.querySelector('.card-order__price').textContent.split(' ')[0], 10);
  var value = card.querySelector('.card-order__amount .card-order__count');
  if (target === null) {
    return;
  } else if (value.value > 1) {
    totalValue--;
    decreaseValue(value);
    decreasePrice(price);
  } else {
    basketCards.removeChild(card);
    decreasePrice(price);
    if (basketCards.children.length === 1) {
      totalPrice = 0;
      totalValue = 0;
      changeHeader(totalPrice, totalValue);
      showEmptyBasket();
    }
    if (basketCards.children.length > 1) {
      totalValue--;
      changeHeader(totalPrice, totalValue);
    }
  }
};

// Удаление товара по клику на крестик
var onRemoveButtonClick = function (evt) {
  evt.preventDefault();
  var target = evt.target.closest('.card-order__close');
  var card = evt.target.closest('.card-order');
  var price = parseInt(card.querySelector('.card-order__price').textContent.split(' ')[0], 10);
  var value = card.querySelector('.card-order__amount .card-order__count');
  price = price * value.value;
  if (target === null) {
    return;
  } else {
    basketCards.removeChild(card);
    if (basketCards.children.length === 1) {
      totalPrice = 0;
      totalValue = 0;
      changeHeader(totalPrice, totalValue);
      showEmptyBasket();
    }
    if (basketCards.children.length > 1) {
      totalValue--;
      decreaseValue(value);
      decreasePrice(price);
      changeHeader(totalPrice, totalValue);
    }
  }
};

// Количество и цена товаров в шапке
var changeHeader = function (basketPrice, basketValue) {
  var headerBasket = document.querySelector('.main-header__basket');
  var array = basketValue.toString().split('').reverse().map(function (item) {
    return parseInt(item, 10);
  });
  var basketValueNumber = array[0];
  var basketValueNumberSecond = array[1];
  if (array.length === 1 || basketValueNumberSecond === 1) {
    if (basketValue === 0) {
      headerBasket.textContent = 'В корзине нет товаров';
    }
    if (basketValue === 1) {
      headerBasket.textContent = 'В корзине ' + basketValue + ' товар на ' + basketPrice + ' ₽';
    }
    if (basketValue > 1 && basketValue <= 4) {
      headerBasket.textContent = 'В корзине ' + basketValue + ' товара на ' + basketPrice + ' ₽';
    }
    if (basketValue > 4 && basketValue <= 19) {
      headerBasket.textContent = 'В корзине ' + basketValue + ' товаров на ' + basketPrice + ' ₽';
    }
  }
  if (array.length > 1 && basketValueNumberSecond !== 1) {
    if (basketValueNumber === 0) {
      headerBasket.textContent = 'В корзине ' + basketValue + ' товаров на ' + basketPrice + ' ₽';
    }
    if (basketValueNumber === 1) {
      headerBasket.textContent = 'В корзине ' + basketValue + ' товар на ' + basketPrice + ' ₽';
    }
    if (basketValueNumber >= 2 && basketValueNumber <= 4) {
      headerBasket.textContent = 'В корзине ' + basketValue + ' товара на ' + basketPrice + ' ₽';
    }
    if (basketValueNumber > 4 && basketValueNumber <= 9) {
      headerBasket.textContent = 'В корзине ' + basketValue + ' товаров на ' + basketPrice + ' ₽';
    }
  }
};

// Количество и цена товаров в футере
var changeFooter = function (basketPrice, basketValue) {
  var array = basketValue.toString().split('').reverse().map(function (item) {
    return parseInt(item, 10);
  });
  var basketValueNumber = array[0];
  var basketValueNumberSecond = array[1];
  if (array.length === 1 || basketValueNumberSecond === 1) {
    if (basketValue === 1) {
      goodsPrice.innerHTML = 'Итого за ' + basketValue + ' товар: <span class="goods__price">' + basketPrice + '&nbsp;₽</span>';
    }
    if (basketValue > 1 && basketValue <= 4) {
      goodsPrice.innerHTML = 'Итого за ' + basketValue + ' товара: <span class="goods__price">' + basketPrice + '&nbsp;₽</span>';
    }
    if (basketValue > 4 && basketValue <= 19) {
      goodsPrice.innerHTML = 'Итого за ' + basketValue + ' товаров: <span class="goods__price">' + basketPrice + '&nbsp;₽</span>';
    }
  }
  if (array.length > 1 && basketValueNumberSecond !== 1) {
    if (basketValueNumber === 0) {
      goodsPrice.innerHTML = 'Итого за ' + basketValue + ' товаров: <span class="goods__price">' + basketPrice + '&nbsp;₽</span>';
    }
    if (basketValueNumber === 1) {
      goodsPrice.innerHTML = 'Итого за ' + basketValue + ' товар: <span class="goods__price">' + basketPrice + '&nbsp;₽</span>';
    }
    if (basketValueNumber >= 2 && basketValueNumber <= 4) {
      goodsPrice.innerHTML = 'Итого за ' + basketValue + ' товара: <span class="goods__price">' + basketPrice + '&nbsp;₽</span>';
    }
    if (basketValueNumber > 4 && basketValueNumber <= 9) {
      goodsPrice.innerHTML = 'Итого за ' + basketValue + ' товаров: <span class="goods__price">' + basketPrice + '&nbsp;₽</span>';
    }
  }
};


/* === Задание №16.3 === */
// Переключение вкладок оплаты
var payment = document.querySelector('.payment');
var paymentCard = payment.querySelector('.payment__card-wrap');
var paymentCash = payment.querySelector('.payment__cash-wrap');
var btnCard = payment.querySelector('#payment__card');
var btnCash = payment.querySelector('#payment__cash');

btnCash.addEventListener('click', function () {
  togglePayment();
});
btnCard.addEventListener('click', function () {
  togglePayment();
});
var togglePayment = function () {
  paymentCash.classList.toggle('visually-hidden');
  paymentCard.classList.toggle('visually-hidden');
};


// Переключение вкладок доставки
var delivery = document.querySelector('.deliver');
var store = delivery.querySelector('.deliver__store');
var courier = delivery.querySelector('.deliver__courier');
var btnStore = delivery.querySelector('#deliver__store');
var btnCourier = delivery.querySelector('#deliver__courier');

btnStore.addEventListener('click', function () {
  toggleDelivery();
});
btnCourier.addEventListener('click', function () {
  toggleDelivery();
});
var toggleDelivery = function () {
  courier.classList.toggle('visually-hidden');
  store.classList.toggle('visually-hidden');
};


/* === Задание №16.4 === */
var rangeBtnLeft = document.querySelector('.range__btn--left');
var rangeBtnRight = document.querySelector('.range__btn--right');
var rangeFillLine = document.querySelector('.range__fill-line');
var rangePriceMin = document.querySelector('.range__price--min');
var rangePriceMax = document.querySelector('.range__price--max');
// Криво работало без z-index для кнопок
rangeBtnLeft.style.zIndex = '999';
rangeBtnRight.style.zIndex = '999';

// Определяет значение кнопки Х
function getCurrentHandlerX(handler) {
  return handler.offsetLeft;
}

// Обработчик для кнопки минимума
rangeBtnLeft.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoordsX = evt.clientX;
  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();
    var shiftX = startCoordsX - moveEvt.clientX;
    startCoordsX = moveEvt.clientX;
    var jump = rangeBtnLeft.offsetLeft - shiftX;
    // Если курсор левее слайдера → 0
    if (jump < 0) {
      jump = 0;
    // Если курсор правее кнопки максимума → значение правой кнопки
    } else if (jump > getCurrentHandlerX(rangeBtnRight)) {
      jump = getCurrentHandlerX(rangeBtnRight);
    }
    rangeBtnLeft.style.left = jump + 'px';
    rangeFillLine.style.left = rangeBtnLeft.offsetWidth + jump + 'px';
    rangePriceMin.textContent = jump;
  }
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// Обработчик для кнопки максимума
rangeBtnRight.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoordsX = evt.clientX;
  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();
    var shiftX = startCoordsX - moveEvt.clientX;
    startCoordsX = moveEvt.clientX;
    var jump = rangeBtnRight.offsetLeft - shiftX;
    // Длина слайдера = макс значение
    var max = document.querySelector('.range__filter').offsetWidth;
    // Если курсор правее слайдера → значение максимума
    if (jump > max) {
      jump = max;
    // Если курсор левее кнопки минимума → значение левой кнопки
    } else if (jump < getCurrentHandlerX(rangeBtnLeft)) {
      jump = getCurrentHandlerX(rangeBtnLeft);
    }
    rangeBtnRight.style.left = jump + 'px';
    rangeFillLine.style.right = max - jump + 'px';
    rangePriceMax.textContent = jump;
  }
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
