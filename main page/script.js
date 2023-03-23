/*Total price*/
function totalPrice() {
  let bookInfo = document.querySelectorAll(".book__info");
  let totalPrice = document.querySelector(".total__price");
  let totalSum = 0;
  bookInfo.forEach((el) => {
    let price = el.querySelector(".count");
    let amountEl = el.querySelector(".basket__price");
    let currentSum = parseInt(price.innerText) * parseInt(amountEl.innerText);
    totalSum += currentSum;
  });
  totalPrice.innerText = totalSum;
}
/*Delete book*/
function delBook(event) {
  if (event.target.classList.contains("button_del")) {
    let bookInfoDel = event.target.closest(".book__info");
    bookInfoDel.remove();
    totalPrice();
  }
}

/*Popup */
function showPopup(event) {
  let openPopup = event.target.closest(".open__popup");
  if (openPopup) {
    let popupContent = openPopup.querySelector(".popup__content");
    popupContent.classList.toggle("open");

    let closePopup = document.querySelector(".close__popup");
    closePopup.addEventListener("click", (event) => {
      let popupContent = event.target.closest(".popup__content");
      popupContent.removeAttribute("open");
    });
  }
}

/*HTML*/
let arr;
function getData(arr) {
  div.innerHTML = `
  <header class = "header">
    <h1 class ="header__title">Books shop</h1>
  </header>`;
  let div2 = document.createElement("div");
  div2.classList = "books__wrapper";

  for (let i = 0; i < arr.length; i++) {
    let div3 = document.createElement("div");
    div3.classList = "book__wrapper";
    div3.setAttribute("data-id", `${i}`);
    div3.innerHTML = `  
      <div class = "book__img" draggable="true">
        <img src="${arr[i].imageLink}" alt="${arr[i].title}" class = "image">
      </div>
      <div class = "book__content">
        <h2 class ="book__title">${arr[i].title}</h2>
        <p class = "book__author">${arr[i].author}</p>
        <p class = "book__price"><span class = "price">${arr[i].price}</span>$</p>
      </div>
       <div class ="button">
          <button class ="button_add button__colored">Add to bag</button>
      </div>
      <div class ="open__popup">
       <span class= "button__popup">Show more</button>
          <div class ="popup popup__content">
           <button class = "close__popup">&#10007;</button>
            <h3 class ="popup__title">${arr[i].title}</h3>
            <p class = "popup__description">${arr[i].description}</p>
          </div>
      </div>
     
       `;
    div2.append(div3);
  }

  /*Basket */
  let section = document.createElement("section");
  section.classList = "section";
  let div4 = document.createElement("div");
  div4.classList = "basket__wrapper";
  div4.innerHTML = `
      <h2 class ="basket__text">Basket</h2>
      <hr>
      <div class = "basket__goods">
      </div>
      <span class = "total__text">Total:</span>
      <span class = "total__price">0</span>
      <span class = "dol">$</span>
      <form action="../order page/order.html" class ="button__order">
        <button class ="button__order_colored">Confirm order</button>
      </form>
    `;
  section.append(div2);
  section.append(div4);
  div.append(section);

  let buttonPopup = document.querySelectorAll(".button__popup");
  buttonPopup.forEach((el) => {
    el.addEventListener("click", showPopup);
  });

  let button = document.querySelectorAll(".button");
  let basketGoods = document.querySelector(".basket__goods");

  /*Add book */
  function addBook(event) {
    let book = event.target.closest(".book__wrapper");
    if (book) {
      let bookInfo = {
        imgSrc: book.querySelector(".image").getAttribute("src"),
        id: book.dataset.id,
        title: book.querySelector(".book__title").innerText,
        author: book.querySelector(".book__author").innerText,
        price: book.querySelector(".price").innerText,
      };

      let bookInBasket = basketGoods.querySelector(`[id = "${bookInfo.id}" ]`);
      if (bookInBasket) {
        let countEl = bookInBasket.querySelector(".count");
        countEl.innerText = parseInt(countEl.innerText) + 1;
      } else {
        let addBookHTML = `
      <div id = "${bookInfo.id}" class = "book__info">
      <div class = "button__delete">
        <button class= "button_del button__del_colored">&#10007;</button>
      </div>
        <img class="basket__img" src="${bookInfo.imgSrc}" alt="${bookInfo.title}">
      <div class = "basket__content">
        <h4 class ="basket__title">${bookInfo.title}</h4>
        <p class = "basket__author">${bookInfo.author}</p>
        <p class = "basket__count"> <span class = "count">1</span></p>
        <p class = "basket__price">${bookInfo.price}<span class = "dol">$</span></p>
      </div>
        <hr>
    </div>
      
     `;
        basketGoods.insertAdjacentHTML("beforeend", addBookHTML);
      }

      /*Delete book*/
      let buttonDelete = document.querySelectorAll(".button__delete");
      buttonDelete.forEach((el) => {
        el.addEventListener("click", delBook);
      });
      totalPrice();
    }
  }
  button.forEach((el) => {
    el.addEventListener("click", addBook);
  });

  /*Add book drag and drop */
  let bookImg = document.querySelectorAll(".book__img");
  let basket = document.querySelector(".basket__goods");

  bookImg.forEach((el) => {
    el.addEventListener("dragstart", (event) => {
      let bookWrap = event.target.closest(".book__wrapper");
      if (bookWrap) {
        bookWrap.classList.add("selected__book");
        event.dataTransfer.setData("text/plain", bookWrap.dataset.id);
      }
    });
  });
  basket.addEventListener("dragenter", function (event) {
    event.preventDefault();
    return true;
  });
  basket.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });

  basket.addEventListener("drop", (event) => {
    event.preventDefault();
    let id = event.dataTransfer.getData("text/plain");
    let item = document.querySelector(`[data-id="${id}"]`);
    let clone = item.cloneNode(true);

    let dropInfo = {
      id: clone.dataset.id,
      imgSrc: clone.querySelector(".image").getAttribute("src"),
      title: clone.querySelector(".book__title").innerText,
      author: clone.querySelector(".book__author").innerText,
      price: clone.querySelector(".price").innerText,
    };
    let bookInBasket = basketGoods.querySelector(`[id = "${dropInfo.id}" ]`);
    if (bookInBasket) {
      let countEl = bookInBasket.querySelector(".count");
      countEl.innerText = parseInt(countEl.innerText) + 1;
    } else {
      let addBookHTML = `
      <div id = "${dropInfo.id}" class = "book__info">
       <div class = "button__delete">
          <button class= "button_del button__del_colored">&#10007;</button>
        </div>
        <img class="basket__img" src="${dropInfo.imgSrc}" alt="${dropInfo.title}">
       <div class = "basket__content"> 
        <h4 class ="basket__title">${dropInfo.title}</h4>
        <p class = "basket__author">${dropInfo.author}</p>
        <p class = "basket__count"> <span class = "count">1</span></p>
        <p class = "basket__price">${dropInfo.price}<span class = "dol">$</span></p>
      </div>
      <hr>
    </div>
    
     `;
      basket.insertAdjacentHTML("beforeend", addBookHTML);
    }
    let buttonDelete = document.querySelectorAll(".button__delete");
    buttonDelete.forEach((el) => {
      el.addEventListener("click", delBook);
    });
    totalPrice();
  });

  bookImg.forEach((el) => {
    el.addEventListener(`dragend`, (event) => {
      let bookWrap = event.target.closest(".book__wrapper");
      bookWrap.classList.remove("selected__book");
    });
  });

  /*end */
  return div;
}

let frag = document.createDocumentFragment();
let div = document.createElement("div");
div.classList = "wrapper";

fetch("books.json") //path to the file with json data
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    arr = getData(data);
  });

div.append(arr);
frag.append(div);
document.body.append(frag);
