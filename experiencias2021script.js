// $ Xiiber Travel

$(function() {
    $('.event-list').find('.event').click(function() {
        $('.event-list').find('.openEv').removeClass('open');
        $(this).next().toggleClass('open');
    })
})