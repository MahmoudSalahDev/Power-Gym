/// <reference types="../@types/jquery" />
///////////////////////////////////////////////////////
var memberName = document.getElementById("name");
var memberPrice = document.getElementById("price");
var memberNotes = document.getElementById("notes");
var memberphoneNumber = document.getElementById("phoneNumber");
var memberGym = document.getElementById("Gym");
var memberCardio = document.getElementById("Cardio");
var membercard = document.getElementById("card");
var wrongName = document.getElementById("wrongName");
var wrongPrice = document.getElementById("wrongPrice");
var wrongPhone = document.getElementById("wrongPhone");
var submitBtn = document.getElementById("submit");
var searchInput = document.getElementById("search");
var searchArchiveInput = document.getElementById("searchArchive");
var date = document.getElementById("date");
var durationInput = document.getElementById("duration");
let archiveData = document.getElementById("archiveData");
let membersTap = document.getElementById("membersTap");
let archiveTap = document.getElementById("archiveTap");
let archiveSection = document.getElementById("archiveSection");
let membersTable = document.getElementById("membersTable");
let membersForm = document.getElementById("membersForm");
var body = document.getElementsByTagName('body')[0];
let wrongDate = document.getElementById("wrongDate");
let updateExpiredInput = document.getElementById("updateExpired");
let updateExpiredBtn = document.getElementById("updateExpiredBtn");
let sauna = document.getElementById("souna");



membersTap.addEventListener("click", function () {
    body.style.backgroundImage = "linear-gradient(to right, rgba(0, 0, 0, 0.514) 0% 100%), url(./images/gym-bg.jpg)";
    archiveSection.classList.add("d-none");
    membersTable.classList.remove("d-none");
    membersForm.classList.remove("d-none");
})
archiveTap.addEventListener("click", function () {
    body.style.backgroundImage = "linear-gradient(to right, rgba(0, 0, 0, 0.514) 0% 100%), url(./images/archive.jpg)";
    archiveSection.classList.remove("d-none");
    membersTable.classList.add("d-none");
    membersForm.classList.add("d-none");
    displayArchive()

})
$(".nav-link").on("click", function () {
    $(".nav-link").removeClass("active")
    $(this).addClass("active")
})


var today = new Date()


var Data = document.getElementById("data");


var membersList = [];
var archiveList = [];

if (localStorage.getItem("Members") !== null) {
    membersList = JSON.parse(localStorage.getItem("Members"));
    displayMembers()
}
if (localStorage.getItem("archiveList") !== null) {
    archiveList = JSON.parse(localStorage.getItem("archiveList"));
}

submitBtn.addEventListener("click", function () {
    addmember()
})

// automatic remove expired members after 7 days
for (let i = 0; i < membersList.length; i++) {
    let expireDlt = new Date(membersList[i].expire)
    expireDlt.setDate(new Date(membersList[i].expire).getDate() + 15)
    // console.log(expireDlt);

    if (expireDlt < today) {
        archiveList.unshift(membersList[i]);
        // console.log(archiveList);
        localStorage.setItem("archiveList", JSON.stringify(archiveList));
        membersList.splice(i, 1);
        localStorage.setItem("Members", JSON.stringify(membersList));
    }
}


function addmember() {

    if (nameValidation() && priceValidation() && notesValidation() && phoneValidation() && dateValidation() && saunaValidation()) {
        // let today = new Date()

        let currentDate = new Date(date.value);
        let durationDays = +durationInput.value;
        let expirationDate = new Date(currentDate);
        expirationDate.setDate(currentDate.getDate() + durationDays);

        var member = {
            name: memberName.value,
            date: currentDate,
            expire: expirationDate,
            price: memberPrice.value,
            notes: memberNotes.value,
            phoneNumber: memberphoneNumber.value,
            sauna: sauna.value,
            Gym: (Gym.checked == 1) ? `<i class="fa-solid fa-check"></i>` : "",
            cardio: (Cardio.checked == 1) ? `<i class="fa-solid fa-check"></i>` : "",
            card: (card.checked == 1) ? `<i class="fa-solid fa-check"></i>` : "",
            Group: (Group.checked == 1) ? `<i class="fa-solid fa-check"></i>` : "",
        }
        membersList.unshift(member);
        localStorage.setItem("Members", JSON.stringify(membersList))
        displayMembers();
        clearInputs();
        // console.log(localStorage.getItem("sites"));
        // console.log(membersList);
    }
    else {
        console.log("wrong inouts");

    }


}

