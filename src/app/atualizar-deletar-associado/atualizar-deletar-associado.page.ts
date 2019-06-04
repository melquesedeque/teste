import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, LoadingController } from '@ionic/angular';
import { AssociadosService } from '../services/associados.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { Associados } from '../models/associados';
import * as firebase from 'firebase';

@Component({
  selector: 'app-atualizar-deletar-associado',
  templateUrl: './atualizar-deletar-associado.page.html',
  styleUrls: ['./atualizar-deletar-associado.page.scss'],
})
export class AtualizarDeletarAssociadoPage implements OnInit {

  foto: string = "../../assets/img/foto.png";
  associado: Associados = new Associados;
  msn;
  carregando;
  constructor(private loadingController: LoadingController, private rota: Router, private menu: MenuController, private pegarId: ActivatedRoute, private associadoService: AssociadosService, private msgAlerta: AlertController, private camera: Camera) { }

  ionViewWillEnter() {
    this.loading();
    this.menu.enable(true);
    let user = firebase.auth().currentUser;
    this.associadoService.buscarAssociadoPorEmail(user.email).then(resultado => {
      this.associado = resultado;

      if (Associados != null) {
        if (this.associado.telefone.length >= 11) {
          this.associado.telefone = this.associado.telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        }
      }
      this.carregando.dismiss();
    });
  }

  async loading() {
    this.carregando = await this.loadingController.create({
      message: 'Carregando...',
    });
    this.carregando.present();
  }

  ngOnInit() {
  }

  editar() {
    try {
      if (this.associado.contaAtiva == true) {
        if (this.associado.numeroCartao.length == 19 && this.associado.codigoCartao.length == 3) {
          this.associado.imagem = this.foto;
          this.associadoService.editar(this.associado);
          this.msn = "";
          alert("Anuncio Atualizado com Sucesso!");
        } else {
          this.msn = "Preencha a os campos 'Numero do Cartão' e o 'Código' Devidamente!";
        }
      } else {
        this.associado.imagem = this.foto;
        this.associadoService.editar(this.associado);
        this.msn = "";
        alert("Anuncio Atualizado com Sucesso!");
      }
    } catch (error) {
      alert('Erro é ' + error);
    }
  }

  async editarAssociado() {
    const alert = await this.msgAlerta.create({
      header: 'Atenção!',
      message: 'Deseja Editar este Associado?',
      buttons: [{ text: 'Cancelar' }, {
        text: 'Editar', handler: () => {
          this.editar();
        }
      }]
    });
    await alert.present();
  }

  tiraFoto() {
    const options: CameraOptions = {
      cameraDirection: this.camera.Direction.FRONT,
      allowEdit: true,
      quality: 100,
      saveToPhotoAlbum: false,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.foto = base64Image;
    }, (erro) => {
      alert("Erro é " + erro);
    });
  }

}
