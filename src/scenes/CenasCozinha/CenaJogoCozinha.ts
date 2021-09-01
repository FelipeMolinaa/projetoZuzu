import Phaser from "phaser";
import { Parametros } from "../../GameConfig";
import {PopUp} from '../../helpers/PopUp'

export class CenaJogoCozinha extends Phaser.Scene{
    scaleCesta = 0.9
    velocidadeCesto = 300;
    tempoSurgimentoFruta = 2000;
    pontos = 0;
    jogoPausado = true;
    tempoDefault = 10;
    
    frutas: Phaser.Physics.Arcade.Group;
    cesto: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    cestoSFundo: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    coletorDeFrutas: Phaser.GameObjects.Rectangle;
    pontuacaoTexto: Phaser.GameObjects.Text;
    tempo: number;
    tempoTexto: Phaser.GameObjects.Text;
    popUpInicio: PopUp;
    popUpFim: PopUp;
    emitter: Phaser.Events.EventEmitter;
    incrementaTempo: Phaser.Time.TimerEvent;
    geraFrutas: Phaser.Time.TimerEvent;

    constructor(){
        super({
            key: 'CenaJogoCozinha'
        })
    }

    preload(){
        this.load.image('cesto', './src/assets/sprites/Cesto.png')
        this.load.image('cestoSFundo', './src/assets/sprites/CestoSFundo.png')
        this.load.image('fruta', './src/assets/sprites/Fruta.png')
        this.load.image('fundoJogo', './src/assets/sprites/fundoJogoFrutas.png')
        this.popUpInicio = new PopUp(this, 'pegafrutaslogo');
    }

    create(){
        this.emitter = new Phaser.Events.EventEmitter();
        this.add.image(0,300,'fundoJogo').setOrigin(0);
        this.criaPopup(false, 'pegue o maximo de frutas\rque o pato derrubar com\ra sua cesta');
        
        this.emitter.on('JogoDespausado', ()=>{
            this.tempo = this.tempoDefault
            this.pontos = 0
            this.jogoPausado = false;
            this.popUpInicio.limpaPopUp();
            this.cesto = this.physics.add.sprite(100, Parametros.tela.altura - 200, 'cesto').setOrigin(0).setScale(this.scaleCesta).setCollideWorldBounds(true);
            this.cestoSFundo = this.physics.add.sprite(this.cesto.x, this.cesto.y, 'cestoSFundo').setOrigin(0).setScale(this.scaleCesta).setCollideWorldBounds(true);
            this.coletorDeFrutas = this.add.rectangle(this.cesto.x + 20, this.cesto.y + 50, this.cesto.width - 60, 1).setOrigin(0)
            this.physics.add.existing(this.coletorDeFrutas)

            //@ts-ignore
            this.coletorDeFrutas.body.collideWorldBounds = true
            this.frutas = this.physics.add.group()
    
            var deletadorDeFrutas = this.physics.add.existing(
                this.add.rectangle(0, Parametros.tela.altura + 100, Parametros.tela.largura, 10).setOrigin(0)
            )
    
            this.pontuacaoTexto = this.add.text(10, 0, 'pontos: 0', {
                fontFamily: 'pocoyo-tv',
                fontSize: '50px',
                color: 'black'
            }).setOrigin(0)
    
            this.add.text(Parametros.tela.largura - 280, 0, 'tempo:', {
                fontFamily: 'pocoyo-tv',
                fontSize: '50px',
                color: 'black'
            }).setOrigin(0)
    
            this.tempoTexto = this.add.text(Parametros.tela.largura - 90, 0, this.tempo.toString(), {
                fontFamily: 'pocoyo-tv',
                fontSize: '50px',
                color: 'black'
            }).setOrigin(0)
    
            this.physics.add.overlap(deletadorDeFrutas, this.frutas, this.deletaFruta, undefined, this)
            this.physics.add.overlap(this.coletorDeFrutas, this.frutas, this.coletaFruta, undefined, this)
    
            this.cesto.depth = 1
            this.cestoSFundo.depth = 3
    
            this.geraFrutas = this.time.addEvent({
                callback: this.criaFruta,
                callbackScope: this,
                delay: this.tempoSurgimentoFruta,
                loop: true
            })
    
            this.incrementaTempo = this.time.addEvent({
                callback: this.decrementaTempo,
                callbackScope: this,
                delay: 1000,
                loop: true
            })
        })

        this.emitter.on('JogoPausado', ()=>{
            this.jogoPausado = true;
            this.criaPopup(true, `parabens!!\rseus pontos: ${this.pontos}`);
            this.cesto.destroy();
            this.cestoSFundo.destroy();
            this.frutas.getChildren().forEach((fruta)=>{
                var Fruta: any = fruta
                Fruta.disableBody(true, true)
            })
            this.pontuacaoTexto.destroy();
            this.coletorDeFrutas.destroy();
            this.tempoTexto.destroy();
            this.geraFrutas.destroy();
            this.incrementaTempo.destroy();
        })
    }

    async update(){
        var keyboard = this.input.keyboard
        if(!this.jogoPausado){
            keyboard.on('keydown-A', ()=>{
                this.moveCesto(-this.velocidadeCesto)
            })
            keyboard.on('keydown-D', ()=>{
                this.moveCesto(this.velocidadeCesto)
            })
            keyboard.on('keyup-A', ()=>{
                this.moveCesto(0)
            })
            keyboard.on('keyup-D', ()=>{
                this.moveCesto(0)
            })
        }
    }

    criaPopup(botaoSair: boolean, textoPopUp: string) {
        this.popUpInicio.gera(textoPopUp, botaoSair, ()=>{
            this.emitter.emit('JogoDespausado')
        }, ()=>{
            this.scene.start('CenaCozinha')
        }, {
            ajusteBotao: 100,
            ajusteFundo: 70,
            ajusteTexto: 30,
            ajusteTitulo: 1
        });
    }

    moveCesto(x: number){
        this.cesto.setVelocityX(x)
        this.cestoSFundo.setVelocityX(x)
        this.coletorDeFrutas.body.velocity.x = x
    }

    deletaFruta(deletador: any, fruta: any) {
        fruta.disableBody(true, true)
    }

    criaFruta() {
        var Xfruta = Phaser.Math.Between(100, Parametros.tela.largura - 100);
        var fruta = this.frutas.create(Xfruta, -40, 'fruta').setScale(0.3).setVelocityY(300)
        var rotacao = Phaser.Math.Between(-50, 50);
        fruta.setAngularAcceleration(rotacao)
        fruta.depth = 2
    }

    coletaFruta(coletorDeFrutas: any, fruta: any) {
        fruta.disableBody(true, true)
        this.pontos += 10;
        this.pontuacaoTexto.setText('pontos: ' + this.pontos)
    }

    decrementaTempo(){
        this.tempo --;
        this.tempoTexto.setText(this.tempo.toString()) 
        if(this.tempo < 20){
            this.tempoTexto.setColor('red')
        }

        if(this.tempo == 0){
            this.emitter.emit('JogoPausado')
        }
    }
    
}