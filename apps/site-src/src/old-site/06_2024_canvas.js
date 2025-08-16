window.addEventListener("load", () => {
  const orderForm = document.getElementById("canvas_order_form");
  const priceLabel = document.getElementById("summ");
  const orderButton = document.getElementById("canvas-order-button");
  const image = document.getElementById("Img");
  const domain = window.location.origin;

  const selectedValues = {
    material: "cotton",
    size: "40x60",
    cover: "cover",
    price: 660,
  };

  const productList = {
    "15x20": {
      syntetic: 260,
      cotton: 290,
      cover: 30,
      image: "/wp-content/uploads/custom-canvas/1520.png",
    },
    "20x20": {
      syntetic: 270,
      cotton: 290,
      cover: 30,
      image: "/wp-content/uploads/custom-canvas/2020.png",
    },
    "20x30": {
      syntetic: 320,
      cotton: 340,
      cover: 30,
      image: "/wp-content/uploads/custom-canvas/2030.png",
    },
    "20x60": {
      syntetic: 500,
      cotton: 550,
      cover: 50,
      image: "/wp-content/uploads/custom-canvas/2060.png",
    },
    "30x30": {
      syntetic: 290,
      cotton: 320,
      cover: 30,
      image: "/wp-content/uploads/custom-canvas/3030.png",
    },
    "30x40": {
      syntetic: 330,
      cotton: 360,
      cover: 30,
      image: "/wp-content/uploads/custom-canvas/3040.png",
    },
    "30x45": {
      syntetic: 380,
      cotton: 420,
      cover: 40,
      image: "/wp-content/uploads/custom-canvas/3045.png",
    },
    "30x60": {
      syntetic: 460,
      cotton: 510,
      cover: 50,
      image: "/wp-content/uploads/custom-canvas/3060.png",
    },
    "30x90": {
      syntetic: 620,
      cotton: 680,
      cover: 60,
      image: "/wp-content/uploads/custom-canvas/3090.png",
    },
    "40x40": {
      syntetic: 430,
      cotton: 470,
      cover: 40,
      image: "/wp-content/uploads/custom-canvas/4040.png",
    },
    "40x50": {
      syntetic: 440,
      cotton: 480,
      cover: 40,
      image: "/wp-content/uploads/custom-canvas/4050.png",
    },
    "40x60": {
      syntetic: 550,
      cotton: 610,
      cover: 50,
      image: "/wp-content/uploads/custom-canvas/4060.png",
    },
    "40x80": {
      syntetic: 740,
      cotton: 820,
      cover: 70,
      image: "/wp-content/uploads/custom-canvas/4080.png",
    },
    "50x50": {
      syntetic: 570,
      cotton: 630,
      cover: 60,
      image: "/wp-content/uploads/custom-canvas/5050.png",
    },
    "50x70": {
      syntetic: 780,
      cotton: 870,
      cover: 80,
      image: "/wp-content/uploads/custom-canvas/5070.png",
    },
    "55x85": {
      syntetic: 830,
      cotton: 920,
      cover: 90,
      image: "/wp-content/uploads/custom-canvas/5585.png",
    },
    "55x110": {
      syntetic: 1070,
      cotton: 1190,
      cover: 110,
      image: "/wp-content/uploads/custom-canvas/55110.png",
    },
    "55x160": {
      syntetic: 1400,
      cotton: 1560,
      cover: 150,
      image: "/wp-content/uploads/custom-canvas/55160.png",
    },
    "60x80": {
      syntetic: 840,
      cotton: 940,
      cover: 100,
      image: "/wp-content/uploads/custom-canvas/6080.png",
    },
    "60x90": {
      syntetic: 980,
      cotton: 1120,
      cover: 130,
      image: "/wp-content/uploads/custom-canvas/6090.png",
    },
    "65x65": {
      syntetic: 810,
      cotton: 920,
      cover: 100,
      image: "/wp-content/uploads/custom-canvas/6565.png",
    },
    "70x100": {
      syntetic: 1100,
      cotton: 1260,
      cover: 140,
      image: "/wp-content/uploads/custom-canvas/70100.png",
    },
    "85x85": {
      syntetic: 1040,
      cotton: 1180,
      cover: 130,
      image: "/wp-content/uploads/custom-canvas/8585.png",
    },
    "85x120": {
      syntetic: 1350,
      cotton: 1530,
      cover: 150,
      image: "/wp-content/uploads/custom-canvas/85120.png",
    },
    "100x100": {
      syntetic: 1270,
      cotton: 1470,
      cover: 180,
      image: "/wp-content/uploads/custom-canvas/100100.png",
    },
  };

  const calculate = ({ material, size, cover }) => {
    selectedValues.price = productList[size][material];
    selectedValues.price += cover == "cover" ? +productList[size][cover] : 0;
    priceLabel.innerHTML = selectedValues.price;
    image.src = `${domain}${productList[size].image}`;
    orderButton.href = `${domain}/product/canvas-${size}${
      material == "syntetic" ? "-eco" : ""
    }${cover == "cover" ? "-lak" : ""}/ `;
  };

  orderForm.addEventListener("change", (e) => {
    let id = e.target.id;
    switch (id) {
      case "materialvalue":
        selectedValues.material = e.target.value;
        break;
      case "sizevalue":
        selectedValues.size = e.target.value;
        break;
      case "covervalue":
        selectedValues.cover = e.target.value;
        break;
    }
    calculate(selectedValues);
  });
});

calculate(selectedValues);
