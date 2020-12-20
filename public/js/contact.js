// make contact active on navbar
function activateContact() {
    const homeNavLi = document.getElementById("homeNavLi");
    const contactNavLi = document.getElementById("contactNavLi"); 
    homeNavLi.classList.toggle("activeLi");
    contactNavLi.classList.toggle("activeLi");
}

activateContact();