function displayArchive() {
    let contain = ``
    for (var i = 0; i < archiveList.length; i++) {
        // format for the date to display only
        let date = (new Date(archiveList[i].date))
        let dateYear = date.getFullYear();
        let dateMonth = String(date.getMonth() + 1).padStart(2, '0');
        let dateDay = String(date.getDate()).padStart(2, '0');
        let formattedDate = `${dateYear}/${dateMonth}/${dateDay}`;

        let expire = (new Date(archiveList[i].expire))
        let expireYear = expire.getFullYear();
        let expireMonth = String(expire.getMonth() + 1).padStart(2, '0');
        let expireDay = String(expire.getDate()).padStart(2, '0');
        let formattedExpire = `${expireYear}/${expireMonth}/${expireDay}`;
        // the end of the format
        contain += `
                        <tr>
                            <td class="red"><div>${archiveList[i].name}</div></td>
                            <td class="red"><div>${formattedDate}</div></td>
                            <td class="red"><div>${formattedExpire}</div></td>
                            <td class="red"><div>${archiveList[i].price}</div></td>
                            <td class="red"><div>${archiveList[i].notes}</div></td>
                            <td class="red"><div class="center">${archiveList[i].Gym}</div></td>
                            <td class="red"><div class="center">${archiveList[i].cardio}</div></td>
                            <td class="red"><div class="center">${archiveList[i].sauna}</div></td>
                            <td class="red"><div>${archiveList[i].phoneNumber}</div></td>
                            <td class="red"><div class="center">${archiveList[i].card}</div></td>
                            <td class="red"><div class="center">${archiveList[i].Group}</div></td>
                        </tr>
                `
    }
    archiveData.innerHTML = contain;
}

