const wishForm = document.getElementById("wishForm");//formulario
const wishInput = document.getElementById("wishInput");//escriba
const wishList = document.getElementById("wishList");//muestre

// GET 
async function loadWishes() {
  wishList.innerHTML = "";
  try {
    const response = await fetch("api.php");//llama a GET de api.php
    const wishes = await response.json();//respuesta a archivo json

    if (wishes.length === 0) {//si no hay deseos
      const empty = document.createElement("li");
      empty.className = "list-group-item text-muted text-center";
      empty.textContent = "No hay deseos agregados.";
      wishList.appendChild(empty);
      return;
    }

    wishes.forEach((wish) => {//si hay deseos
      const li = document.createElement("li");
      li.className =
        "list-group-item d-flex justify-content-between align-items-start flex-column flex-sm-row";
      //descripción del deseo y un botón para eliminarlo
      li.innerHTML = `
        <div>
          <strong>${wish.descripcion}</strong><br>
          <small class="text-muted">Agregado el: ${new Date(wish.fecha).toLocaleString("es-ES")}</small>
        </div>
        <button class="btn btn-sm btn-outline-danger mt-2 mt-sm-0" onclick="deleteWish(${wish.id})">Eliminar</button>
      `;
      wishList.appendChild(li);//lista 
    });
  } catch (error) {
    console.error("Error al cargar deseos:", error);
  }
}


//envia deseo a POST 
wishForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const descripcion = wishInput.value.trim();

  if (descripcion !== "") {
    await fetch("api.php", {//se envia el deseo a POST
      method: "POST",
      headers: { "Content-Type": "application/json" },//cambia las cosas a json
      body: JSON.stringify({ descripcion }),
    });

    wishInput.value = "";
    loadWishes();//vuelve a cargar deseos
  }
});

// DELETE 
async function deleteWish(id) {
  await fetch("api.php", {//llama a delte
    method: "DELETE",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `id=${id}`,
  });

  loadWishes();
}

// INIT
loadWishes();//carga deseos al inicio
