import Phaser from "phaser"
import { CenaQuarto } from "./scenes/CenaQuarto"
import {CenaCozinha} from './scenes/CenasCozinha/CenaCozinha'
import {CenaJogoCozinha} from './scenes/CenasCozinha/CenaJogoCozinha'
import {CenaMenu} from './scenes/CenaMenu'

export const Parametros = {
    tela: {
        altura: 1200,
        largura: 800,
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
    },
    botaoCentral:{
        tamanho: 150
    }
}

export const config: Phaser.Types.Core.GameConfig= {
    type: Phaser.AUTO,
    title: 'AcordaPocoyo',
    width: Parametros.tela.largura,
    height: Parametros.tela.altura,
    backgroundColor: '#fff',
    scale:{
        parent: 'jogo',
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        width: 800,
        height: 1200,
    },
    scene: [
        CenaJogoCozinha,
        CenaCozinha,
        CenaMenu,
        CenaQuarto,
    ],

    physics:{
        default: 'arcade',
        arcade:{
        }
    },
}

export interface parametrosProximaFase{
    dificuldade: number,
    minigameCozinha?: boolean
}