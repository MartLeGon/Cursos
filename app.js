// ---------------- FUNCIONES FUERA DEL DOMContentLoaded ----------------
let carShop = [];

function addCar(element){
    const img = element.parentElement.parentElement.querySelector('img').src;
    const name = element.parentElement.querySelector('h4').textContent;
    const price = element.parentElement.querySelector('.precio span').textContent.replace('$', '');

    const product = {
        img: img,
        name: name,
        price: price,
        amount: 1
    };

    let existe = carShop.some(e => e.name === name);
    if(!existe) {
        carShop.push(product);
        showCourse(carShop);
        return;
    }

    let index = carShop.findIndex(e => e.name === name);
    carShop[index].amount += 1;
}

function showCourse(arr){
    let last = arr.length - 1;
    const tableCar = document.querySelector('#lista-carrito tbody');
    const tr = document.createElement('tr');

    const tdImg = document.createElement('td');
    const imgTD = document.createElement('img');
    imgTD.src = arr[last].img;
    imgTD.classList.add('img-carrito');

    const tdName = document.createElement('td');
    tdName.textContent = arr[last].name;

    const tdPrice = document.createElement('td');
    tdPrice.textContent = arr[last].price;

    const tdAmount = document.createElement('td');
    tdAmount.textContent = arr[last].amount;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('borrar-curso');
    deleteBtn.textContent = 'X';

    deleteBtn.addEventListener('click', () => {
        tr.remove();
        let index = carShop.findIndex(e => e.name === tdName.textContent);
        carShop.splice(index, 1);
    });

    tdImg.appendChild(imgTD);
    tr.appendChild(tdImg);
    tr.appendChild(tdName);
    tr.appendChild(tdPrice);
    tr.appendChild(tdAmount);
    tr.appendChild(deleteBtn);
    tr.classList.add('row-carShop');
    tableCar.appendChild(tr);
}

// ---------------- EVENTOS Y FETCH DENTRO DEL DOMContentLoaded ----------------
document.addEventListener('DOMContentLoaded', () => {
    fetch('get_cursos.php')
        .then(res => res.json())
        .then(cursos => {
            const contenedor = document.querySelector('#contenedor-cursos');
            contenedor.innerHTML = '';

            let row;

            cursos.forEach((curso, index) => {
                // Crear nueva fila cada 3 cursos
                if (index % 3 === 0) {
                    row = document.createElement('div');
                    row.classList.add('row');
                    contenedor.appendChild(row);
                }

                const col = document.createElement('div');
                col.classList.add('four', 'columns');
                col.innerHTML = `
                    <div class="card">
                        <img src="${curso.imagen}" class="imagen-curso u-full-width">
                        <div class="info-card">
                            <h4>${curso.nombre}</h4>
                            <p>${curso.autor}</p>
                            <img src="img/estrellas.png">
                            <p class="precio">$${curso.precio} <span class="u-pull-right ">$${curso.precio_descuento}</span></p>
                            <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${curso.id}">Agregar Al Carrito</a>
                        </div>
                    </div>
                `;
                row.appendChild(col);
            });

            activarBotonesCarrito();
        });

    function activarBotonesCarrito() {
        const addBtns = document.querySelectorAll('.agregar-carrito');
        addBtns.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                addCar(element);
                e.stopPropagation();
            });
        });
    }

    const btnEmptyCar = document.querySelector('#vaciar-carrito');
    btnEmptyCar.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('.row-carShop').forEach(e => e.remove());
        carShop.splice(0, carShop.length);
    });
});