function displayMembers() {

    var cartona = ``
    for (var i = 0; i < membersList.length; i++) {
        // format for the date to display only
        let date = (new Date(membersList[i].date))
        let dateYear = date.getFullYear();
        let dateMonth = String(date.getMonth() + 1).padStart(2, '0');
        let dateDay = String(date.getDate()).padStart(2, '0');
        let formattedDate = `${dateYear}/${dateMonth}/${dateDay}`;

        let expire = (new Date(membersList[i].expire))
        let expireYear = expire.getFullYear();
        let expireMonth = String(expire.getMonth() + 1).padStart(2, '0');
        let expireDay = String(expire.getDate()).padStart(2, '0');
        let formattedExpire = `${expireYear}/${expireMonth}/${expireDay}`;
        // the end of the format
        if (today > new Date(membersList[i].expire)) {
            cartona += `
                        <tr>
                            <td class="red"><div>${membersList[i].name}</div></td>
                            <td class="red"><div>${formattedDate}</div></td>
                            <td class="red"><div>${formattedExpire}</div></td>
                            <td class="red"><div>${membersList[i].price}</div></td>
                            <td class="red"><div>${membersList[i].notes}</div></td>
                            <td class="red"><div class="center">${membersList[i].Gym}</div></td>
                            <td class="red"><div class="center">${membersList[i].cardio}</div></td>
                            <td class="red"><div class="center">${membersList[i].sauna}</div></td>
                            <td class="red"><div>${membersList[i].phoneNumber}</div></td>
                            <td class="red"><div class="center">${membersList[i].card}</div></td>
                            <td class="red"><div class="center">${membersList[i].Group}</div></td>
                            <td><div class="btn-group" >
                                    <button type="button"  class="btn btn-danger updateBtn" onclick="setValuesForUpdate(${i})">Update</button>
                                    <button type="button"  class="btn btn-danger  dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span class="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item dateLink" onclick="setValuesForUpdateTime(${i})">Update Date <i class="fa-regular fa-clock"></i></a></li>
                                        <li><a class="dropdown-item renewalLink" onclick="setValuesForRenewal(${i})">Renewal <i class="fa-solid fa-arrow-rotate-left"></i></a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item " id="dlt-btn"  onclick="deleteMember(${i})" >Delete <i class="fa-solid fa-trash-can"></i></a></li>
                                    </ul>
                                </div>
                            </tr>
                        `
        }
        else {
            // let change = new Date(membersList[i].date)
            // change.setDate(new Date(membersList[i].date).getDate() + 10)
            if (membersList[i].notes.includes("باقي")) {
                cartona += `
                        <tr>
                            <td class="orange"><div>${membersList[i].name}</div></td>
                            <td class="orange"><div>${formattedDate}</div></td>
                            <td class="orange"><div>${formattedExpire}</div></td>
                            <td class="orange"><div>${membersList[i].price}</div></td>
                            <td class="orange"><div>${membersList[i].notes}</div></td>
                            <td class="orange"><div class="center">${membersList[i].Gym}</div></td>
                            <td class="orange"><div class="center">${membersList[i].cardio}</div></td>
                            <td class="orange"><div class="center">${membersList[i].sauna}</div></td>
                            <td class="orange"><div>${membersList[i].phoneNumber}</div></td>
                            <td class="orange"><div class="center">${membersList[i].card}</div></td>
                            <td class="orange"><div class="center">${membersList[i].Group}</div></td>
                            <td><div class="btn-group" >
                                    <button type="button"  class="btn btn-success updateBtn" onclick="setValuesForUpdate(${i})">Update</button>
                                    <button type="button"  class="btn btn-success  dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span class="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item dateLink" onclick="setValuesForUpdateTime(${i})">Update Date <i class="fa-regular fa-clock"></i></a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item " id="dlt-btn"  onclick="deleteMember(${i})" >Delete <i class="fa-solid fa-trash-can"></i></a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        `
            }
            else {
                cartona += `
                        <tr>
                            <td class="green"><div>${membersList[i].name}</div></td>
                            <td class="green"><div>${formattedDate}</div></td>
                            <td class="green"><div>${formattedExpire}</div></td>
                            <td class="green"><div>${membersList[i].price}</div></td>
                            <td class="green"><div>${membersList[i].notes}</div></td>
                            <td class="green"><div class="center">${membersList[i].Gym}</div></td>
                            <td class="green"><div class="center">${membersList[i].cardio}</div></td>
                            <td class="green"><div class="center">${membersList[i].sauna}</div></td>
                            <td class="green"><div>${membersList[i].phoneNumber}</div></td>
                            <td class="green"><div class="center">${membersList[i].card}</div></td>
                            <td class="green"><div class="center">${membersList[i].Group}</div></td>
                            <td><div class="btn-group" >
                                    <button type="button"  class="btn btn-success updateBtn" onclick="setValuesForUpdate(${i})">Update</button>
                                    <button type="button"  class="btn btn-success  dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span class="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item dateLink" onclick="setValuesForUpdateTime(${i})">Update Date <i class="fa-regular fa-clock"></i></a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item " id="dlt-btn"  onclick="deleteMember(${i})" >Delete <i class="fa-solid fa-trash-can"></i></a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        `
            }
        }
    }
    Data.innerHTML = cartona;
}
$(".updateBtn").on("click", () => {
    $(".dropdown-toggle").attr("disabled", "");
})
$("#update").on("click", () => {
    $(".dropdown-toggle").removeAttr("disabled");
})
function searchArchive() {
    let term = searchArchiveInput.value.toLowerCase();
    let cartona = ``
    archiveList.filter((member) => {
        if (member.name.toLowerCase().includes(term) || member.phoneNumber.includes(term)) {
            // format for the date to display only
            let date = (new Date(member.date))
            let dateYear = date.getFullYear();
            let dateMonth = String(date.getMonth() + 1).padStart(2, '0');
            let dateDay = String(date.getDate()).padStart(2, '0');
            let formattedDate = `${dateYear}/${dateMonth}/${dateDay}`;

            let expire = (new Date(member.expire))
            let expireYear = expire.getFullYear();
            let expireMonth = String(expire.getMonth() + 1).padStart(2, '0');
            let expireDay = String(expire.getDate()).padStart(2, '0');
            let formattedExpire = `${expireYear}/${expireMonth}/${expireDay}`;
            // the end of the format
            cartona += `
                        <tr>
                            <td class="red"><div>${member.name}</div></td>
                            <td class="red"><div>${formattedDate}</div></td>
                            <td class="red"><div>${formattedExpire}</div></td>
                            <td class="red"><div>${member.price}</div></td>
                            <td class="red"><div>${member.notes}</div></td>
                            <td class="red"><div class="center">${member.Gym}</div></td>
                            <td class="red"><div class="center">${member.cardio}</div></td>
                            <td class="red"><div class="center">${member.sauna}</div></td>
                            <td class="red"><div>${member.phoneNumber}</div></td>
                            <td class="red"><div class="center">${member.card}</div></td>
                            <td class="red"><div class="center">${member.Group}</div></td>
                        </tr>
                    `
        }

    })
    archiveData.innerHTML = cartona;
}
function search() {
    var term = searchInput.value.toLowerCase();
    var cartona = ``
    for (var i = 0; i < membersList.length; i++) {
        // format for the date to display only
        let date = (new Date(membersList[i].date))
        let dateYear = date.getFullYear();
        let dateMonth = String(date.getMonth() + 1).padStart(2, '0');
        let dateDay = String(date.getDate()).padStart(2, '0');
        let formattedDate = `${dateYear}/${dateMonth}/${dateDay}`;

        let expire = (new Date(membersList[i].expire))
        let expireYear = expire.getFullYear();
        let expireMonth = String(expire.getMonth() + 1).padStart(2, '0');
        let expireDay = String(expire.getDate()).padStart(2, '0');
        let formattedExpire = `${expireYear}/${expireMonth}/${expireDay}`;
        // the end of the format
        if (membersList[i].name.toLowerCase().includes(term) || membersList[i].phoneNumber.includes(term)) {
            if (today > new Date(membersList[i].expire)) {
                cartona += `
                        <tr>
                            <td class="red"><div>${membersList[i].name}</div></td>
                            <td class="red"><div>${formattedDate}</div></td>
                            <td class="red"><div>${formattedExpire}</div></td>
                            <td class="red"><div>${membersList[i].price}</div></td>
                            <td class="red"><div>${membersList[i].notes}</div></td>
                            <td class="red"><div class="center">${membersList[i].Gym}</div></td>
                            <td class="red"><div class="center">${membersList[i].cardio}</div></td>
                            <td class="red"><div class="center">${membersList[i].sauna}</div></td>
                            <td class="red"><div>${membersList[i].phoneNumber}</div></td>
                            <td class="red"><div class="center">${membersList[i].card}</div></td>
                            <td class="red"><div class="center">${membersList[i].Group}</div></td>
                            <td><div class="btn-group" >
                                    <button type="button"  class="btn btn-danger updateBtn" onclick="setValuesForUpdate(${i})">Update</button>
                                    <button type="button"  class="btn btn-danger  dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span class="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item dateLink" onclick="setValuesForUpdateTime(${i})">Update Date <i class="fa-regular fa-clock"></i></a></li>
                                        <li><a class="dropdown-item renewalLink" onclick="setValuesForRenewal(${i})">Renewal <i class="fa-solid fa-arrow-rotate-left"></i></a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item " id="dlt-btn"  onclick="deleteMember(${i})" >Delete <i class="fa-solid fa-trash-can"></i></a></li>
                                    </ul>
                                </div>
                            </tr>
                        `
            }
            else {
                // let change = new Date(membersList[i].date)
                // change.setDate(new Date(membersList[i].date).getDate() + 10)
                if (membersList[i].notes.includes("باقي")) {
                    cartona += `
                            <tr>
                                <td class="orange"><div>${membersList[i].name}</div></td>
                                <td class="orange"><div>${formattedDate}</div></td>
                                <td class="orange"><div>${formattedExpire}</div></td>
                                <td class="orange"><div>${membersList[i].price}</div></td>
                                <td class="orange"><div>${membersList[i].notes}</div></td>
                                <td class="orange"><div class="center">${membersList[i].Gym}</div></td>
                                <td class="orange"><div class="center">${membersList[i].cardio}</div></td>
                                <td class="orange"><div class="center">${membersList[i].sauna}</div></td>
                                <td class="orange"><div>${membersList[i].phoneNumber}</div></td>
                                <td class="orange"><div class="center">${membersList[i].card}</div></td>
                                <td class="orange"><div class="center">${membersList[i].Group}</div></td>
                                <td><div class="btn-group" >
                                        <button type="button"  class="btn btn-success updateBtn" onclick="setValuesForUpdate(${i})">Update</button>
                                        <button type="button"  class="btn btn-success  dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span class="visually-hidden">Toggle Dropdown</span>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item dateLink" onclick="setValuesForUpdateTime(${i})">Update Date <i class="fa-regular fa-clock"></i></a></li>
                                            <li><hr class="dropdown-divider"></li>
                                            <li><a class="dropdown-item " id="dlt-btn"  onclick="deleteMember(${i})" >Delete <i class="fa-solid fa-trash-can"></i></a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            `
                }
                else {
                    cartona += `
                            <tr>
                                <td class="green"><div>${membersList[i].name}</div></td>
                                <td class="green"><div>${formattedDate}</div></td>
                                <td class="green"><div>${formattedExpire}</div></td>
                                <td class="green"><div>${membersList[i].price}</div></td>
                                <td class="green"><div>${membersList[i].notes}</div></td>
                                <td class="green"><div class="center">${membersList[i].Gym}</div></td>
                                <td class="green"><div class="center">${membersList[i].cardio}</div></td>
                                <td class="green"><div class="center">${membersList[i].sauna}</div></td>
                                <td class="green"><div>${membersList[i].phoneNumber}</div></td>
                                <td class="green"><div class="center">${membersList[i].card}</div></td>
                                <td class="green"><div class="center">${membersList[i].Group}</div></td>
                                <td><div class="btn-group" >
                                        <button type="button"  class="btn btn-success updateBtn" onclick="setValuesForUpdate(${i})">Update</button>
                                        <button type="button"  class="btn btn-success  dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span class="visually-hidden">Toggle Dropdown</span>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item dateLink" onclick="setValuesForUpdateTime(${i})">Update Date <i class="fa-regular fa-clock"></i></a></li>
                                            <li><hr class="dropdown-divider"></li>
                                            <li><a class="dropdown-item " id="dlt-btn"  onclick="deleteMember(${i})" >Delete <i class="fa-solid fa-trash-can"></i></a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            `
                }
            }
        }
    }
    Data.innerHTML = cartona;
}

