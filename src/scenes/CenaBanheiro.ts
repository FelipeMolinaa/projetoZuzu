import Phaser from "phaser";

export class cenaQuarto extends Phaser.Scene{

    constructor(){
        super({
            key: 'Quarto'
        })
    }

    preload(){
        this.load.image('fundoBanheiro', './src/sprites/fundoBanheiro.png')
    }

    create(){
        this.add.image(0,0,'fundoBanheiro').setOrigin(0);
        this.scene.start('Main')
    }

    update(){

    }
}