class Ingreso extends Dato{

  contadorIngresos = 0;

  constructor(descripcion, valor){
    super(descripcion, valor),
    this._id = ++this.contadorIngresos

  }

  //Getter
  get id(){
    return this._id
  }
}