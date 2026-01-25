namespace SpriteKind {
    export const Decorativo = SpriteKind.create()
    export const Map = SpriteKind.create()
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
function CreacionEnemigos () {
    for (let valor of tiles.getTilesByType(assets.tile`amarilloEnemigo`)) {
        fantasma = sprites.create(assets.image`FantasmaDerecha`, SpriteKind.Enemy)
        characterAnimations.loopFrames(
        fantasma,
        assets.animation`derechaFantasma`,
        500,
        characterAnimations.rule(Predicate.MovingRight)
        )
        characterAnimations.loopFrames(
        fantasma,
        assets.animation`izquierdaFantasma`,
        500,
        characterAnimations.rule(Predicate.MovingLeft)
        )
        tiles.placeOnTile(fantasma, valor)
        tiles.setTileAt(valor, assets.tile`pared_nivel_1`)
        fantasma.ay = 200
        fantasma.follow(prota, 30)
    }
}
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
            assets.animation`atacarDerecha0`,
            100,
            false
            )
        } else if (characterAnimations.matchesRule(prota, characterAnimations.rule(Predicate.FacingLeft))) {
            animation.runImageAnimation(
            prota,
            assets.animation`atacarIzquierda0`,
            100,
            false
            )
        }
        ataque_prota2 += 1
    }
})
function GenerarNivel () {
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
    CreacionEnemigos()
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
info.onLifeZero(function () {
    game.gameOver(false)
    game.setGameOverEffect(true, effects.melt)
})
function MostrarInstrucciones () {
    game.setDialogTextColor(2)
    game.setDialogFrame(assets.image`fondo_1`)
    game.showLongText("A         : Saltar\\nA+A       : Doble salto\\nB         : Atacar\\nDER./IZQ. : Moverse\\nBAJO      : Minimapa", DialogLayout.Full)
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
    } else {
        prota.startEffect(effects.ashes, 1000)
        scene.cameraShake(5, 500)
        info.changeLifeBy(-1)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        GenerarNivel()
        prota.setImage(assets.image`player`)
    }
})
let ataque_prota = 0
let salto = false
let nivel = 0
let ataque_prota2 = 0
let myMinimap: minimap.Minimap = null
let fantasma: Sprite = null
let mapStripe: Sprite = null
let prota: Sprite = null
let mostrar_minimapa = false
let partida = false
let menu = true
partida = false
mostrar_minimapa = true
scene.setBackgroundImage(img`
    ...............................................................................................................................................................
    ...............................................................................................................................................................
    ...............................................................................................................................................................
    ...............................................................................................................................................................
    ...................................................................................................22222222222222222222222222222222222222......................
    ...........................................................................................222222222222222222222222222222222222222222222222222222..............
    .....................................................................................222222222222222222222222222222222222222222222222222222222222222222........
    ................................................................................222222222222222222222222222222222444444444422222222222222222222222222222222....
    .............................................................................222222222222222222222244444444444444444444444444444444444444422222222222222222....
    ..22222.................................................................22222222222222222224444444444444444444444444444444444444444444444444444444222222222....
    ..2222222222......................................................22222222222222222224444444444444444444444444444444444444444444444444444444444444444442222....
    ..222222222222222222.......................................222222222222222222244444444444444444444444444444444444444444444444444444444444444444444444444222....
    ..22224222222222222222222222222222..........222222222222222222222222222244444444444444444444444444444444444444444444444444444444444444444444444444444444222....
    ..2222444444422222222222222222222222222222222222222222222222222222444444444444444444444444444444444444444444444444444444444444444444444444444444444444442222...
    ..2222444444444444444222222222222222222222222222222222222244444444444444444444444444444444444444444444444444444444444444444444444444222222224444444444442222...
    ..2222444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444244444444444444444422224444222244444444442222...
    ..2222444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444442244444444444444444222444444442224444444442222...
    ..2222444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444442244444444444422444444442222...
    ..2222444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444422444444224444442244444442222...
    ..2222444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444424422444444444444422444444222444442224444442222...
    ..2222444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444442442244222422444444444444224444444242444444224444442222...
    ..2222444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444424442242224422422444444444444224444442242444444224444442222...
    ..2222444444444444444444444444444444444444444444444444444444444444444444444444444444444444222442422442244224422442444444444444244444442442244444424444442222...
    ..2222444444444444444444444444444444444444444444444444444444444444444444422244444442242222224442442242244224422442244444444444244444442444244444424444442222...
    ..2222444444444444444444444444444444444444444444444444444444444444444444442244444442224224424442242444244224422442244444444444244444422222244444424444442222...
    ..2222444444444444444422444444444444444444444444444444444444444444444444444244444444224224422442224444244224442242224444444444244444422222224444424444442222...
    ..2222444444444444444422244442244444444422444444444444444444444444444222444224444444224224422442244444224424442244444444444444244444424444224444424444442222...
    ..2222444444444444444442224442244444444422442444444444444444444444444222244224444444224424422442222444224424444444444444444444224444224444424444224444442222...
    ..2222444444444444444444224444244442444422442444444444444424444444444442244224444444224422422444424444444444444444444444444444224444244444424444224444442222...
    ..2222444444444444444444222224224222224422442242244422244422424444444242244424444444224422444444444444444444444444444444444444422444444444444442244444442222...
    ..2222444444444444444444224444244224224422442242224222224422424444444242244422444444444444444444444444444444444444444444444444442244444444444442244444442222...
    ..2222444444444444444442224444244224424422442244224224424422444444444244224422444444444444444444444444444444444444444444444444444224444444444222444444442222...
    ..2222444444444444444444224442244224424422442244224222444422444444442224224444444444444444444444444444444444444444444444444444444422244444442224444444442222...
    ..2222444444444444444444244442444224424422442244224224444422444444444224444444444444444444444444444444444444444444444444444444444442222222222444444444442222...
    ..2222444444444444444444244424444224424422442244224224444422444444444444444444444444444444444444444444444444444444444444444444444444442222444444444444442222...
    ..222244444444444444444222224444422222442224222224422242422224444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444222....
    ..222244444444444444444244444444444244444444444444444244444244444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444222....
    ..222244444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444222....
    ..222244444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444222....
    ..222244444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444222....
    ..222244444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444442222222222222222222222222222222444444444444444444222....
    ..222244444444444444444444444444444444444444444444444444444444444444444444444444444444444444422222222222222222222222222222222222222222222222222444444444222....
    ..222244444444444444444444444444444444444444444444444444444444444444444444444444444444422222222222222222222222222222222222222222222222222222222222222242222....
    ..222244444444444444444444444444444444444444444444444444444444444444444444444442222222222222222222222..................................22222222222222222222....
    ..2222444444444444444444444444444444444444444444444444444444444444444444422222222222222222222..................................................222222222222....
    ..2222222224444444444444444444444444444444444444444444444444444444422222222222222222222...............................................................22222....
    ..22222222222222224444444444444444444444444444444444444444422222222222222222222222.............................................................................
    ..222222222222222222222222222222244444444444444222222222222222222222222222222..................................................................................
    ......222222222222222222222222222222222222222222222222222222222222222222.......................................................................................
    ............222222222222222222222222222222222222222222222222222222.............................................................................................
    ....................2222222222222222222222222222222222222222...................................................................................................
    ........................................222....................................................................................................................
    ...............................................................................................................................................................
    ...............................................................................................................................................................
    `)
game.onUpdateInterval(1, function () {
    if (menu) {
        scene.setBackgroundImage(assets.image`fondo_menu`)
        if (controller.A.isPressed()) {
            menu = false
        }
    } else if (!(partida)) {
        nivel = 1
        MostrarLore()
        MostrarInstrucciones()
        CreacionPersonajes()
        GenerarNivel()
        partida = true
    } else if (mostrar_minimapa) {
        GenerarMinimapa()
    }
})
