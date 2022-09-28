import { del, get, post, put } from "./api.js";

export async function getAllEvents() {
    return get('/data/theaters?sortBy=_createdOn%20desc&distinct=title');
}

export async function getEventById(id) {
    return get('/data/theaters/' + id);
}

export async function deleteEvent(id) {
    return del('/data/theaters/' + id);
}

export async function editEvent(id, data) {
    return put('/data/theaters/' + id, data);
}

export async function getEventsByUserId(userId) {
    return get(`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function likeEvent(theaterId) {
    return post('/data/likes', {
        theaterId
    });
}

export async function getLikeByEventId(theaterId) {
    return get(`/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`);
}

export async function getMyLikeByEventId(theaterId, userId) {
    return get(`/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
