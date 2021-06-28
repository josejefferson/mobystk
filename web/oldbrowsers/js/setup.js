function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var KEY_SEQUENCE = {
  snes: {
    pause: 100,
    sequence: ['padUp', 'padLeft', 'padDown', 'padRight', 'actDown', 'actRight', 'actLeft', 'actUp', 'start', 'select', 'left1', 'right1']
  },
  snesSave: {
    pause: 100,
    sequence: ['[']
  },
  snesLoad: {
    pause: 100,
    sequence: ['F1']
  },
  ps2: {
    pause: 1000,
    sequence: ['select', 'left3', 'right3', 'start', 'padUp', 'padRight', 'padDown', 'padLeft', 'left2', 'right2', 'left1', 'right1', 'actUp', 'actRight', 'actDown', 'actLeft', 'joyLUp', 'joyLRight', 'joyLDown', 'joyLLeft', 'joyRUp', 'joyRRight', 'joyRDown', 'joyRLeft']
  },
  psp: {
    pause: 150,
    sequence: ['UP', // ADJUST FOCUS
    'LEFT', // ADJUST FOCUS
    'RIGHT', // ADJUST FOCUS
    'SPACE', 'padUp', 'DOWN', 'SPACE', 'padDown', 'DOWN', 'SPACE', 'padLeft', 'DOWN', 'SPACE', 'padRight', 'DOWN', 'SPACE', 'actRight', 'DOWN', 'SPACE', 'actDown', 'DOWN', 'SPACE', 'actLeft', 'DOWN', 'SPACE', 'actUp', 'DOWN', 'SPACE', 'start', 'DOWN', 'SPACE', 'select', 'DOWN', 'SPACE', 'left1', 'DOWN', 'SPACE', 'right1', 'DOWN', 'SPACE', 'joyLUp', 'DOWN', 'SPACE', 'joyLDown', 'DOWN', 'SPACE', 'joyLLeft', 'DOWN', 'SPACE', 'joyLRight', 'DOWN', 'DOWN', // SKIP
    'DOWN', // SKIP
    'DOWN', // SKIP
    'DOWN', // SKIP
    'DOWN', // SKIP
    'DOWN', // SKIP
    'SPACE', 'pause', 'DOWN', 'DOWN', // SKIP
    'DOWN', // SKIP
    'DOWN', // SKIP
    'SPACE', 'save', 'DOWN', 'SPACE', 'load', 'ESC' // ESC = SAIR
    ]
  }
};
var ip = localStorage.getItem('joystick.code') || window.location.hostname + ':5000';
var $progress = document.querySelector('.progress');
var setup = false;
var socket = socketConn();

function socketConn() {
  var ws = new WebSocket('ws://' + ip);

  ws.onopen = function (e) {
    document.body.classList.remove('connecting', 'disconnected');
    document.body.classList.add('connected');
  };

  ws.onclose = function (e) {
    document.body.classList.remove('connecting');
    document.body.classList.add('disconnected');
    setTimeout(function () {
      return socket = socketConn();
    }, 3000);
  };

  return ws;
}

function start(_x, _x2) {
  return _start.apply(this, arguments);
}

function _start() {
  _start = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(control, player) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!setup) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", alert('Outra configuração está em andamento!'));

          case 2:
            if (KEY_SEQUENCE[control]) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", alert('Este emulador não está cadastrado!'));

          case 4:
            if (confirm('Verifique se o seu emulador está preparado para a configuração.\nAperte OK para iniciar!')) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            $progress.style.transition = "width ".concat(KEY_SEQUENCE[control].pause, "ms linear, background-color .3s ease");
            setTimeout(function () {
              return scrollBottom();
            }, 0);
            setup = true;
            _context.t0 = regeneratorRuntime.keys(KEY_SEQUENCE[control].sequence);

          case 10:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 24;
              break;
            }

            i = _context.t1.value;

            if (setup) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", setProgress(true));

          case 14:
            if (!(socket.readyState !== 1)) {
              _context.next = 18;
              break;
            }

            setup = false;
            setProgress(true);
            return _context.abrupt("return", setTimeout(function () {
              return alert('Conexão perdida, tente novamente!');
            }, 100));

          case 18:
            setProgress(false, i, KEY_SEQUENCE[control].sequence.length);
            sendKey(KEY_SEQUENCE[control].sequence[i], player);
            _context.next = 22;
            return wait(KEY_SEQUENCE[control].pause);

          case 22:
            _context.next = 10;
            break;

          case 24:
            setup = false;
            setTimeout(function () {
              return alert('Concluído');
            }, 100);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _start.apply(this, arguments);
}

function setProgress(error, pos, max) {
  if (error) {
    $progress.classList.add('error');
  } else {
    $progress.classList.remove('error');
    var p = 1 / (max - 1) * pos;
    $progress.style.width = p * 100 + '%';
  }
}

function sendKey(key, player) {
  var _keymappings$key;

  key = ((_keymappings$key = keymappings[key]) === null || _keymappings$key === void 0 ? void 0 : _keymappings$key[player - 1]) || key;
  console.log(key);
  if (socket.readyState !== 1) return;
  socket.send('T ' + key);
}

function wait(_x3) {
  return _wait.apply(this, arguments);
}

function _wait() {
  _wait = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(sec) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve) {
              setTimeout(resolve, sec);
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _wait.apply(this, arguments);
}

function scrollToY(y) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.scrollingElement;
  if (element.scrollTop === y) return;
  var cosParameter = (element.scrollTop - y) / 2;
  var scrollCount = 0,
      oldTimestamp = null;

  function step(newTimestamp) {
    if (oldTimestamp !== null) {
      scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
      if (scrollCount >= Math.PI) return element.scrollTop = y;
      element.scrollTop = cosParameter + y + cosParameter * Math.cos(scrollCount);
    }

    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
}

function scrollBottom() {
  scrollToY(document.body.scrollHeight, 400);
}