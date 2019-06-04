import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticarLoginGuard } from '../autenticar-login.guard';
import { MenuController, LoadingController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mensagem: String;
  formulario: FormGroup;
  carregando;
  constructor(private loadingController:LoadingController, private formBuilder: FormBuilder, private rotas: Router, private menu: MenuController, private usuario: UsuarioService) { }

  async loading() {
    this.carregando = await this.loadingController.create({
      message: 'Carregando...',
    });
    this.carregando.present();
  }

  ionViewWillEnter() {
    this.menu.enable(false); //Desabilita
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    this.loading();
    firebase.auth().signInWithEmailAndPassword(this.formulario.get('email').value, this.formulario.get('senha').value).then(usuarioLogado => {
      if (usuarioLogado != null) {
        this.rotas.navigate(['/lista-funcionarios']);
        this.carregando.dismiss();
        AutenticarLoginGuard.acessar = true;
      }
    }).catch(erro => {
      this.mensagem = "E-mail ou Senha Invalidos!";
    });


  }
}
