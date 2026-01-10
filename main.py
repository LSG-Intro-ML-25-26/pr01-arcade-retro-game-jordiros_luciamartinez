@namespace
class SpriteKind:
    Decorativo = SpriteKind.create()
    Map = SpriteKind.create()

def on_a_pressed():
    if prota.is_hitting_tile(CollisionDirection.BOTTOM):
        prota.set_velocity(0, -150)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

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

def on_right_pressed():
    animation.run_image_animation(prota,
        assets.animation("""
            heroWalkRight
            """),
        100,
        True)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def CreacionMinimapa():
    global myMinimap, mapStripe
    myMinimap = minimap.minimap(MinimapScale.SIXTEENTH, 1, 15)
    mapStripe = sprites.create(minimap.get_image(myMinimap), SpriteKind.Map)
def CreacionPersonajes():
    global prota
    prota = sprites.create(assets.image("""
            ParadaPerfilDerecho
            """),
        SpriteKind.player)
    controller.move_sprite(prota, 100, 0)
    prota.y = 460
    prota.x = 40
    scene.camera_follow_sprite(prota)
    prota.ay = 200
mapStripe: Sprite = None
myMinimap: minimap.Minimap = None
prota: Sprite = None
info.set_life(3)
nivel = 1
tiles.set_current_tilemap(tilemap("""
    nivel
    """))
CreacionMinimapa()
CreacionPersonajes()

def on_on_update():
    pause(1)
    sprites.destroy(mapStripe)
    CreacionMinimapa()
    minimap.include_sprite(myMinimap, prota, MinimapSpriteScale.DOUBLE)
    mapStripe.set_position(scene.camera_property(CameraProperty.X) + 54,
        scene.camera_property(CameraProperty.Y) - 44)
game.on_update(on_on_update)
