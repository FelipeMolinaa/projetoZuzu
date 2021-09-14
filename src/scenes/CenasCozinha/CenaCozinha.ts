import Phaser from "phaser";
import { InterfaceHelper } from "../../Objects/interfaceHelper";
import { Barra } from "../../Objects/Barras";
import { BotaoCentral } from "../../Objects/BotaoCentral";
import { Parametros, parametrosProximaFase } from "../../GameConfig";

export class CenaCozinha extends Phaser.Scene{
    interfaceHelper: InterfaceHelper;
    tituloCena: Phaser.GameObjects.Text;
    grupoDeBarras: Barra[] = [];
    botaoCentral: BotaoCentral;
    dataFase: parametrosProximaFase;
    cenaInicio: Phaser.GameObjects.Sprite;

    constructor(){
        super({
            key: 'CenaCozinha'
        })
    }

    init(data: parametrosProximaFase){
        this.dataFase = data;
    }

    preload(){
        this.load.image('botaoCentralCozinha', './src/assets/sprites/botaoCentralCozinha.png')
        this.load.spritesheet('SpriteSheetCozinhaInicial', './src/assets/sprites/cenaCozinhaInicio.png', { frameWidth: 800, frameHeight: 420, endFrame: 102 })
        this.interfaceHelper = new InterfaceHelper(this, 'Cozinha', false);
    }

    create(){
        

        this.anims.create({
            key: 'animacaoCozinhaInicial',
            frames: this.anims.generateFrameNumbers('SpriteSheetCozinhaInicial', { start: 0, end: 102, first: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.interfaceHelper.GeraInterface();

        this.botaoCentral = new BotaoCentral(this, 280, 'botaoCentralCozinha');

        

        this.botaoCentral.onClick(()=>{
            this.scene.start('CenaJogoCozinha', this.dataFase);
        }, false)

        this.interfaceHelper.grupoDeBarras[0].setBarraTamanho(20)
        this.interfaceHelper.grupoDeBarras[1].setBarraTamanho(40)
        this.interfaceHelper.grupoDeBarras[2].setBarraTamanho(100)
        this.interfaceHelper.grupoDeBarras[3].setBarraTamanho(140)

        if(!this.dataFase.minigameCozinha){
            this.add.sprite(Parametros.tela.largura /2, 600 , 'SpriteSheetCozinhaInicial').setScale(1).play('animacaoCozinhaInicial');
        }else{
            console.log("animacao final")
            //animação final
        }
    }

    update(){

    }
}