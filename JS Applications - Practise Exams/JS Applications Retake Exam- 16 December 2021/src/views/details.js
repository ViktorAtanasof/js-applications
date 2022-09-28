import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteEvent, getEventById, getLikeByEventId, getMyLikeByEventId, likeEvent } from '../data/events.js';

const detailsTemplate = (event, isOwner, onClick, likes, showLike, onLike) => html`
<section id="detailsPage">
            <div id="detailsBox">
                <div class="detailsInfo">
                    <h1>Title: ${event.title}</h1>
                    <div>
                        <img src="${event.imageUrl}" />
                    </div>
                </div>

                <div class="details">
                    <h3>Theater Description</h3>
                    <p>${event.description}</p>
                    <h4>Date: ${event.date}</h4>
                    <h4>Author: ${event.author}</h4>
                    <div class="buttons">
                    ${isOwner
                        ? html`
                        <a class="btn-delete" @click=${onClick} href="javascript:void(0)">Delete</a>
                        <a class="btn-edit" href="/edit/${event._id}">Edit</a>`
                        : ''}
                    ${likeTemplate(showLike, onLike)}
                    </div>
                    <p class="likes">Likes: ${likes}</p>
                </div>
            </div>
</section>
`;

const likeTemplate = (showLike, onLike) => {
    if (showLike) {
        return html`<a @click=${onLike} class="btn-like" href="javascript:void(0)">Like</a>`;
    } else {
        return null;
    }
};

export async function detailsPage(ctx) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    const [event, likes, hasLike] = await Promise.all([
        getEventById(ctx.params.id),
        getLikeByEventId(ctx.params.id),
        userData ? getMyLikeByEventId(ctx.params.id, userData.id) : 0
    ]);

    const isOwner = userData?.id == event._ownerId;
    const showLike = userData != null && isOwner == false && hasLike == false;

    ctx.render(detailsTemplate(event, isOwner, onClick, likes, showLike, onLike));

    async function onClick(ev) {
        const isCheck = confirm('Are you sure you want to delete this post?');

        if(isCheck) {
            await deleteEvent(ctx.params.id);
            ctx.page.redirect('/profile');
        }
    }

    async function onLike(ev) {
        await likeEvent(ctx.params.id);
        ctx.page.redirect('/home/' + ctx.params.id);
    }
}