import { html, render } from "../node_modules/lit-html/lit-html.js";

const list = document.getElementById('root');
const form = document.querySelector('form');
const input = document.getElementById('towns');

form.addEventListener('submit', onSubmit);

function onSubmit(ev) {
    ev.preventDefault();

    const result = input.value.split(', ');

    const cities = html`
        <ul>
            ${result.map((city) => html`<li>${city}</li>`)}
        </ul>`;


    render(cities, list);
}
