import Phaser from "phaser";
import { Parametros } from "../GameConfig";
import {Botao} from "../Objects/Botao"
import { PopUp } from "../Objects/PopUp";

export class CenaMenu extends Phaser.Scene{
    popUp: PopUp;
    botaoJogar: Botao;

    constructor(){
        super({
            key: 'CenaMenu'
        });
    }

    preload(){
        this.load.image('botaoSprite', './src/assets/sprites/botao.png');
        this.load.image('logoAcordaPocoyo', './src/assets/sprites/acordaPocoyoLogo.png');
        this.popUp = new PopUp(this, undefined)
    }

    create(){
        var logo = this.add.image(Parametros.tela.largura /2, 150, 'logoAcordaPocoyo');
        this.botaoJogar = new Botao(this, 0x22CA47, Parametros.tela.largura / 2, Parametros.tela.altura / 2 + 300, "jogar", ()=>{
            this.carregaPopUp();
        });
        // this.scene.start('CenaQuarto')
    }

    update(){

    }

    carregaPopUp(){
        this.botaoJogar.destroy()
        this.botaoJogar.texto.destroy();
        this.popUp.gera("selecione a\rdificuldade", 
            [
                {
                    callback: ()=>{
                        this.scene.start('CenaQuarto', { dificuldade: 2 })
                    },
                    cor: 0xFF2E2E,
                    texto: 'dificil' 
                },
                {
                    callback: ()=>{
                        this.scene.start('CenaQuarto', { dificuldade: 1 })
                    },
                    cor: 0xD1CA17,
                    texto: 'medio'
                },
                {
                    callback: ()=>{
                        this.scene.start('CenaQuarto', { dificuldade: 0 })
                    },
                    cor: 0x22CA47,
                    texto: 'facil'
                }
            ],
            {
                ajusteBotaoInicial: 170,
                espacoEntreBotoes: 25,
                ajusteFundo: -10,
                ajusteTexto: 70,
                ajusteTitulo: 1,
                tamanhoTexto: 50
            })
    }
}