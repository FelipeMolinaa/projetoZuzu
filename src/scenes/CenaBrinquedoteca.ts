import Phaser from "phaser";

export class CenaBrinquedoteca extends Phaser.Scene{

    constructor(){
        super({
            key: 'CenaBrinquedoteca'
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