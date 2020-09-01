gsap.registerPlugin(MotionPathPlugin, DrawSVGPlugin);
var tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

tl.set("#dot0", { x: 36, y: 189 })
  .to("#dot0", {
    duration: 0.8,
    ease: Power1.easeOut,
    motionPath: {
      path: "#motionPath2",
      align: "self",
      alignOrigin: [0.5, 0.5]
    }
  })
  .to("#dot1", { duration: 0.3, y: 10, opacity: 1 })
  .to("#dot1", { duration: 0.3, y: 0 })
  .to("#dot2", { duration: 0.3, y: 20, opacity: 1 }, "-=0.5")
  .to("#dot2", { duration: 0.3, y: 0 }, "-=0.2")
  .to("#dot3", { duration: 0.3, y: 30, opacity: 1 }, "-=0.4")
  .to("#dot3", { duration: 0.3, y: 0 }, "-=0.1")
  .to("#dot1", { duration: 0.3, y: 10 })
  .to("#dot1", { duration: 0.3, y: 0 })
  .to("#dot2", { duration: 0.3, y: 20 }, "-=0.5")
  .to("#dot2", { duration: 0.3, y: 0 }, "-=0.2")
  .to("#dot3", { duration: 0.3, y: 30 }, "-=0.4")
  .to("#dot3", { duration: 0.3, y: 0 }, "-=0.1")
  .set("#dot0, #dot1, #dot2, #dot3", { display: "none" })
  .set("#path", { opacity: 0, x: 15, y: 25 })
  .to("#path", { duration: 0.3, x: 30, y: 65, drawSVG: "1%", opacity: 1 })
  .to("#path", { duration: 0.6, drawSVG: "100%" })
  .to("#path", { duration: 0.6, drawSVG: "98% 100%" }, "+=0.5")
  .to(
    "#path",
    { duration: 0.3, x: 55, y: 45, ease: Back.easeOut.config(1.4) },
    "-=0.2"
  )
  .to(
    "#path",
    {
      duration: 0.6,
      ease: Power4.easeIn,
      motionPath: {
        path: "#motionPath1",
        align: "self",
        alignOrigin: [0.5, 0.5]
      }
    },
    "-=0.1"
  );