import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AssociadosService } from '../services/associados.service';
import { Associados } from '../models/associados';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-mais-informacao',
  templateUrl: './mais-informacao.page.html',
  styleUrls: ['./mais-informacao.page.scss'],
})
export class MaisInformacaoPage implements OnInit {

  associado:Associados = new Associados;
  constructor(private ligarAssociado:CallNumber, private alert:AlertController ,private menu:MenuController, private rotas:Router, private pegarId:ActivatedRoute, private associadosService:AssociadosService) {}

  ionViewWillEnter() {
    this.menu.enable(true);
    let idAssociado = this.pegarId.snapshot.params['id'];
    this.associadosService.buscarPorId(idAssociado).then(resultado =>{
      this.associado = resultado;
    });
  }

  async comprar() {
    this.ligarAssociado.callNumber(this.associado.telefone, true).then(res => console.log('Launched dialer!', res)).catch(err => alert('Error launching dialer ' + err));
  }

  ngOnInit() { }

}