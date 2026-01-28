namespace SpriteKind {
    export const Decorativo = SpriteKind.create()
    export const Map = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const indicador = SpriteKind.create()
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
function MostrarFlecha () {
    if (!(jugador_en_puerta)) {
        if (nivel == 1) {
            tiles.placeOnRandomTile(flecha_puerta_nivel, assets.tile`ubi_felcha_nivel1`)
            animation.runImageAnimation(
            flecha_puerta_nivel,
            assets.animation`animacion_flecha_nivel1`,
            150,
            true
            )
        } else if (nivel == 2) {
            tiles.placeOnRandomTile(flecha_puerta_nivel, assets.tile`ubi_flecha_nivel2`)
            animation.runImageAnimation(
            flecha_puerta_nivel,
            assets.animation`animacion_flecha_nivel2`,
            150,
            true
            )
        } else if (nivel == 3) {
            tiles.placeOnRandomTile(flecha_puerta_nivel, assets.tile`ubi_flecha_nivel3`)
            animation.runImageAnimation(
            flecha_puerta_nivel,
            assets.animation`animacion_flecha_nivel3`,
            150,
            true
            )
        }
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (partida) {
        if (characterAnimations.matchesRule(prota, characterAnimations.rule(Predicate.FacingRight))) {
            animation.runImageAnimation(
            prota,
            assets.animation`atacar_derecha`,
            100,
            false
            )
            music.play(music.createSoundEffect(WaveShape.Noise, 1364, 1, 255, 255, 100, SoundExpressionEffect.Vibrato, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
        } else if (characterAnimations.matchesRule(prota, characterAnimations.rule(Predicate.FacingLeft))) {
            animation.runImageAnimation(
            prota,
            assets.animation`atacar_izquierda`,
            100,
            false
            )
            music.play(music.createSoundEffect(WaveShape.Noise, 1364, 1, 255, 255, 100, SoundExpressionEffect.Vibrato, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
        }
        ataque_prota2 += 1
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`puerta_4_nivel_2`, function (sprite3, location3) {
    NextLevel()
})
function CreacionPersonaje () {
    prota = sprites.create(assets.image`player`, SpriteKind.Player)
    info.setLife(5)
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
        500,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.runFrames(
        murcielago,
        [img`
            . . f f f . . . . . . . . f f f 
            . f f c c . . . . . . f c b b c 
            f f c c . . . . . . f c b b c . 
            f c f c . . . . . . f b c c c . 
            f f f c c . c c . f c b b c c . 
            f f c 3 c c 3 c c f b c b b c . 
            f f b 3 b c 3 b c f b c c b c . 
            . c b b b b b b c b b c c c . . 
            . c 1 b b b 1 b b c c c c . . . 
            c b b b b b b b b b c c . . . . 
            c b c b b b c b b b b f . . . . 
            f b 1 f f f 1 b b b b f c . . . 
            f b b b b b b b b b b f c c . . 
            . f b b b b b b b b c f . . . . 
            . . f b b b b b b c f . . . . . 
            . . . f f f f f f f . . . . . . 
            `,img`
            . . f f f . . . . . . . . . . . 
            f f f c c . . . . . . . . f f f 
            f f c c . . c c . . . f c b b c 
            f f c 3 c c 3 c c f f b b b c . 
            f f b 3 b c 3 b c f b b c c c . 
            . c b b b b b b c f b c b c c . 
            . c b b b b b b c b b c b b c . 
            c b 1 b b b 1 b b b c c c b c . 
            c b b b b b b b b c c c c c . . 
            f b c b b b c b b b b f c . . . 
            f b 1 f f f 1 b b b b f c c . . 
            . f b b b b b b b b c f . . . . 
            . . f b b b b b b c f . . . . . 
            . . . f f f f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . c c . . c c . . . . . . . . 
            . . c 3 c c 3 c c c . . . . . . 
            . c b 3 b c 3 b c c c . . . . . 
            . c b b b b b b b b f f . . . . 
            c c b b b b b b b b f f . . . . 
            c b 1 b b b 1 b b c f f f . . . 
            c b b b b b b b b f f f f . . . 
            f b c b b b c b c c b b b . . . 
            f b 1 f f f 1 b f c c c c . . . 
            . f b b b b b b f b b c c . . . 
            c c f b b b b b c c b b c . . . 
            c c c f f f f f f c c b b c . . 
            . c c c . . . . . . c c c c c . 
            . . c c c . . . . . . . c c c c 
            . . . . . . . . . . . . . . . . 
            `,img`
            . f f f . . . . . . . . f f f . 
            f f c . . . . . . . f c b b c . 
            f c c . . . . . . f c b b c . . 
            c f . . . . . . . f b c c c . . 
            c f f . . . . . f f b b c c . . 
            f f f c c . c c f b c b b c . . 
            f f f c c c c c f b c c b c . . 
            . f c 3 c c 3 b c b c c c . . . 
            . c b 3 b c 3 b b c c c c . . . 
            c c b b b b b b b b c c . . . . 
            c b 1 b b b 1 b b b b f c . . . 
            f b b b b b b b b b b f c c . . 
            f b c b b b c b b b b f . . . . 
            . f 1 f f f 1 b b b c f . . . . 
            . . f b b b b b b c f . . . . . 
            . . . f f f f f f f . . . . . . 
            `],
        500,
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
    if (nivel == 1 && statusbar.value > 1) {
        sprite5.x = otherSprite2.x - 50
    } else if (nivel == 2 && statusbar.value > 1) {
        sprite5.x = otherSprite2.x - 50
    } else if (nivel == 3 && statusbar.value > 1) {
        sprite5.x = otherSprite2.x - 50
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
        caracol = sprites.create(assets.image`caracol_izquierda`, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        caracol,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . c c c c . . . . . . . . 
            . . . c d d d d c c . . . . . . 
            . . . c d c c c c c c . . . . . 
            . . . c c d 4 4 4 4 c c . . . . 
            c c . c 1 4 4 4 4 4 d 4 c . . . 
            c 4 c 1 d 4 4 4 4 1 4 4 4 c . . 
            c 4 c 1 4 4 4 4 4 1 4 4 4 4 c . 
            f 4 4 1 4 4 4 4 4 1 4 4 4 4 4 f 
            f 4 f 1 4 4 4 c c 1 4 f 4 4 4 f 
            f 4 f d 4 4 f 4 4 1 4 4 4 4 4 f 
            f f f f d 4 f 4 c 1 4 4 4 4 f . 
            . . c f c 4 f f 4 4 d 4 f f . . 
            . . c b d c 4 4 4 4 f f . . . . 
            . . c d d d f f f f . . . . . . 
            . . . c c c . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . c c c c c . . . . . . . 
            . . . c d d d d d c . . . . . . 
            . . . c d c c c c c . . . . . . 
            . . . c c d 4 4 4 4 c . . . . . 
            . . . c 1 4 4 4 4 4 d c . . . . 
            . . c 1 4 4 4 4 4 1 4 4 c . . . 
            c c c 1 4 4 4 4 1 4 4 4 4 c . . 
            c 4 4 1 4 4 c c 1 4 4 4 4 4 c . 
            f 4 f 1 4 f 4 4 1 4 4 4 4 4 c . 
            f 4 f d 4 f 4 c 1 4 f 4 4 4 4 f 
            f 4 f f 4 f f 4 1 4 4 4 4 4 4 f 
            f f c b c 4 4 4 4 1 4 4 4 4 f . 
            . . c d d c 4 4 4 4 d f f f . . 
            . . . c c c f f f f f . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . c c c c . . . . . . . . 
            . . . c d d d d c c . . . . . . 
            . . . c d c c c c c c . . . . . 
            c c . c c d 4 4 4 4 c c . . . . 
            c 4 c c 1 4 4 4 4 4 d 4 c . . . 
            f 4 c 1 d 4 4 4 4 1 4 4 4 c . . 
            f 4 4 1 4 4 4 4 4 1 4 4 4 4 c . 
            f 4 f 1 4 4 f c 1 1 4 4 4 4 4 f 
            f 4 f 1 4 4 f 4 c 1 4 f 4 4 4 f 
            f f f d 4 4 f 4 4 1 4 4 4 4 4 f 
            . . f f d 4 4 c c 1 4 4 4 4 f . 
            . . . f c 4 4 4 4 4 d 4 f f . . 
            . . c b d c 4 4 4 4 f f . . . . 
            . . c d d d f f f f . . . . . . 
            . . . c c c . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . c c c c . . . . . . . . . 
            . . c d d d d c c . . . . . . . 
            . . c d d c c c c c c . . . . . 
            c c c c c d 4 4 4 4 c c c . . . 
            f 4 c c 1 4 4 4 4 4 1 4 4 c . . 
            f 4 f 1 d 4 4 4 4 1 4 4 4 4 c . 
            f 4 f 1 4 4 4 4 4 1 4 4 4 4 4 f 
            f 4 4 1 4 4 f c 4 1 4 4 f 4 4 f 
            f f f 1 4 4 f 4 c 1 4 4 4 4 4 f 
            . . f d 4 4 f 4 4 1 4 4 4 4 f . 
            . . . f d 4 4 c c 4 1 4 4 f . . 
            . . . f c 4 4 4 4 4 4 d f . . . 
            . . c b d c 4 4 4 4 f f . . . . 
            . . c d d d f f f f . . . . . . 
            . . . c c c . . . . . . . . . . 
            `],
        500,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        caracol,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . c c c c . . . . 
            . . . . . . c c d d d d c . . . 
            . . . . . c c c c c c d c . . . 
            . . . . c c 4 4 4 4 d c c . . . 
            . . . c 4 d 4 4 4 4 4 1 c . c c 
            . . c 4 4 4 1 4 4 4 4 d 1 c 4 c 
            . c 4 4 4 4 1 4 4 4 4 4 1 c 4 c 
            f 4 4 4 4 4 1 4 4 4 4 4 1 4 4 f 
            f 4 4 4 f 4 1 c c 4 4 4 1 f 4 f 
            f 4 4 4 4 4 1 4 4 f 4 4 d f 4 f 
            . f 4 4 4 4 1 c 4 f 4 d f f f f 
            . . f f 4 d 4 4 f f 4 c f c . . 
            . . . . f f 4 4 4 4 c d b c . . 
            . . . . . . f f f f d d d c . . 
            . . . . . . . . . . c c c . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . c c c c c . . . . 
            . . . . . . c d d d d d c . . . 
            . . . . . . c c c c c d c . . . 
            . . . . . c 4 4 4 4 d c c . . . 
            . . . . c d 4 4 4 4 4 1 c . . . 
            . . . c 4 4 1 4 4 4 4 4 1 c . . 
            . . c 4 4 4 4 1 4 4 4 4 1 c c c 
            . c 4 4 4 4 4 1 c c 4 4 1 4 4 c 
            . c 4 4 4 4 4 1 4 4 f 4 1 f 4 f 
            f 4 4 4 4 f 4 1 c 4 f 4 d f 4 f 
            f 4 4 4 4 4 4 1 4 f f 4 f f 4 f 
            . f 4 4 4 4 1 4 4 4 4 c b c f f 
            . . f f f d 4 4 4 4 c d d c . . 
            . . . . . f f f f f c c c . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . c c c c . . . . 
            . . . . . . c c d d d d c . . . 
            . . . . . c c c c c c d c . . . 
            . . . . c c 4 4 4 4 d c c . c c 
            . . . c 4 d 4 4 4 4 4 1 c c 4 c 
            . . c 4 4 4 1 4 4 4 4 d 1 c 4 f 
            . c 4 4 4 4 1 4 4 4 4 4 1 4 4 f 
            f 4 4 4 4 4 1 1 c f 4 4 1 f 4 f 
            f 4 4 4 f 4 1 c 4 f 4 4 1 f 4 f 
            f 4 4 4 4 4 1 4 4 f 4 4 d f f f 
            . f 4 4 4 4 1 c c 4 4 d f f . . 
            . . f f 4 d 4 4 4 4 4 c f . . . 
            . . . . f f 4 4 4 4 c d b c . . 
            . . . . . . f f f f d d d c . . 
            . . . . . . . . . . c c c . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . c c c c . . . 
            . . . . . . . c c d d d d c . . 
            . . . . . c c c c c c d d c . . 
            . . . c c c 4 4 4 4 d c c c c c 
            . . c 4 4 1 4 4 4 4 4 1 c c 4 f 
            . c 4 4 4 4 1 4 4 4 4 d 1 f 4 f 
            f 4 4 4 4 4 1 4 4 4 4 4 1 f 4 f 
            f 4 4 f 4 4 1 4 c f 4 4 1 4 4 f 
            f 4 4 4 4 4 1 c 4 f 4 4 1 f f f 
            . f 4 4 4 4 1 4 4 f 4 4 d f . . 
            . . f 4 4 1 4 c c 4 4 d f . . . 
            . . . f d 4 4 4 4 4 4 c f . . . 
            . . . . f f 4 4 4 4 c d b c . . 
            . . . . . . f f f f d d d c . . 
            . . . . . . . . . . c c c . . . 
            `],
        500,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        tiles.placeOnTile(caracol, valor3)
        tiles.setTileAt(valor3, assets.tile`pared_nivel_3`)
        caracol.ay = 200
        caracol.follow(prota, 30)
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
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    if (nivel == 1) {
        boss_actual = serpiente
        flecha_puerta_nivel = sprites.create(assets.image`flecha_nivel1`, SpriteKind.indicador)
    } else if (nivel == 2) {
        boss_actual = arana
        flecha_puerta_nivel = sprites.create(assets.image`flecha_nivel2`, SpriteKind.indicador)
    } else if (nivel == 3) {
        boss_actual = leviatan
        flecha_puerta_nivel = sprites.create(assets.image`flecha_nivel3`, SpriteKind.indicador)
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
        tiles.setCurrentTilemap(tilemap`nivel1`)
        prota.setPosition(40, 460)
    } else if (nivel == 2) {
        scene.setBackgroundImage(assets.image`fondo_nivel_2`)
        tiles.setCurrentTilemap(tilemap`nivel0`)
        prota.setPosition(40, 20)
    } else if (nivel == 3) {
        scene.setBackgroundImage(assets.image`fondo_nivel_3`)
        tiles.setCurrentTilemap(tilemap`nivel3`)
        prota.setPosition(40, 460)
    }
    CrearEnemigos()
    BossNivel()
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
function NextLevel () {
    if (nivel_superado) {
        MostrarFlecha()
        jugador_en_puerta = true
        pause(10)
        if (controller.up.isPressed()) {
            if (nivel == 3) {
                EndGame()
                win = true
            } else {
                music.play(music.createSoundEffect(WaveShape.Noise, 1, 452, 255, 255, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
                nivel += 1
                boss_vivo = true
                GenerarNivel()
            }
        }
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
    game.showLongText("El caballero End debe adentrarse al castillo oscuro y derrotar a los 3 reyes que gobiernan el reino Nochesfera, restaurando así la paz.", DialogLayout.Full)
}
function CrearEnemigos () {
    if (nivel == 1) {
        EnemigoNivel1()
    } else if (nivel == 2) {
        EnemigoNivel2()
    } else if (nivel == 3) {
        EnemigoNivel3()
    }
}
info.onLifeZero(function () {
    EndGame()
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
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        GenerarNivel()
    }
})
function showFinal () {
    tiles.setCurrentTilemap(tilemap`level3`)
    if (win) {
        scene.setBackgroundImage(assets.image`fondo_ganador`)
    } else {
        scene.setBackgroundImage(assets.image`fondo_perdedor`)
    }
    if (controller.A.isPressed()) {
        menu = true
        final = false
        pause(1000)
    }
}
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
        if (nivel == 1) {
            serpiente = sprites.create(assets.image`leviatan_derecha`, SpriteKind.Boss)
            serpiente.setScale(3, ScaleAnchor.Middle)
            tiles.placeOnTile(serpiente, tiles.getTileLocation(40, 5))
            serpiente.ay = 200
            statusbar.attachToSprite(serpiente)
        } else if (nivel == 2) {
            arana = sprites.create(assets.image`faraon_derecha`, SpriteKind.Boss)
            arana.setScale(2.5, ScaleAnchor.Middle)
            tiles.placeOnTile(arana, tiles.getTileLocation(25, 13))
            arana.ay = 200
            statusbar.attachToSprite(arana)
        } else if (nivel == 3) {
            leviatan = sprites.create(assets.image`myImage0`, SpriteKind.Boss)
            leviatan.setScale(1.5, ScaleAnchor.Middle)
            tiles.placeOnTile(leviatan, tiles.getTileLocation(44, 22))
            leviatan.ay = 200
            statusbar.attachToSprite(leviatan)
        }
    }
}
function EndGame () {
    partida = false
    boss_vivo = false
    final = true
    mostrar_minimapa = false
    sprites.destroy(mapStripe)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Boss)
    sprites.destroyAllSpritesOfKind(SpriteKind.Map)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
}
let fantasma: Sprite = null
let salto = false
let boss_vivo = false
let nivel_superado = false
let serpiente: Sprite = null
let boss_actual: Sprite = null
let caracol: Sprite = null
let leviatan: Sprite = null
let statusbar: StatusBarSprite = null
let myMinimap: minimap.Minimap = null
let mapStripe: Sprite = null
let murcielago: Sprite = null
let ataque_prota = 0
let ataque_prota2 = 0
let flecha_puerta_nivel: Sprite = null
let nivel = 0
let jugador_en_puerta = false
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
game.onUpdate(function () {
    if (boss_vivo) {
        if (nivel == 1) {
            Boss1()
        } else if (nivel == 2) {
            Boss2()
        } else if (nivel == 3) {
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
        GenerarNivel()
        partida = true
    } else if (mostrar_minimapa) {
        GenerarMinimapa()
    }
    if (final) {
        showFinal()
    }
})
