import { Parametros } from "../GameConfig";
import { Barra } from "../models/Barras";

export class InterfaceHelper{

    cena: Phaser.Scene
    tituloCena: Phaser.GameObjects.Text;
    setaProximaFase: Phaser.GameObjects.Image;
    grupoDeBarras: Barra[] = [];
    NomeCena: string;
    Setas: boolean;

    constructor(cena: Phaser.Scene, nomeCena: string, setas: boolean = true){
        this.cena = cena;
        this.NomeCena = nomeCena;
        this.Setas = setas;

        cena.load.image('BarraDeEnergia', './src/sprites/energiaBarra.png')
        cena.load.image('BarraDeFelicidade', './src/sprites/felicidadeBarra.png')
        cena.load.image('BarraDeFome', './src/sprites/fomeBarra.png')
        cena.load.image('BarraDeVida', './src/sprites/vidaBarra.png')
        cena.load.image('Seta', './src/sprites/setaTrocaFase.png');
    }

    GeraInterface(){
        this.GeraTituloCena();
        this.GeraSetaProximaFase();
        this.GeraBarras();
    }

    GeraTituloCena() {
        this.tituloCena = this.cena.add.text(0, 0, this.NomeCena, {
            font: 'bold 64px Roboto',
            fontFamily: 'Roboto',
            align: 'center',
            stroke: '#000',
            strokeThickness: 15
        }).setOrigin(0);
    
        var xTextoCentralizado = (Parametros.tela.largura / 2) - (this.tituloCena.width / 2);
        this.tituloCena.setPosition(xTextoCentralizado, 30);

        return this.tituloCena
    }
    
    GeraSetaProximaFase() {
        if(!this.Setas) return;
        this.setaProximaFase = this.cena.add.image(0, 0, 'Seta').setOrigin(0);
        this.setaProximaFase.setPosition(Parametros.tela.largura - this.setaProximaFase.width - 30, 30)

        return this.setaProximaFase
    }
    
    GeraBarras(){
        var tamanhoDaBarra = Parametros.barra.tamanhoDaBarra;
        var barrasKey = Parametros.barra.barrasKey
        var larguraDaTela = Parametros.tela.largura
    
        var espacoEntreBarras = (larguraDaTela - (barrasKey.length * tamanhoDaBarra)) / (barrasKey.length + 1)
    
        var i = 0
        Parametros.barra.barrasKey.forEach(key => {
            i += espacoEntreBarras 
            this.grupoDeBarras.push(new Barra(this.cena, i, Parametros.barra.paddingVertical, key));
            i += tamanhoDaBarra
        });
    
        this.grupoDeBarras[0].setBarraTamanho(20)
        this.grupoDeBarras[1].setBarraTamanho(20)
        this.grupoDeBarras[2].setBarraTamanho(20)
        this.grupoDeBarras[3].setBarraTamanho(20)

        return this.grupoDeBarras
    }
}

