import Phaser from "phaser"
import { Parametros } from "../GameConfig";

export class Barras extends Phaser.GameObjects.Sprite{

    constructor(scene: Phaser.Scene, texture: string){
        super(
            scene,
            0, 
            0,
            texture
        )
        this.setOrigin(0);
        scene.add.existing(this);
    }

    preencheBarra(y: number){
        this.scene.add.rectangle(this.x, this.y + this.height, 10, 10)
    }
}