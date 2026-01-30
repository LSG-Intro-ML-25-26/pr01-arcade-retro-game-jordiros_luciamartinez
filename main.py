@namespace
class SpriteKind:
    Decorativo = SpriteKind.create()
    Map = SpriteKind.create()
    Boss = SpriteKind.create()
    indicador = SpriteKind.create()
def Boss2():
    if prota.x + 30 < arana.x:
        arana.vx = -20
        arana.set_image(assets.image("""
            faraon_izquierda
            """))
    elif prota.x - 30 > arana.x:
        arana.vx = 20
        arana.set_image(assets.image("""
            faraon_derecha
            """))
    else:
        arana.vx = 0
def MostrarFlecha():
    if not (jugador_en_puerta):
        if nivel == 1:
            tiles.place_on_random_tile(flecha_puerta_nivel,
                assets.tile("""
                    ubi_felcha_nivel1
                    """))
            animation.run_image_animation(flecha_puerta_nivel,
                assets.animation("""
                    animacion_flecha_nivel1
                    """),
                150,
                True)
        elif nivel == 2:
            tiles.place_on_random_tile(flecha_puerta_nivel,
                assets.tile("""
                    ubi_flecha_nivel2
                    """))
            animation.run_image_animation(flecha_puerta_nivel,
                assets.animation("""
                    animacion_flecha_nivel2
                    """),
                150,
                True)
        elif nivel == 3:
            tiles.place_on_random_tile(flecha_puerta_nivel,
                assets.tile("""
                    ubi_flecha_nivel3
                    """))
            animation.run_image_animation(flecha_puerta_nivel,
                assets.animation("""
                    animacion_flecha_nivel3
                    """),
                150,
                True)

def on_b_pressed():
    global ataque_prota2
    if partida:
        if characterAnimations.matches_rule(prota, characterAnimations.rule(Predicate.FACING_RIGHT)):
            AtaqueDerecha()
        elif characterAnimations.matches_rule(prota, characterAnimations.rule(Predicate.FACING_LEFT)):
            AtaqueIzquierda()
        ataque_prota2 += 1
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_overlap_tile(sprite3, location3):
    NextLevel()
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        puerta_4_nivel_2
        """),
    on_overlap_tile)

def CreacionPersonaje():
    global prota, ataque_prota, ataque_prota2
    prota = sprites.create(assets.image("""
        player
        """), SpriteKind.player)
    info.set_life(5)
    characterAnimations.set_character_state(prota, characterAnimations.rule(Predicate.FACING_RIGHT))
    controller.move_sprite(prota, 100, 0)
    scene.camera_follow_sprite(prota)
    prota.ay = 200
    ataque_prota = 0
    ataque_prota2 = 0
def EnemigoNivel2():
    global murcielago
    for valor2 in tiles.get_tiles_by_type(assets.tile("""
        amarillo_enemigo
        """)):
        murcielago = sprites.create(assets.image("""
                muercielago_izquierda
                """),
            SpriteKind.enemy)
        characterAnimations.loop_frames(murcielago,
            assets.animation("""
                derecha_fantasma
                """),
            300,
            characterAnimations.rule(Predicate.MOVING_RIGHT))
        characterAnimations.run_frames(murcielago,
            assets.animation("""
                murcielago_animacion_izquierda
                """),
            300,
            characterAnimations.rule(Predicate.NOT_MOVING))
        tiles.place_on_tile(murcielago, valor2)
        tiles.set_tile_at(valor2, assets.tile("""
            pared_nivel_2
            """))
        murcielago.ay = 200
        murcielago.follow(prota, 30)

def on_overlap_tile2(sprite, location):
    NextLevel()
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        puerta_4_nivel_3
        """),
    on_overlap_tile2)

def on_a_pressed():
    if partida:
        SistemaDeDobleSalto()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def GenerarMinimapa():
    global myMinimap, mapStripe
    sprites.destroy(mapStripe)
    myMinimap = minimap.minimap(MinimapScale.SIXTEENTH, 1, 15)
    mapStripe = sprites.create(minimap.get_image(myMinimap), SpriteKind.Map)
    minimap.include_sprite(myMinimap, prota, MinimapSpriteScale.DOUBLE)
    mapStripe.set_position(scene.camera_property(CameraProperty.X) + 54,
        scene.camera_property(CameraProperty.Y) - 44)

