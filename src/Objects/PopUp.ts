import { Parametros } from "../GameConfig";
import {Botao} from "../Objects/Botao";

interface Ajustes{
    ajusteFundo: number,
    ajusteTitulo: number,
    ajusteTexto: number,
    ajusteBotaoInicial: number,
    espacoEntreBotoes: number,
    tamanhoTexto: number
}

interface IBotao{
    cor: number,
    texto: string,
    callback: Function
}

export class PopUp{
    
    cena: Phaser.Scene
    botoes: Botao[] = [];
    fundo: Phaser.GameObjects.Image;
    titulo: Phaser.GameObjects.Image;
    texto: Phaser.GameObjects.Text;
    logo?: string;

    constructor(cena: Phaser.Scene, pathLogo?: string){
        this.cena = cena;
        this.logo = pathLogo;
        cena.load.image('FundoPopup', `./src/assets/sprites/fundopopup.png`);
        if(pathLogo != undefined) {
            cena.load.image('LogoJogo', `./src/assets/sprites/${pathLogo}.png`);
        }
        cena.load.image('botaoSprite', './src/assets/sprites/botao.png');

    }

    gera(textoPopUp: string, botoes: IBotao[], ajustes: Ajustes){
        this.fundo = this.cena.add.image(0,0,'FundoPopup');
        this.fundo.setPosition((Parametros.tela.largura /2), (Parametros.tela.altura /2) + ajustes.ajusteFundo);
        
        if(this.logo != undefined){
            this.titulo = this.cena.add.image(0,0,'LogoJogo');
            this.titulo.setPosition(this.fundo.x, (this.fundo.y - this.fundo.height / 2) - this.titulo.height / 2 - ajustes.ajusteTitulo);
        }
        
        this.texto = this.cena.add.text(0,0, textoPopUp, {
            fontFamily: 'pocoyo-tv',
            fontSize: ajustes.tamanhoTexto + "px",
            color: 'white',
            align: 'center'
        });
        this.texto.setPosition(this.fundo.x - this.texto.width /2,(this.fundo.y - this.fundo.height /2) + ajustes.ajusteTexto);

        // this.botaoJogar = new Botao(this.cena, 0x22CA47, this.fundo.x, (this.fundo.y + this.fundo.height /2) - ajustes.ajusteBotao * 2.5, 'jogar', funcaoBotaoJogar)
        // this.botaoSair = new Botao(this.cena, 0xFF2E2E, this.fundo.x, (this.fundo.y + this.fundo.height /2) - ajustes.ajusteBotao * 1, 'sair', funcaoBotaoSair)
        var memoriaEspaco = (this.fundo.y + this.fundo.height /2) - ajustes.ajusteBotaoInicial;
        botoes.forEach(botao =>{
            var novoBotao = new Botao(this.cena, botao.cor, this.fundo.x, memoriaEspaco, botao.texto, botao.callback)
            memoriaEspaco = novoBotao.y - novoBotao.height - ajustes.espacoEntreBotoes
            this.botoes.push(novoBotao)
        })
    }

    limpaPopUp() {
        this.fundo.destroy();
        this.titulo.destroy();

        this.botoes.forEach((botao)=>{
            botao.destroy();
            botao.texto.destroy();
        })

        this.texto.destroy();
    }
}

