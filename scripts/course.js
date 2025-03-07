
document.addEventListener('DOMContentLoaded', () => {
    
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.course-card');

    
    buttons.forEach(boton => {
        boton.addEventListener('click', () => {
            
            buttons.forEach(btn => btn.classList.remove('active'));
            
            boton.classList.add('active');

            
            const filter = boton.dataset.filter;

            // 4. Recorrer todas las tarjetas
            cards.forEach(card => {
                // Si el filtro es "all" o coincide con la clase de la tarjeta
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.backgroundColor = '#f1c40f'; 
                } else {
                    card.style.backgroundColor = '#ffffff'; 
                }
            });
        });
    });
});