def on_on_overlap(sprite5, otherSprite2):
    if sprite5.vy > 0 and sprite5.y < otherSprite2.y:
        sprite5.vy = -70
        statusbar.value += -3
        music.play(music.create_sound_effect(WaveShape.NOISE,
                1259,
                0,
                255,
                255,
                100,
                SoundExpressionEffect.NONE,
                InterpolationCurve.LOGARITHMIC),
            music.PlaybackMode.UNTIL_DONE)
    else:
        info.change_life_by(-1)
        music.play(music.create_song(assets.song("""
                muerte_prota
                """)),
            music.PlaybackMode.IN_BACKGROUND)
    if statusbar.value > 1:
        sprite5.set_position(otherSprite2.x - 50, sprite5.y - 10)
    pause(1000)
sprites.on_overlap(SpriteKind.player, SpriteKind.Boss, on_on_overlap)

def Boss3():
    if prota.x + 30 < leviatan.x:
        leviatan.vx = -20
        leviatan.set_image(assets.image("""
            myImage0
            """))
    elif prota.x - 30 > leviatan.x:
        leviatan.vx = 20
        leviatan.set_image(assets.image("""
            myImage
            """))
    else:
        leviatan.vx = 0

def on_left_pressed():
    global ataque_prota2
    if partida:
        animation.run_image_animation(prota,
            assets.animation("""
                player_left_animated
                """),
            200,
            True)
        characterAnimations.set_character_state(prota, characterAnimations.rule(Predicate.FACING_LEFT))
        ataque_prota2 = 0
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def EnemigoNivel3():
    global tiburon
    for valor3 in tiles.get_tiles_by_type(assets.tile("""
        amarillo_enemigo
        """)):
        tiburon = sprites.create(assets.image("""
                caracol_izquierda
                """),
            SpriteKind.enemy)
        characterAnimations.loop_frames(tiburon,
            assets.animation("""
                pez_animacion_derecha
                """),
            300,
            characterAnimations.rule(Predicate.MOVING_RIGHT))
        characterAnimations.loop_frames(tiburon,
            assets.animation("""
                pez_animacion_izquierda
                """),
            300,
            characterAnimations.rule(Predicate.MOVING_LEFT))
        tiles.place_on_tile(tiburon, valor3)
        tiles.set_tile_at(valor3, assets.tile("""
            pared_nivel_3
            """))
        tiburon.ay = 200
        tiburon.follow(prota, 30)
def ShowFinal():
    global menu, final
    tiles.set_current_tilemap(tilemap("""
        tilemap_vacio
        """))
    if win:
        scene.set_background_image(assets.image("""
            fondo_ganador
            """))
    else:
        scene.set_background_image(assets.image("""
            fondo_perdedor
            """))
    if controller.A.is_pressed():
        menu = True
        final = False
        music.play(music.create_song(assets.song("""
                background_song
                """)),
            music.PlaybackMode.LOOPING_IN_BACKGROUND)
        pause(1000)

def on_right_released():
    if partida:
        animation.run_image_animation(prota,
            assets.animation("""
                player_right_animated
                """),
            200,
            False)
controller.right.on_event(ControllerButtonEvent.RELEASED, on_right_released)

def on_left_released():
    if partida:
        animation.run_image_animation(prota,
            assets.animation("""
                player_left_animated
                """),
            200,
            False)
controller.left.on_event(ControllerButtonEvent.RELEASED, on_left_released)

