function activateAbout() {
    const homeNavLi = document.getElementById("homeNavLi");
    const aboutNavLi = document.getElementById("aboutNavLi"); 
    homeNavLi.classList.toggle("activeLi");
    aboutNavLi.classList.toggle("activeLi");
}

function proggressBars() {
    const skills = document.querySelectorAll(".skills");
    for (let skill of skills) {
        let skillWidth = skill.innerHTML;
        let width = 0;
        skillWidth = skillWidth.replace("%", "");   // removing % sign so we can use in a loop
        let id = setInterval(frame, 10);
        function frame() {
            if (width == skillWidth) {
                clearInterval(id);
            }
            else {
                width++;
                skill.style.width = width + "%";
            }
        }        
    }
}

activateAbout();
proggressBars();
