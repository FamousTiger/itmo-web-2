function slidrWork()
{
    slidr.create('slidr-img', {
        breadcrumbs: true, //	Показать хлебные крошки для управления слайдами. true или false.
        controls: 'border', //	Расположение стрелок для управления слайдами. border, corner or none.
        direction: 'horizontal', //Направление по умолчанию для новых слайдов. horizontal или h,vertical или v.
        fade: true, //	Включить эффект затемнения для смены слайдов (fade-in/out). true или false.
        keyboard: true, //	Включить смену сладов с помощью клавиатуры. true или false.
        overflow: 'borders', //	Включить overflow для блока со слайдером. true или false.
        theme: '#FFC700', // Цвет элементов управления слайдером (хлебных крошек и стрелок). #hexcode или rgba(value).
        timing: { 'fade': '0.6s ease-in' }, //	Custom animation timings to apply. {'transition': 'timing'}.
        touch: true, //Задействовать touch управление на мобильных устройствах. true или false.
        transition: 'fade' //	Эффект смены слайдов. cube, linear, fade или none.
    }).start();
}

window.addEventListener('load',function () {

    slidrWork();
    localStorage.clear();

}, false)
