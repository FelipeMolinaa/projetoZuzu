import Phaser from "phaser";
import { Parametros } from "../GameConfig";
import { InterfaceHelper } from "../helpers/interfaceHelper";
import {Barra} from '../models/Barras'

export class CenaQuarto extends Phaser.Scene{

    grupoDeBarras: Barra[] = [];
    tituloCena: Phaser.GameObjects.Text;
    interfaceHelper: InterfaceHelper;
    SpritePocoyoQuarto: Phaser.GameObjects.Sprite;
    botaoDespertador: Phaser.GameObjects.Image;

    constructor(){
        super({
            key: 'CenaQuarto'
        })
    }

    preload(){
        this.load.spritesheet('pocoyoQuartoSpriteSheet', './src/sprites/spritesPocoyoQuarto.png', { frameWidth: 750, frameHeight: 600, endFrame: 69 })
        this.load.image('fundoQuarto', './src/sprites/fundoQuarto.png');
        this.load.image('botaoDespertador', './src/sprites/botaoDespertador.png')
        this.interfaceHelper = new InterfaceHelper(this, 'Quarto', false);
    }

    create(){
        this.anims.create({
            key: 'PocoyoDormindo',
            frames: this.anims.generateFrameNumbers('pocoyoQuartoSpriteSheet', { start: 0, end: 20, first: 0 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'PocoyoAcordando',
            frames: this.anims.generateFrameNumbers('pocoyoQuartoSpriteSheet', { start: 25, end: 69, first: 0 }),
            frameRate: 10,
            repeat: 0,
        });

        this.SpritePocoyoQuarto = this.add.sprite(40, 150, 'pocoyoQuartoSpriteSheet').setScale(1).play('PocoyoDormindo').setOrigin(0);

        this.botaoDespertador = this.add.sprite((Parametros.tela.largura /2) - 100, Parametros.tela.altura - 380, 'botaoDespertador').setOrigin(0);
        this.botaoDespertador.setInteractive();
        this.botaoDespertador.on('pointerdown', ()=>{
            this.botaoDespertador.setScale(0.99)
            this.SpritePocoyoQuarto.play('PocoyoAcordando')
        })
        this.botaoDespertador.on('pointerup', ()=>{
            this.botaoDespertador.setScale(1)
        })

        this.SpritePocoyoQuarto.on('animationcomplete', () =>{
            var animacaoAtual = this.SpritePocoyoQuarto.anims.currentAnim.key
            if(animacaoAtual == 'PocoyoAcordando'){
                this.scene.start('CenaCozinha')
            }
        })

        this.interfaceHelper.GeraInterface();

        this.interfaceHelper.grupoDeBarras[0].setBarraTamanho(20)
        this.interfaceHelper.grupoDeBarras[1].setBarraTamanho(40)
        this.interfaceHelper.grupoDeBarras[2].setBarraTamanho(100)
        this.interfaceHelper.grupoDeBarras[3].setBarraTamanho(140)
    }

    update(){
        
        
        
    }

    


}