function clearInputs() {
    memberName.value = "";
    memberPrice.value = "";
    memberNotes.value = "";
    memberphoneNumber.value = "";
    sauna.value = "";
    date.value = "";
    $("#Gym").prop("checked", true);
    $("#Cardio").prop("checked", false);
    $("#card").prop("checked", true);
    $("#Group").prop("checked", true);
    memberName.classList.remove("is-valid");
    memberPrice.classList.remove("is-valid");
    memberNotes.classList.remove("is-valid");
    memberphoneNumber.classList.remove("is-valid");
    date.classList.remove("is-valid");
    $("#souna").removeClass("is-valid")
}

function deleteMember(index) {
    archiveList.unshift(membersList[index]);
    // console.log(archiveList);
    localStorage.setItem("archiveList", JSON.stringify(archiveList));
    membersList.splice(index, 1);
    localStorage.setItem("Members", JSON.stringify(membersList));
    displayMembers();
};


function nameValidation() {
    var regex = /^.{3,30}$/;
    var myString = memberName.value;
    if (regex.test(myString)) {
        memberName.classList.add("is-valid");
        memberName.classList.remove("is-invalid");
        wrongName.classList.add("d-none");
        return true;
    }
    else {
        memberName.classList.add("is-invalid");
        memberName.classList.remove("is-valid");
        wrongName.classList.remove("d-none");
        return false;
    }
}

