
let ingresos =[];


let egresos = [];

let mensaje = ""


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

const validarLongCadena = (cadena, nombreCadena) => {
  if(cadena.length<=2){
    mensaje="La longitod debe ser al menos de 3 caracteres";
  }
  return mensaje;
}

const validarTipoCadena = (cadena, nombreCadena) => {
  if(!isNaN(cadena)){
    mensaje=`Estas agregando numeros al campo`;
  }else{
    validarLongCadena(cadena, nombreCadena);
  }
  return mensaje;
}


const validarTipoNumero = (numero, nombreNumero) => {
  if(isNaN(numero)){
    mensaje=`Debes agregar solo numeros a este campo`;
    return mensaje;
  }
}



const validarCadena=(cadena, nombreCadena)=>{
  if(cadena!=""){
    mensaje=validarTipoCadena(cadena, nombreCadena);
  }else{
    mensaje=`El campo ${nombreCadena} es obligatorio`
  }
  return mensaje
}

const validarMoneda=(valor, datoValor)=>{
  if(valor==0){
    mensaje=`Debes ingresar un valor mayor a 0`;
  }else{
    mensaje=validarTipoNumero(valor, datoValor);
  }
  return mensaje
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
        <button class="elemento_eliminar--btn" onclick="eliminarIngreso(${ingreso.id})"><ion-icon name="close-circle-outline"></ion-icon></button>
      </div> 
    </div>
  </div>`;
  return ingresoHTML
}
const crearEgresoHTML = (egreso) => {
  let egresoHTML = `<div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
      <div class="elemento_valor">-${egreso.valor}</div> 
      <div class="elemento_eliminar">
        <button class="elemento_eliminar--btn" onclick="eliminarEgreso(${egreso.id})"><ion-icon name="close-circle-outline" ></ion-icon></button>
      </div> 
    </div>
  </div>`;
  return egresoHTML
}



// Funcion para cargar ingresos
const cargarIngresos =()=>{
  let ingresosHTML =new Array()
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


// Funcion de seccion de errores

const errorHandler = (mensaje) => {
  let alerta = document.querySelector('#notice');
  alerta.classList.add('show', 'error');
  alerta.innerHTML=`<span>${mensaje}</span>`
  setTimeout(()=>{
    alerta.classList.remove('show', 'error');
    alerta.classList.add('hide');
  }, 2000);
}

// Funcion para agregar dato

const agregarDato = () => {
  let tipo = document.getElementById('tipo').value;
  let descripcion= document.getElementById('descripcion').value;
  let valor = document.getElementById('valor').value;
  let mensajeCadena=validarCadena(descripcion, "descripcion");
  let mensajeValor=validarMoneda(valor, "valor");
  if(!mensajeCadena && !mensajeValor){
      if(tipo=='ingreso'){
        ingresos.push(new Ingreso(descripcion, parseInt(valor, 10)));
        cargarCabecero()
        cargarIngresos()
      }
      else if(tipo=='egreso'){
        egresos.push(new Egreso(descripcion, parseInt(valor, 10)));
        cargarCabecero()
        cargarEgresos()
      }
      document.getElementById('descripcion').value="";
      document.getElementById('valor').value=0;
  }else{
    mensajeCadena ? errorHandler(mensajeCadena) : errorHandler(mensajeValor)
    document.getElementById('descripcion').value="";
    document.getElementById('valor').value=0;
    setTimeout(mensaje="", 1000);
  }


}

// Cargando la aplicacion
function cargarApp(){
  cargarCabecero()
  cargarIngresos()
  cargarEgresos()
}