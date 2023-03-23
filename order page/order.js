let info = document.forms.info;
let inputInfo = info.querySelectorAll("input");
let complete = document.querySelector(".complete");
let radioButton = info.querySelectorAll("input[name=payment]");
let sumInfoAll = document.querySelector(".summaryInfo");

let mainFlag = false;
let nameFlag = false;
let surnameFlag = false;
let streetFlag = false;
let houseNumberFlag = false;
let flatFlag = false;
let deliveryFlag = false;
let radioFlag = false;

/* validation*/
function validation() {
  if (
    nameFlag &&
    surnameFlag &&
    streetFlag &&
    houseNumberFlag &&
    flatFlag &&
    deliveryFlag &&
    radioFlag
  ) {
    mainFlag = true;
  } else {
    mainFlag = false;
  }
  return mainFlag;
}

/*Remove error */
function removeError(el) {
  let parent = el.parentNode;
  if (el.classList.contains("error")) {
    parent.querySelector(".error_text").remove();
    el.classList.remove("error");
  }
}

/*Error message */
function errorMessage(el, text) {
  let parent = el.parentNode;
  el.classList.add("error");
  parent.insertAdjacentHTML(
    "beforeend",
    `<div class="error_text" aria-live="polite">${text}</div>`
  );
}

/*Name form*/
function nameForm(el) {
  if (el.dataset.minName) {
    removeError(el);
    nameFlag = false;
    if (el.value.length < el.dataset.minName && el.value.length > 0) {
      errorMessage(el, "not less than 4 symbols");
    } else if (el.value != "" && /^[A-Za-z]+$/.test(el.value)) {
      nameFlag = true;
    } else if (el.value == "") {
      errorMessage(el, "Please fill out this field");
    } else {
      errorMessage(el, "The value must contain only letters  without spaces");
    }
  }
}
/*Surname form */
function surnameForm(el) {
  if (el.dataset.minSurname) {
    removeError(el);
    surnameFlag = false;
    if (el.value.length < el.dataset.minSurname && el.value.length > 0) {
      errorMessage(el, "not less than 5 symbols");
    } else if (el.value != "" && /^[A-Za-z]+$/.test(el.value)) {
      surnameFlag = true;
    } else if (el.value == "") {
      errorMessage(el, "Please fill out this field");
    } else {
      errorMessage(el, "The value must contain only letters  without spaces");
    }
  }
}

/*Street form */
function streetForm(el) {
  if (el.dataset.minStreet) {
    removeError(el);
    streetFlag = false;
    if (el.value.length < el.dataset.minStreet && el.value.length > 0) {
      errorMessage(el, "not less than 5 symbols");
    } else if (el.value != "" && /^[A-Za-z0-9]*$/.test(el.value)) {
      streetFlag = true;
    } else {
      errorMessage(el, "Please fill out this field");
    }
  }
}

/*House number form*/
function houseNumberForm(el) {
  if (el.name == "house-number") {
    removeError(el);
    houseNumberFlag = false;
    if (el.value != "" && /^\d+$/.test(el.value)) {
      houseNumberFlag = true;
    } else if (el.value == "") {
      errorMessage(el, "Please fill out this field");
    } else {
      errorMessage(
        el,
        "The value must contain only positive numbers without spaces"
      );
    }
  }
}
/*Flat form */
function flatForm(el) {
  if (el.name == "flat") {
    removeError(el);
    flatFlag = false;
    if (el.value != "" && /^\d+(-\d+)*$/.test(el.value)) {
      flatFlag = true;
    } else if (el.value == "") {
      errorMessage(el, "Please fill out this field");
    } else {
      errorMessage(
        el,
        "The value must contain only positive numbers without spaces"
      );
    }
  }
}
/*Delivery form*/
function nextDay() {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  let deliveryDay = document.getElementById("delivery");
  deliveryDay.setAttribute("min", `${tomorrow.toLocaleDateString("en-CA")}`);
}
nextDay();

function deliveryForm(el) {
  if (el.name == "delivery") {
    removeError(el);
    deliveryFlag = false;
    if (el.value == "") {
      errorMessage(el, "Please fill out this field");
    } else {
      deliveryFlag = true;
    }
  }
}
/*Radio box */
function radioBox(event) {
  if (event.target.checked) {
    radioFlag = true;
  }
}

radioButton.forEach((el) => {
  el.addEventListener("click", radioBox);
});

function formInfo(el) {
  removeError(el);
  nameForm(el);
  surnameForm(el);
  streetForm(el);
  houseNumberForm(el);
  flatForm(el);
  deliveryForm(el);

  if (validation()) {
    complete.removeAttribute("disabled");
  } else {
    complete.disabled = true;
  }
}

inputInfo.forEach((el) => {
  ["blur", "input"].forEach((event) => {
    el.addEventListener(event, function (event) {
      event.preventDefault();
      formInfo(this);
    });
  });
});

inputInfo.forEach((el) => {
  el.addEventListener("click", validation);
});

let gifts = document.querySelectorAll("input[name=gift]");

function chbox(event) {
  if (event.target.checked) {
    event.target.classList.add("checked");
    let checked = document.querySelectorAll(".checked");

    if (checked.length == 2) {
      gifts.forEach((el) => {
        el.disabled = true;
      });
      checked.forEach((el) => {
        el.disabled = false;
      });
    }
  } else {
    event.target.classList.remove("checked");
    let checked = document.querySelectorAll(".checked");
    if (checked.length < 2) {
      gifts.forEach((el) => {
        el.disabled = false;
      });
    }
  }
}
gifts.forEach((el) => {
  el.addEventListener("click", chbox);
});

function showSumInfo(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let surname = document.getElementById("surname").value;
  let street = document.getElementById("street").value;
  let house = document.getElementById("house-number").value;
  let flat = document.getElementById("flat").value;
  let delivery = document.getElementById("delivery").value;

  let sumInfo = `Customer: ${name} ${surname}<br>
     The delivery address: ${street} house ${house} flat ${flat}<br>
     The delivery day: ${delivery}`;
  info.innerHTML = sumInfo;
}

document.forms[0].addEventListener("submit", showSumInfo);
