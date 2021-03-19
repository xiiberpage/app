$(document).ready(function() {
    var alpha, angle, radius, str, col, html;
    alpha = 360 / $('ul>li.social-media').size();
    angle = 0;
    radius = 160;

    function circle(radius, angle, opacity) {
        var x, y;

        $('ul>li.social-media').each(function() {
            $(this).position(function() {
                $('ul>li').position()
            })
            angle += alpha;
            x = (Math.cos(angle * Math.PI / 180) * radius) + 170;
            y = (Math.sin(angle * Math.PI / 180) * radius) + 170;

            $(this).animate({
                top: y,
                left: x,
                opacity: opacity
            }, 500);
        });
        return angle;
    };

    html = $('.name').html();
    $('ul>li>a').hover(function() {
        str = $(this).attr('title');
        col = $(this).children('.fa').css('color');
        $('.name').css('font-size', '20pt');
        $('.name').css('color', col);
        $('.name').text(str);
    }, function() {
        $('.name').text('')
        $('.name').append(html);
    });

    setInterval(function() {
        angle += 5;
        circle(radius, angle, 1);
    }, 1000);
});