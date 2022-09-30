import { html } from '../../node_modules/lit-html/lit-html.js';
import { getBooksByUserId } from '../data/books.js';

const profileTemplate = (books) => html`
<section id="my-books-page" class="my-books">
            <h1>My Books</h1>      
            ${books.length == 0 
                ? html`<p class="no-books">No books in database!</p>`
                : books.map(bookCard)}
</section>
`;

const bookCard = (book) => html`
<ul class="my-books-list">
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src="${book.imageUrl}"></p>
        <a class="button" href="/dashboard/${book._id}">Details</a>
    </li>
</ul> 
`;

export async function profilePage(ctx) {
    const user = JSON.parse(sessionStorage.getItem('userData'));
    const books = await getBooksByUserId(user.id);
    ctx.render(profileTemplate(books));
}