function priceValidation() {
    var regex = /^[0-9]{1,4}$/;
    var myString = memberPrice.value;
    if (regex.test(myString)) {
        memberPrice.classList.add("is-valid");
        memberPrice.classList.remove("is-invalid");
        wrongPrice.classList.add("d-none");
        return true;
    }
    else {
        memberPrice.classList.add("is-invalid");
        memberPrice.classList.remove("is-valid");
        wrongPrice.classList.remove("d-none");
        return false;
    }
}

function notesValidation() {
    var regex = /.*/;
    var myString = memberNotes.value;
    if (regex.test(myString)) {
        memberNotes.classList.add("is-valid");
        memberNotes.classList.remove("is-invalid");
        return true;
    }
    else {
        memberNotes.classList.add("is-invalid");
        memberNotes.classList.remove("is-valid");
        return false;
    }
}
function dateValidation() {
    if (date.value !== "") {
        date.classList.add("is-valid");
        date.classList.remove("is-invalid");
        wrongDate.classList.add("d-none");
        return true;
    }
    else {
        date.classList.add("is-invalid");
        date.classList.remove("is-valid");
        wrongDate.classList.remove("d-none");
        return false;
    }
}
function phoneValidation() {
    var regex = /^01[0-9]{9}$/;
    var myString = memberphoneNumber.value;
    if (regex.test(myString)) {
        memberphoneNumber.classList.add("is-valid");
        memberphoneNumber.classList.remove("is-invalid");
        wrongPhone.classList.add("d-none");
        return true;
    }
    else {
        memberphoneNumber.classList.add("is-invalid");
        memberphoneNumber.classList.remove("is-valid");
        wrongPhone.classList.remove("d-none");
        return false;
    }
}
function saunaValidation() {
    var regex = /^[0-9]*$/;
    var myString = sauna.value;
    if (regex.test(myString)) {
        sauna.classList.add("is-valid");
        sauna.classList.remove("is-invalid");
        return true;
    }
    else {
        sauna.classList.add("is-invalid");
        sauna.classList.remove("is-valid");
        return false;
    }
}



