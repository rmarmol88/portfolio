// make contact active on navbar
function deactivateHome() {
    const homeNavLi = document.getElementById("homeNavLi");
    //const contactNavLi = document.getElementById("contactNavLi"); 
    homeNavLi.classList.toggle("activeLi");
    //contactNavLi.classList.toggle("activeLi");
}

deactivateHome();
