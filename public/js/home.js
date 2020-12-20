function startTyping() {
    const line = document.querySelectorAll(".line");
    let count = 0;

    // display the lines one at a time
    for (let i = 0; i < line.length; i++) {
        setTimeout(() => {
            line[i].setAttribute("style", "display:block");
            if (i > 0) {
                line[i-1].setAttribute("style", "display:block; border-right: none");
            }
        }, 500 + count);
        count += 2500;
    }

    // remove the curser at the end
    setTimeout(() => {
        line[line.length - 1].setAttribute("style", "display:block; border-right: none");
    }, 17000);
}

startTyping();