date.addEventListener("input", () => {
    let selectedDate = date.value;
    if (selectedDate !== "") {
        durationInput.disabled = false;
        durationInput.innerHTML = `
                                <option value="${new Date(new Date(selectedDate).getFullYear(), new Date(selectedDate).getMonth() + 1, 0).getDate()}">1 Months</option>
                                <option value="15">15 days</option>
                                <option value="${new Date(new Date(selectedDate).getFullYear(), new Date(selectedDate).getMonth() + 1, 0).getDate() + new Date(new Date(selectedDate).getFullYear(), new Date(selectedDate).getMonth() + 2, 0).getDate()}">2 Months</option>
                                <option value="${new Date(new Date(selectedDate).getFullYear(), new Date(selectedDate).getMonth() + 1, 0).getDate() + new Date(new Date(selectedDate).getFullYear(), new Date(selectedDate).getMonth() + 2, 0).getDate() + new Date(new Date(selectedDate).getFullYear(), new Date(selectedDate).getMonth() + 3, 0).getDate()}">3 Months</option>
                                <option value="183">6 Months</option>
                                <option value="365">1 Year</option>
                                `
    }
    else {
        durationInput.disabled = true;
    }
})

let deleteBtns;
let indexUpdate;
let updateBtn = document.getElementById("update");

