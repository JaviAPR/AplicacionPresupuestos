const ingresos = [
    new Ingreso('salario',2000),
    new Ingreso('Venta coche',1500)
];

const egresos = [
    new Egreso('compra Ropa',1000),
    new Egreso('Pago de renta',900)
];

function cargarApp(){
    cargarCabecero();
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
    document.getElementById('presupuesto').innerHTML = prespuesto;
    document.getElementById('porcentaje').innerHTML = porcentajeEgreso;
    document.getElementById('ingresos').innerHTML = totalIngresos();
    document.getElementById('egresos').innerHTML = totalEgresos();
}