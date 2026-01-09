namespace SpriteKind {
    export const Decorativo = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (prota.isHittingTile(CollisionDirection.Bottom)) {
        prota.setVelocity(0, -150)
    }
})
function CrearMapa () {
    scene.setBackgroundColor(15)
    tiles.setCurrentTilemap(tilemap`nivel`)
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    prota,
    assets.animation`heroWalkLeft`,
    100,
    false
    )
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    prota,
    assets.animation`heroWalkRight`,
    100,
    false
    )
})
function CreacionPersonajes () {
    prota = sprites.create(assets.image`ParadaPerfilDerecho`, SpriteKind.Player)
    controller.moveSprite(prota, 100, 0)
    prota.setStayInScreen(true)
    prota.y = 460
    prota.x = 60
    scene.cameraFollowSprite(prota)
    prota.ay += 200
}
let prota: Sprite = null
CrearMapa()
info.setLife(3)
let nivel = 1
CreacionPersonajes()
