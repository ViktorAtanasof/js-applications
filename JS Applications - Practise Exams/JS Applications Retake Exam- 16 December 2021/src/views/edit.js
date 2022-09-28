import { html } from '../../node_modules/lit-html/lit-html.js';
import { editEvent, getEventById } from '../data/events.js';

const editTemplate = (event, onSubmit) => html`
<section id="editPage">
            <form @submit=${onSubmit} class="theater-form">
                <h1>Edit Theater</h1>
                <div>
                    <label for="title">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Theater name" value="${event.title}">
                </div>
                <div>
                    <label for="date">Date:</label>
                    <input id="date" name="date" type="text" placeholder="Month Day, Year" value="${event.date}">
                </div>
                <div>
                    <label for="author">Author:</label>
                    <input id="author" name="author" type="text" placeholder="Author"
                        value="${event.author}">
                </div>
                <div>
                    <label for="description">Theater Description:</label>
                    <textarea id="description" name="description"
                        placeholder="Description">${event.description}</textarea>
                </div>
                <div>
                    <label for="imageUrl">Image url:</label>
                    <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                        value="${event.imageUrl}">
                </div>
                <button class="btn" type="submit">Submit</button>
            </form>
</section>
`;

export async function editPage(ctx) {
    const event = await getEventById(ctx.params.id);
    ctx.render(editTemplate(event, onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);

        const data = {
            title: formData.get('title'),
            date: formData.get('date'),
            author: formData.get('author'),
            imageUrl: formData.get('imageUrl'),
            description: formData.get('description')
        }

        if(data.title == '' || data.date == '' || data.author == '' || data.imageUrl == '' || data.description == '') {
            alert('All fields are required!');
        } else {
            await editEvent(ctx.params.id, data);
            ctx.page.redirect(`/home/` + ctx.params.id);
        }
    }
}