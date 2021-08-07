import Phaser from "phaser"
import { Main } from "./main"

export const Parametros = {
    tela: {
        altura: 1200,
        largura: 850,
    },
    barra:{
        paddingVertical: 20,
        barrasKey: [
            'BarraDeEnergia',
            'BarraDeFelicidade',
            'BarraDeFome',
            'BarraDeVida',
        ],
        tamanhoDaBarra: 150
    }
}

export const config: Phaser.Types.Core.GameConfig= {
    type: Phaser.AUTO,
    title: 'ProjetoZuzu',
    backgroundColor: '#ff000f',
    width: Parametros.tela.largura,
    height: Parametros.tela.altura,
    scene: [Main],
    physics:{
        default: 'arcade',
        arcade:{
        }
    },
}