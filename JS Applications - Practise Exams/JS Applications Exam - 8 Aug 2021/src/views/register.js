import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../data/api.js';

const registerTemplate = (onSubmit) => html`
<section id="register-page" class="register">
            <form @submit=${onSubmit} id="register-form" action="" method="">
                <fieldset>
                    <legend>Register Form</legend>
                    <p class="field">
                        <label for="email">Email</label>
                        <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                    </p>
                    <p class="field">
                        <label for="password">Password</label>
                        <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                    </p>
                    <p class="field">
                        <label for="repeat-pass">Repeat Password</label>
                        <span class="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Register">
                </fieldset>
            </form>
</section>
`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const repass = formData.get('confirm-pass');

        if(email == '' || password == '') {
            alert('All fields are required!');
        } else if (repass != password) {
            alert('Passwords don\'t match!');
        } else {
            await register(email, password);
            ctx.checkNav();
            ctx.page.redirect('/');
        }
    }
}