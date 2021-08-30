import Phaser from "phaser"
import { Parametros } from "../GameConfig";

export class BotaoCentral extends Phaser.GameObjects.Sprite{

    status: Phaser.GameObjects.Rectangle;
    clicavel = true;

    constructor(scene: Phaser.Scene, y: number, texture: string){
        super(
            scene,
            0, 
            y,
            texture
        );
        scene.add.existing(this);
        this.setOrigin(0);
        this.setY((Parametros.tela.altura - y) - Parametros.botaoCentral.tamanho / 2);
        this.setX((Parametros.tela.largura / 2) - Parametros.botaoCentral.tamanho / 2);
        this.setInteractive();
    }

    public onClick(action: Function, oneTimeClick = true){
        this.on('pointerdown', ()=>{
            if(this.clicavel){
                this.setScale(0.99)
                action();
            }
        })

        this.on('pointerup', ()=>{
            this.setScale(1)
            if(oneTimeClick) this.clicavel = false
        })
    }
}