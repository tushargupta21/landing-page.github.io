let activeSection = document.querySelector('.active-section');

let activeNav = document.querySelector('.active-nav');

let lastScrollY = 0;

const sections = document.querySelectorAll('section');

const goUpButton = document.querySelector('#go-up-button');

function initialSetup() {
    const navBar = document.querySelector('#navbar_list');
    const fragment = document.createDocumentFragment();
    for (const section of sections) {
        const newNavButton = makeNavButton(section);
        fragment.appendChild(newNavButton);
    }
    navBar.appendChild(fragment);
    addListeners(navBar);
}

function makeNavButton(section) {
    const newNavButton = document.createElement('li');
    newNavButton.classList.add('menu_link');
    newNavButton.textContent = section.dataset.nav;
    newNavButton.setAttribute('data-id', section.id);
    newNavButton.id = `nav-${section.id}`;
    if (activeNav == null) {
        newNavButton.classList.add('active-nav')
        activeNav = newNavButton;
    }
    return newNavButton;
}

function addListeners(navBar) {
    navBar.addEventListener('click', onNavClick);
    document.addEventListener('scroll', function() {scrollCheck()});
    goUpButton.addEventListener('click', function() {window.scrollTo({top: 0, behavior: 'smooth'})});
}

function onNavClick(event) {
    const section = document.querySelector(`#${event.target.dataset.id}`);
    section.scrollIntoView({behavior: 'smooth'});
}

function scrollCheck() {
    const viewportHeight = window.innerHeight;
    let ratioForActive;
    if (window.scrollY > 500) {
        goUpButton.classList.remove('hide');
    } else {
        goUpButton.classList.add('hide');
    }
    if (window.scrollY > lastScrollY) {
        ratioForActive = viewportHeight/3;
    } else {
        ratioForActive = viewportHeight*2/3;
    }
    lastScrollY = window.scrollY;
    for (const section of sections) {
        const position = section.getBoundingClientRect();
        if (position.top < ratioForActive && position.bottom > ratioForActive && section !== activeSection) {
            setActiveSection(section);
            setActiveNav(document.querySelector(`#nav-${section.id}`));
            break;
        }
    }
}

function setActiveSection(section) {
    activeSection.classList.remove('active-section');
    section.classList.add('active-section');
    activeSection = section;
}

function setActiveNav(nav) {
    activeNav.classList.remove('active-nav');
    nav.classList.add('active-nav')
    activeNav = nav;
}

initialSetup();

