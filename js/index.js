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
$(".nav-link").on("click",function(){
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

    if (nameValidation() && priceValidation() && notesValidation() && phoneValidation() && dateValidation()) {
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
            Gym: (Gym.checked == 1) ? `<i class="fa-solid fa-check"></i>` : "",
            cardio: (Cardio.checked == 1) ? `<i class="fa-solid fa-check"></i>` : "",
            card: (card.checked == 1) ? `<i class="fa-solid fa-check"></i>` : "",
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
        contain += `
                        <tr>
                            <td class="red"><div>${archiveList[i].name}</div></td>
                            <td class="red"><div>${(new Date(archiveList[i].date)).toDateString()}</div></td>
                            <td class="red"><div>${(new Date(archiveList[i].expire)).toDateString()}</div></td>
                            <td class="red"><div>${archiveList[i].price}</div></td>
                            <td class="red"><div>${archiveList[i].notes}</div></td>
                            <td class="red"><div class="center">${archiveList[i].Gym}</div></td>
                            <td class="red"><div class="center">${archiveList[i].cardio}</div></td>
                            <td class="red"><div>${archiveList[i].phoneNumber}</div></td>
                            <td class="red"><div class="center">${archiveList[i].card}</div></td>
                        </tr>
                `
    }
    archiveData.innerHTML = contain;
}

function displayMembers() {

    var cartona = ``
    for (var i = 0; i < membersList.length; i++) {
        if (today > new Date(membersList[i].expire)) {
            cartona += `
                        <tr>
                            <td class="red"><div>${membersList[i].name}</div></td>
                            <td class="red"><div>${(new Date(membersList[i].date)).toDateString()}</div></td>
                            <td class="red"><div>${(new Date(membersList[i].expire)).toDateString()}</div></td>
                            <td class="red"><div>${membersList[i].price}</div></td>
                            <td class="red"><div>${membersList[i].notes}</div></td>
                            <td class="red"><div class="center">${membersList[i].Gym}</div></td>
                            <td class="red"><div class="center">${membersList[i].cardio}</div></td>
                            <td class="red"><div>${membersList[i].phoneNumber}</div></td>
                            <td class="red"><div class="center">${membersList[i].card}</div></td>
                            <td><div>
                                    <button type="button" onclick="deleteMember(${i})" class="btn btn-outline-danger me-2">Delete</button>
                                    <button type="button" onclick="setValuesForUpdate(${i})" class="btn btn-outline-warning">update</button>
                                    </div></td>
                        </tr>
                        `
        }
        else {
            cartona += `
                        <tr>
                            <td class="green"><div>${membersList[i].name}</div></td>
                            <td class="green"><div>${(new Date(membersList[i].date)).toDateString()}</div></td>
                            <td class="green"><div>${(new Date(membersList[i].expire)).toDateString()}</div></td>
                            <td class="green"><div>${membersList[i].price}</div></td>
                            <td class="green"><div>${membersList[i].notes}</div></td>
                            <td class="green"><div class="center">${membersList[i].Gym}</div></td>
                            <td class="green"><div class="center">${membersList[i].cardio}</div></td>
                            <td class="green"><div>${membersList[i].phoneNumber}</div></td>
                            <td class="green"><div class="center">${membersList[i].card}</div></td>
                            <td><div>
                                    <button type="button" onclick="deleteMember(${i})" class="btn btn-outline-danger me-2">Delete</button>
                                    <button type="button" onclick="setValuesForUpdate(${i})" class="btn btn-outline-warning">update</button>
                                    </div></td>
                        </tr>
    `
        }

    }
    Data.innerHTML = cartona;
}

function searchArchive() {
    let term = searchArchiveInput.value.toLowerCase();
    let cartona = ``
    archiveList.filter((member) => {
        if (member.name.toLowerCase().includes(term) || member.phoneNumber.includes(term)) {
            cartona += `
                        <tr>
                            <td class="red"><div>${member.name}</div></td>
                            <td class="red"><div>${(new Date(member.date)).toDateString()}</div></td>
                            <td class="red"><div>${(new Date(member.expire)).toDateString()}</div></td>
                            <td class="red"><div>${member.price}</div></td>
                            <td class="red"><div>${member.notes}</div></td>
                            <td class="red"><div class="center">${member.Gym}</div></td>
                            <td class="red"><div class="center">${member.cardio}</div></td>
                            <td class="red"><div>${member.phoneNumber}</div></td>
                            <td class="red"><div class="center">${member.card}</div></td>
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
        if (membersList[i].name.toLowerCase().includes(term) || membersList[i].phoneNumber.includes(term)) {
            // cartona += `
            //             <tr>
            //                 <td><div>${membersList[i].name}</div></td>
            //                 <td><div>${membersList[i].date}</div></td>
            //                 <td><div>${membersList[i].price}</div></td>
            //                 <td><div>${membersList[i].notes}</div></td>
            //                 <td><div>${membersList[i].Gym}</div></td>
            //                 <td><div>${membersList[i].cardio}</div></td>
            //                 <td><div>${membersList[i].phoneNumber}</div></td>
            //                 <td><div>${membersList[i].card}</div></td>
            //                 <td><div><button type="button" onclick="deleteMember(${i})" class="btn btn-outline-danger">Delete</button></div></td>
            //             </tr>
            //             `
            if (today < new Date(membersList[i].expire)) {
                cartona += `
                            <tr>
                                <td class="green"><div>${membersList[i].name}</div></td>
                                <td class="green"><div>${(new Date(membersList[i].date)).toDateString()}</div></td>
                                <td class="green"><div>${(new Date(membersList[i].expire)).toDateString()}</div></td>
                                <td class="green"><div>${membersList[i].price}</div></td>
                                <td class="green"><div>${membersList[i].notes}</div></td>
                                <td class="green"><div>${membersList[i].Gym}</div></td>
                                <td class="green"><div>${membersList[i].cardio}</div></td>
                                <td class="green"><div>${membersList[i].phoneNumber}</div></td>
                                <td class="green"><div>${membersList[i].card}</div></td>
                                <td><div>
                                        <button type="button" onclick="deleteMember(${i})" class="btn btn-outline-danger me-2">Delete</button>
                                        <button type="button" onclick="setValuesForUpdate(${i})" class="btn btn-outline-warning">update</button>
                                        </div></td>
                            </tr>
                            `
            }
            else {
                cartona += `
                            <tr>
                                <td class="red"><div>${membersList[i].name}</div></td>
                                <td class="red"><div>${(new Date(membersList[i].date)).toDateString()}</div></td>
                                <td class="red"><div>${(new Date(membersList[i].expire)).toDateString()}</div></td>
                                <td class="red"><div>${membersList[i].price}</div></td>
                                <td class="red"><div>${membersList[i].notes}</div></td>
                                <td class="red"><div>${membersList[i].Gym}</div></td>
                                <td class="red"><div>${membersList[i].cardio}</div></td>
                                <td class="red"><div>${membersList[i].phoneNumber}</div></td>
                                <td class="red"><div>${membersList[i].card}</div></td>
                                <td><div>
                                        <button type="button" onclick="deleteMember(${i})" class="btn btn-outline-danger me-2">Delete</button>
                                        <button type="button" onclick="setValuesForUpdate(${i})" class="btn btn-outline-warning">update</button>
                                        </div></td>
                            </tr>
        `
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
    memberName.classList.remove("is-valid");
    memberPrice.classList.remove("is-valid");
    memberNotes.classList.remove("is-valid");
    memberphoneNumber.classList.remove("is-valid");
}

function deleteMember(index) {
    archiveList.unshift(membersList[index]);
    console.log(archiveList);
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
    var regex = /^[1-9][0-9]{2,4}$/;
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
    if (date.value !=="") {
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


date.addEventListener("input", () => {
    let selectedDate = date.value;
    if (selectedDate !== "") {
        durationInput.disabled = false;
        durationInput.innerHTML=`
                                <option value="${new Date(new Date(selectedDate).getFullYear(), new Date(selectedDate).getMonth() + 1, 0).getDate()}">1 Months</option>
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
    deleteBtns = document.querySelectorAll(".btn.btn-outline-danger");
    for (var i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].classList.add("d-none");
    }
    // console.log(deleteBtns);

    indexUpdate = set;
    memberName.value = membersList[set].name;
    memberPrice.value = membersList[set].price;
    memberNotes.value = membersList[set].notes;
    memberphoneNumber.value = membersList[set].phoneNumber;
    date.value = new Date(membersList[set].date).toISOString().slice(0, 10);
    submitBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")
}

updateBtn.addEventListener("click", () => {
    updateMembers()
})

function updateMembers() {
    let currentDate = new Date(date.value);
    let durationDays = +durationInput.value;
    let expirationDate = new Date(currentDate);
    expirationDate.setDate(currentDate.getDate() + durationDays);

    membersList[indexUpdate].name = memberName.value
    membersList[indexUpdate].price = memberPrice.value
    membersList[indexUpdate].notes = memberNotes.value
    membersList[indexUpdate].phoneNumber = memberphoneNumber.value
    membersList[indexUpdate].date = currentDate
    membersList[indexUpdate].expire = expirationDate
    membersList[indexUpdate].Gym = (Gym.checked == 1) ? `<i class="fa-solid fa-check"></i>` : "";
    membersList[indexUpdate].cardio = (Cardio.checked == 1) ? `<i class="fa-solid fa-check"></i>` : "";
    membersList[indexUpdate].card = (card.checked == 1) ? `<i class="fa-solid fa-check"></i>` : "";
    localStorage.setItem("Members", JSON.stringify(membersList))
    displayMembers();
    submitBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")
    clearInputs()
    for (var i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].classList.remove("d-none");
    }
}

updateExpiredBtn.addEventListener("click",()=>{
    let pass = window.prompt("Password:");
    // updateExpiredInput.value
    if(pass == 12345){
        if(updateExpiredInput.value > 0){
            for(let i=0;i<membersList.length;i++){
                // console.log(new Date(membersList[i].expire) );
                let currentexpire = new Date(membersList[i].expire);
                let addionalDays = +updateExpiredInput.value;
                let updatedExpireDate = new Date(currentexpire);
                updatedExpireDate.setDate(currentexpire.getDate() + addionalDays);
                membersList[i].expire = updatedExpireDate;
            }
            localStorage.setItem("Members", JSON.stringify(membersList))
            displayMembers()
            updateExpiredInput.value="";
        }
    }
    
    
})