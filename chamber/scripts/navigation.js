const menuToggle = document.getElementById("menu-btn");
const navLinks = document.getElementById("main-nav");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");

})

const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            links.forEach(l => l.classList.remove("active"));
            e.target.classList.add("active");
            if(window.innerWidth <= 768) {
                document.getElementById('nav-links').classList.remove('active');
            }
        })
    })
