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
}
