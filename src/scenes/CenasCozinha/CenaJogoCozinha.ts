import Phaser from "phaser";
import { Parametros, parametrosProximaFase } from "../../GameConfig";
import {PopUp} from '../../Objects/PopUp'

export class CenaJogoCozinha extends Phaser.Scene{
    scaleCesta = 0.9
    velocidadeCesto = 400;
    tempoSurgimentoFruta = 2000;
    velocidadeFruta = 300;
    pontos = 0;
    jogoPausado = true;
    tempoDefault = 60;
    
    coracoes: Phaser.GameObjects.Group;
    frutas: Phaser.Physics.Arcade.Group;
    cesto: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    cestoSFundo: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    coletorDeFrutas: Phaser.GameObjects.Rectangle;
    pontuacaoTexto: Phaser.GameObjects.Text;
    tempo: number;
    tempoTexto: Phaser.GameObjects.Text;
    popUp: PopUp;
    emitter: Phaser.Events.EventEmitter;
    incrementaTempo: Phaser.Time.TimerEvent;
    geraFrutas: Phaser.Time.TimerEvent;
    dataFase: parametrosProximaFase;

    setDificuldade(tempoSurgimentoFruta: number, velocidadeFruta: number){
        this.tempoSurgimentoFruta = tempoSurgimentoFruta;
        this.velocidadeFruta = velocidadeFruta;
    }

    dificuldades = [
        {
            velocidadeFruta: 300,
            tempoSurgimentoFruta: 2000,
        },
        {
            velocidadeFruta: 300,
            tempoSurgimentoFruta: 1500,
        },
        {
            velocidadeFruta: 400,
            tempoSurgimentoFruta: 850,
        }
    ]

    constructor(){
        super({
            key: 'CenaJogoCozinha'
        })
    }

    init(data: parametrosProximaFase){
        this.dataFase = data;
        this.dataFase.minigameCozinha = true;
        var dificuldade
        if(this.dataFase.dificuldade != null){
            dificuldade = this.dificuldades[this.dataFase.dificuldade]
        }else{
            dificuldade = this.dificuldades[1]
        }
        this.setDificuldade(dificuldade.tempoSurgimentoFruta, dificuldade.velocidadeFruta)
        
    }

    preload(){
        this.load.image('cesto', './src/assets/sprites/Cesto.png')
        this.load.image('cestoSFundo', './src/assets/sprites/CestoSFundo.png')
        this.load.image('fruta', './src/assets/sprites/Fruta.png')
        this.load.image('fundoJogo', './src/assets/sprites/fundoJogoFrutas.png')
        this.load.image('coracao', './src/assets/sprites/coracao.png')
        this.popUp = new PopUp(this, 'pegafrutaslogo');
    }

    create(){
        this.emitter = new Phaser.Events.EventEmitter();
        this.add.image(0,300,'fundoJogo').setOrigin(0);
        this.criaPopupInicio();
        var textoTempo: any;
        this.emitter.on('JogoDespausado', ()=>{
            this.tempo = this.tempoDefault;
            this.pontos = 0;
            this.jogoPausado = false;
            this.popUp.limpaPopUp();
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
    
            textoTempo = this.add.text(Parametros.tela.largura - 280, 0, 'tempo:', {
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
            this.criaPopupFim();
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
            textoTempo.destroy();
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

    criaPopupInicio() {
        this.popUp.gera('com a sua cesta,\rpegue o maximo de frutas\rque o pato derrubar', 
            [
                {
                    callback: ()=>{
                        this.emitter.emit('JogoDespausado')
                    },
                    cor: 0x22CA47,
                    texto: 'jogar'
                },
            ],
            {
                ajusteBotaoInicial: 200,
                espacoEntreBotoes: 10,
                ajusteFundo: 70,
                ajusteTexto: 50,
                ajusteTitulo: 1,
                tamanhoTexto: 40
            })
    }

    criaPopupFim() {
        this.popUp.gera(`parabens!!\rseus pontos: ${this.pontos}`, 
            [
                {
                    callback: ()=>{
                        this.scene.start('CenaCozinha', this.dataFase)
                    },
                    cor: 0xFF2E2E,
                    texto: 'sair' 
                },
                {
                    callback: ()=>{
                        this.emitter.emit('JogoDespausado')
                    },
                    cor: 0x22CA47,
                    texto: 'jogar'
                }
            ],
            {
                tamanhoTexto: 60,
                ajusteBotaoInicial: 150,
                espacoEntreBotoes: 30,
                ajusteFundo: 70,
                ajusteTexto: 60,
                ajusteTitulo: 1
            })
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
        var fruta = this.frutas.create(Xfruta, -40, 'fruta').setScale(0.3).setVelocityY(this.velocidadeFruta)
        var rotacao = Phaser.Math.Between(-50, 50);
        fruta.setAngularAcceleration(rotacao)
        fruta.depth = 2
    }

    coletaFruta(coletorDeFrutas: any, fruta: any) {
        fruta.disableBody(true, true);
        this.pontos += 10;
        this.pontuacaoTexto.setText('pontos: ' + this.pontos);
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