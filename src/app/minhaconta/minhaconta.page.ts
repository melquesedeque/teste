import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuarios } from '../models/usuarios';
import * as firebase from 'firebase';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-minhaconta',
  templateUrl: './minhaconta.page.html',
  styleUrls: ['./minhaconta.page.scss'],
})
export class MinhacontaPage implements OnInit {

  usuario:Usuarios = new Usuarios;
  carregando;
  constructor(private loadingController:LoadingController, private usuarioService:UsuarioService) { }

  ionViewWillEnter(){
    this.loading();
    let user = firebase.auth().currentUser;
    this.usuarioService.buscarEmail(user.email).then(resultado =>{
      this.usuario = resultado;
      this.carregando.dismiss();
    }).catch(erro => alert(`OLha ${erro}`));
  }

  async loading() {
    this.carregando = await this.loadingController.create({
      message: 'Carregando...',
    });
    this.carregando.present();
  }

  ngOnInit() {
  }

}