document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    })

    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            links.forEach(l => l.classList.add("active"));
            e.target.classList.remove("active");
            if(window.innerWidth <= 768) {
                document.getElementById('nav-links').classList.remove('active');
            }
        })
    })
});