def on_on_zero(status):
    global boss_actual, flecha_puerta_nivel, nivel_superado, boss_vivo
    if nivel == 1:
        boss_actual = serpiente
        flecha_puerta_nivel = sprites.create(assets.image("""
                flecha_nivel1
                """),
            SpriteKind.indicador)
    elif nivel == 2:
        boss_actual = arana
        flecha_puerta_nivel = sprites.create(assets.image("""
                flecha_nivel2
                """),
            SpriteKind.indicador)
    elif nivel == 3:
        boss_actual = leviatan
        flecha_puerta_nivel = sprites.create(assets.image("""
                flecha_nivel3
                """),
            SpriteKind.indicador)
    music.play(music.create_song(assets.song("""
            ashes
            """)),
        music.PlaybackMode.IN_BACKGROUND)
    sprites.destroy(boss_actual, effects.disintegrate, 500)
    sprites.destroy(statusbar)
    info.set_life(5)
    nivel_superado = True
    boss_vivo = False
statusbars.on_zero(StatusBarKind.enemy_health, on_on_zero)

def GenerarNivel():
    global jugador_en_puerta, nivel_superado, boss_vivo
    jugador_en_puerta = False
    nivel_superado = False
    boss_vivo = True
    sprites.destroy_all_sprites_of_kind(SpriteKind.Boss)
    sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
    sprites.destroy_all_sprites_of_kind(SpriteKind.indicador)
    if nivel == 1:
        scene.set_background_image(assets.image("""
            fondo_nivel_1
            """))
        tiles.set_current_tilemap(tilemap("""
            nivel1
            """))
        prota.set_position(40, 460)
    elif nivel == 2:
        scene.set_background_image(assets.image("""
            fondo_nivel_2
            """))
        tiles.set_current_tilemap(tilemap("""
            nivel0
            """))
        prota.set_position(40, 20)
    elif nivel == 3:
        scene.set_background_image(assets.image("""
            fondo_nivel_3
            """))
        tiles.set_current_tilemap(tilemap("""
            nivel3
            """))
        prota.set_position(40, 460)
    CrearEnemigos()
    BossNivel()
def Boss1():
    if prota.x + 30 < serpiente.x:
        serpiente.vx = -20
        serpiente.set_image(assets.image("""
            leviatan_izquierda
            """))
    elif prota.x - 30 > serpiente.x:
        serpiente.vx = 20
        serpiente.set_image(assets.image("""
            leviatan_derecha
            """))
    else:
        serpiente.vx = 0
def SistemaDeDobleSalto():
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

def on_right_pressed():
    global ataque_prota2
    if partida:
        animation.run_image_animation(prota,
            assets.animation("""
                player_right_animated
                """),
            200,
            True)
        characterAnimations.set_character_state(prota, characterAnimations.rule(Predicate.FACING_RIGHT))
        ataque_prota2 = 0
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def AtaqueIzquierda():
    animation.run_image_animation(prota,
        assets.animation("""
            atacar_izquierda
            """),
        100,
        False)
    music.play(music.create_sound_effect(WaveShape.NOISE,
            1364,
            1,
            255,
            255,
            100,
            SoundExpressionEffect.VIBRATO,
            InterpolationCurve.LOGARITHMIC),
        music.PlaybackMode.IN_BACKGROUND)
    if controller.left.is_pressed():
        pause(100)
        animation.run_image_animation(prota,
            assets.animation("""
                player_left_animated
                """),
            200,
            True)
def NextLevel():
    global jugador_en_puerta, win, nivel, boss_vivo
    if nivel_superado:
        MostrarFlecha()
        jugador_en_puerta = True
        pause(10)
        if controller.up.is_pressed():
            if nivel == 3:
                win = True
                EndGame()
            else:
                music.play(music.create_sound_effect(WaveShape.NOISE,
                        1,
                        452,
                        255,
                        255,
                        500,
                        SoundExpressionEffect.NONE,
                        InterpolationCurve.LINEAR),
                    music.PlaybackMode.UNTIL_DONE)
                nivel += 1
                boss_vivo = True
                GenerarNivel()
def AtaqueDerecha():
    animation.run_image_animation(prota,
        assets.animation("""
            atacar_derecha
            """),
        100,
        False)
    music.play(music.create_sound_effect(WaveShape.NOISE,
            1364,
            1,
            255,
            255,
            100,
            SoundExpressionEffect.VIBRATO,
            InterpolationCurve.LOGARITHMIC),
        music.PlaybackMode.IN_BACKGROUND)
    if controller.right.is_pressed():
        pause(100)
        animation.run_image_animation(prota,
            assets.animation("""
                player_right_animated
                """),
            200,
            True)

