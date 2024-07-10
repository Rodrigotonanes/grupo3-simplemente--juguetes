const $ = (element) => document.querySelector(element);
const cutText = (text = "", long) => text.substring(0, long) + "...";

const converterMoneyArg = (num = 0) =>
  num.toLocaleString({
    currency: "ARS",
    style: "currency",
  });

const createAlertProgress = ({
  title = "Realizando la compra...",
  html = "progreso <b></b> milisegundos.",
  timer = 2000,
}) => {
  let timerInterval;
  return Swal.fire({
    title,
    html,
    timer,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  });
};

const server = "http://localhost:3030";
let productsCart = [];

const getShoppingCart = (server) =>
  fetch(`${server}/api/cart?userId=2`).then((res) => res.json());

const getCardStructure = (p) => {
  return `
    <div class="card card-with-shadow col-12 col-lg-10 my-5">
      <div class="card-body row">
        <img class="col-2" style="object-fit: cover;" src="${
          p.firstImg
        }" alt="${p.name}">
        <div class="col-10 position-relative">
          <button class="fs-5 p-0 border-0 bg-transparent position-absolute text-danger"
            style="top: -3px; right: 10px;" onclick="removeProductCart(${
              p.id
            })">
            <i style="padding: 2px;" class="rounded-circle custom-btn-clear far fa-times-circle"></i>
          </button>

          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">${cutText(p.description, 70)}</p>

          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="card-text-black">Precio: $${converterMoneyArg(
              p.price
            )}</span>

            <div class="d-flex align-items-center gap-2">
              <label>Cantidad:</label>
              <button class="btn custom-btn-light" onclick="lessProduct(${
                p.id
              })">-</button>
              <output style="width: 50px;" class="form-control text-center">${
                p.orderproducts.quantity
              }</output>
              <button class="btn custom-btn-light" onclick="moreProduct(${
                p.id
              })">+</button>
            </div>
            <span class="card-text-green">Subtotal: $${converterMoneyArg(
              p.price * p.orderproducts.quantity
            )}</span>
          </div>
        </div>
      </div>
    </div>
  `;
};
const paintCartsInView = (products = [], elementContainerProduct) => {
  elementContainerProduct.innerHTML = "";
  products.forEach((product) => {
    elementContainerProduct.innerHTML += getCardStructure(product);
  });
};

const processReloadCart = async (server, containerProducts, outputTotal) => {
  const {
    ok,
    data: { total, products },
  } = await getShoppingCart(server);

  ok && (productsCart = products);

  paintCartsInView(productsCart, containerProducts);
  outputTotal.innerHTML = total;
};

window.addEventListener("load", async (event) => {
  const containerProducts = $("#card-container");
  const btnClearCart = $("#clear-cart");
  const btnBuy = $("#btn-buy");
  const outputTotal = $("#show-total");
  try {
    processReloadCart(server, containerProducts, outputTotal);
  } catch (error) {
    console.error(error.message);
  }

  // Eliminar todos los productos del orden
  btnClearCart.addEventListener("click", async () => {
    try {
      const { ok, msg } = await fetch(`${server}/api/cart/clear?userId=2`, {
        method: "PATCH",
      }).then((res) => res.json());

      if (ok) {
        processReloadCart(server, containerProducts, outputTotal);
      }
    } catch (error) {
      console.error(error.message);
    }
  });

  btnBuy.addEventListener("click", async () => {
    try {
      const { ok, msg } = await fetch(`${server}/api/cart/completed?userId=2`, {
        method: "PATCH",
      }).then((res) => res.json());

      if (ok) {
        const result = await createAlertProgress({
          title: "Completando compra...",
          timer: 4000,
        });

        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          processReloadCart(server, containerProducts, outputTotal);

          setTimeout(() => {
            location.href = "/";
          }, 1000);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  });
});

const lessProduct = async (id) => {
  try {
    const containerProducts = $("#card-container");
    const outputTotal = $("#show-total");

    const { ok, msg } = await fetch(`${server}/api/cart/less/${id}?userId=2`, {
      method: "PATCH",
    }).then((res) => res.json());

    if (ok) {
      processReloadCart(server, containerProducts, outputTotal);
    }
    // console.log({ok, msg})
  } catch (error) {
    console.error(error.message);
  }
};

// Aumentar un producto
const moreProduct = async (id) => {
  try {
    const containerProducts = $("#card-container");
    const outputTotal = $("#show-total");
    const { ok, msg } = await fetch(`${server}/api/cart/more/${id}?userId=2`, {
      method: "PATCH",
    }).then((res) => res.json());

    if (ok) processReloadCart(server, containerProducts, outputTotal);
  } catch (error) {
    console.error(error.message);
  }
};

const removeProductCart = async (id) => {
  try {
    const containerProducts = $("#card-container");
    const outputTotal = $("#show-total");
    const { ok, msg } = await fetch(
      `${server}/api/cart/remove/${id}?userId=2`,
      {
        method: "PATCH",
      }
    ).then((res) => res.json());

    if (ok && toastr["success"]("Producto retirado del carrito con éxito")) {
      processReloadCart(server, containerProducts, outputTotal);
    }
  } catch (error) {
    console.error(error.message);
  }
};
