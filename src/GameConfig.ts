import Phaser from "phaser"
import { CenaQuarto } from "./scenes/CenaQuarto"
import {CenaCozinha} from './scenes/CenaCozinha'

export const Parametros = {
    tela: {
        altura: 1200,
        largura: 850,
    },
    barra:{
        paddingVertical: 20,
        barrasKey: [
            'BarraDeFome',
            'BarraDeFelicidade',
            'BarraDeVida',
            'BarraDeEnergia',
        ],
        tamanhoDaBarra: 150
    }
}

export const config: Phaser.Types.Core.GameConfig= {
    type: Phaser.AUTO,
    title: 'ProjetoZuzu',
    width: Parametros.tela.largura,
    height: Parametros.tela.altura,
    backgroundColor: '#fff',
    scene: [
        CenaQuarto, 
        CenaCozinha
    ],
    physics:{
        default: 'arcade',
        arcade:{
        }
    },
}