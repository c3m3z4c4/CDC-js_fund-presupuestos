class Dato{
        constructor(descripcion, valor){
          this._descripcion = descripcion; 
          this._valor= valor;  
        }

      // Getters
        get descripcion() {
          return this._descripcion;
        }

        //Setters
        set descripcion(descripcion){
          this._descripcion = descripcion;
        }
  
      // Getters
        get valor() {
          return this._valor;
        }

        //Setters
        set valor(valor){
          this._valor = valor;
        }
  
    }