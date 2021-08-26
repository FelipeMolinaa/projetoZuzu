import Phaser from "phaser";
import { InterfaceHelper } from "../../helpers/interfaceHelper";
import { Barra } from "../../models/Barras";

export class CenaCozinha extends Phaser.Scene{
    interfaceHelper: InterfaceHelper;
    tituloCena: Phaser.GameObjects.Text;
    grupoDeBarras: Barra[] = [];

    constructor(){
        super({
            key: 'CenaCozinha'
        })
    }

    preload(){
        this.load.image('fundoCozinha', './src/sprites/fundoCozinha.png')
        this.interfaceHelper = new InterfaceHelper(this, 'Cozinha', false);
    }

    create(){
        this.add.image(0,0,'fundoCozinha').setOrigin(0);
        this.interfaceHelper.GeraInterface();

        this.interfaceHelper.grupoDeBarras[0].setBarraTamanho(20)
        this.interfaceHelper.grupoDeBarras[1].setBarraTamanho(40)
        this.interfaceHelper.grupoDeBarras[2].setBarraTamanho(100)
        this.interfaceHelper.grupoDeBarras[3].setBarraTamanho(140)
    }

    update(){

    }
}