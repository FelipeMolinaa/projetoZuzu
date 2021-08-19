import Phaser from "phaser";

export class cenaQuarto extends Phaser.Scene{

    constructor(){
        super({
            key: 'Quarto'
        })
    }

    preload(){
        this.load.image('fundoBrinquedoteca', './src/sprites/fundoBrinquedoteca.png')
    }

    create(){
        this.add.image(0,0,'fundoQuarto').setOrigin(0);
        this.scene.start('Main')
    }

    update(){

    }
}