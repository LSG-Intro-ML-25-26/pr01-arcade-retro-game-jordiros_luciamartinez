namespace SpriteKind {
    export const Decorativo = SpriteKind.create()
    export const Map = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(menu)) {
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
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    prota,
    assets.animation`heroWalkLeft`,
    100,
    true
    )
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    animation.runImageAnimation(
    prota,
    assets.animation`heroWalkRight`,
    100,
    false
    )
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    animation.runImageAnimation(
    prota,
    assets.animation`heroWalkLeft`,
    100,
    false
    )
})
function GenerarNivel () {
    if (nivel == 1) {
        scene.setBackgroundImage(assets.image`myImage1`)
        tiles.setCurrentTilemap(tilemap`nivel1`)
        prota.y = 460
        prota.x = 20
    } else if (nivel == 2) {
        scene.setBackgroundImage(assets.image`myImage`)
        tiles.setCurrentTilemap(tilemap`level`)
        prota.y = 60
        prota.x = 20
    } else if (nivel == 3) {
        scene.setBackgroundImage(assets.image`myImage0`)
        tiles.setCurrentTilemap(tilemap`nivel3`)
        prota.y = 460
        prota.x = 20
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
    animation.runImageAnimation(
    prota,
    assets.animation`heroWalkRight`,
    100,
    true
    )
})
function MostrarLore () {
    game.setDialogTextColor(2)
    game.setDialogFrame(img`
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f 
        `)
    game.showLongText("El caballero End debe adentrarse al castillo oscuro y derrotar a los 3 reyes que gobiernan el reino Nochesfera, restaurando así la paz.", DialogLayout.Full)
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (partida) {
        if (mostrar_minimapa) {
            mostrar_minimapa = false
            sprites.destroy(mapStripe)
        } else {
            mostrar_minimapa = true
        }
    }
})
function CreacionPersonajes () {
    info.setLife(3)
    prota = sprites.create(assets.image`ParadaPerfilDerecho`, SpriteKind.Player)
    controller.moveSprite(prota, 100, 0)
    scene.cameraFollowSprite(prota)
    prota.ay = 200
}
let mostrar_minimapa = false
let salto = false
let nivel = 0
let prota: Sprite = null
let myMinimap: minimap.Minimap = null
let mapStripe: Sprite = null
let partida = false
let menu = false
menu = true
partida = false
game.onUpdateInterval(1, function () {
    if (menu) {
        scene.setBackgroundImage(assets.image`myImage4`)
        if (controller.A.isPressed()) {
            menu = false
        }
    } else if (!(partida)) {
        partida = true
        nivel = 3
        MostrarLore()
        CreacionPersonajes()
        GenerarNivel()
    } else {
        if (mostrar_minimapa) {
            GenerarMinimapa()
        }
    }
})
