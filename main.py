@namespace
class SpriteKind:
    Decorativo = SpriteKind.create()
    Map = SpriteKind.create()

def on_a_pressed():
    global salto
    if prota.is_hitting_tile(CollisionDirection.BOTTOM):
        prota.set_velocity(0, -125)
        salto = True
        music.play(music.create_song(hex("""
                00f4010408020105001c000f0a006400f4010a00000400000000000000000000000000000000020c0000000400012704000800012a
                """)),
            music.PlaybackMode.IN_BACKGROUND)
    elif salto == True:
        prota.set_velocity(0, -125)
        salto = False
        music.play(music.create_song(hex("""
                00f4010408020105001c000f0a006400f4010a00000400000000000000000000000000000000020c0000000400012704000800012a
                """)),
            music.PlaybackMode.IN_BACKGROUND)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def GenerarMinimapa():
    global myMinimap, mapStripe
    sprites.destroy(mapStripe)
    myMinimap = minimap.minimap(MinimapScale.SIXTEENTH, 1, 15)
    mapStripe = sprites.create(minimap.get_image(myMinimap), SpriteKind.Map)
    minimap.include_sprite(myMinimap, prota, MinimapSpriteScale.DOUBLE)
    mapStripe.set_position(scene.camera_property(CameraProperty.X) + 54,
        scene.camera_property(CameraProperty.Y) - 44)

def on_left_pressed():
    animation.run_image_animation(prota,
        assets.animation("""
            heroWalkLeft
            """),
        100,
        True)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_right_released():
    animation.run_image_animation(prota,
        assets.animation("""
            heroWalkRight
            """),
        100,
        False)
controller.right.on_event(ControllerButtonEvent.RELEASED, on_right_released)

def on_left_released():
    animation.run_image_animation(prota,
        assets.animation("""
            heroWalkLeft
            """),
        100,
        False)
controller.left.on_event(ControllerButtonEvent.RELEASED, on_left_released)

def GenerarNivel():
    if nivel == 1:
        scene.set_background_image(assets.image("""
            myImage1
            """))
        tiles.set_current_tilemap(tilemap("""
            nivel1
            """))
        prota.y = 460
        prota.x = 20
    elif nivel == 2:
        scene.set_background_image(assets.image("""
            myImage
            """))
        tiles.set_current_tilemap(tilemap("""
            level
            """))
        prota.y = 60
        prota.x = 20
    elif nivel == 3:
        scene.set_background_image(assets.image("""
            myImage0
            """))
        tiles.set_current_tilemap(tilemap("""
            nivel3
            """))
        prota.y = 460
        prota.x = 20

def on_right_pressed():
    animation.run_image_animation(prota,
        assets.animation("""
            heroWalkRight
            """),
        100,
        True)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def CreacionPersonajes():
    global prota
    info.set_life(3)
    prota = sprites.create(assets.image("""
            ParadaPerfilDerecho
            """),
        SpriteKind.player)
    controller.move_sprite(prota, 100, 0)
    scene.camera_follow_sprite(prota)
    prota.ay = 200
myMinimap: minimap.Minimap = None
mapStripe: Sprite = None
salto = False
prota: Sprite = None
nivel = 0
nivel = 1
scene.set_background_image(img("""
fffffffffffffff
fffff1cccffffff
fffff1cccffffff
fffff1cccffffff
fffff1cccffffff
f11111ccd11111f
f1111111111111f
f1111111111111f
f1111111111111f
fffff1111ffffff
fffff1111ffffff
fffff1111ffffff
fffff1111ffffff
fffff1111ffffff
fffffffffffffff

    """))

def on_update_interval():
    pass
game.on_update_interval(1, on_update_interval)