function setValuesForUpdate(set) {
    $("#date").addClass("visually-hidden")
    $("#duration").addClass("visually-hidden")
    deleteBtns = document.querySelectorAll(".btn.btn-outline-danger");
    $(".btn-outline-success").addClass("d-none")
    // console.log(deleteBtns);
    $(".dropdown-toggle").attr("disabled", "");
    indexUpdate = set;
    memberName.value = membersList[set].name;
    memberPrice.value = membersList[set].price;
    memberNotes.value = membersList[set].notes;
    memberphoneNumber.value = membersList[set].phoneNumber;
    sauna.value = membersList[set].sauna;
    (membersList[set].Gym == '<i class="fa-solid fa-check"></i>') ? $("#Gym").prop("checked", true) : $("#Gym").prop("checked", false);
    (membersList[set].cardio == '<i class="fa-solid fa-check"></i>') ? $("#Cardio").prop("checked", true) : $("#Cardio").prop("checked", false);
    (membersList[set].card == '<i class="fa-solid fa-check"></i>') ? $("#card").prop("checked", true) : $("#card").prop("checked", false);
    (membersList[set].Group == '<i class="fa-solid fa-check"></i>') ? $("#Group").prop("checked", true) : $("#Group").prop("checked", false);


    // date.value = new Date(membersList[set].date).toISOString().slice(0, 10);
    submitBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")
    $("#updateDate").addClass("d-none")
}
let indexDate;
function setValuesForUpdateTime(set) {
    $(".updateBtn").attr("disabled", "");
    $(".dropdown-toggle").attr("disabled", "");
    indexDate = set
    date.value = new Date(membersList[set].date).toISOString().slice(0, 10);
    submitBtn.classList.add("d-none")
    updateBtn.classList.add("d-none")
    $("#updateDate").removeClass("d-none")
    $(".form-floating , .form-check").addClass("invisible")
}
$("#updateDate").on("click", function () {
    updateDate()
})
function updateDate() {
    let currentDate = new Date(date.value);
    let durationDays = +durationInput.value;
    let expirationDate = new Date(currentDate);
    expirationDate.setDate(currentDate.getDate() + durationDays);

    membersList[indexDate].date = currentDate
    membersList[indexDate].expire = expirationDate
    localStorage.setItem("Members", JSON.stringify(membersList))
    displayMembers();
    submitBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")
    $("#updateDate").addClass("d-none")
    clearInputs()
    $(".form-floating , .form-check").removeClass("invisible")
    $(".updateBtn").removeAttr("disabled");
    $(".dropdown-toggle").removeAttr("disabled");
}
updateBtn.addEventListener("click", () => {
    updateMembers()
})
$(".dateLink").on("mouseenter", () => {
    $(".dateLink i").addClass("fa-shake")
})
$(".dateLink").on("mouseleave", () => {
    $(".dateLink i").removeClass("fa-shake")
})
function updateMembers() {
    $("#date").removeClass("visually-hidden")
    $("#duration").removeClass("visually-hidden")
    // let currentDate = new Date(date.value);
    // let durationDays = +durationInput.value;
    // let expirationDate = new Date(currentDate);
    // expirationDate.setDate(currentDate.getDate() + durationDays);

    membersList[indexUpdate].name = memberName.value
    membersList[indexUpdate].price = memberPrice.value
    membersList[indexUpdate].notes = memberNotes.value
    membersList[indexUpdate].phoneNumber = memberphoneNumber.value
    membersList[indexUpdate].sauna = sauna.value
    // membersList[indexUpdate].date = currentDate
    // membersList[indexUpdate].expire = expirationDate
    membersList[indexUpdate].Gym = (Gym.checked == 1) ? `<i class="fa-solid fa-check"></i>` : "";
    membersList[indexUpdate].cardio = (Cardio.checked == 1) ? `<i class="fa-solid fa-check"></i>` : "";
    membersList[indexUpdate].card = (card.checked == 1) ? `<i class="fa-solid fa-check"></i>` : "";
    membersList[indexUpdate].Group = (Group.checked == 1) ? `<i class="fa-solid fa-check"></i>` : "";
    localStorage.setItem("Members", JSON.stringify(membersList))
    displayMembers();
    submitBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")
    $("#updateDate").addClass("d-none")
    $(".btn-outline-success").removeClass("d-none")
    clearInputs()

    $(".dropdown-toggle").removeAttr("disabled");
}

updateExpiredBtn.addEventListener("click", () => {
    let pass = window.prompt("Password:");
    // updateExpiredInput.value
    if (pass == 12345) {
        if (updateExpiredInput.value > 0) {
            for (let i = 0; i < membersList.length; i++) {
                // console.log(new Date(membersList[i].expire) );
                let currentexpire = new Date(membersList[i].expire);
                let addionalDays = +updateExpiredInput.value;
                let updatedExpireDate = new Date(currentexpire);
                updatedExpireDate.setDate(currentexpire.getDate() + addionalDays);
                membersList[i].expire = updatedExpireDate;
            }
            localStorage.setItem("Members", JSON.stringify(membersList))
            displayMembers()
            updateExpiredInput.value = "";
        }
    }
})


function setValuesForRenewal(set) {
    memberName.value = membersList[set].name;
    memberPrice.value = "";
    memberNotes.value = "";
    memberphoneNumber.value = membersList[set].phoneNumber;
    sauna.value = "";
    $("#Gym").prop("checked", true)
    $("#Cardio").prop("checked", false)
    $("#card").prop("checked", true)
    $("#Group").prop("checked", true)
    submitBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")
    $("#updateDate").addClass("d-none")
    $("body,html").animate({ scrollTop: 0 }, 200)
}
$(".renewalLink").on("mouseenter", () => {
    $(".renewalLink i").addClass("fa-spin fa-spin-reverse")
})
$(".renewalLink").on("mouseleave", () => {
    $(".renewalLink i").removeClass("fa-spin fa-spin-reverse")
})