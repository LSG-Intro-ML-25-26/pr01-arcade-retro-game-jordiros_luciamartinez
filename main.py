def creacionPersonajes():
    global prota
    prota = sprites.create(assets.image("""
            ParadaPerfilDerecho
            """),
        SpriteKind.player)
    controller.move_sprite(prota, 100, 100)
    scene.camera_follow_sprite(prota)
    prota.ay = 300
def niveles():
    pass
prota: Sprite = None
info.set_life(3)
nivel = 1
creacionPersonajes()
niveles()