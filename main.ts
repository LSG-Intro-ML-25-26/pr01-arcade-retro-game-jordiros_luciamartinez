namespace SpriteKind {
    export const Decorativo = SpriteKind.create()
    export const Map = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const indicador = SpriteKind.create()
    export const Key = SpriteKind.create()
    export const Heart = SpriteKind.create()
}
function Boss2 () {
    if (prota.x + 30 < arana.x) {
        arana.vx = -20
        arana.setImage(assets.image`faraon_izquierda`)
    } else if (prota.x - 30 > arana.x) {
        arana.vx = 20
        arana.setImage(assets.image`faraon_derecha`)
    } else {
        arana.vx = 0
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    prota.setPosition(spawn_x, spawn_y)
    info.changeLifeBy(-1)
})
function MostrarFlecha () {
    if (!(jugador_en_puerta)) {
        if (nivel <= 10) {
            flecha_puerta_nivel = sprites.create(assets.image`flecha_nivel1`, SpriteKind.indicador)
            animation.runImageAnimation(
            flecha_puerta_nivel,
            assets.animation`animacion_flecha_nivel1`,
            150,
            true
            )
            tiles.placeOnRandomTile(flecha_puerta_nivel, assets.tile`ubi_felcha_nivel1`)
        } else if (nivel > 10 && nivel <= 20) {
            flecha_puerta_nivel = sprites.create(assets.image`flecha_nivel2`, SpriteKind.indicador)
            animation.runImageAnimation(
            flecha_puerta_nivel,
            assets.animation`animacion_flecha_nivel2`,
            150,
            true
            )
            tiles.placeOnRandomTile(flecha_puerta_nivel, assets.tile`ubi_flecha_nivel2`)
        } else if (nivel > 20 && nivel <= 30) {
            flecha_puerta_nivel = sprites.create(assets.image`flecha_nivel3`, SpriteKind.indicador)
            animation.runImageAnimation(
            flecha_puerta_nivel,
            assets.animation`animacion_flecha_nivel3`,
            150,
            true
            )
            tiles.placeOnRandomTile(flecha_puerta_nivel, assets.tile`ubi_flecha_nivel3`)
        }
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (partida) {
        if (characterAnimations.matchesRule(prota, characterAnimations.rule(Predicate.FacingRight))) {
            AtaqueDerecha()
        } else if (characterAnimations.matchesRule(prota, characterAnimations.rule(Predicate.FacingLeft))) {
            AtaqueIzquierda()
        }
        ataque_prota2 += 1
        pause(100)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`puerta_4_nivel_2`, function (sprite3, location3) {
    NextLevel()
})
function CreacionPersonaje () {
    prota = sprites.create(assets.image`player`, SpriteKind.Player)
    info.setLife(3)
    characterAnimations.setCharacterState(prota, characterAnimations.rule(Predicate.FacingRight))
    controller.moveSprite(prota, 100, 0)
    scene.cameraFollowSprite(prota)
    prota.ay = 200
    ataque_prota = 0
    ataque_prota2 = 0
}
function EnemigoNivel2 () {
    for (let valor2 of tiles.getTilesByType(assets.tile`amarillo_enemigo`)) {
        murcielago = sprites.create(assets.image`muercielago_izquierda`, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        murcielago,
        assets.animation`derecha_fantasma`,
        300,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.runFrames(
        murcielago,
        assets.animation`murcielago_animacion_izquierda`,
        300,
        characterAnimations.rule(Predicate.NotMoving)
        )
        tiles.placeOnTile(murcielago, valor2)
        tiles.setTileAt(valor2, assets.tile`pared_nivel_2`)
        murcielago.ay = 200
        murcielago.follow(prota, 30)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`puerta_4_nivel_3`, function (sprite, location) {
    NextLevel()
})
function GenerarLlave () {
    for (let valor of tiles.getTilesByType(assets.tile`myTile`)) {
        llave = sprites.create(assets.image`myImage2`, SpriteKind.Key)
        tiles.placeOnTile(llave, valor)
        if (nivel < 10) {
            tiles.setTileAt(valor, assets.tile`pared_nivel_1`)
        } else if (nivel > 10 && nivel < 20) {
            tiles.setTileAt(valor, assets.tile`pared_nivel_2`)
        } else if (nivel > 10 && nivel < 20) {
            tiles.setTileAt(valor, assets.tile`pared_nivel_3`)
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (partida) {
        SistemaDeDobleSalto()
    }
})
function GenerarMinimapa () {
    sprites.destroy(mapStripe)
    myMinimap = minimap.minimap(MinimapScale.Sixteenth, 1, 15)
    mapStripe = sprites.create(minimap.getImage(myMinimap), SpriteKind.Map)
    minimap.includeSprite(myMinimap, prota, MinimapSpriteScale.Double)
    mapStripe.setPosition(scene.cameraProperty(CameraProperty.X) + 54, scene.cameraProperty(CameraProperty.Y) - 44)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite5, otherSprite2) {
    if (sprite5.vy > 0 && sprite5.y < otherSprite2.y) {
        sprite5.vy = -70
        statusbar.value += -3
        music.play(music.createSoundEffect(WaveShape.Noise, 1259, 0, 255, 255, 100, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.UntilDone)
    } else {
        info.changeLifeBy(-1)
        music.play(music.createSong(assets.song`muerte_prota`), music.PlaybackMode.InBackground)
    }
    if (statusbar.value > 1) {
        sprite5.setPosition(otherSprite2.x - 50, sprite5.y - 10)
    }
    pause(1000)
})
function Boss3 () {
    if (prota.x + 30 < leviatan.x) {
        leviatan.vx = -20
        leviatan.setImage(assets.image`myImage0`)
    } else if (prota.x - 30 > leviatan.x) {
        leviatan.vx = 20
        leviatan.setImage(assets.image`myImage`)
    } else {
        leviatan.vx = 0
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (partida) {
        animation.runImageAnimation(
        prota,
        assets.animation`player_left_animated`,
        200,
        true
        )
        characterAnimations.setCharacterState(prota, characterAnimations.rule(Predicate.FacingLeft))
        ataque_prota2 = 0
    }
})
function EnemigoNivel3 () {
    for (let valor3 of tiles.getTilesByType(assets.tile`amarillo_enemigo`)) {
        tiburon = sprites.create(assets.image`caracol_izquierda`, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        tiburon,
        assets.animation`pez_animacion_derecha`,
        300,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        tiburon,
        assets.animation`pez_animacion_izquierda`,
        300,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        tiles.placeOnTile(tiburon, valor3)
        tiles.setTileAt(valor3, assets.tile`pared_nivel_3`)
        tiburon.ay = 200
        tiburon.follow(prota, 30)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Heart, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(1)
})
function ShowFinal () {
    tiles.setCurrentTilemap(tilemap`tilemap_vacio`)
    if (win) {
        scene.setBackgroundImage(assets.image`fondo_ganador`)
    } else {
        scene.setBackgroundImage(assets.image`fondo_perdedor`)
    }
    if (controller.A.isPressed()) {
        menu = true
        final = false
        music.play(music.createSong(assets.song`background_song`), music.PlaybackMode.LoopingInBackground)
        pause(1000)
    }
}
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    if (partida) {
        animation.runImageAnimation(
        prota,
        assets.animation`player_right_animated`,
        200,
        false
        )
    }
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    if (partida) {
        animation.runImageAnimation(
        prota,
        assets.animation`player_left_animated`,
        200,
        false
        )
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Key, function (sprite, otherSprite) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Key)
    nivel_superado = true
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    if (nivel == 10) {
        boss_actual = serpiente
    } else if (nivel == 20) {
        boss_actual = arana
    } else if (nivel == 30) {
        boss_actual = leviatan
    }
    music.play(music.createSong(assets.song`ashes`), music.PlaybackMode.InBackground)
    sprites.destroy(boss_actual, effects.disintegrate, 500)
    sprites.destroy(statusbar)
    info.setLife(5)
    nivel_superado = true
    boss_vivo = false
})
function GenerarNivel () {
    jugador_en_puerta = false
    nivel_superado = false
    boss_vivo = true
    sprites.destroyAllSpritesOfKind(SpriteKind.Boss)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.indicador)
    if (nivel == 1) {
        scene.setBackgroundImage(assets.image`fondo_nivel_1`)
        tiles.setCurrentTilemap(tilemap`nivel5`)
        GenerarLlave()
        prota.setPosition(380, 460)
        spawn_x = 380
        spawn_y = 460
    } else if (nivel == 2) {
        tiles.setCurrentTilemap(tilemap`nivel0`)
        GenerarLlave()
        prota.setPosition(380, 460)
        spawn_x = 380
        spawn_y = 460
    } else if (nivel == 10) {
        tiles.setCurrentTilemap(tilemap`nivel0`)
        GenerarLlave()
        prota.setPosition(380, 460)
        spawn_x = 380
        spawn_y = 460
    } else if (nivel == 20) {
        tiles.setCurrentTilemap(tilemap`nivel0`)
        GenerarLlave()
        prota.setPosition(380, 460)
        spawn_x = 380
        spawn_y = 460
    } else if (nivel == 30) {
        tiles.setCurrentTilemap(tilemap`nivel0`)
        GenerarLlave()
        prota.setPosition(380, 460)
        spawn_x = 380
        spawn_y = 460
    } else if (false) {
        tiles.setCurrentTilemap(tilemap`nivel0`)
        GenerarLlave()
        prota.setPosition(380, 460)
        spawn_x = 380
        spawn_y = 460
    } else if (false) {
        tiles.setCurrentTilemap(tilemap`nivel0`)
        GenerarLlave()
        prota.setPosition(380, 460)
        spawn_x = 380
        spawn_y = 460
    } else if (false) {
        tiles.setCurrentTilemap(tilemap`nivel0`)
        GenerarLlave()
        prota.setPosition(380, 460)
        spawn_x = 380
        spawn_y = 460
    } else if (false) {
        tiles.setCurrentTilemap(tilemap`nivel0`)
        GenerarLlave()
        prota.setPosition(380, 460)
        spawn_x = 380
        spawn_y = 460
    } else if (false) {
        tiles.setCurrentTilemap(tilemap`nivel0`)
        GenerarLlave()
        prota.setPosition(380, 460)
        spawn_x = 380
        spawn_y = 460
    } else if (false) {
        tiles.setCurrentTilemap(tilemap`nivel10`)
        BossNivel()
        prota.setPosition(40, 460)
        spawn_x = 40
        spawn_y = 460
    } else if (false) {
        scene.setBackgroundImage(assets.image`fondo_nivel_2`)
        tiles.setCurrentTilemap(tilemap`nivel20`)
        prota.setPosition(40, 20)
        spawn_x = 40
        spawn_y = 40
    } else if (false) {
        scene.setBackgroundImage(assets.image`fondo_nivel_3`)
        tiles.setCurrentTilemap(tilemap`nivel30`)
        prota.setPosition(40, 460)
        spawn_x = 40
        spawn_y = 40
    }
    GenerarCorazones()
    CrearEnemigos()
}
function Boss1 () {
    if (prota.x + 30 < serpiente.x) {
        serpiente.vx = -20
        serpiente.setImage(assets.image`leviatan_izquierda`)
    } else if (prota.x - 30 > serpiente.x) {
        serpiente.vx = 20
        serpiente.setImage(assets.image`leviatan_derecha`)
    } else {
        serpiente.vx = 0
    }
}
function SistemaDeDobleSalto () {
    if (prota.isHittingTile(CollisionDirection.Bottom)) {
        prota.setVelocity(0, -125)
        salto = true
        music.play(music.createSong(hex`
                            00f4010408020105001c000f0a006400f4010a00000400000000000000000000000000000000020c0000000400012704000800012a
                            `), music.PlaybackMode.InBackground)
    } else if (salto == true) {
        prota.setVelocity(0, -125)
        salto = false
        music.play(music.createSong(hex`
                            00f4010408020105001c000f0a006400f4010a00000400000000000000000000000000000000020c0000000400012704000800012a
                            `), music.PlaybackMode.InBackground)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (partida) {
        animation.runImageAnimation(
        prota,
        assets.animation`player_right_animated`,
        200,
        true
        )
        characterAnimations.setCharacterState(prota, characterAnimations.rule(Predicate.FacingRight))
        ataque_prota2 = 0
    }
})
function AtaqueIzquierda () {
    animation.runImageAnimation(
    prota,
    assets.animation`atacar_izquierda`,
    100,
    false
    )
    music.play(music.createSoundEffect(WaveShape.Noise, 1364, 1, 255, 255, 100, SoundExpressionEffect.Vibrato, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
    if (controller.left.isPressed()) {
        pause(100)
        animation.runImageAnimation(
        prota,
        assets.animation`player_left_animated`,
        200,
        true
        )
    }
}
function NextLevel () {
    if (nivel_superado) {
        MostrarFlecha()
        jugador_en_puerta = true
        pause(10)
        if (controller.up.isPressed()) {
            if (nivel == 30) {
                win = true
                EndGame()
            } else {
                music.play(music.createSoundEffect(WaveShape.Noise, 1, 452, 255, 255, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
                nivel += 1
                GenerarNivel()
            }
        }
    }
}
function AtaqueDerecha () {
    animation.runImageAnimation(
    prota,
    assets.animation`atacar_derecha`,
    100,
    false
    )
    music.play(music.createSoundEffect(WaveShape.Noise, 1364, 1, 255, 255, 100, SoundExpressionEffect.Vibrato, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
    if (controller.right.isPressed()) {
        pause(100)
        animation.runImageAnimation(
        prota,
        assets.animation`player_right_animated`,
        200,
        true
        )
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`puerta_4_nivel_1`, function (sprite2, location2) {
    NextLevel()
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (partida) {
        if (mostrar_minimapa) {
            mostrar_minimapa = false
            sprites.destroy(mapStripe)
        } else {
            mostrar_minimapa = true
        }
    }
})
function EnemigoNivel1 () {
    for (let valor of tiles.getTilesByType(assets.tile`amarillo_enemigo`)) {
        fantasma = sprites.create(assets.image`fantasma_derecha`, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        fantasma,
        assets.animation`derecha_fantasma0`,
        500,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        fantasma,
        assets.animation`izquierda_fantasma`,
        500,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        tiles.placeOnTile(fantasma, valor)
        tiles.setTileAt(valor, assets.tile`pared_nivel_1`)
        fantasma.ay = 200
        fantasma.follow(prota, 30)
    }
}
function MostrarLore () {
    game.setDialogTextColor(2)
    game.setDialogFrame(assets.image`fondo_1`)
    game.showLongText("Hace mucho tiempo existia un reino pacífico que, un triste dia, fue conquistado por un ejercito demoniaco.", DialogLayout.Full)
    game.showLongText("Tras mucho tiempo de batalla, este ejercito termino conquistando el reino y rebautizandolo como \"Reino Nochesfera\", controlado por 3 reyes.", DialogLayout.Full)
    game.showLongText("El 1r rey es Sssiniestro, lider de los fantasmas, quien ha conquistado gran parte del territorio por sus estrategias militares.", DialogLayout.Full)
    game.showLongText("El 2o rey es Aracno, lider de los murcielagos, quien es responsable de grandes robos de suministros en las aldeas vecinas.", DialogLayout.Full)
    game.showLongText("El ultimo rey es Anguilo, lider de los tiburones, quien es quien crea el veneno que fluye en los rios de los territorios vecinos.", DialogLayout.Full)
    game.showLongText("Parecia que no habia esperanza, pero entonces apareció el caballero End, quien juro que derrotaria a los 3 reyes de la Nochesfera.", DialogLayout.Full)
    game.showLongText("Y asi, End se adentro al castillo de la Nochesfera para derrotar a los 3 reyes malignos.", DialogLayout.Full)
}
function CrearEnemigos () {
    if (nivel <= 10) {
        EnemigoNivel1()
    } else if (nivel > 10 && nivel <= 20) {
        EnemigoNivel2()
    } else if (nivel > 20 && nivel <= 30) {
        EnemigoNivel3()
    }
}
info.onLifeZero(function () {
    if (!(win) && !(end_game)) {
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        EndGame()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite4, otherSprite) {
    if (ataque_prota < ataque_prota2) {
        sprites.destroy(otherSprite, effects.ashes, 200)
        music.play(music.createSong(assets.song`ashes`), music.PlaybackMode.UntilDone)
    } else {
        sprite4.startEffect(effects.ashes, 1000)
        scene.cameraShake(5, 500)
        info.changeLifeBy(-1)
        music.play(music.createSong(assets.song`muerte_prota`), music.PlaybackMode.InBackground)
        sprites.destroy(otherSprite)
    }
})
function MostrarInstrucciones () {
    game.setDialogTextColor(2)
    game.setDialogFrame(assets.image`fondo_1`)
    game.showLongText("A         : Saltar\\nA+A       : Doble salto\\nB         : Atacar\\nDER./IZQ. : Moverse\\nBAJO      : Minimapa\\nARRIBA    : Interactuar", DialogLayout.Full)
}
function BossNivel () {
    if (boss_vivo == true) {
        statusbar = statusbars.create(40, 4, StatusBarKind.EnemyHealth)
        statusbar.max = 9
        statusbar.setColor(7, 2, 0)
        statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
        if (nivel == 10) {
            serpiente = sprites.create(assets.image`leviatan_derecha`, SpriteKind.Boss)
            serpiente.setScale(3, ScaleAnchor.Middle)
            tiles.placeOnTile(serpiente, tiles.getTileLocation(40, 5))
            serpiente.ay = 200
            statusbar.attachToSprite(serpiente)
        } else if (nivel == 20) {
            arana = sprites.create(assets.image`faraon_derecha`, SpriteKind.Boss)
            arana.setScale(2.5, ScaleAnchor.Middle)
            tiles.placeOnTile(arana, tiles.getTileLocation(25, 13))
            arana.ay = 200
            statusbar.attachToSprite(arana)
        } else if (nivel == 30) {
            leviatan = sprites.create(assets.image`myImage0`, SpriteKind.Boss)
            leviatan.setScale(1.5, ScaleAnchor.Middle)
            tiles.placeOnTile(leviatan, tiles.getTileLocation(44, 22))
            leviatan.ay = 200
            statusbar.attachToSprite(leviatan)
        }
    }
}
function GenerarCorazones () {
    for (let valor of tiles.getTilesByType(assets.tile`myTile0`)) {
        llave = sprites.create(assets.image`myImage1`, SpriteKind.Heart)
        tiles.placeOnTile(llave, valor)
        if (nivel <= 10) {
            tiles.setTileAt(valor, assets.tile`pared_nivel_1`)
        } else if (nivel > 10 && nivel <= 20) {
            tiles.setTileAt(valor, assets.tile`pared_nivel_2`)
        } else if (nivel > 10 && nivel <= 20) {
            tiles.setTileAt(valor, assets.tile`pared_nivel_3`)
        }
    }
}
function EndGame () {
    music.stopAllSounds()
    end_game = true
    partida = false
    boss_vivo = false
    final = true
    mostrar_minimapa = false
    info.setLife(0)
    sprites.destroy(mapStripe)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Boss)
    sprites.destroyAllSpritesOfKind(SpriteKind.Map)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    if (win) {
        music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.InBackground)
    } else {
        music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.InBackground)
    }
}
let end_game = false
let fantasma: Sprite = null
let salto = false
let boss_vivo = false
let serpiente: Sprite = null
let boss_actual: Sprite = null
let nivel_superado = false
let tiburon: Sprite = null
let leviatan: Sprite = null
let statusbar: StatusBarSprite = null
let myMinimap: minimap.Minimap = null
let mapStripe: Sprite = null
let llave: Sprite = null
let murcielago: Sprite = null
let ataque_prota = 0
let ataque_prota2 = 0
let flecha_puerta_nivel: Sprite = null
let nivel = 0
let jugador_en_puerta = false
let spawn_y = 0
let spawn_x = 0
let arana: Sprite = null
let prota: Sprite = null
let mostrar_minimapa = false
let win = false
let final = false
let partida = false
let menu = false
music.setVolume(70)
music.play(music.createSong(assets.song`background_song`), music.PlaybackMode.LoopingInBackground)
menu = true
partida = false
final = false
win = false
mostrar_minimapa = true
let atacar = false
let player_en_lava = false
game.onUpdate(function () {
    if (boss_vivo) {
        if (nivel == 10) {
            Boss1()
        } else if (nivel == 20) {
            Boss2()
        } else if (nivel == 30) {
            Boss3()
        }
    }
})
game.onUpdateInterval(1, function () {
    if (menu) {
        scene.setBackgroundImage(assets.image`fondo_menu2`)
        if (controller.A.isPressed()) {
            menu = false
        } else if (controller.B.isPressed()) {
            MostrarLore()
            pause(1000)
        }
    } else if (!(partida) && !(final)) {
        MostrarInstrucciones()
        CreacionPersonaje()
        nivel = 1
        win = false
        end_game = false
        GenerarNivel()
        partida = true
    } else if (mostrar_minimapa) {
        GenerarMinimapa()
    }
    if (final) {
        ShowFinal()
    }
})
