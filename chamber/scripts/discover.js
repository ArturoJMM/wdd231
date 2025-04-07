const gridContainer = document.getElementById('discover-grid');

// 2. La dirección (URL) donde está nuestro archivo JSON con los datos
const dataUrl = 'data/discover_items.json';

// 3. Función que crea una tarjeta HTML para un lugar
function createDiscoverCard(item) {
    // Creamos los elementos HTML que necesitamos para una tarjeta
    let card = document.createElement('article');
    card.classList.add('discover-card'); // Le ponemos una clase para el CSS

    let title = document.createElement('h2');
    title.textContent = item.name; // Ponemos el nombre del lugar

    let figure = document.createElement('figure');
    let image = document.createElement('img');
    image.src = `images/${item.image}`; // La ruta a la imagen
    image.alt = item.name;             // Texto alternativo para la imagen
    image.loading = 'lazy';            // Para que carguen de forma eficiente
    image.width = 300;                 // Ancho (según instrucción)
    image.height = 200;                // Alto (según instrucción)
    figure.appendChild(image);         // Metemos la imagen dentro del figure

    let address = document.createElement('address');
    address.textContent = item.address; // Ponemos la dirección

    let description = document.createElement('p');
    description.textContent = item.description; // Ponemos la descripción

    let button = document.createElement('button');
    button.textContent = 'Learn More'; // Texto del botón

    // Añadimos todos los elementos creados a la tarjeta (article)
    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    // Devolvemos la tarjeta completa
    return card;
}

// 4. Pedir los datos al archivo JSON
fetch(dataUrl)
    .then(response => response.json()) // Convertir la respuesta a formato JSON
    .then(data => {
        // 5. Una vez que tenemos los datos (la lista de lugares)...
        // Limpiamos el contenedor por si había algo antes
        gridContainer.innerHTML = '';

        // Recorremos cada 'item' (lugar) en la lista de datos
        data.forEach(item => {
            // Creamos una tarjeta para este item
            let card = createDiscoverCard(item);
            // Añadimos la tarjeta al contenedor en el HTML
            gridContainer.appendChild(card);
        });
    });