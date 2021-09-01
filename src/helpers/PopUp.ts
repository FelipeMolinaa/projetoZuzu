import { Parametros } from "../GameConfig";
import { Barra } from "../models/Barras";

interface Ajustes{
    ajusteFundo: number,
    ajusteTitulo: number,
    ajusteTexto: number,
    ajusteBotao: number
}

export class PopUp{
    
    cena: Phaser.Scene
    botaoSair: Phaser.GameObjects.Image;
    botaoJogar: Phaser.GameObjects.Image;
    fundo: Phaser.GameObjects.Image;
    titulo: Phaser.GameObjects.Image;
    texto: Phaser.GameObjects.Text;

    constructor(cena: Phaser.Scene, pathLogo: string, ){
        this.cena = cena;

        cena.load.image('FundoPopup', `./src/assets/sprites/fundopopup.png`);
        cena.load.image('LogoJogo', `./src/assets/sprites/${pathLogo}.png`);
        cena.load.image('botaoSprite', './src/assets/sprites/botaojogar.png');
    }

    gera(textoPopUp: string, botaoSair: boolean, funcaoBotaoJogar: Function, funcaoBotaoSair: Function, ajustes: Ajustes){
        this.fundo = this.cena.add.image(0,0,'FundoPopup');
        this.fundo.setPosition((Parametros.tela.largura /2), (Parametros.tela.altura /2) + ajustes.ajusteFundo);
        
        this.titulo = this.cena.add.image(0,0,'LogoJogo');
        this.titulo.setPosition(this.fundo.x, (this.fundo.y - this.fundo.height / 2) - this.titulo.height / 2 - ajustes.ajusteTitulo);

        this.texto = this.cena.add.text(0,0, textoPopUp, {
            fontFamily: 'pocoyo-tv',
            fontSize: '40px',
            color: 'white',
            align: 'center'
        });
        this.texto.setPosition(this.fundo.x - this.texto.width /2,(this.fundo.y - this.fundo.height /2) + ajustes.ajusteTexto);

        if(botaoSair){
            this.botaoJogar = this.geraBotao(this.fundo, 'jogar',ajustes.ajusteBotao,  2.5, funcaoBotaoJogar).setTint(0x22CA47)
            this.botaoSair =this.geraBotao(this.fundo, 'sair',ajustes.ajusteBotao,  1, funcaoBotaoSair).setTint(0xFF2E2E)
        }else{
            this.botaoJogar = this.geraBotao(this.fundo, 'jogar',ajustes.ajusteBotao,  1.5, funcaoBotaoJogar).setTint(0x22CA47)
        }
    }

    private geraBotao(fundo: Phaser.GameObjects.Image, textoBotao: string, ajusteBotao: number,  multiploAjuste: number, funcao: Function){
        var botao = this.cena.add.image(0,0, 'botaoSprite');
        botao.setPosition(fundo.x, (fundo.y + fundo.height /2) - ajusteBotao * multiploAjuste);
        var texto = this.cena.add.text(0,0, textoBotao, {
            fontFamily: 'pocoyo-tv',
            fontSize: '50px'
        });
        texto.setPosition(botao.x - texto.width /2, botao.y - texto.height/2);
        botao.setInteractive();
        botao.on('pointerdown',()=>{
            botao.setScale(0.99)
        })
        botao.on('pointerup',()=>{
            botao.setScale(1)
            funcao();
        }) 

        return botao
    }

    limpaPopUp() {
        this.fundo.destroy();
        this.titulo.destroy();
        this.botaoJogar.destroy();
        if(this.botaoSair != undefined) this.botaoSair.destroy();
        this.texto.destroy();
    }
}

