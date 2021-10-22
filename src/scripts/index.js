window.onscroll = function () {
  addNavbarBackgroundOnScroll();
};

const navbar = document.getElementById('navbar');
const topPadding = 16 * 1.75;

function addNavbarBackgroundOnScroll() {
  const classes = [
    'fixed',
    'bg-white',
    'bg-opacity-80',
    'backdrop-filter',
    'backdrop-blur-xl',
    'border-b',
    'border-gray-300',
  ];
  if (document.body.scrollTop > topPadding || document.documentElement.scrollTop > topPadding) {
    navbar.classList.add(...classes);
  } else {
    navbar.classList.remove(...classes);
  }
}

const attachment = document.getElementById('attachment');
const fileNameEl = document.getElementById('fileName');

attachment.onchange = function (event) {
  if (event.target.files[0]) {
    fileNameEl.innerText = event.target.files[0].name;
  }
};

function toggleMobileMenu(open) {
  const html = document.documentElement;
  const body = document.body;
  const mobileMenu = document.getElementById('mobile-navbar-menu');
  if (open) {
    html.classList.add('overflow-y-hidden');
    body.classList.add('overflow-y-hidden');
    mobileMenu.classList.remove('translate-x-full');
  } else {
    html.classList.remove('overflow-y-hidden');
    body.classList.remove('overflow-y-hidden');
    mobileMenu.classList.add('translate-x-full');
  }
}

window.onresize = function () {
  const isMobile = window.innerWidth < 640;
  if (!isMobile) {
    toggleMobileMenu(false);
  }
};

document.addEventListener('click', event => {
  if (event.target.href && event.target.href.includes('#') || event.target.dataset.target) {
    event.preventDefault();
    const tagName = event.target.tagName;
    const href = tagName === 'A' ? event.target.href : event.target.dataset.target;
    const targetId = href.slice(href.indexOf('#') + 1);
    const offsetTop = document.getElementById(targetId).offsetTop;
    let target = offsetTop;

    if (window.scrollY <= topPadding) {
      target -= 100 + navbar.offsetHeight;
    } else {
      target -= 100;
    }

    window.scrollTo({ top: target });

    const isMobileMenu =
      event.target.parentElement.parentElement.parentElement.id === 'mobile-navbar-menu';
    if (isMobileMenu) {
      toggleMobileMenu(false);
    }
  }
});
