window.onscroll = function () {
  addNavbarBackgroundOnScroll();
};

const navbar = document.getElementById('navbar');
const topPadding = 16 * 1.75;

function addNavbarBackgroundOnScroll() {
  if (document.body.scrollTop > topPadding || document.documentElement.scrollTop > topPadding) {
    navbar.style.position = 'fixed';
    navbar.style.backgroundColor = 'rgba(255,255,255,0.85)';
    navbar.style.backdropFilter = 'blur(32px)';
    navbar.style.borderBottom = '1px solid #D1D5DB';
  } else {
    navbar.style.position = '';
    navbar.style.backgroundColor = '';
    navbar.style.backdropFilter = '';
    navbar.style.borderBottom = '';
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
  const mobileMenu = document.getElementById('mobile-navbar-menu');
  if (open) {
    mobileMenu.style.transform = 'translateX(0)';
  } else {
    mobileMenu.style.transform = '';
  }
}

window.onresize = function () {
  const isMobile = window.innerWidth < 640;
  if (!isMobile) {
    toggleMobileMenu(false);
  }
};

document.querySelectorAll('[href^="#"]').forEach(link => {
  link.onclick = function (event) {
    event.preventDefault();
    const tagName = event.target.tagName;
    const href = tagName === 'A' ? event.target.href : event.target.parentElement.href;
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
  };
});
