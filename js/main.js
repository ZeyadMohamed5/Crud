var tableBody = document.getElementById("tableBody");
var productName = document.getElementById("productName");
var productType = document.getElementById("productType");
var productPrice = document.getElementById("productPrice");
var productDesc = document.getElementById("productDesc");
var productSearch = document.getElementById("productSearch");
var errorAlert = document.getElementById("error");
var priceErrorAlert = document.getElementById("priceError");
var typeErrorAlert = document.getElementById("typeError");
var prodcutList = JSON.parse(localStorage.getItem("products")) || [];

function addProduct() {
  if (validation() && pricevalidation() && descvalidation()) {
    if (
      productName.value.trim() != 0 &&
      productPrice.value.trim() != 0 &&
      productType.value.trim() != 0
    ) {
      var product = {
        name: productName.value,
        type: productType.value,
        price: productPrice.value,
        desc: productDesc.value,
      };

      prodcutList.push(product);
      saveToLocalStorage();
      display();
      clearInput();
    } else {
      window.alert("Please fill the missing inputs");
    }
  }
}

function display() {
  var empty = "";
  for (var i = 0; i < prodcutList.length; i++) {
    empty += ` <tr class="text-center">
              <td>${i + 1}</td>
              <td>${prodcutList[i].name}</td>
              <td>${prodcutList[i].price} </td>
              <td>${prodcutList[i].type}</td>
              <td>${prodcutList[i].desc}</td>
              <td>
                <div
                  class="btn-group"
                  role="group"
                >
                  <button type="button" onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
                  <button type="button" onclick="editProduct(${i})" class="btn btn-warning">Edit</button>
                </div>
              </td>
            </tr>`;
  }
  tableBody.innerHTML = empty;
}

function search() {
  var search = productSearch.value.toLowerCase();
  var text = "";
  var empty = "";
  for (var i = 0; i < prodcutList.length; i++) {
    text = prodcutList[i].name.toLowerCase();
    if (text.includes(search)) {
      empty += ` <tr class="text-center">
              <th scope="row">${i + 1}</th>
              <td>${prodcutList[i].name}</td>
              <td>${prodcutList[i].price} $</td>
              <td>${prodcutList[i].type}</td>
              <td class="description">${prodcutList[i].desc}</td>
              <td>
                <div
                  class="btn-group"
                  role="group"
                >
                  <button type="button" onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
                  <button type="button" onclick="editProduct(${i})" class="btn btn-warning">Edit</button>
                </div>
              </td>
            </tr>`;
    }
  }
  tableBody.innerHTML = empty;
}

function deleteProduct(index) {
  prodcutList.splice(index, 1);
  display();
  saveToLocalStorage();
}

function editProduct(index) {
  productName.value = prodcutList[index].name;
  productType.value = prodcutList[index].type;
  productPrice.value = prodcutList[index].price;
  productDesc.value = prodcutList[index].desc;
  document.getElementById("addButton").style.display = "none";
  document.getElementById("saveButton").style.display = "inline-block";
  currentIndex = index;
}

function saveProduct() {
  if (
    productName.value.trim() != 0 &&
    productPrice.value.trim() != 0 &&
    productType.value.trim() != 0
  ) {
    prodcutList[currentIndex] = {
      name: productName.value,
      type: productType.value,
      price: productPrice.value,
      desc: productDesc.value,
    };
  } else {
    window.alert("Please fill the missing inputs");
  }
  document.getElementById("addButton").style.display = "inline-block";
  document.getElementById("saveButton").style.display = "none";
  display();
  saveToLocalStorage();
  clearInput();
}

function clearInput() {
  productName.value = null;
  productType.value = null;
  productPrice.value = null;
  productDesc.value = null;
  productName.classList.remove("is-invalid");
  productName.classList.remove("is-valid");
  productDesc.classList.remove("is-invalid");
  productDesc.classList.remove("is-valid");
  productPrice.classList.remove("is-invalid");
  productPrice.classList.remove("is-valid");
  productType.classList.remove("is-valid");
  productType.classList.remove("is-invalid");
}

function saveToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(prodcutList));
}

window.onload = function () {
  display();
};

function validation() {
  var regex = /^[A-Z][a-z]{3,9}$/;
  var check = productName.value;

  if (regex.test(check)) {
    productName.classList.add("is-valid");
    errorAlert.classList.remove("d-block");
    errorAlert.classList.add("d-none");
    productName.classList.remove("is-invalid");
    return true;
  } else {
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    errorAlert.classList.add("d-block");
    errorAlert.classList.remove("d-none");
  }
}

function pricevalidation() {
  var regex = /^(2000|[2-9][0-9]{3}|1[0-9]{4}|20000)$/;
  var check = productPrice.value;

  if (regex.test(check)) {
    productPrice.classList.add("is-valid");
    productPrice.classList.remove("is-invalid");
    priceErrorAlert.classList.remove("d-block");
    priceErrorAlert.classList.add("d-none");
    return true;
  } else {
    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
    priceErrorAlert.classList.add("d-block");
    priceErrorAlert.classList.remove("d-none");
  }
}

function typevalidation() {
  var regex = /^Mobile|Laptop|Watch$/;
  var check = productType.value;
  if (regex.test(check)) {
    productType.classList.add("is-valid");
    productType.classList.remove("is-invalid");
    typeErrorAlert.classList.remove("d-block");
    typeErrorAlert.classList.add("d-none");
  } else {
    productType.classList.remove("is-valid");
    productType.classList.add("is-invalid");
    typeErrorAlert.classList.add("d-block");
    typeErrorAlert.classList.remove("d-none");
  }
}

function descvalidation() {
  var limit = /^[A-Za-z0-9\s]{0,500}$/;
  var check = productDesc.value;

  if (limit.test(check)) {
    productDesc.classList.add("is-valid");
    productDesc.classList.remove("is-invalid");
    return true;
  } else {
    productDesc.classList.add("is-invalid");
    productDesc.classList.remove("is-valid");
    return false;
  }
}
