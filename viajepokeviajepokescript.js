/**** Pokeball Entrance Scene ****/
var pokeball = $( "#Pokeball" ).get( 0 );
var grass = $( "#Grass" ).get( 0 );
var stars = $( "#Stars" ).get( 0 );
var button = $( ".button" ).get( 0 );
var pokedex = $( "#Pokedex" ).get( 0 );

var timeline = new TimelineMax();

timeline.add("delay", 1)

//grass entrance & hide Pokeball + stars
timeline.set(pokeball, {visibility: "hidden"})
timeline.set(stars, {visibility: "hidden"})
timeline.set(pokedex, {visibility: "hidden"})

timeline.from(grass,2,{ease: Power4.easeOut, y: 100})

//Pokeball visible
timeline.set(pokeball, {visibility: "visible"})

//fall with bounce

timeline.from(pokeball, 2, {ease: Bounce.easeOut, y:-800});

//shake

timeline.to(pokeball, 0.2, {ease: Bounce.easeInOut, rotation: -10, y: 30, x: -30});

timeline.to(pokeball, 0.2, {ease: Bounce.easeInOut, rotation: 10, y: -20, x: 30});

timeline.to(pokeball, 0.2, {ease: Bounce.easeInOut, rotation: -10, y: 30, x: -30});

timeline.to(pokeball, 0.2, {ease: Bounce.easeInOut, rotation: 10, y: -20, x: 30});

timeline.to(pokeball, 0.2, {ease: Bounce.easeInOut, rotation: -10, y: 30, x: -30});

//pulse

timeline.to(button, 0.8, {ease: Bounce.easeInOut, fill:"#FF485E"});

timeline.to(button, 0.3, {ease: Bounce.easeInOut, fill:"#FFF"});

timeline.to(button, 0.8, {ease: Bounce.easeInOut, fill:"#FF485E"});

timeline.to(button, 0.3, {ease: Bounce.easeInOut, fill:"#FFF"});

//hop and stars
timeline.set(stars, {visibility: "visible"})
timeline.fromTo(pokeball, 0.3, {y:10}, {ease: Bounce.easeOut, y:30});
timeline.fromTo(stars, 0.5, {scale: 0, opacity: 0, transformOrigin: "50% 50%"}, {ease: Power1.easeOut, opacity: 1, scale: 1}, "-=0.3");
//Pokeball roll and exit and stars shoot up

timeline.to(pokeball, 3, {ease: Power4.easeOut, rotation: 360, transformOrigin:"50% 50%", x: 800}, "+=0.75");

timeline.to(stars, 0.5, {ease: Power4.easeIn, y: -800}, "-=3");

timeline.set(pokeball, {visibility: "hidden"})
//stars exit
timeline.set(stars, {visibility: "hidden"})

//grass shrink and exit

timeline.to(grass,2,{ease: Power4.easeOut, y:800}, "-=2")

timeline.set(grass, {visibility: "hidden"})
timeline.set(pokedex, {visibility: "visible"})

timeline.fromTo(pokedex,2,{ease: Power3.easeOut, y: 100, x:0, opacity: 0}, {ease: Power3.easeOut, x:100, y:80, opacity: 1}, "-=3")

/**** Pokeball Entrance Scene End ****/