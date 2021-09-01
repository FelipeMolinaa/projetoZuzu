import Phaser from "phaser";
import { InterfaceHelper } from "../../helpers/interfaceHelper";
import { Barra } from "../../models/Barras";
import { BotaoCentral } from "../../models/BotaoCentral";

export class CenaCozinha extends Phaser.Scene{
    interfaceHelper: InterfaceHelper;
    tituloCena: Phaser.GameObjects.Text;
    grupoDeBarras: Barra[] = [];
    botaoCentral: BotaoCentral;

    constructor(){
        super({
            key: 'CenaCozinha'
        })
    }

    preload(){
        this.load.image('botaoCentralCozinha', './src/assets/sprites/botaoCentralCozinha.png')
        this.interfaceHelper = new InterfaceHelper(this, 'Cozinha', false);
    }

    create(){
        this.interfaceHelper.GeraInterface();

        this.botaoCentral = new BotaoCentral(this, 280, 'botaoCentralCozinha');

        //animação inicial

        this.botaoCentral.onClick(()=>{
            //animação para o minigame
            this.scene.start('CenaJogoCozinha');
            //inicia minigame
        }, false)

        this.interfaceHelper.grupoDeBarras[0].setBarraTamanho(20)
        this.interfaceHelper.grupoDeBarras[1].setBarraTamanho(40)
        this.interfaceHelper.grupoDeBarras[2].setBarraTamanho(100)
        this.interfaceHelper.grupoDeBarras[3].setBarraTamanho(140)
    }

    update(){

    }
}