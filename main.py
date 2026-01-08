def CrearMapa():
    scene.set_background_color(12)
    tiles.set_current_tilemap(tilemap("""
        nivel
        """))

def on_right_pressed():
    animation.run_image_animation(prota,
        assets.animation("""
            heroWalkRight
            """),
        100,
        False)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_left_pressed():
    animation.run_image_animation(prota,
        assets.animation("""
            heroWalkLeft
            """),
        100,
        False)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def CreacionPersonajes():
    global prota
    prota = sprites.create(assets.image("""
            ParadaPerfilDerecho
            """),
        SpriteKind.player)
    prota.y = 460
    prota.x = 60
    controller.move_sprite(prota, 100, 100)
    prota.ay = 200
    scene.camera_follow_sprite(prota)
prota: Sprite = None
CrearMapa()
info.set_life(3)
nivel = 1
CreacionPersonajes()