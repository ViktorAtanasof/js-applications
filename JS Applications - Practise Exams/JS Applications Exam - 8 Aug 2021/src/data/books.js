import { del, get, post, put } from "./api.js";

export async function postBook(data) {
    return post('/data/books', data);
}

export async function getAllBooks() {
    return get('/data/books?sortBy=_createdOn%20desc');
}

export async function getByBookId(id) {
    return get('/data/books/' + id);
}

export async function deleteBookById(id) {
    return del('/data/books/' + id);
}

export async function editBookById(id, data) {
    return put('/data/books/' + id, data);
}

export async function getBooksByUserId(userId) {
    return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function likeEvent(bookId) {
    return post('/data/likes', {
        bookId
    });
}

export async function getLikesByEventId(bookId) {
    return get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}

export async function getMyLikesByEventId(bookId, userId) {
    return get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}