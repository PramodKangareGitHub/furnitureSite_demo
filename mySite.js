let cartItems = [];

let myProduct = [
  {
    name: "Product 1",
    src: "MyAssets/Product1.jpg",
    price: 5000,
  },
  {
    name: "Product 2",
    src: "MyAssets/Product2.jpg",
    price: 5000,
  },

  {
    name: "Product 3",
    src: "MyAssets/Product3.jpg",
    price: 5000,
  },
  {
    name: "Product 4",
    src: "MyAssets/Product4.jpg",
    price: 5000,
  },
];

let myCartModal = new bootstrap.Modal(document.getElementById("myCartModal"));
let isLogin = localStorage.getItem("isLogin");
let emailAvail = localStorage.getItem("email");
let mainDiv = document.getElementById("myProduct");
if (!isLogin && !emailAvail) {
  window.location = "login.html";
}

document.getElementById("welcome").innerHTML = localStorage.getItem("email");

function colorChange(element) {
  element.style = "background-color:green";
}
function colorRevert(element) {
  element.style = "background-color:#0d6efd";
}

function LoadProducts() {
  myProduct.forEach((product) => {
    let column1Div = document.createElement("div");
    column1Div.className = "col-sm-3";

    let cardDiv = document.createElement("div");
    cardDiv.className = "card";

    let img = document.createElement("img");
    img.src = product.src;
    img.className = "card-img-top";

    let cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";

    let h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.innerHTML = product.name;

    let aTag = document.createElement("a");
    aTag.id = product.name;
    aTag.className = "btn btn-primary";
    // aTag.onmouseover = "javascript:colorChange(this)";
    // aTag.onmouseout = colorRevert(this);
    // aTag.onclick = addToCart(product.name);
    aTag.innerHTML = "Add to cart";

    cardBodyDiv.appendChild(h5);
    cardBodyDiv.appendChild(aTag);

    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBodyDiv);
    column1Div.appendChild(cardDiv);

    mainDiv.appendChild(column1Div);
  });
}

document.querySelector("body").addEventListener("click", function (event) {
  if (
    event.target.tagName.toLowerCase() === "a" &&
    event.target.id.includes("Product")
  ) {
    addToCart(event.target.id);
  }
});

document
  .querySelector("body")
  .addEventListener("onmouseover", function (event) {
    if (
      event.target.tagName.toLowerCase() === "a" &&
      event.target.id.includes("Product")
    ) {
      colorChange(event.target);
    }
  });

document.querySelector("body").addEventListener("onmouseout", function (event) {
  if (
    event.target.tagName.toLowerCase() === "a" &&
    event.target.id.includes("Product")
  ) {
    colorRevert(event.target);
  }
});

function openMyCart() {
  myCartModal.show();
  let myCartItems = document.getElementById("myCartItems");
  while (myCartItems.hasChildNodes()) {
    myCartItems.removeChild(myCartItems.firstChild);
  }

  let tableEle = document.createElement("table");
  tableEle.className = "table";
  let theadEle = document.createElement("thead");

  let trEle = document.createElement("tr");

  let thEle1 = document.createElement("th");
  let thEle2 = document.createElement("th");

  thEle1.innerHTML = "Product Name";
  trEle.appendChild(thEle1);

  thEle2.innerHTML = "Quantity";
  trEle.appendChild(thEle2);

  theadEle.appendChild(trEle);
  tableEle.appendChild(theadEle);

  let tbodyEle = document.createElement("tbody");
  cartItems.forEach((element) => {
    let pTr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.innerHTML = element.productName;

    let td2 = document.createElement("td");
    td2.innerHTML = element.count;

    pTr.appendChild(td1);
    pTr.appendChild(td2);
    tbodyEle.appendChild(pTr);
  });
  tableEle.appendChild(tbodyEle);
  myCartItems.appendChild(tableEle);
}

function logout() {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("email");
  window.location = "login.html";
}

function addToCart(productName) {
  let existingCartItem = cartItems.find((x) => x.productName == productName);
  if (!existingCartItem) {
    cartItems.push({ productName: productName, count: 1 });
  } else {
    existingCartItem.count++;
  }
  let totalCount = 0;
  cartItems.forEach((element) => {
    totalCount = totalCount + element.count;
  });

  let cartCountEle = document.getElementById("cartCount");
  cartCountEle.innerHTML = totalCount;
}

//    <!-- <script
//       src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"
//       integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB"
//       crossorigin="anonymous"
//     ></script>
