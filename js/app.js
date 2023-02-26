

let ingresos =[
  // {
  //   id:1,
  //   descripcion: "Salario",
  //   valor: 40000
  // },
  // {
  //   id:2,
  //   descripcion: "Venta Auto",
  //   valor: 60000
  // },
  // {
  //   id:3,
  //   descripcion: "Regalias",
  //   valor: 15000
  // },
];


let egresos = [
  // {
  //   id:1,
  //   descripcion: "Renta",
  //   valor: 8000
  // },
  // {
  //   id:2,
  //   descripcion: "Ropa",
  //   valor: 600
  // },
  // {
  //   id:3,
  //   descripcion: "Luz",
  //   valor: 1230
  // },
];
const totalIngresos = () => {

  let totalIngresos = 0;
  for (let i = 0; i < ingresos.length; i++) {
    totalIngresos  = totalIngresos + ingresos[i].valor;
    
  }
  return totalIngresos;

}
const totalEgresos = () => {
  let totalEgresos = 0;
  for (let i = 0; i < egresos.length; i++) {
    totalEgresos  = totalEgresos + egresos[i].valor;
    
  }
  return totalEgresos;

}


const formatoMoneda = (monto) => {
  const montoFormateado = monto.toLocaleString('es-MX', {
  currency: 'MXN',
  style: 'currency',
  minimumFractionDigits: 2
})
return montoFormateado;
}

const formatoPorcentaje = (valor) => {
const porcentajeFormateado = valor.toLocaleString('es-MX', {
  style: 'percent',
  minimumFractionDigits: 2
})
return porcentajeFormateado
}


const cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos()/totalIngresos();

  // Cargando Presupuesto cabecera
  let presup=document.querySelector("#presupuesto");
  presup.innerHTML=formatoMoneda(presupuesto);

//cargando porcentajes de egresos
  let percent=document.querySelector("#porcentaje");
  percent.innerHTML=formatoPorcentaje(porcentajeEgreso);

// Cargando ingresos a la cabecera

  let ingress=document.querySelector("#ingresos");
  ingress.innerHTML=formatoMoneda(totalIngresos());
  
  //Cargando egresos a la cabecera

  let egress=document.querySelector("#egresos");
  egress.innerHTML=formatoMoneda(totalEgresos());
}


// Funcion creadora del ingreso HTML

const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `<div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
      <div class="elemento_valor">+${ingreso.valor}</div> 
      <div class="elemento_eliminar">
        <button class="elemento_eliminar--btn" ><ion-icon name="close-circle-outline"></ion-icon></button>
      </div> 
    </div>
  </div>`;
  //  onclick="${eliminarIngreso(ingreso.id)}"
  return ingresoHTML
}
const crearEgresoHTML = (egreso) => {
  let egresoHTML = `<div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
      <div class="elemento_valor">-${egreso.valor}</div> 
      <div class="elemento_eliminar">
        <button class="elemento_eliminar--btn"><ion-icon name="close-circle-outline" ></ion-icon></button>
      </div> 
    </div>
  </div>`;
  // onclick="${eliminarEgreso(egreso.id)}
  return egresoHTML
}



// Funcion para cargar ingresos
const cargarIngresos =()=>{
  let ingresosHTML =new Array()
  console.log(ingresos)
  for(let i=0; i<ingresos.length; i++){

    ingresosHTML.push(crearIngresoHTML(ingresos[i]));
  }
  document.querySelector("#lista-ingresos").innerHTML=ingresosHTML.join('');

}

// Funcion para cargar egresos
const cargarEgresos =()=>{
    let egresosHTML = [];
    for(let i=0; i<egresos.length; i++){
      egresosHTML.push(crearEgresoHTML(egresos[i]));
    };
    document.querySelector("#lista-egresos").innerHTML=egresosHTML.join('');
}

const eliminarIngreso = (id) => {
  let indiceEliminar = ingresos.findIndex((el)=>{id===el.id})
  ingresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarIngresos();
}

const eliminarEgreso = (id) => {
  let indiceEliminar = egresos.findIndex((el)=>{id===el.id})
  egresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarEgresos();
}       

// Funcion para agregar dato

const agregarDato = () => {
  let forma = document.getElementById('forma');
  let tipo = document.getElementById('tipo').value;
  let descripcion= document.getElementById('descripcion').value;
  let valor = document.getElementById('valor').value;
  console.log(tipo, descripcion, valor)
  if(descripcion!="" && valor!=""){
      if(tipo='ingreso'){
        console.log(tipo, descripcion, parseInt(valor, 10))
        ingresos.push(new Ingreso(descripcion, parseInt(valor, 10)));
      }else if(tipo=='egreso'){
        console.log(tipo, descripcion, parseInt(valor, 10))
        egresos.push(new Egreso(descripcion, parseInt(valor, 10)));
      }
  }
  cargarCabecero()
  cargarIngresos()

}

// Cargando la aplicacion
function cargarApp(){
  cargarCabecero()
  cargarIngresos()
  cargarEgresos()
}