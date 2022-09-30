import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteBookById, getByBookId, getLikesByEventId, getMyLikesByEventId, likeEvent } from '../data/books.js';

const detailsTemplate = (book, isOwner, onClick, likes, showLike, onLike) => html`
<section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: ${book.type}</p>
                <p class="img"><img src="${book.imageUrl}"></p>
                <div class="actions">
                    ${isOwner
                        ? html` <a class="button" href="/edit/${book._id}">Edit</a>
                                <a @click=${onClick} class="button" href="javascript:void(0)">Delete</a>`
                        : ''}
                    ${likeTemplate(showLike, onLike)}
                    <!-- Bonus -->
                    <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                    <!-- <a class="button" href="#">Like</a> -->

                    <div class="likes">
                        <img class="hearts" src="/images/heart.png">
                        <span id="total-likes">Likes: ${likes}</span>
                    </div>
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${book.description}</p>
            </div>
</section>
`;

const likeTemplate = (showLike, onLike) => {
    if (showLike) {
        return html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`;
    } else {
        return null;
    }
};

export async function detailsPage(ctx) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    const [book, likes, hasLike] = await Promise.all([
        getByBookId(ctx.params.id),
        getLikesByEventId(ctx.params.id),
        userData ? getMyLikesByEventId(ctx.params.id, userData.id) : 0
    ]);

    const isOwner = userData?.id == book._ownerId;
    const showLike = userData != null && isOwner == false && hasLike == false;

    ctx.render(detailsTemplate(book, isOwner, onClick, likes, showLike, onLike));

    async function onClick(ev) {
        const isCheck = confirm('Are you sure you want to delete this post?');
        if(isCheck) {
            await deleteBookById(ctx.params.id);
            ctx.page.redirect('/');
        }
    }

    async function onLike(ev) {
        await likeEvent(ctx.params.id);
        ctx.page.redirect('/dashboard/' + ctx.params.id);
    }
}