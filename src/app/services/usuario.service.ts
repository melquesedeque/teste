import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private db: firebase.database.Reference;

  constructor() {
    this.db = firebase.database().ref('ContaUsuarioComun');
  }

  cadastrar(usuario: Usuarios) {
    let uid = this.db.push().key;
    usuario.id = uid;
    this.db.child(uid).set(usuario);
  }

  async buscarPorId(id: string): Promise<Usuarios> {
    return this.db.child(id).once('value').then(snapshot => {
      if (snapshot.exists())
        return snapshot.val();
      return null;
    });
  }

  async buscarEmail(email: string): Promise<Usuarios> {
    return this.db.orderByChild('email').equalTo(email).once('value').then(snapshot => {
      if (snapshot.exists()) {
        let resultado = snapshot.val();
        let chave = Object.keys(resultado)[0];
        return resultado[chave];
      }
      return null;
    });
  }
}
