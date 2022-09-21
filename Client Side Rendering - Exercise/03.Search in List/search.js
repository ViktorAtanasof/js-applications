import { html, render } from "../node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

const listTowns = document.getElementById('towns');
const input = document.getElementById('searchText');
const result = document.getElementById('result');

const townTemplate = (towns) => html`
<ul>
   ${towns.map((town) => html`<li>${town}</li>`)}
</ul>`;

render(townTemplate(towns), listTowns);

document.querySelector('button').addEventListener('click', search);

function search() {
   const list = [...listTowns.querySelectorAll('li')];
   list.forEach(e => e.className = '');
   result.textContent = '';

   const matches = list.filter(e => e.textContent.includes(input.value));
   matches.forEach(e => e.className = 'active');
   result.textContent = `${matches.length} matches found`;
}
