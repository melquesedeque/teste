import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticarLoginGuard } from '../autenticar-login.guard';
import * as firebase from 'firebase';
import { Usuarios } from '../models/usuarios';
import { Associados } from '../models/associados';
import { AssociadosService } from '../services/associados.service';


@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.page.html',
  styleUrls: ['./cadastrar-usuario.page.scss'],
})
export class CadastrarUsuarioPage implements OnInit {
  
  formulario:FormGroup;
  constructor(private associadoService:AssociadosService, private menu:MenuController,private usuarioService:UsuarioService, private rotas:Router,private menuBarra:MenuController,private formbuilder:FormBuilder) {}

  ionViewWillEnter() {
    this.menu.enable(false); //Desabilita
  }

  ngOnInit() {
    this.formulario = this.formbuilder.group({
      nome:[null,[Validators.required]],
      email:[null,[Validators.required, Validators.email]],
      senha:[null,[Validators.required, Validators.minLength(6)]],
      tipoUsuario:[null,[Validators.required]]
   });
  }

  cadastrar(){
    //alert(this.formulario.get('tipoUsuario').value);

    firebase.auth().createUserWithEmailAndPassword(this.formulario.get('email').value, this.formulario.get('senha').value).then(usuarioLogado =>{
      if(usuarioLogado != null){
        AutenticarLoginGuard.acessar = true;
        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: this.formulario.get('nome').value,
        }).then(certo => {
          this.fazer(this.formulario.get('tipoUsuario').value);
          this.rotas.navigateByUrl('/lista-funcionarios');
        }).catch(erro => alert("Erro ao Tentar se Cadastrar!"));
      }
    }).catch(erro => console.log("Erro ao Cadastrar Usuario"));
  }

  fazer(tipoUsuario:string){
    if (tipoUsuario == "comun") {

      var user = firebase.auth().currentUser;
      var usuario: Usuarios = new Usuarios;
      usuario.id = user.uid;
      usuario.email = user.email;
      usuario.tipo = tipoUsuario;
      usuario.nome = user.displayName;

      try {
        this.usuarioService.cadastrar(usuario);
        console.log("OK");
      } catch (error) {
        console.log("OLha " + error);
      }

    } else if (tipoUsuario == "associado") {
      
      var user = firebase.auth().currentUser;
      var associado: Associados = new Associados;
      associado.id = user.uid;
      associado.email = user.email;
      associado.nome = user.displayName;
      associado.descricao = "";
      associado.especializacao = "";
      associado.horario = "";
      associado.imagem = "";
      associado.sexo = "";
      associado.telefone = "";
      associado.tipoPlano = "";
      associado.contaAtiva = "false";
      associado.tipo = tipoUsuario;

      try {
        this.associadoService.cadastrar(associado);
        console.log("OK Associado");
      } catch (error) {
        console.log("OLha " + error);
      }

    }
  }
}
