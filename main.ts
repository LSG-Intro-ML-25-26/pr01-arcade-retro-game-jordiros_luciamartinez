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
            tiles.placeOnRandomTile(flecha_puerta_nivel, assets.tile`puerta_1_nivel_1`)
        } else if (nivel > 10 && nivel <= 20) {
            flecha_puerta_nivel = sprites.create(assets.image`flecha_nivel2`, SpriteKind.indicador)
            animation.runImageAnimation(
            flecha_puerta_nivel,
            assets.animation`animacion_flecha_nivel2`,
            150,
            true
            )
            tiles.placeOnRandomTile(flecha_puerta_nivel, assets.tile`puerta_1_nivel_2`)
        } else if (nivel > 20 && nivel <= 30) {
            flecha_puerta_nivel = sprites.create(assets.image`flecha_nivel3`, SpriteKind.indicador)
            animation.runImageAnimation(
            flecha_puerta_nivel,
            assets.animation`animacion_flecha_nivel3`,
            150,
            true
            )
            tiles.placeOnRandomTile(flecha_puerta_nivel, assets.tile`puerta_1_nivel_3`)
        }
        flecha_puerta_nivel.y += -30
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
    characterAnimations.setCharacterState(prota, characterAnimations.rule(Predicate.FacingRight))
    controller.moveSprite(prota, 100, 0)
    scene.cameraFollowSprite(prota)
    prota.ay = 200
    ataque_prota = 0
    ataque_prota2 = 0
    for (let set_player of tiles.getTilesByType(assets.tile`myTile2`)) {
        tiles.placeOnTile(prota, set_player)
        spawn_x = prota.x
        spawn_y = prota.y
        if (nivel <= 10) {
            tiles.setTileAt(set_player, assets.tile`pared_nivel_1`)
        } else if (nivel > 10 && nivel <= 20) {
            tiles.setTileAt(set_player, assets.tile`pared_nivel_2`)
        } else if (nivel > 10 && nivel <= 20) {
            tiles.setTileAt(set_player, assets.tile`pared_nivel_3`)
        }
    }
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
function GenerarLlave () {
    for (let valor of tiles.getTilesByType(assets.tile`myTile`)) {
        llave = sprites.create(assets.image`myImage2`, SpriteKind.Key)
        animation.runImageAnimation(
        llave,
        assets.animation`myAnim`,
        200,
        true
        )
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Heart, function (sprite4, otherSprite) {
    if (info.life() < 10) {
        sprites.destroy(otherSprite)
        music.play(music.createSong(hex`00f4010408020100001c00010a006400f4016400000400000000000000000000000000050000040c0000000400012704000800012a`), music.PlaybackMode.InBackground)
        info.changeLifeBy(1)
    } else {
        if (mensaje_corazon) {
            game.splash("No puedes superar", "los 10 corazones")
            mensaje_corazon = false
        }
    }
})
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
scene.onOverlapTile(SpriteKind.Player, assets.tile`puerta_4_nivel_3`, function (sprite2, location2) {
    NextLevel()
})
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
    tipo_nivel = true
    jugador_en_puerta = false
    nivel_superado = false
    boss_vivo = true
    llama = 1
    sprites.destroyAllSpritesOfKind(SpriteKind.Boss)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.indicador)
    sprites.destroyAllSpritesOfKind(SpriteKind.Heart)
    if (nivel == 1) {
        tipo_nivel = true
        scene.setBackgroundImage(assets.image`fondo_nivel_1`)
        tiles.setCurrentTilemap(tilemap`nivel5`)
    } else if (nivel == 2) {
        tiles.setCurrentTilemap(tilemap`nivel0`)
    } else if (nivel == 3) {
        tiles.setCurrentTilemap(tilemap`nivel7`)
    } else if (nivel == 4) {
        tiles.setCurrentTilemap(tilemap`nivel9`)
    } else if (nivel == 5) {
        tiles.setCurrentTilemap(tilemap`nivel12`)
    } else if (nivel == 6) {
        tiles.setCurrentTilemap(tilemap`nivel14`)
    } else if (nivel == 7) {
        tiles.setCurrentTilemap(tilemap`nivel16`)
    } else if (nivel == 8) {
        tiles.setCurrentTilemap(tilemap`nivel18`)
    } else if (nivel == 9) {
        tiles.setCurrentTilemap(tilemap`nivel21`)
    } else if (nivel == 10) {
        tipo_nivel = false
        tiles.setCurrentTilemap(tilemap`nivel10`)
    } else if (nivel == 11) {
        scene.setBackgroundImage(assets.image`fondo_nivel_2`)
        tiles.setCurrentTilemap(tilemap`nivel23`)
    } else if (nivel == 12) {
        tiles.setCurrentTilemap(tilemap`nivel25`)
    } else if (nivel == 13) {
        tiles.setCurrentTilemap(tilemap`nivel27`)
    } else if (nivel == 14) {
        tiles.setCurrentTilemap(tilemap`nivel29`)
    } else if (nivel == 15) {
        tiles.setCurrentTilemap(tilemap`nivel34`)
    } else if (nivel == 16) {
        tiles.setCurrentTilemap(tilemap`nivel36`)
    } else if (nivel == 17) {
        tiles.setCurrentTilemap(tilemap`tilemap_vacio`)
    } else if (nivel == 18) {
        tiles.setCurrentTilemap(tilemap`tilemap_vacio`)
    } else if (nivel == 19) {
        tiles.setCurrentTilemap(tilemap`tilemap_vacio`)
    } else if (nivel == 20) {
        tipo_nivel = false
        tiles.setCurrentTilemap(tilemap`nivel20`)
    } else if (nivel == 21) {
        scene.setBackgroundImage(assets.image`fondo_nivel_3`)
        tiles.setCurrentTilemap(tilemap`tilemap_vacio`)
    } else if (nivel == 22) {
        tiles.setCurrentTilemap(tilemap`tilemap_vacio`)
    } else if (nivel == 23) {
        tiles.setCurrentTilemap(tilemap`tilemap_vacio`)
    } else if (nivel == 24) {
        tiles.setCurrentTilemap(tilemap`tilemap_vacio`)
    } else if (nivel == 25) {
        tiles.setCurrentTilemap(tilemap`tilemap_vacio`)
    } else if (nivel == 26) {
        tiles.setCurrentTilemap(tilemap`tilemap_vacio`)
    } else if (nivel == 27) {
        tiles.setCurrentTilemap(tilemap`tilemap_vacio`)
    } else if (nivel == 28) {
        tiles.setCurrentTilemap(tilemap`tilemap_vacio`)
    } else if (nivel == 29) {
        tiles.setCurrentTilemap(tilemap`tilemap_vacio`)
    } else if (nivel == 30) {
        tipo_nivel = false
        tiles.setCurrentTilemap(tilemap`nivel30`)
    }
    CreacionPersonaje()
    CrearEnemigos()
    if (tipo_nivel) {
        GenerarLlave()
    } else {
        GenerarBoss()
    }
    GenerarCorazones()
    MostrarNivel()
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite42, otherSprite4) {
    if (ataque_prota < ataque_prota2) {
        sprites.destroy(otherSprite4, effects.ashes, 200)
        music.play(music.createSong(assets.song`ashes`), music.PlaybackMode.UntilDone)
    } else {
        sprite42.startEffect(effects.ashes, 1000)
        scene.cameraShake(5, 500)
        info.changeLifeBy(-1)
        music.play(music.createSong(assets.song`muerte_prota`), music.PlaybackMode.InBackground)
        sprites.destroy(otherSprite4)
    }
})
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
                sprites.destroyAllSpritesOfKind(SpriteKind.Player)
                GenerarNivel()
            }
        }
    } else if (controller.up.isPressed()) {
        game.splash("Necesitas la llave")
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
function GenerarBoss () {
    if (boss_vivo == true) {
        statusbar = statusbars.create(40, 4, StatusBarKind.EnemyHealth)
        statusbar.max = 9
        statusbar.setColor(7, 2, 0)
        statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
        if (nivel == 10) {
            serpiente = sprites.create(assets.image`leviatan_derecha`, SpriteKind.Boss)
            serpiente.setScale(3, ScaleAnchor.Middle)
            serpiente.ay = 200
            statusbar.attachToSprite(serpiente)
            for (let valor4 of tiles.getTilesByType(assets.tile`myTile3`)) {
                tiles.placeOnTile(serpiente, valor4)
                tiles.setTileAt(valor4, assets.tile`pared_nivel_1`)
            }
        } else if (nivel == 20) {
            arana = sprites.create(assets.image`faraon_derecha`, SpriteKind.Boss)
            arana.setScale(2.5, ScaleAnchor.Middle)
            arana.ay = 200
            statusbar.attachToSprite(arana)
            for (let valor5 of tiles.getTilesByType(assets.tile`myTile3`)) {
                tiles.placeOnTile(arana, valor5)
                tiles.setTileAt(valor5, assets.tile`pared_nivel_2`)
            }
        } else if (nivel == 30) {
            leviatan = sprites.create(assets.image`myImage0`, SpriteKind.Boss)
            leviatan.setScale(1.5, ScaleAnchor.Middle)
            leviatan.ay = 200
            statusbar.attachToSprite(leviatan)
            for (let valor6 of tiles.getTilesByType(assets.tile`myTile3`)) {
                tiles.placeOnTile(leviatan, valor6)
                tiles.setTileAt(valor6, assets.tile`pared_nivel_3`)
            }
        }
    }
}
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
    for (let valor7 of tiles.getTilesByType(assets.tile`amarillo_enemigo`)) {
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
        tiles.placeOnTile(fantasma, valor7)
        tiles.setTileAt(valor7, assets.tile`pared_nivel_1`)
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Key, function (sprite6, otherSprite3) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Key)
    nivel_superado = true
    music.play(music.createSong(hex`00f4010408020200001c00010a006400f401640000040000000000000000000000000005000004120000000400012704000800012a08000c00012a01001c000f05001202c102c20100040500280000006400280003140006020004120000000400012704000800012a08000c00012a`), music.PlaybackMode.UntilDone)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`puerta_4_nivel_1`, function (sprite22, location22) {
    NextLevel()
})
function MostrarInstrucciones () {
    game.setDialogTextColor(2)
    game.setDialogFrame(assets.image`fondo_1`)
    game.showLongText("A         : Saltar\\nA+A       : Doble salto\\nB         : Atacar\\nDER./IZQ. : Moverse\\nBAJO      : Minimapa\\nARRIBA    : Interactuar", DialogLayout.Full)
}
function GenerarCorazones () {
    for (let valor8 of tiles.getTilesByType(assets.tile`myTile0`)) {
        llave = sprites.create(assets.image`myImage1`, SpriteKind.Heart)
        animation.runImageAnimation(
        llave,
        assets.animation`myAnim0`,
        200,
        true
        )
        tiles.placeOnTile(llave, valor8)
        if (nivel <= 10) {
            tiles.setTileAt(valor8, assets.tile`pared_nivel_1`)
        } else if (nivel > 10 && nivel <= 20) {
            tiles.setTileAt(valor8, assets.tile`pared_nivel_2`)
        } else if (nivel > 10 && nivel <= 20) {
            tiles.setTileAt(valor8, assets.tile`pared_nivel_3`)
        }
    }
}
function MostrarNivel () {
    game.setDialogTextColor(2)
    game.setDialogFrame(assets.image`fondo_1`)
    game.showLongText("Nivel " + convertToText(nivel), DialogLayout.Full)
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
let llama = 0
let tipo_nivel = false
let boss_vivo = false
let nivel_superado = false
let serpiente: Sprite = null
let boss_actual: Sprite = null
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
let mensaje_corazon = false
let mostrar_minimapa = false
let win = false
let final = false
let partida = false
let menu = false
let atacar = false
music.setVolume(70)
music.play(music.createSong(assets.song`background_song`), music.PlaybackMode.LoopingInBackground)
menu = true
partida = false
final = false
win = false
mostrar_minimapa = true
mensaje_corazon = true
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
        info.setLife(3)
        nivel = 16
        win = false
        end_game = false
        GenerarNivel()
        partida = true
    } else if (mostrar_minimapa) {
        GenerarMinimapa()
    }
    if (final) {
        ShowFinal()
        if (info.life() <= 9) {
            mensaje_corazon = true
        }
    }
})
game.onUpdateInterval(200, function () {
    if (nivel <= 10) {
        if (llama == 1) {
            for (let llama_valor of tiles.getTilesByType(assets.tile`antorcha_nivel_1`)) {
                tiles.setTileAt(llama_valor, assets.tile`antorcha_nivel_5`)
            }
        } else if (llama == 2) {
            for (let llama_valor of tiles.getTilesByType(assets.tile`antorcha_nivel_5`)) {
                tiles.setTileAt(llama_valor, assets.tile`antorcha_nivel_6`)
            }
        } else if (llama == 3) {
            for (let llama_valor of tiles.getTilesByType(assets.tile`antorcha_nivel_6`)) {
                tiles.setTileAt(llama_valor, assets.tile`antorcha_nivel_5`)
            }
        } else if (llama == 4) {
            for (let llama_valor of tiles.getTilesByType(assets.tile`antorcha_nivel_5`)) {
                tiles.setTileAt(llama_valor, assets.tile`antorcha_nivel_1`)
            }
            llama = 0
        }
    } else if (nivel > 10 && nivel <= 20) {
        if (llama == 1) {
            for (let llama_valor of tiles.getTilesByType(assets.tile`antorcha_nivel_2`)) {
                tiles.setTileAt(llama_valor, assets.tile`antorcha_nivel_4`)
            }
        } else if (llama == 2) {
            for (let llama_valor of tiles.getTilesByType(assets.tile`antorcha_nivel_4`)) {
                tiles.setTileAt(llama_valor, assets.tile`antorcha_nivel_3`)
            }
        } else if (llama == 3) {
            for (let llama_valor of tiles.getTilesByType(assets.tile`antorcha_nivel_3`)) {
                tiles.setTileAt(llama_valor, assets.tile`antorcha_nivel_4`)
            }
        } else if (llama == 4) {
            for (let llama_valor of tiles.getTilesByType(assets.tile`antorcha_nivel_4`)) {
                tiles.setTileAt(llama_valor, assets.tile`antorcha_nivel_2`)
            }
            llama = 0
        }
    } else if (nivel > 20 && nivel <= 30) {
        if (llama == 1) {
            for (let llama_valor of tiles.getTilesByType(assets.tile`antorhca_nivel_3`)) {
                tiles.setTileAt(llama_valor, assets.tile`antorcha_nivel_7`)
            }
        } else if (llama == 2) {
            for (let llama_valor of tiles.getTilesByType(assets.tile`antorcha_nivel_7`)) {
                tiles.setTileAt(llama_valor, assets.tile`antorcha_nivel_8`)
            }
        } else if (llama == 3) {
            for (let llama_valor of tiles.getTilesByType(assets.tile`antorcha_nivel_8`)) {
                tiles.setTileAt(llama_valor, assets.tile`antorcha_nivel_7`)
            }
        } else if (llama == 4) {
            for (let llama_valor of tiles.getTilesByType(assets.tile`antorcha_nivel_8`)) {
                tiles.setTileAt(llama_valor, assets.tile`antorcha_nivel_7`)
            }
            llama = 0
        }
    }
    llama += 1
})
