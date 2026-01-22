function creacionPersonajes () {
    prota = sprites.create(assets.image`ParadaPerfilDerecho`, SpriteKind.Player)
    controller.moveSprite(prota, 100, 100)
    scene.cameraFollowSprite(prota)
    prota.ay = 300
}
function niveles () {
	
}
let prota: Sprite = null
info.setLife(3)
let nivel = 1
creacionPersonajes()
niveles()
