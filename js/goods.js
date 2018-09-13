'use strict';

var iceName = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var icePicture = ['gum-cedar', 'gum-chile', 'gum-eggplant', 'gum-mustard', 'gum-portwine', 'gum-wasabi', 'ice-cucumber', 'ice-eggplant', 'ice-garlic', 'ice-italian', 'ice-mushroom', 'ice-pig', 'marmalade-beer', 'marmalade-caviar', 'marmalade-corn', 'marmalade-new-year', 'marmalade-sour', 'marshmallow-bacon', 'marshmallow-beer', 'marshmallow-shrimp', 'marshmallow-spicy', 'marshmallow-wine', 'soda-bacon', 'soda-celery', 'soda-cob', 'soda-garlic', 'soda-peanut-grapes', 'soda-russian'];
var iceContents = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];


// Выбор рандомного элемента массива
var rnd = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};


// Функция целого рандомного числа в заданом диапазоне
var rndInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


// Функция рандомного булевого значения с равной вероятностью
var rndBool = function () {
  return (Math.random() > 0.5) ? true : false;
};


// Перемешивание массива по алгоритму Фишера-Йетса
var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = rndInt(0, i);
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};


// Функция генерации ингридиентов
var rndContent = function (array) {
  // Перемешиваем ингредиенты в новом массиве
  var newArray = [];
  newArray = array.slice();
  newArray = shuffleArray(newArray);
  // Рандомно выбираем количество ингредиентов
  var contentLength = rndInt(0, array.length);
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
  for (var i = 0; i < 26; i++) {
    items[i] = {
      'name': rnd(iceName),
      'picture': 'img/cards/' + rnd(icePicture) + '.jpg',
      'amount': rndInt(0, 20),
      'price': rndInt(100, 1500),
      'weight': rndInt(30, 300),
      'rating': {
        'value': rndInt(1, 5),
        'number': rndInt(10, 900)
      },
      'nutritionFacts': {
        'sugar': rndBool(),
        'energy': rndInt(70, 500),
        'contents': rndContent(iceContents)
      },
    };
  }
  return items;
};
var sweets = createItems();


// Функция добавления класса в зависимости от количества
var amountItem = function (amount) {
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
var ratingItem = function (rating) {
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
var sugarItem = function (sugar) {
  return sugar ? 'содержит сахар' : 'без сахара';
};


// Скрываем заглушку каталога
document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
document.querySelector('.catalog__cards .catalog__load').classList.add('visually-hidden');


// Записываем значения товаров в каталог
var writeItems = function (items) {
  var fragment = document.createDocumentFragment();
  items.forEach(function (item) {
    var itemTpl = document.querySelector('#card').content.cloneNode(true);
    // Записываем класс от количества
    itemTpl.querySelector('.catalog__card').classList.remove('card--in-stock');
    itemTpl.querySelector('.catalog__card').classList.add(amountItem(item.amount));
    // Записываем src картинки
    itemTpl.querySelector('.card__img').src = item.picture;
    // Записываем имя товара
    itemTpl.querySelector('.card__title').textContent = item.name;
    // Записываем цену и вес
    itemTpl.querySelector('.card__price').innerHTML = item.price + ' <span class="card__currency">₽</span><span class="card__weight">/ ' + item.weight + ' Г</span>';
    // Записываем рейтинг и количество отзывов
    itemTpl.querySelector('.stars__rating').classList.remove('stars__rating--five');
    itemTpl.querySelector('.stars__rating').classList.add(ratingItem(item.rating.value));
    itemTpl.querySelector('.star__count').textContent = item.rating.number;
    // Записываем сахар и калории
    itemTpl.querySelector('.card__characteristic').textContent = sugarItem(item.nutritionFacts.sugar) + '. ' + item.nutritionFacts.energy + ' ккал';
    // Записываем ингрдиенты
    itemTpl.querySelector('.card__composition-list').textContent = item.nutritionFacts.contents;

    fragment.appendChild(itemTpl);
  });
  return fragment;
};
document.querySelector('.catalog__cards').appendChild(writeItems(sweets));


// Скрываем заглушку корзины
document.querySelector('.goods__cards').classList.remove('goods__cards--empty');
document.querySelector('.goods__cards .goods__card-empty').classList.add('visually-hidden');


// Перемешиваем массив товаров и обрезаем до 3ёх элементов
var cartItems = [];
cartItems = sweets.slice();
cartItems = shuffleArray(cartItems);
cartItems = cartItems.splice(0, 3);

// Записываем значения в корзину
var writeCart = function (items) {
  var fragment = document.createDocumentFragment();
  items.forEach(function (item) {
    var itemTpl = document.querySelector('#card-order').content.cloneNode(true);
    // Записываем src картинки
    itemTpl.querySelector('.card-order__img').src = item.picture;
    // Записываем имя товара
    itemTpl.querySelector('.card-order__title').textContent = item.name;
    // Записываем цену
    itemTpl.querySelector('.card-order__price').textContent = item.price + ' ₽';
    fragment.appendChild(itemTpl);
  });
  return fragment;
};
document.querySelector('.goods__cards').appendChild(writeCart(cartItems));
