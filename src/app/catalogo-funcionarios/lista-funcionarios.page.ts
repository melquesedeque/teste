import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, LoadingController } from '@ionic/angular';
import { AssociadosService } from '../services/associados.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-lista-funcionarios',
  templateUrl: './lista-funcionarios.page.html',
  styleUrls: ['./lista-funcionarios.page.scss'],
})
export class ListaFuncionariosPage implements OnInit {

  foto: string = "../../assets/img/icone.jpg";
  associados: any = [];
  carregando;
  constructor(private loadingController:LoadingController, private pegarId: ActivatedRoute, private rotas: Router, private menu: MenuController, private associadoService: AssociadosService, private usuarioService: UsuarioService) { }

  ionViewWillEnter() {
    this.loading();
    this.menu.enable(true);
    this.associadoService.buscarTodoAssociados().then(resultado =>{
      this.associados = resultado;
      this.carregando.dismiss();
    }).catch(erro => alert("Olha "+erro));
  }

  async loading() {
    this.carregando = await this.loadingController.create({
      message: 'Carregando...',
    });
    this.carregando.present();
  }

  ngOnInit() { }

}
