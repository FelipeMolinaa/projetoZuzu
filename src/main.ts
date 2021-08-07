import Phaser from "phaser";
import { InterfaceGerador } from "./interfaceGerador";
import {Barra} from './models/Barras'

export class Main extends Phaser.Scene{

    grupoDeBarras: Barra[] = []
    tituloCena: Phaser.GameObjects.Text;
    setaProximaFase: Phaser.GameObjects.Image;

    constructor(){
        super({
            key: 'Main'
        })
    }

    preload(){
        this.load.image('BarraDeEnergia', './src/sprites/energiaBarra.png')
        this.load.image('BarraDeFelicidade', './src/sprites/felicidadeBarra.png')
        this.load.image('BarraDeFome', './src/sprites/fomeBarra.png')
        this.load.image('BarraDeVida', './src/sprites/vidaBarra.png')
        this.load.image('Seta', './src/sprites/setaTrocaFase.png')
    }

    create(){
        var interfaceGerador = new InterfaceGerador(this);
        this.setaProximaFase = interfaceGerador.GeraSetaProximaFase();
        this.tituloCena = interfaceGerador.GeraTituloCena();
        this.grupoDeBarras = interfaceGerador.GeraBarras();

        
    }

    

    update(){

    }

    


}