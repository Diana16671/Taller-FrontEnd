/*export class MascotaModel{
    constructor(public id: string,public nombre:string, public edad:string){}
}*/
export class MascotaModel {
    constructor(
        public id: string,
        public nombre: string,
        public edad: number,
        public especie: string,
        public raza: string,
        public sexo: string,
        public estado: string,
        public foto: string,
    ){}
}