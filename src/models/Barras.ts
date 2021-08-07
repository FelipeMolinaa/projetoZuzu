import Phaser from "phaser"
import { Parametros } from "../GameConfig";

export class Barra extends Phaser.GameObjects.Sprite{

    status: Phaser.GameObjects.Rectangle;

    constructor(scene: Phaser.Scene, x:number, y: number, texture: string){
        super(
            scene,
            x, 
            y,
            texture
        );
        scene.add.existing(this);
        this.setOrigin(0);
        this.setY(Parametros.tela.altura - this.width - Parametros.barra.paddingVertical);
        this.depth = 2;

        var preenchimentoX = this.x + 5;
        var preenchimentoY = this.y + this.width - 5;
        var preenchimentoWidth = this.width - 10;
        var preenchimentoCor = 0x33ff00;
        this.status = this.scene.add.rectangle(preenchimentoX, preenchimentoY, preenchimentoWidth, 1, preenchimentoCor).setOrigin(0);
        scene.add.existing(this.status);
    }
    /**
     * @param y: Numero entre 1 e 140
    */
    async setBarraTamanho(y: number){
        this.status.setScale(1, -y)
    }
}