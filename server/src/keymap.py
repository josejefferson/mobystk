from pynput.keyboard import Key, KeyCode

try:
    from vgamepad import XUSB_BUTTON
except:
    from .helpers import Fallback
    XUSB_BUTTON = Fallback()

# (Keyboard 1, Keyboard 2, Keyboard 3, Keyboard 4, VGamepad)
KEYMAP = {
    "JOYSTICK_1_UP": ("w", "t", KeyCode(58), KeyCode(195), None),
    "JOYSTICK_1_LEFT": ("a", "f", KeyCode(63), KeyCode(196), None),
    "JOYSTICK_1_DOWN": ("s", "g", KeyCode(96), KeyCode(197), None),
    "JOYSTICK_1_RIGHT": ("d", "h", KeyCode(97), KeyCode(198), None),
    "JOYSTICK_2_UP": ("5", "9", KeyCode(98), KeyCode(199), None),
    "JOYSTICK_2_LEFT": ("6", "0", KeyCode(99), KeyCode(200), None),
    "JOYSTICK_2_DOWN": ("7", "[", KeyCode(100), KeyCode(201), None),
    "JOYSTICK_2_RIGHT": ("8", "]", KeyCode(101), KeyCode(202), None),
    "PAD_UP": (Key.up, "z", KeyCode(102), KeyCode(203), XUSB_BUTTON.XUSB_GAMEPAD_DPAD_UP),
    "PAD_LEFT": (Key.left, "x", KeyCode(103), KeyCode(204), XUSB_BUTTON.XUSB_GAMEPAD_DPAD_LEFT),
    "PAD_DOWN": (Key.down, "c", KeyCode(104), KeyCode(205), XUSB_BUTTON.XUSB_GAMEPAD_DPAD_DOWN),
    "PAD_RIGHT": (Key.right, "v", KeyCode(105), KeyCode(206), XUSB_BUTTON.XUSB_GAMEPAD_DPAD_RIGHT),
    "ACTION_Y": ("i", "b", KeyCode(106), KeyCode(207), XUSB_BUTTON.XUSB_GAMEPAD_Y),
    "ACTION_X": ("j", "n", KeyCode(107), KeyCode(208), XUSB_BUTTON.XUSB_GAMEPAD_X),
    "ACTION_A": ("k", "m", KeyCode(108), KeyCode(209), XUSB_BUTTON.XUSB_GAMEPAD_A),
    "ACTION_B": ("l", "ç", KeyCode(109), KeyCode(210), XUSB_BUTTON.XUSB_GAMEPAD_B),
    "L1": ("q", "y", KeyCode(110), KeyCode(211), XUSB_BUTTON.XUSB_GAMEPAD_LEFT_SHOULDER),
    "L2": ("1", "3", KeyCode(111), KeyCode(212), None),
    "L3": (";", Key.f19, KeyCode(187), KeyCode(213), XUSB_BUTTON.XUSB_GAMEPAD_LEFT_THUMB),
    "R1": ("e", "u", KeyCode(188), KeyCode(214), XUSB_BUTTON.XUSB_GAMEPAD_RIGHT_SHOULDER),
    "R2": ("2", "4", KeyCode(189), KeyCode(215), None),
    "R3": ("r", Key.f20, KeyCode(190), KeyCode(216), XUSB_BUTTON.XUSB_GAMEPAD_RIGHT_THUMB),
    "SELECT": (Key.enter, "p", Key.f18, KeyCode(217), XUSB_BUTTON.XUSB_GAMEPAD_BACK),
    "START": (Key.space, "o", KeyCode(231), KeyCode(218), XUSB_BUTTON.XUSB_GAMEPAD_START),
}

GLOBAL_KEYMAP = {
    "PAUSE": Key.esc,
    "LOAD": Key.f1,
    "SAVE": Key.f3,
    "FAST_FORWARD": Key.tab,
    "VOLUME_UP": Key.media_volume_up,
    "VOLUME_DOWN": Key.media_volume_down,
}
