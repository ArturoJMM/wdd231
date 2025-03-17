const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("main-nav");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
})

const links = document.querySelectorAll(".nav-link");

links.forEach(link => {
    link.addEventListener("click", (e) => {
        links.forEach(l => l.classList.remove("active"));
        e.target.classList.add("active");
        if(window.innerWidth <= 768) {
            document.getElementById('main-nav').classList.remove('active');
        }
    })
});
