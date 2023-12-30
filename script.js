function locoScroll(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}

locoScroll()



function cursorEffecr(){
const page1Content= document.querySelector('#page1-content')
const cursor= document.querySelector('#cursor')

//we will be using gsap library for smooth animation

page1Content.addEventListener('mousemove', function(e){
    /*cursor.style.left=e.x+"px";
    cursor.style.top=e.y+"px";*/

    gsap.to(cursor,{
        x:e.x,
        y:e.y
    })

})

page1Content.addEventListener('mouseenter', function(){
    gsap.to(cursor,{
        scale: 1,
        opacity: 1
    })
})

page1Content.addEventListener('mouseleave',function(){
    gsap.to(cursor,{
        scale:0,
        opacity: 0
    })
})
}

cursorEffecr()

function page2Animation(){

    gsap.from('.elem h1', {
        y: 120,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
            trigger: '#page2',
            scroller: '#main',
            start: 'top 40%',
            end: 'top 37%',
            scrub: 2
        }
    })

}

page2Animation()

function page3Animation(){

    gsap.from('.elem1 h1', {
        y: 120,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
            trigger: '#page3',
            scroller: '#main',
            start: 'top 20%',
            end: 'top 37%',
            scrub: 2
        }
    })

}

page3Animation()

//code to change async into sync

var t1= gsap.timeline()
t1.from("#loader h3",{
    x: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.1
})

t1.to("#loader h3",{
    opacity: 0,
    x: -10,
    duration: 1,
    stagger: 0.1
})

t1.to("#loader",{
    opacity: 0
})

t1.from("page1-content h1 span",{
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 0.5
})

t1.to("#loader",{
    display: "none"
})




