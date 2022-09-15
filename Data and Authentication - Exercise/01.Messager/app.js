async function attachEvents() {
    const submitBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');

    const name = document.querySelector('input[name="author"]');
    const message = document.querySelector('input[name="content"]');
    const messages = document.getElementById('messages');

    submitBtn.addEventListener('click', onSubmit);
    refreshBtn.addEventListener('click', onRefresh);

    const url = 'http://localhost:3030/jsonstore/messenger';

    async function onSubmit(ev) {
        const data = {};
        data.author = name.value;
        data.content = message.value;

        await fetch(url, {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    async function onRefresh(ev) {
        const res = await fetch(url);
        const getData = await res.json();

        const result = [];

        Object.values(getData).forEach(e => {
            const text = `${e.author}: ${e.content}`;
            result.push(text);
        });
        messages.textContent = result.join('\n');
    }
}

attachEvents();