pingSchema = {
    "type": "array",
    "minItems": 2,
    "maxItems": 2,
    "prefixItems": [
        {"type": "string", "enum": ["ping"]},
        {"type": "object", "properties": {"id": {"type": "integer"}}, "required": ["id"]},
    ],
}

handshakeSchema = {
    "type": "array",
    "minItems": 2,
    "maxItems": 2,
    "prefixItems": [
        {"type": "string", "enum": ["handshake"]},
        {
            "type": "object",
            "properties": {
                "player": {"type": "integer", "minimum": 0, "maximum": 3},
                "password": {"type": ["string", "null"]},
                "useKeyboard": {"type": "boolean"},
            },
            "required": ["player", "password", "useKeyboard"],
        },
    ],
}

keyEnum = [
    "JOYSTICK_1_UP",
    "JOYSTICK_1_LEFT",
    "JOYSTICK_1_DOWN",
    "JOYSTICK_1_RIGHT",
    "JOYSTICK_2_UP",
    "JOYSTICK_2_LEFT",
    "JOYSTICK_2_DOWN",
    "JOYSTICK_2_RIGHT",
    "PAD_UP",
    "PAD_LEFT",
    "PAD_DOWN",
    "PAD_RIGHT",
    "ACTION_Y",
    "ACTION_X",
    "ACTION_A",
    "ACTION_B",
    "L1",
    "L2",
    "L3",
    "R1",
    "R2",
    "R3",
    "SELECT",
    "START",
    "PAUSE",
    "LOAD",
    "SAVE",
    "FAST_FORWARD",
    "VOLUME_UP",
    "VOLUME_DOWN",
]

joystickEnum = ["JOYSTICK_1", "JOYSTICK_2"]

keyButtonSchema = {
    "type": "object",
    "properties": {
        "key": {"type": "string", "enum": keyEnum},
        "action": {"type": "string", "enum": ["press", "release"]},
    },
    "required": ["key", "action"],
}

joystickSchema = {
    "type": "object",
    "properties": {
        "key": {"type": "string", "enum": joystickEnum},
        "x": {"type": "number", "minimum": -1, "maximum": 1},
        "y": {"type": "number", "minimum": -1, "maximum": 1},
    },
    "required": ["key", "x", "y"],
}

keySchema = {
    "type": "array",
    "minItems": 2,
    "maxItems": 2,
    "prefixItems": [{"type": "string", "enum": ["key"]}, {"oneOf": [keyButtonSchema, joystickSchema]}],
}

socketSchema = {
    "oneOf": [
        pingSchema,
        handshakeSchema,
        keySchema,
    ]
}
