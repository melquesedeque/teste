import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuarios } from '../models/usuarios';
import * as firebase from 'firebase';

@Component({
  selector: 'app-minhaconta',
  templateUrl: './minhaconta.page.html',
  styleUrls: ['./minhaconta.page.scss'],
})
export class MinhacontaPage implements OnInit {

  usuario:Usuarios = new Usuarios;
  constructor(private usuarioService:UsuarioService) { }

  ionViewWillEnter(){
    let user = firebase.auth().currentUser;
    this.usuarioService.buscarEmail(user.email).then(resultado =>{
      this.usuario = resultado;
    }).catch(erro => alert(`OLha ${erro}`));
  }

  ngOnInit() {
  }

}