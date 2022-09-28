import { html } from '../../node_modules/lit-html/lit-html.js';
import { getEventsByUserId } from '../data/events.js';

const profileTemplate = (events, user) => html`
<section id="profilePage">
            <div class="userInfo">
                <div class="avatar">
                    <img src="./images/profilePic.png">
                </div>
                <h2>${user.email}</h2>
            </div>
            <div class="board">
                ${events.length == 0
                    ? html`<div class="no-events">
                    <p>This user has no events yet!</p>
                    </div>`
                    : events.map(userEvents)}
            </div>
</section>
`;

const userEvents = (post) => html`
<div class="eventBoard">
        <div class="event-info">
            <img src="${post.imageUrl}">
            <h2>${post.title}</h2>
            <h6>${post.date}</h6>
            <a href="/home/${post._id}" class="details-button">Details</a>
        </div>
</div>
`;

export async function profilePage(ctx) {
    const user = JSON.parse(sessionStorage.getItem('userData'));
    const events = await getEventsByUserId(user.id);
    ctx.render(profileTemplate(events, user));
}