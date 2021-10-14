import Phaser from "phaser";
import { Parametros } from "../GameConfig";
import {Botao} from "../Objects/Botao"
import { PopUp } from "../Objects/PopUp";

export class CenaMenu extends Phaser.Scene{
    PopUpDificuldade: PopUp;
    botaoJogar: Botao;
    PopUpExplicacao: PopUp;

    constructor(){
        super({
            key: 'CenaMenu'
        });
    }

    preload(){
        this.load.image('botaoSprite', './src/assets/sprites/botao.png');
        this.load.image('imagemMenu', './src/assets/sprites/imagemMenu.jpg');
        this.load.image('logoAcordaPocoyo', './src/assets/sprites/acordaPocoyoLogo.png');
        this.PopUpDificuldade = new PopUp(this, undefined)
        this.PopUpExplicacao = new PopUp(this, 'tutorial')
    }

    create(){
        var logo = this.add.image(Parametros.tela.largura /2, 150, 'logoAcordaPocoyo');

        var imagemmenu = this.add.image(Parametros.tela.largura /2, 540, 'imagemMenu').setScale(1.5);
        this.botaoJogar = new Botao(this, 0x22CA47, Parametros.tela.largura / 2, Parametros.tela.altura - 200, "jogar", ()=>{
            this.CarregaPopUpApresentacao();

        });
    }

    update(){

    }

    CarregaPopUpApresentacao() {
        this.botaoJogar.destroy()
        this.botaoJogar.texto.destroy();

        this.PopUpExplicacao.gera(`preencha as barras de status\rdo pocoyo passando as fazes\re jogando minigames`, [
            {
                callback: ()=>{
                    this.CarregaPopUpDificuldade();
                    this.PopUpExplicacao.limpaPopUp();
                },
                cor: 0x22CA47,
                texto: 'entendi!' 
            },
        ], 
        {
            ajusteBotaoInicial: 100,
            espacoEntreBotoes: 25,
            ajusteFundo: -10,
            ajusteTexto: 40,
            ajusteTitulo: -670,
            tamanhoTexto: 32
        })
    }

    CarregaPopUpDificuldade(){
        
        this.PopUpDificuldade.gera("selecione a\rdificuldade", 
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