import { Parametros } from "./GameConfig";
import { Barra } from "./models/Barras";

export class InterfaceGerador{

    cena: Phaser.Scene
    tituloCena: Phaser.GameObjects.Text;
    setaProximaFase: Phaser.GameObjects.Image;
    grupoDeBarras: Barra[] = [];

    constructor(cena: Phaser.Scene){
        this.cena = cena
    }

    GeraTituloCena() {
        this.tituloCena = this.cena.add.text(0, 0, 'Quarto', {
            font: 'bold 64px Roboto',
            align: 'center',
            stroke: '#000',
            strokeThickness: 15
        }).setOrigin(0);
    
        var xTextoCentralizado = (Parametros.tela.largura / 2) - (this.tituloCena.width / 2);
        this.tituloCena.setPosition(xTextoCentralizado, 30);

        return this.tituloCena
    }
    
    GeraSetaProximaFase() {
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

