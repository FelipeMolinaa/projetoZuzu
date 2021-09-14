import Phaser from "phaser";

export class Botao extends Phaser.GameObjects.Sprite{
    
    texto: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, cor: number, x: number, y: number, textoBotao: string, callback: Function){
        super(
            scene,
            x,
            y,
            'botaoSprite'
        )

        // botao.setPosition(fundo.x, (fundo.y + fundo.height /2) - ajusteBotao * multiploAjuste);
        this.texto = scene.add.text(0,0, textoBotao, {
            fontFamily: 'pocoyo-tv',
            fontSize: '50px',
        });

        this.texto.setPosition(this.x - this.texto.width /2, this.y - this.texto.height/2);
        this.texto.depth = 1
        this.setInteractive()
        this.on('pointerdown',()=>{
            this.setScale(0.99)
            this.texto.setScale(0.99)
        })
        this.on('pointerup',()=>{
            this.setScale(1)
            this.texto.setScale(1)
            callback();
        }) 

        this.setTint(cor)

        scene.add.existing(this.texto)
        scene.add.existing(this)
    }
}