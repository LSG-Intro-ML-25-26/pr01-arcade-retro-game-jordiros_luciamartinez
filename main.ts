namespace SpriteKind {
    export const Decorativo = SpriteKind.create()
    export const Map = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (prota.isHittingTile(CollisionDirection.Bottom)) {
        prota.setVelocity(0, -150)
    }
})
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
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    prota,
    assets.animation`heroWalkRight`,
    100,
    true
    )
})
function CreacionMinimapa () {
    myMinimap = minimap.minimap(MinimapScale.Sixteenth, 1, 15)
    mapStripe = sprites.create(minimap.getImage(myMinimap), SpriteKind.Map)
}
function CreacionPersonajes () {
    prota = sprites.create(assets.image`ParadaPerfilDerecho`, SpriteKind.Player)
    controller.moveSprite(prota, 100, 0)
    prota.y = 460
    prota.x = 40
    scene.cameraFollowSprite(prota)
    prota.ay = 200
}
let mapStripe: Sprite = null
let myMinimap: minimap.Minimap = null
let prota: Sprite = null
info.setLife(3)
let nivel = 1
tiles.setCurrentTilemap(tilemap`nivel`)
CreacionMinimapa()
CreacionPersonajes()
game.onUpdate(function () {
    pause(1)
    sprites.destroy(mapStripe)
    CreacionMinimapa()
    minimap.includeSprite(myMinimap, prota, MinimapSpriteScale.Double)
    mapStripe.setPosition(scene.cameraProperty(CameraProperty.X) + 54, scene.cameraProperty(CameraProperty.Y) - 44)
})
