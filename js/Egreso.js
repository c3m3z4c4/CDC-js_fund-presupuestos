class Egreso extends Dato{
  contadorEgresos = 0;
  constructor(descripcion, valor){
    super(descripcion, valor),
    this._id = ++contadoringreso

  }

  //Getter
  get id(){
    return this._id
  }
}