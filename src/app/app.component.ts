import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AutenticarLoginGuard } from './autenticar-login.guard';
import * as firebase from "firebase";
import { Router } from '@angular/router';
import { AssociadosService } from './services/associados.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  usuarioAssociado:boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private rotas:Router
  ) {
    this.initializeApp();
  }

  public sair(){
    console.log("Sair");
    firebase.auth().signOut();
    AutenticarLoginGuard.acessar = false;
    this.usuarioAssociado = false;
    this.rotas.navigateByUrl("/login");
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    var firebaseConfig = {
      apiKey: "AIzaSyBG3H6K_U9OBLYfIBi8vAwFW9HXt3oQ32U",
      authDomain: "projegoricardao.firebaseapp.com",
      databaseURL: "https://projegoricardao.firebaseio.com",
      projectId: "projegoricardao",
      storageBucket: "projegoricardao.appspot.com",
      messagingSenderId: "530436378946",
      appId: "1:530436378946:web:ba77925cd389e554"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(usuario => {
      if(usuario != null){
        var associadoService:AssociadosService = new AssociadosService;
        associadoService.buscarAssociadoPorEmail(usuario.email).then(resultado =>{
          if(resultado.tipo == "associado"){
            this.usuarioAssociado = true;
          }
        });
      }
    });
  }
}
