const botui = new BotUI('bot'); // give it the id of container

botui.message.bot({ // show first message
    delay: 500,
    content: 'Hola, soy Xiibot. Estoy listo para ayudarte',
    loading: true // fake typing
}).
then(() => {
    return botui.message.bot({ // second one
        delay: 500,
        loading: true,
        content: 'A dondé te gustaría viajar y qué te gustaría hacer?'
    });

}).then(() => {
    return botui.action.button({ // let user choose something
        delay: 300,
        action: [{
                text: 'ir al spa en Tepoztlán',
                value: 'good'
            },

            {
                text: 'ir a una fiesta en la CDMX',
                value: 'really_good'
            },

            {
                text: 'un viaje a la playa',
                value: 'awfully_good'
            }
        ]
    });



}).then(res => {
    return botui.message.bot({
        delay: 400,
        loading: true, // pretend like we are doing something
        content: 'Genial, aqui algunas opciones para ' + res.text.toLowerCase() + '. www.xiiber.com '
    });

}).then(() => {
    botui.message.
    bot({
        delay: 700,
        loading: true,
        content: 'Cuál es tu nombre?'
    }).

    then(function() {
        return botui.action.text({
            delay: 400,
            action: {
                size: 18,
                icon: 'user-circle-o',
                sub_type: 'text',
                placeholder: 'Harry Potter ?'
            }
        });


    }).then(res => {
        name = res.value; // save new value
        return botui.message.
        bot({
            delay: 300,
            loading: true,
            content: 'Un gusto en conocerte ' + name + '! ![hello image](https://giphy.com/gifs/26xBwdIuRJiAIqHwA/html5)'
        });

    }).
    then(() => {
        return botui.message.bot({ // second one
            delay: 500,
            loading: true,
            content: 'Te gustaría pasar por alguna red y ver el contenido realizado...'
        });

    }).then(() => {
        return botui.action.button({ // let user choose something
            delay: 300,
            action: [{
                    text: 'ver videos en Youtube',
                    value: 'good'
                },

                {
                    text: 'seguirlos en Twitter',
                    value: 'really_good'
                },

                {
                    text: 'jugar online',
                    value: 'awfully_good'
                }
            ]
        });

    }).then(res => {
        return botui.message.bot({
            delay: 400,
            loading: true, // pretend like we are doing something
            content: 'Ok' + res.text.toLowerCase() + 'aquí los accesos www.xiiber.com/mapa_de_sitio '
        });

    });
});