/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
const images = ["petriprint5.jpg", "petriprint3.jpg", "petriprint4.jpg", "petriprint2.jpg"];
// Back to Top button

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

// Add class 'active' to section when near top of viewport
// Highlight section in top of viewport
function isInViewport() {
  const sections = document.querySelectorAll('section');
  for (const section of sections) {
    if (window.scrollY < section.offsetTop) {
      section.classList.contains('landing__container');
      section.classList.remove('active_post');
      section.style.backgroundColor = "";
    } else {
      section.classList.add('active_post');
      section.style.cssText = 'background-color: rgb(0 0 0 / 46%);';
    }
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

function build() {

  const sections = document.querySelectorAll('section');
  const nav = document.querySelector('#navbar__list');
  for (let i = 0; i < sections.length; i++) {

    // construct nav
    const li = document.createElement('li');
    li.innerHTML = sections[i].getAttribute('data-nav');
    li.setAttribute('data-section', sections[i].getAttribute('id'));
    nav.appendChild(li);
    li.classList.add('active_tags');
    li.addEventListener('click', (e) => {
      scrollHandler(e);
      activateLi(e);
    });

    // add image display-er
    const landing = sections[i].querySelector('.landing__container');

    const button = document.createElement('button');
    button.classList.add('open_img_btn');
    button.innerHTML = "Open Image";
    landing.appendChild(button);

    const br = document.createElement('br');
    landing.appendChild(br);

    const img = document.createElement('img');
    img.src = 'images/' + images[i];
    img.setAttribute('width', '750');
    img.setAttribute('height', 'auto');
    img.setAttribute('alt', 'Petri Prints');
    img.style.display = "none";
    landing.appendChild(img);

    button.addEventListener('click', (e) => {
      toggleImage(e);
    })

  }
  document.querySelector(".main__hero").insertAdjacentHTML('afterend', '<h2>See some of my Art !</h2>');
}

function toggleImage(e) {
  let img = e.target.parentElement.querySelector('img');
  if (img.style.display == "block") {
    img.style.display = "none";
    e.target.innerHTML = "Open Image";
  } else {
    img.style.display = "block";
    e.target.innerHTML = "Close Image";
  }
}

function activateLi(e) {
  e.preventDefault();
  const navTags = document.querySelectorAll('.active_tags');
  // remove active from all <li> elems
  for (let i = 0; i < navTags.length; i++) {
    navTags[i].classList.remove('active');
  }
  // add active to *clicked* <li>
  e.target.classList.add('active');
}

// Scroll to anchor ID using scrollTO event
// Scroll to section on link click
function scrollHandler(e) {
  e.preventDefault();
  let sectionId = e.target.getAttribute('data-section');
  let offsetTop = window.document.getElementById(sectionId).offsetTop;
  scrollTo({
    top: offsetTop,
    behavior: 'smooth'
  })
  console.log('Jumped to section.');
}

// show/hide scroll button
function handleScrollBtn() {
  const rootEl = document.documentElement;
  const scrollToTopBtn = document.querySelector('.scroll_top_btn');
  // Do something on scroll
  let scrollTotal = rootEl.scrollHeight - rootEl.clientHeight;
  if ((rootEl.scrollTop / scrollTotal) > 0.40) {
    //show button
    scrollToTopBtn.style.display = 'block';
  } else {
    //hide button
    scrollToTopBtn.style.display = 'none';
  }
}
//scroll to Top
function scrollToTop() {
  const rootEl = document.documentElement;
  rootEl.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  console.log('Clicked back to top.');
}

/**
 * End Main Functions
 * Begin Events
 * 
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM is ready');
  build();

  //Detects when user has stopped scrolling
  let scrollStop = function(callback) {
    if (!callback || typeof callback !== 'function') return;
    let isScrolling;
    // Listen for scroll events
    window.addEventListener('scroll', function() {
      // Clear our timeout throughout scroll
      window.clearTimeout(isScrolling);
      // Set timeout to run after scrolling ends
      isScrolling = setTimeout(callback, 100);
    }, false);
  };

  // When user scrolls down, hides the navbar. When the user scrolls up, shows navbar
  let preScrollPos = window.pageYOffset;
  window.onscroll = function() {
    let onScrollPos = window.pageYOffset;
    if (preScrollPos > onScrollPos) {
      document.getElementById('navbar__list').style.top = '0';
    } else {
      document.getElementById('navbar__list').style.top = '-100px';
    }
    preScrollPos = onScrollPos;
  };

  window.addEventListener('scroll', isInViewport);
  document.querySelector('.scroll_top_btn').addEventListener('click', scrollToTop);
  document.addEventListener('scroll', handleScrollBtn);
  scrollStop(function() {
    console.log('Scrolling stopped.');
  });
});