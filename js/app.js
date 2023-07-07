const ingresos = [
    new Ingreso('Sueldo',1000),
    new Ingreso('Venta coche',1500)
];

const egresos = [
    new Egreso('compra Ropa',1000),
    new Egreso('Pago de renta',900)
];

function cargarApp(){
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

function totalIngresos(){
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

function totalEgresos(){
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

function cargarCabecero(){
    let prespuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(prespuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

function formatoMoneda(valor){
    return valor.toLocaleString('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2});
}

function formatoPorcentaje(valor){
    return valor.toLocaleString('en-US',{style:'percent',minimumFractionDigits:2});
}


const cargarIngresos = ()=>{
    let ingresosHTML ='';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"
                onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
            </button>
        </div>
    </div>
</div>`;
    return ingresoHTML;
}

function eliminarIngreso(id){
    let indiceEliminar = ingresos.findIndex(ingreso =>{ingreso.id === id});
    ingresos.splice(indiceEliminar,1);
    cargarCabecero()
    cargarIngresos();
}

const cargarEgresos = ()=>{
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso)=>{
    let porcentajeDeEgresos = egreso.valor/totalEgresos();
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(porcentajeDeEgresos)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"
                onclick="eliminarEgreso(${egreso.id})"></ion-icon>
            </button>
        </div>
    </div>
</div>`;
    return egresoHTML;
}

function eliminarEgreso(id){
    let indiceEliminar = egresos.findIndex(egreso =>{egreso.id === id});
    egresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarEgresos();
}


let agregarDato =  ()=>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value,Number(valor.value)));
            cargarCabecero();
            cargarIngresos();
        }else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value,Number(valor.value)));
            cargarCabecero();
            cargarEgresos();

        }
    }
}