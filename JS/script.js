/////slide menu mobile
const openBtn = document.querySelector('img[data-type="open-btn"]')
const closeBtn = document.querySelector('img[data-type="close-btn"]')
const navContainer = document.querySelector('[data-type="nav-container"]')
const header = document.querySelector('header')
const body = document.querySelector('body')

document.addEventListener('click', (e) => {
  if (e.target === openBtn) {
    e.preventDefault();
    body.classList.add('body-active')
    navContainer.classList.add('open-nav')
    openBtn.style.opacity = '0'
    
  } else if (e.target === closeBtn) {
    navContainer.classList.remove('open-nav')
    body.classList.remove('body-active')
    openBtn.style.opacity = '1'
  }
})

/////Features-section
const tabList = document.querySelector('[role="tablist"]')
const tabs = document.querySelectorAll('[role="tab"]')

tabs.forEach((tab) => {
  tab.addEventListener('click', changeTabPanel);
})

function changeTabPanel(e) {
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute("aria-controls");
  const tabContainer = targetTab.parentNode;
  const tabSection = tabContainer.parentNode;
  console.log(tabContainer)
  console.log(tabSection)

  tabContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute("aria-selected", false);

  targetTab.setAttribute("aria-selected", true);

  hideContent(tabSection, '[role="tabpanel"]');
  showContent(tabSection, `#${targetPanel}`)
}

function hideContent(parent, content) {
  parent.querySelectorAll(content).forEach((item) => item.setAttribute('hidden', true))
}

function showContent(parent, content) {
  parent.querySelector(content).removeAttribute('hidden')
}

////FAQ section
const accordion = document.querySelector('.accordion')

accordion.addEventListener('click', (e) => {
  const panelActive = e.target.closest('.accordion-panel');

  if(!panelActive){
    return
  }

  currentPanel(panelActive);
})

function currentPanel(panelActive) {
  const activeBtn = panelActive.querySelector('button');
  const panel = panelActive.querySelector('.accordion-content');
  const btnTrue = activeBtn.getAttribute('aria-expanded');
  const panelArrow = panelActive.querySelector('.arrow');

  if (btnTrue === "true"){
    activeBtn.setAttribute("aria-expanded", false)
    panel.setAttribute("aria-hidden", true)
    panelArrow.classList.remove('arrow-active');

  } else {
    activeBtn.setAttribute("aria-expanded", true)
    panel.setAttribute("aria-hidden", false)
    panelArrow.classList.add('arrow-active'); 
  }
}

///Code for input email
const inputEmail = document.querySelector('input[data-type="input-email"]');
const btn = document.querySelector('#btn-red-contact');
const errorMsg = document.querySelector('span[data-type="error"]');
const errorIcon = document.querySelector('img[data-type="icon-err"]');
let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

inputEmail.addEventListener('input', () => {
  if(!inputEmail.value.match(regex) && inputEmail.value !== ''){
    inputEmail.style.borderColor = 'rgba(250, 89, 89, 1)';
    inputEmail.style.borderBottomWidth = '25px';
    errorMsg.classList.add('err-active');
    errorIcon.classList.add('icon-active');
  } else {
    errorMsg.classList.remove('err-active');
    errorIcon.classList.remove('icon-active');
    inputEmail.style.borderColor = 'transparent';
    inputEmail.style.borderBottomWidth = 0;
    checkBtn();
  }
})

function checkBtn() {
  btn.style.pointerEvents = 'visible';
  btn.addEventListener('click', () =>{
    inputEmail.value = ''
    btn.style.pointerEvents = 'none';
  })
}