let initialData = `<div id="container-content" class="container-content">
    <input type="text" id="name" class="name" placeholder="Enter your name">
    <input type="text" id="age" class="age"
        onkeypress="return event.charCode >= 48 && event.charCode <= 57" maxlength="2"
        placeholder="Enter your age">
    <input type="text" id="mark" class="mark"
        onkeypress="return event.charCode >= 48 && event.charCode <= 57" maxlength="3"
        placeholder="Enter your mark">
    <button type="submit" id="add" class="add" value="add" onclick="addData()">+</button>
</div>`;

function addData() {
    let content = document.getElementById("container");
    const div = document.createElement("container-content");
    div.innerHTML += `<input type="text" id="name" class="name" placeholder="Enter your name">
        <input type="text" id="age" class="age"  onkeypress="return event.charCode >= 48 && event.charCode <= 57" maxlength="2" placeholder="Enter your age">
        <input type="text" id="mark" class="mark"  onkeypress="return event.charCode >= 48 && event.charCode <= 57" maxlength="3" placeholder="Enter your mark">
        <button type="submit" id="add" class="add" value="add" onclick="addData()">+</button>
        <button type="submit" id="delete" class="delete" value="delete" onclick="deleteData(this)">-</button>`;
    div.className = "container-content";
    //console.log(div);
    content.appendChild(div);
}

function deleteData(e) {
    e.parentElement.remove();
}

function submitData() {
    let details = [];
    let name = Array.from(document.getElementsByClassName("name"));
    let age = Array.from(document.getElementsByClassName("age"));
    let mark = Array.from(document.getElementsByClassName("mark"));

    for (let i = 0; i < name.length; i++) {
        if (name[i].value != '' && age[i].value != '' && mark[i].value != '') {
            details.push({ name: name[i].value, age: age[i].value, mark: mark[i].value })
        }
    }
    //console.log(details);
    if(details.length >= 1){
        localStorage.setItem("Details", JSON.stringify(details));
        loadFunction();
    }
}

function getData(){
    if(localStorage.getItem("Details") != null){
        return JSON.parse(localStorage.getItem("Details"));
    }
}

function resetData() {
    let content = document.getElementById("container");
    content.innerHTML = initialData;
    // localStorage.setItem("Details","");
    localStorage.clear();
    document.getElementById("table-container").style.display = "none";
}

// function submitData() {
//     getData();
    
//     // let data = JSON.parse(localStorage.getItem("Details"));
//     // let tableBody = document.getElementById("table-body-data");
//     // tableBody.innerHTML = "";
//     // for (let i in data) {
//     //     tableBody.innerHTML += `<tr>
//     //         <td>${data[i].name}</td>
//     //         <td>${data[i].age}</td>
//     //         <td>${data[i].mark}</td>
//     //     </tr>`;
//     // }
// }

function loadFunction() {
    document.getElementById("table-container").style.display = "block";
    changePage(1);
};

let current_page = 1;
let records_per_page = 5;
// let page = 1;

function prevPage() {
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage() {
    if (current_page < noOfPages()) {
        current_page++;
        changePage(current_page);
    }
}

function noOfPages() {
    let data = JSON.parse(localStorage.getItem("Details"));
    return Math.ceil(data.length / records_per_page);
}

function changePage(page) {
    let btn_next = document.getElementById("btn_next");
    let btn_prev = document.getElementById("btn_prev");
    let tableBody = document.getElementById("table-body-data");
    let page_span = document.getElementById("page");
    let data = getData();

    // Validate page
    if (page < 1) 
        page = 1;
    
    if (page > noOfPages()) 
        page = noOfPages();

    tableBody.innerHTML = "";

    
    for (let i = (page - 1) * records_per_page; i < (page * records_per_page); i++) {
        //console.log(data);
        if(data.length <= i){
            break;
        }
        tableBody.innerHTML += `<tr>
                <td>${data[i].name}</td>
                <td>${data[i].age}</td>
                <td>${data[i].mark}</td>
            </tr>`;
    }
    page_span.innerHTML = page + "/" + noOfPages();

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == noOfPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function sortTable(n) {
    let table = document.getElementById("table");
    let rows, switching, i, x, y, shouldSwitch, switchCount = 0, order = "asc";
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < rows.length - 1; i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (n === 0) {
                if (order == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (order == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            else {
                if (order == "asc") {
                    if (Number(x.innerHTML) > Number(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (order == "desc") {
                    if (Number(x.innerHTML) < Number(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchCount++;
        } else {
            if (switchCount == 0 && order == "asc") {
                order = "desc";
                switching = true;
            }
        }
    }
}