import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticarLoginGuard } from '../autenticar-login.guard';
import { MenuController } from '@ionic/angular';
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

  constructor(private formBuilder: FormBuilder, private rotas: Router, private menu: MenuController, private usuario: UsuarioService) { }

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
    firebase.auth().signInWithEmailAndPassword(this.formulario.get('email').value, this.formulario.get('senha').value).then(usuarioLogado => {
      if (usuarioLogado != null) {
        this.rotas.navigate(['/lista-funcionarios']);
        AutenticarLoginGuard.acessar = true;
      }
    }).catch(erro => {
      this.mensagem = "E-mail ou Senha Invalidos!";
    });


  }
}
