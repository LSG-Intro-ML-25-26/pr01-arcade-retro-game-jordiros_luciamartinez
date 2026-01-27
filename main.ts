namespace SpriteKind {
    export const Decorativo = SpriteKind.create()
    export const Map = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const indicador = SpriteKind.create()
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
function MostrarFlecha () {
    if (prota_en_puerta == 1) {
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
            300,
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
scene.onOverlapTile(SpriteKind.Player, assets.tile`puerta_4_nivel_3`, function (sprite, location) {
    if (nivel_superado) {
        prota_en_puerta += 1
        MostrarFlecha()
        if (controller.up.isPressed()) {
            music.stopAllSounds()
            game.gameOver(true)
            pause(1000)
            Inicio()
        }
    }
})
function GenerarMinimapa () {
    sprites.destroy(mapStripe)
    myMinimap = minimap.minimap(MinimapScale.Sixteenth, 1, 15)
    mapStripe = sprites.create(minimap.getImage(myMinimap), SpriteKind.Map)
    minimap.includeSprite(myMinimap, prota, MinimapSpriteScale.Double)
    mapStripe.setPosition(scene.cameraProperty(CameraProperty.X) + 54, scene.cameraProperty(CameraProperty.Y) - 44)
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
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (partida) {
        SistemaDeDobleSalto()
    }
})
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
    info.setLife(3)
    nivel_superado = true
    boss_vivo = false
})
function YouLost () {
    game.gameOver(false)
    game.setGameOverEffect(false, effects.melt)
}
function GenerarNivel () {
    nivel_superado = false
    prota_en_puerta = 0
    sprites.destroyAllSpritesOfKind(SpriteKind.indicador)
    sprites.destroyAllSpritesOfKind(SpriteKind.Boss)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    if (nivel == 1) {
        scene.setBackgroundImage(assets.image`fondo_nivel_1`)
        tiles.setCurrentTilemap(tilemap`nivel1`)
        prota.setPosition(20, 460)
    } else if (nivel == 2) {
        scene.setBackgroundImage(assets.image`fondo_nivel_2`)
        tiles.setCurrentTilemap(tilemap`nivel0`)
        prota.setPosition(20, 60)
    } else if (nivel == 3) {
        scene.setBackgroundImage(assets.image`fondo_nivel_3`)
        tiles.setCurrentTilemap(tilemap`nivel3`)
        prota.setPosition(20, 11)
    }
    CrearEnemigos()
    BossNivel()
}
function Inicio () {
    music.setVolume(70)
    music.play(music.createSong(assets.song`background_song`), music.PlaybackMode.LoopingInBackground)
    menu = true
    partida = false
    mostrar_minimapa = true
    boss_vivo = true
    scene.setBackgroundImage(assets.image`fondo_menu2`)
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
function MostrarLore () {
    game.setDialogTextColor(2)
    game.setDialogFrame(assets.image`fondo_1`)
    game.showLongText("El caballero End debe adentrarse al castillo oscuro y derrotar a los 3 reyes que gobiernan el reino Nochesfera, restaurando así la paz.", DialogLayout.Full)
}
function CrearEnemigos () {
    if (nivel == 1) {
        for (let valor of tiles.getTilesByType(assets.tile`amarillo_enemigo`)) {
            fantasma = sprites.create(assets.image`fantasma_derecha`, SpriteKind.Enemy)
            characterAnimations.loopFrames(
            fantasma,
            assets.animation`derecha_fantasma`,
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
    } else if (nivel == 2) {
        murcielago = sprites.create(assets.image`muercielago_izquierda`, SpriteKind.Enemy)
    } else if (nivel == 3) {
        caracol = sprites.create(assets.image`caracol_izquierda`, SpriteKind.Enemy)
    }
}
info.onLifeZero(function () {
    music.stopAllSounds()
    menu = true
    scene.setBackgroundImage(assets.image`fondo_perdedor`)
    tiles.setCurrentTilemap(tilemap`nivel4`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`puerta_4_nivel_1`, function (sprite, location) {
    if (nivel_superado) {
        prota_en_puerta += 1
        MostrarFlecha()
        if (controller.up.isPressed()) {
            nivel = 2
            music.play(music.createSoundEffect(WaveShape.Noise, 1, 452, 255, 255, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
            boss_vivo = true
            GenerarNivel()
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`puerta_4_nivel_2`, function (sprite, location) {
    if (nivel_superado) {
        prota_en_puerta += 1
        MostrarFlecha()
        if (controller.up.isPressed()) {
            nivel = 3
            music.play(music.createSoundEffect(WaveShape.Noise, 1, 452, 255, 255, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
            boss_vivo = true
            GenerarNivel()
        }
    }
})
function MostrarInstrucciones () {
    game.setDialogTextColor(2)
    game.setDialogFrame(assets.image`fondo_1`)
    game.showLongText("A         : Saltar\\nA+A       : Doble salto\\nB         : Atacar\\nDER./IZQ. : Moverse\\nBAJO      : Minimapa", DialogLayout.Full)
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
            leviatan = sprites.create(assets.image`faraon_derecha`, SpriteKind.Boss)
            leviatan.setScale(2.5, ScaleAnchor.Middle)
            tiles.placeOnTile(leviatan, tiles.getTileLocation(44, 22))
            leviatan.ay = 200
            statusbar.attachToSprite(leviatan)
        }
    }
}
function CreacionPersonajes () {
    prota = sprites.create(assets.image`player`, SpriteKind.Player)
    info.setLife(3)
    characterAnimations.setCharacterState(prota, characterAnimations.rule(Predicate.FacingRight))
    controller.moveSprite(prota, 100, 0)
    scene.cameraFollowSprite(prota)
    prota.ay = 200
    ataque_prota = 0
    ataque_prota2 = 0
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (ataque_prota < ataque_prota2) {
        sprites.destroy(otherSprite, effects.ashes, 200)
        music.play(music.createSong(assets.song`ashes`), music.PlaybackMode.UntilDone)
    } else {
        sprite.startEffect(effects.ashes, 1000)
        scene.cameraShake(5, 500)
        info.changeLifeBy(-1)
        music.play(music.createSong(assets.song`muerte_prota`), music.PlaybackMode.InBackground)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        GenerarNivel()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    if (sprite.vy > 0 && sprite.y < otherSprite.y) {
        sprite.vy = -70
        statusbar.value += -3
        music.play(music.createSoundEffect(WaveShape.Noise, 1259, 0, 255, 255, 100, SoundExpressionEffect.None, InterpolationCurve.Logarithmic), music.PlaybackMode.UntilDone)
    } else {
        info.changeLifeBy(-1)
        music.play(music.createSong(assets.song`muerte_prota`), music.PlaybackMode.InBackground)
    }
    if (nivel == 1 && statusbar.value > 1) {
        sprite.x = otherSprite.x - 50
    } else if (nivel == 2 && statusbar.value > 1) {
        sprite.x = otherSprite.x - 50
    } else if (nivel == 3 && statusbar.value > 1) {
        sprite.x = otherSprite.x - 50
    }
    pause(1000)
})
let ataque_prota = 0
let caracol: Sprite = null
let murcielago: Sprite = null
let fantasma: Sprite = null
let salto = false
let menu = false
let boss_vivo = false
let statusbar: StatusBarSprite = null
let leviatan: Sprite = null
let arana: Sprite = null
let serpiente: Sprite = null
let boss_actual: Sprite = null
let ataque_prota2 = 0
let myMinimap: minimap.Minimap = null
let nivel_superado = false
let mapStripe: Sprite = null
let mostrar_minimapa = false
let flecha_puerta_nivel: Sprite = null
let nivel = 0
let prota_en_puerta = 0
let prota: Sprite = null
let partida = false
Inicio()
game.onUpdate(function () {
    if (boss_vivo) {
        if (nivel == 1) {
            if (prota.x + 30 < serpiente.x) {
                serpiente.vx = -20
                serpiente.setImage(assets.image`leviatan_izquierda`)
            } else if (prota.x - 30 > serpiente.x) {
                serpiente.vx = 20
                serpiente.setImage(assets.image`leviatan_derecha`)
            } else {
                serpiente.vx = 0
            }
        } else if (nivel == 2) {
            if (prota.x + 30 < arana.x) {
                arana.vx = -20
                arana.setImage(assets.image`faraon_izquierda`)
            } else if (prota.x - 30 > arana.x) {
                arana.vx = 20
                arana.setImage(assets.image`faraon_derecha`)
            } else {
                arana.vx = 0
            }
        } else if (nivel == 3) {
            if (prota.x + 30 < leviatan.x) {
                leviatan.vx = -20
                leviatan.setImage(assets.image`faraon_izquierda`)
            } else if (prota.x - 30 > leviatan.x) {
                leviatan.vx = 20
                leviatan.setImage(assets.image`faraon_derecha`)
            } else {
                leviatan.vx = 0
            }
        }
    }
})
game.onUpdateInterval(1, function () {
    if (menu) {
        scene.setBackgroundImage(assets.image`fondo_menu2`)
        if (controller.A.isPressed()) {
            menu = false
        }
        if (controller.B.isPressed()) {
            menu = false
            MostrarLore()
            scene.setBackgroundImage(assets.image`fondo_menu2`)
            menu = true
        }
    } else if (!(partida)) {
        nivel = 1
        MostrarInstrucciones()
        CreacionPersonajes()
        GenerarNivel()
        partida = true
    } else if (mostrar_minimapa) {
        GenerarMinimapa()
    }
})
