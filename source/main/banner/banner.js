const swiper1 = new Swiper('.swiper1', {
    // Optional parameters
    loop: true,
    centeredSlides: true,
    autoplay: { delay: 5000, },
    // If we need pagination
    pagination: {
        el: '.sp1',
        type: 'fraction',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.sbn1',
        prevEl: '.sbp1',
    },


});