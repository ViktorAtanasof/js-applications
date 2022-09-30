import page from '../node_modules/page/page.mjs';
import { render as litRender } from '../node_modules/lit-html/lit-html.js';
import { get } from './data/api.js';
import { dashboardPage } from './views/dashboard.js';
import { detailsPage } from './views/details.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/profile.js';


const main = document.getElementById('site-content');

document.getElementById('logoutBtn').addEventListener('click', logout);

page(decorateContext);

page('/', dashboardPage);
page('/dashboard/:id', detailsPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/edit/:id', editPage);
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
    const user = document.getElementById('user');
    const guest = document.getElementById('guest');
    const welcome = user.querySelector('span');

    if(userData != null) {
        welcome.textContent = `Welcome, ${userData.email}`;
        user.style.display = 'block';
        guest.style.display = 'none';
    } else {
        guest.style.display = 'block';
        user.style.display = 'none';
    }
}

function logout(ev) {
    get('/users/logout');
    sessionStorage.clear();
    checkUserNav();
    page.redirect('/');
}