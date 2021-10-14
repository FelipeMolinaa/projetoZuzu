import Phaser from "phaser";
import { Parametros, parametrosProximaFase } from "../GameConfig";
import { InterfaceHelper } from "../Objects/interfaceHelper";
import {Barra} from '../Objects/Barras';
import {BotaoCentral} from '../Objects/BotaoCentral'

export class CenaQuarto extends Phaser.Scene{

    grupoDeBarras: Barra[] = [];
    tituloCena: Phaser.GameObjects.Text;
    interfaceHelper: InterfaceHelper;
    SpritePocoyoQuarto: Phaser.GameObjects.Sprite;
    botaoDespertador: BotaoCentral;
    dataFase: parametrosProximaFase;

    constructor(){
        super({
            key: 'CenaQuarto'
        })
    }

    init(data: parametrosProximaFase){
        this.dataFase = data;
    }

    preload(){
        this.load.spritesheet('pocoyoQuartoSpriteSheet', './src/assets/sprites/spritesPocoyoQuarto.png', { frameWidth: 500, frameHeight: 400, endFrame: 67 })
        this.load.image('botaoDespertador', './src/assets/sprites/botaoDespertador.png')
        this.interfaceHelper = new InterfaceHelper(this, 'Quarto', false);
    }

    create(){
        this.anims.create({
            key: 'PocoyoDormindo',
            frames: this.anims.generateFrameNumbers('pocoyoQuartoSpriteSheet', { start: 0, end: 13, first: 0 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'PocoyoAcordando',
            frames: this.anims.generateFrameNumbers('pocoyoQuartoSpriteSheet', { start: 5, end: 66, first: 0 }),
            frameRate: 10,
            repeat: 0,
        });

        this.SpritePocoyoQuarto = this.add.sprite(50, 180, 'pocoyoQuartoSpriteSheet').setScale(1.5).play('PocoyoDormindo').setOrigin(0);

        this.botaoDespertador = new BotaoCentral(this, 280, 'botaoDespertador')
        this.botaoDespertador.onClick(() => {
            this.SpritePocoyoQuarto.play('PocoyoAcordando')
        });

        this.SpritePocoyoQuarto.on('animationcomplete', () =>{
            var animacaoAtual = this.SpritePocoyoQuarto.anims.currentAnim.key
            console.log(animacaoAtual)
            if(animacaoAtual == 'PocoyoAcordando'){
                this.scene.start('CenaCozinha', this.dataFase)
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