def on_overlap_tile3(sprite2, location2):
    NextLevel()
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        puerta_4_nivel_1
        """),
    on_overlap_tile3)

def on_down_pressed():
    global mostrar_minimapa
    if partida:
        if mostrar_minimapa:
            mostrar_minimapa = False
            sprites.destroy(mapStripe)
        else:
            mostrar_minimapa = True
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def EnemigoNivel1():
    global fantasma
    for valor in tiles.get_tiles_by_type(assets.tile("""
        amarillo_enemigo
        """)):
        fantasma = sprites.create(assets.image("""
                fantasma_derecha
                """),
            SpriteKind.enemy)
        characterAnimations.loop_frames(fantasma,
            assets.animation("""
                derecha_fantasma0
                """),
            500,
            characterAnimations.rule(Predicate.MOVING_RIGHT))
        characterAnimations.loop_frames(fantasma,
            assets.animation("""
                izquierda_fantasma
                """),
            500,
            characterAnimations.rule(Predicate.MOVING_LEFT))
        tiles.place_on_tile(fantasma, valor)
        tiles.set_tile_at(valor, assets.tile("""
            pared_nivel_1
            """))
        fantasma.ay = 200
        fantasma.follow(prota, 30)
def MostrarLore():
    game.set_dialog_text_color(2)
    game.set_dialog_frame(assets.image("""
        fondo_1
        """))
    game.show_long_text("Hace mucho tiempo existia un reino pacífico que, un triste dia, fue conquistado por un ejercito demoniaco.",
        DialogLayout.FULL)
    game.show_long_text("Tras mucho tiempo de batalla, este ejercito termino conquistando el reino y rebautizandolo como \"Reino Nochesfera\", controlado por 3 reyes.",
        DialogLayout.FULL)
    game.show_long_text("El 1r rey es Sssiniestro, lider de los fantasmas, quien ha conquistado gran parte del territorio por sus estrategias militares.",
        DialogLayout.FULL)
    game.show_long_text("El 2o rey es Aracno, lider de los murcielagos, quien es responsable de grandes robos de suministros en las aldeas vecinas.",
        DialogLayout.FULL)
    game.show_long_text("El ultimo rey es Anguilo, lider de los tiburones, quien es quien crea el veneno que fluye en los rios de los territorios vecinos.",
        DialogLayout.FULL)
    game.show_long_text("Parecia que no habia esperanza, pero entonces apareció el caballero End, quien juro que derrotaria a los 3 reyes de la Nochesfera.",
        DialogLayout.FULL)
    game.show_long_text("Y asi, End se adentro al castillo de la Nochesfera para derrotar a los 3 reyes malignos.",
        DialogLayout.FULL)
def CrearEnemigos():
    if nivel == 1:
        EnemigoNivel1()
    elif nivel == 2:
        EnemigoNivel2()
    elif nivel == 3:
        EnemigoNivel3()

def on_life_zero():
    if not (win) and not (end_game):
        sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
        EndGame()
info.on_life_zero(on_life_zero)

def on_on_overlap2(sprite4, otherSprite):
    if ataque_prota < ataque_prota2:
        sprites.destroy(otherSprite, effects.ashes, 200)
        music.play(music.create_song(assets.song("""
                ashes
                """)),
            music.PlaybackMode.UNTIL_DONE)
    else:
        sprite4.start_effect(effects.ashes, 1000)
        scene.camera_shake(5, 500)
        info.change_life_by(-1)
        music.play(music.create_song(assets.song("""
                muerte_prota
                """)),
            music.PlaybackMode.IN_BACKGROUND)
        sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
        GenerarNivel()
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

def MostrarInstrucciones():
    game.set_dialog_text_color(2)
    game.set_dialog_frame(assets.image("""
        fondo_1
        """))
    game.show_long_text("A         : Saltar\\nA+A       : Doble salto\\nB         : Atacar\\nDER./IZQ. : Moverse\\nBAJO      : Minimapa\\nARRIBA    : Interactuar",
        DialogLayout.FULL)
def BossNivel():
    global statusbar, serpiente, arana, leviatan
    if boss_vivo == True:
        statusbar = statusbars.create(40, 4, StatusBarKind.enemy_health)
        statusbar.max = 9
        statusbar.set_color(7, 2, 0)
        statusbar.set_status_bar_flag(StatusBarFlag.SMOOTH_TRANSITION, True)
        if nivel == 1:
            serpiente = sprites.create(assets.image("""
                    leviatan_derecha
                    """),
                SpriteKind.Boss)
            serpiente.set_scale(3, ScaleAnchor.MIDDLE)
            tiles.place_on_tile(serpiente, tiles.get_tile_location(40, 5))
            serpiente.ay = 200
            statusbar.attach_to_sprite(serpiente)
        elif nivel == 2:
            arana = sprites.create(assets.image("""
                    faraon_derecha
                    """),
                SpriteKind.Boss)
            arana.set_scale(2.5, ScaleAnchor.MIDDLE)
            tiles.place_on_tile(arana, tiles.get_tile_location(25, 13))
            arana.ay = 200
            statusbar.attach_to_sprite(arana)
        elif nivel == 3:
            leviatan = sprites.create(assets.image("""
                myImage0
                """), SpriteKind.Boss)
            leviatan.set_scale(1.5, ScaleAnchor.MIDDLE)
            tiles.place_on_tile(leviatan, tiles.get_tile_location(44, 22))
            leviatan.ay = 200
            statusbar.attach_to_sprite(leviatan)
def EndGame():
    global end_game, partida, boss_vivo, final, mostrar_minimapa
    music.stop_all_sounds()
    end_game = True
    partida = False
    boss_vivo = False
    final = True
    mostrar_minimapa = False
    info.set_life(0)
    sprites.destroy(mapStripe)
    sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
    sprites.destroy_all_sprites_of_kind(SpriteKind.Boss)
    sprites.destroy_all_sprites_of_kind(SpriteKind.Map)
    sprites.destroy_all_sprites_of_kind(SpriteKind.player)
    if win:
        music.play(music.melody_playable(music.magic_wand),
            music.PlaybackMode.IN_BACKGROUND)
    else:
        music.play(music.melody_playable(music.wawawawaa),
            music.PlaybackMode.IN_BACKGROUND)
end_game = False
fantasma: Sprite = None
salto = False
boss_vivo = False
nivel_superado = False
serpiente: Sprite = None
boss_actual: Sprite = None
tiburon: Sprite = None
leviatan: Sprite = None
statusbar: StatusBarSprite = None
myMinimap: minimap.Minimap = None
mapStripe: Sprite = None
murcielago: Sprite = None
ataque_prota = 0
ataque_prota2 = 0
flecha_puerta_nivel: Sprite = None
nivel = 0
jugador_en_puerta = False
arana: Sprite = None
prota: Sprite = None
mostrar_minimapa = False
win = False
final = False
partida = False
menu = False
music.set_volume(70)
music.play(music.create_song(assets.song("""
        background_song
        """)),
    music.PlaybackMode.LOOPING_IN_BACKGROUND)
menu = True
partida = False
final = False
win = False
mostrar_minimapa = True

def on_on_update():
    if boss_vivo:
        if nivel == 1:
            Boss1()
        elif nivel == 2:
            Boss2()
        elif nivel == 3:
            Boss3()
game.on_update(on_on_update)

def on_update_interval():
    global menu, nivel, win, end_game, partida
    if menu:
        scene.set_background_image(assets.image("""
            fondo_menu2
            """))
        if controller.A.is_pressed():
            menu = False
        elif controller.B.is_pressed():
            MostrarLore()
            pause(1000)
    elif not (partida) and not (final):
        MostrarInstrucciones()
        CreacionPersonaje()
        nivel = 1
        win = False
        end_game = False
        GenerarNivel()
        partida = True
    elif mostrar_minimapa:
        GenerarMinimapa()
    if final:
        ShowFinal()
game.on_update_interval(1, on_update_interval)
