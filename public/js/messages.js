// make contact active on navbar
function deactivateHome() {
    const homeNavLi = document.getElementById("homeNavLi");
    homeNavLi.classList.toggle("activeLi");
}

let count = 0;
let idArray = [];
function checkAllBoxes() {
    const checkAllBox = document.querySelector("#checkall");
    checkAllBox.addEventListener("click", () => { 
        let check = checkAllBox.checked;
        let boxes = document.querySelectorAll(".checkbox input");
        for (let box of boxes) {
            box.checked = check;
            if (!check) {
                deleteBtn.style.display = "none";
                idArray = [];
                count = 0;
            }
            else {
                deleteBtn.style.display = "inline-block";
                count = boxes.length;
                idArray.push(box.value);
            }
        }
    });
}

function onCheck() {
    const deleteBtn = document.querySelector("#deleteBtn");
    let boxes = document.querySelectorAll(".checkbox input");
    for (let box of boxes) {
        box.addEventListener("change", () => {
            // show button and add value to id array
            let value = box.value;
            if (box.checked) {
                idArray.push(value);
                count++;
            }
            else {
                let index = idArray.indexOf(value);
                if (index > -1) {
                    idArray.splice(index, 1);
                }
                count--;
            }
            if (count > 0) {
                deleteBtn.style.display = "inline-block";
            }
            else {
                deleteBtn.style.display = "none";
                document.querySelector("#checkall").checked = false;
            }
        });
    }
}

function clickButton(){
    const deleteBtn = document.querySelector("#deleteBtn");
    deleteBtn.addEventListener("click", () => {
        console.log(idArray);
        sendData();
    });
}

function sendData(){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/messages", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(idArray));
    setTimeout( () => {
        location.reload()
    }, 2000);
}

deactivateHome();
onCheck();
checkAllBoxes();
clickButton();