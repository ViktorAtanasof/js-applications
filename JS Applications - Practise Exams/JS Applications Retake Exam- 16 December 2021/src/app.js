import page from '../node_modules/page/page.mjs';
import { render as litRender} from '../node_modules/lit-html/lit-html.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { detailsPage } from './views/details.js';
import { profilePage } from './views/profile.js';
import { get } from './data/api.js';

const main = document.getElementById('content');
document.getElementById('logoutBtn').addEventListener('click', logout);

page(decorateContext);

page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/home/:id', detailsPage);
page('/profile', profilePage);

checkUserNav();
page.start();

function render(template) {
    litRender(template, main);
}

function decorateContext(ctx, next) {
    ctx.render = render;
    ctx.checkNav = checkUserNav;
    next();
}

function checkUserNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const home = document.querySelector('.theater');
    const user = document.querySelectorAll('.user');
    const guest = document.querySelectorAll('.guest');

    if(userData != null) {
        home.style.display = 'block';
        user.forEach((e) => e.style.display = 'block');
        guest.forEach((e) => e.style.display = 'none');
    } else {
        home.style.display = 'block';
        user.forEach((e) => e.style.display = 'none');
        guest.forEach((e) => e.style.display = 'block');
    }
}

async function logout(ev) {
    await get('/users/logout');
    sessionStorage.clear();
    checkUserNav();
    page.redirect('/');
}