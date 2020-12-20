function myNavbar() {
    const menu = document.querySelector(".menuToggle");
    const nav = document.querySelector("nav");

    menu.onclick = () => {
        nav.classList.toggle("active");
    }
}

myNavbar();