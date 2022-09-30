const host = 'http://localhost:3030'; // Server host

// Request Validation
async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, options);

        if (response.ok == false) {
            if(response.status == 403) {
                sessionStorage.clear();
            }

            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

// CRUD Operations
export function get(url) {
    return request('get', url);
}

export function post(url, data) {
    return request('post', url, data);
}

export function put(url, data) {
    return request('put', url, data);
}

export function del(url) {
    return request('delete', url);
}

// Login form
export async function login(email, password) {
    const data = await post('/users/login', { email, password });

    const userData = {
        id: data._id,
        email: data.email,
        accessToken: data.accessToken
    };
    sessionStorage.setItem('userData', JSON.stringify(userData));
}

// Register form
export async function register(email, password) {
    const data = await post('/users/register', { email, password});

    const userData = {
        id: data._id,
        email: data.email,
        accessToken: data.accessToken
    };
    sessionStorage.setItem('userData', JSON.stringify(userData));
}