import Phaser from "phaser"
import {config} from './GameConfig'

window.onload = () =>{
    var game = new Game(config);
}

export class Game extends Phaser.Game{
    constructor(config: Phaser.Types.Core.GameConfig){
        super(config)
    }
}
