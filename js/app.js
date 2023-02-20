let presupuesto = 20000;
let porcentajeEgreso = 0.25

let egresos = [
  {desc:'Renta', ammount:900},
  {desc:'Ropa', ammount:400}
];

  let ingresos = [
    { desc:'Quincena', ammount:9000},
    {desc:'Venta', ammount:400}
  ];

const totalIngresos = () => {

  let totalIngresos = 0;
  for (let i = 0; i < ingresos.length; i++) {
    totalIngresos  = totalIngresos + ingresos[i].ammount;
    
  }
  return totalIngresos;

}
const totalEgresos = () => {
  let totalEgresos = 0;
  for (let i = 0; i < egresos.length; i++) {
    totalEgresos  = totalEgresos + egresos[i].ammount;
    
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

  console.log(formatoMoneda(presupuesto));
console.log(formatoPorcentaje(porcentajeEgreso));
console.log(formatoMoneda(totalIngresos()));
console.log(formatoMoneda(totalEgresos()));

}


cargarCabecero()