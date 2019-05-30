import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import * as firebase from 'firebase';
import { Associados } from '../models/associados';

@Injectable({
  providedIn: 'root'
})
export class AssociadosService{

  private db: firebase.database.Reference;

  constructor() {
    this.db = firebase.database().ref('ContaUsuarioAssosiado');
  }

  cadastrar(associado: Associados) {
    let uid = this.db.push().key;
    associado.id = uid;
    this.db.child(uid).set(associado);
  }

  editar(associado: Associados) {
    this.db.child(associado.id).set(associado);
  }

  async buscarPorId(id: string): Promise<Associados> {
    return this.db.child(id).once('value').then(snapshot => {
      if (snapshot.exists())
        return snapshot.val();
      return null;
    });
  }

  async buscarTodoAssociados(): Promise<Associados[]> {
    return this.db.orderByChild('contaAtiva').equalTo("true").once('value').then(snapshot => {
      let associados = [];
      snapshot.forEach(associado => {
        associados.push(associado.val());
      })
      return associados;
    });
  }

  async buscarAssociadoPorEmail(email: string): Promise<Associados> {
    return this.db.orderByChild('email').equalTo(email).once('value').then(snapshot => {
      if (snapshot.exists()) {
        console.log("OK no buscar");
        let resultado = snapshot.val();
        let chave = Object.keys(resultado)[0];
        return resultado[chave];
      }
      console.log("ERRO");
      return null;
    });
  }

}
