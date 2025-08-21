const calculator = document.getElementById("t-shirt-calculator");
const typeInputCnt = document.getElementById("t-shirt-type-input");
const colorInputCnt = document.getElementById("t-shirt-color-input");
const sizeInputCnt = document.getElementById("t-shirt-size-input");
const sizeTable = document.getElementById("t-shirt-size-table");
const priceLabel = document.getElementById("t-shirt-price-label");
const link = document.getElementById("t-shirt-link");

calculator.addEventListener("click", (e) => {
  const currentType = e.target.name;
  const currentValue = e.target.value;
  let isProductChanged = false;

  switch (currentType) {
    case "color":
      selectedProduct.colorValue = currentValue;
      isProductChanged = !isProductChanged;
      break;
    case "capacity":
      defaultProduct.capacity = Number(currentValue);
      selectedProduct.capacity = Number(currentValue);
      productColorListContainer.innerHTML = ColorPicker(products, selectedProduct);
      isProductChanged = !isProductChanged;
      break;
  }

  if (isProductChanged) {
    calculate();
    isProductChanged = !isProductChanged;
  }
});
