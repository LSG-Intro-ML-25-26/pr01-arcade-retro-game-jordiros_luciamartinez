namespace SpriteKind {
    export const Decorativo = SpriteKind.create()
}
function CrearMapa () {
    scene.setBackgroundColor(15)
    tiles.setCurrentTilemap(tilemap`nivel`)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    prota,
    assets.animation`heroWalkRight`,
    100,
    false
    )
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    prota,
    assets.animation`heroWalkLeft`,
    100,
    false
    )
})
function CreacionPersonajes () {
    prota = sprites.create(assets.image`ParadaPerfilDerecho`, SpriteKind.Player)
    prota.y = 460
    prota.x = 60
    controller.moveSprite(prota, 100, 400)
    prota.ay = 1000
    scene.cameraFollowSprite(prota)
}
let prota: Sprite = null
CrearMapa()
info.setLife(3)
let nivel = 1
CreacionPersonajes()
