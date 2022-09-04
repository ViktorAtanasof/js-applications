async function getInfo() {
    const busId = document.getElementById('stopId').value;
    const ul = document.getElementById('buses');
    const div = document.getElementById('stopName');

    try {
        const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${busId}`);

        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        if (response.ok == false || response.statusText == 'No Content' || busId == '') {
            throw new Error('Stop ID not found');
        } else {

            const data = await response.json();

            div.textContent = data.name;


            for (let keys in data.buses) {
                const li = document.createElement('li');
                li.textContent = `Bus ${keys} arrives in ${data.buses[keys]} minutes`;

                ul.appendChild(li);
            }
        }
    } catch (error) {
        div.textContent = 'Error';
    }
}
