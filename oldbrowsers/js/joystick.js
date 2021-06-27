window.onerror = function(err) {
  document.getElementById('errors').innerText += err + '\n'
}

if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
        padString = String(typeof padString !== 'undefined' ? padString : ' ');
        if (this.length >= targetLength) {
            return String(this);
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}

var _locked$split;

const $root = document.documentElement;
const $bgImage = document.querySelector('.backgroundImage');
const $layoutCSS = document.querySelector('.layout');
const $viewport = document.querySelector('meta[name="viewport"]');
const $deviceInfo = document.querySelector('.deviceInfo');
const $battery = $deviceInfo.querySelector('.battery');
const $batteryIcon = $battery.querySelector('.battery-icon');
const $batteryLevel = $battery.querySelector('.battery-level');
const $clock = $deviceInfo.querySelector('.clock');
const $playerNumber = $deviceInfo.querySelector('.player .player-number');
const $layout = $deviceInfo.querySelector('.layout');
const $drive = document.querySelector('.drive');
const ip = localStorage.getItem('joystick.code') || 'localhost:5000';
const layout = localStorage.getItem('joystick.layout');
const player = parseInt(localStorage.getItem('joystick.player')) - 1;
const debug = localStorage.getItem('joystick.debug') === 'true';
const locked = localStorage.getItem('joystick.locked');
const invert = localStorage.getItem('joystick.invert') === 'true';
const vibrate = !(localStorage.getItem('joystick.vibrate') === 'false');
const deviceInfo = !(localStorage.getItem('joystick.deviceInfo') === 'false');
const bgImage = localStorage.getItem('joystick.bgImage');
const bgOpacity = localStorage.getItem('joystick.bgOpacity');
const bgBlur = localStorage.getItem('joystick.bgBlur');
const colorsBackground = localStorage.getItem('joystick.background');
const colorsColor = localStorage.getItem('joystick.color');
const colorsBorder = localStorage.getItem('joystick.border');
const colorsActive = localStorage.getItem('joystick.active');
if (debug) document.body.classList.add('debug');
if (!layout) location.href = 'index.html';
if (invert) document.body.classList.add('invert');
if (bgImage) $bgImage.style.backgroundImage = `url('backgrounds/${bgImage}')`;
if (bgOpacity) $bgImage.style.opacity = bgOpacity;
if (bgBlur) $bgImage.style.filter = `blur(${bgBlur}px)`;
locked === null || locked === void 0 ? void 0 : (_locked$split = locked.split(',')) === null || _locked$split === void 0 ? void 0 : _locked$split.forEach(key => {
  var _document$querySelect;

  if (key) (_document$querySelect = document.querySelector('.' + key)) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.classList.add('lock');
});
if (colorsBackground) $root.style.setProperty('--background', colorsBackground);
if (colorsColor) $root.style.setProperty('--color', colorsColor);
if (colorsBorder) $root.style.setProperty('--border', colorsBorder);
if (colorsActive) $root.style.setProperty('--active', colorsActive); // Carrega o layout

$layoutCSS.href = 'layouts/' + layout + '.css';
const currentTouches = [];
const joysticks = []; // Atualiza a bateria

if (navigator.getBattery) {
  navigator.getBattery().then(b => {
    updateBattery(b);
    b.addEventListener('chargingchange', e => updateBattery(e.target));
    b.addEventListener('levelchange', e => updateBattery(e.target));
  }).catch(console.error);
}

function updateBattery(b) {
  $batteryIcon.classList.remove(...$batteryIcon.classList);
  $batteryIcon.classList.add('mdi');
  const charging = b.charging;
  const level = b.level * 100;
  const roundLevel = Math.round(level / 10) * 10;
  $batteryLevel.innerText = Math.round(level) + '%';

  if (roundLevel === 0) {
    $batteryIcon.classList.add('mdi-battery-outline');
  } else if (roundLevel === 100) {
    $batteryIcon.classList.add('mdi-battery' + (charging ? '-charging-100' : ''));
  } else {
    $batteryIcon.classList.add('mdi-battery-' + (charging ? 'charging-' : '') + roundLevel);
  }
} // Atualiza o relógio


if (!deviceInfo) $deviceInfo.remove();else window.setInterval(updateClock, 1000);
updateClock();

function updateClock() {
  const hours = new Date().getHours().toString().padStart(2, '0');
  const minutes = new Date().getMinutes().toString().padStart(2, '0');
  $clock.innerText = hours + ':' + minutes;
}

$playerNumber.innerText = player + 1;
$layout.innerText = layout.toUpperCase(); // Eventos da página

document.addEventListener('contextmenu', () => false);
window.addEventListener('resize', resizeJoystick);
window.addEventListener('load', () => {
  document.body.classList.remove('preload');
  resizeJoystick();
});
resizeJoystick(); // Conexão do socket

let socket = socketConn();

function socketConn() {
  const ws = new WebSocket('ws://' + ip);

  ws.onopen = e => {
    document.body.classList.remove('connecting', 'disconnected');
    document.body.classList.add('connected');
  };

  ws.onclose = e => {
    document.body.classList.remove('connecting');
    document.body.classList.add('disconnected');
    setTimeout(() => socket = socketConn(), 3000);
  };

  return ws;
} // Início do toque


document.ontouchstart = e => {
  for (const touch of e.changedTouches) {
    var _target, _target$dataset$key;

    let target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!target.classList.contains('joystick') && (!target.classList.contains('touch') || target.classList.contains('active') || target.classList.contains('lock'))) target = null;
    const joystick = (_target = target) !== null && _target !== void 0 && _target.classList.contains('joystick') ? true : false;
    currentTouches.push({
      target,
      touch,
      joystick
    });
    if (!target) continue;
    if (vibrate) navigator.vibrate(15);
    if (joystick) continue;
    target.classList.add('active');
    const keys = (_target$dataset$key = target.dataset.key) === null || _target$dataset$key === void 0 ? void 0 : _target$dataset$key.split(' ');
    keys === null || keys === void 0 ? void 0 : keys.forEach(key => {
      // Diagonal
      if (keys.length) document.querySelectorAll(`[data-key="${key}"]`).forEach(e => {
        e.classList.add('dActive');
      });
    });
    sendCmd(keys);
  }
}; // Movimento do toque


document.ontouchmove = e => {
  for (const touch of e.changedTouches) {
    var _target2, _oldtouch$target, _oldtouch$target2, _keys, _target$dataset$key2, _keys2;

    const i = currentTouches.findIndex(t => {
      return t.touch.identifier === touch.identifier;
    });
    if (i < 0) continue;
    const oldtouch = currentTouches[i];
    if (oldtouch.joystick) continue;
    oldtouch.touch = touch;
    let target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!((_target2 = target) !== null && _target2 !== void 0 && _target2.classList.contains('touch')) || target.classList.contains('joystick')) target = null;
    if (oldtouch.target === target) continue;
    (_oldtouch$target = oldtouch.target) === null || _oldtouch$target === void 0 ? void 0 : _oldtouch$target.classList.remove('active');
    let keys = oldtouch === null || oldtouch === void 0 ? void 0 : (_oldtouch$target2 = oldtouch.target) === null || _oldtouch$target2 === void 0 ? void 0 : _oldtouch$target2.dataset.key.split(' ');
    (_keys = keys) === null || _keys === void 0 ? void 0 : _keys.forEach(key => {
      // Diagonal
      if (keys.length) document.querySelectorAll(`[data-key="${key}"]`).forEach(e => {
        e.classList.remove('dActive');
      });
    });
    sendCmd(keys, true);
    if (target && (!target.classList.contains('touch') || target.classList.contains('active') || target.classList.contains('lock'))) target = null;
    oldtouch.target = target;
    if (!target) continue;
    target.classList.add('active');
    keys = (_target$dataset$key2 = target.dataset.key) === null || _target$dataset$key2 === void 0 ? void 0 : _target$dataset$key2.split(' ');
    (_keys2 = keys) === null || _keys2 === void 0 ? void 0 : _keys2.forEach(key => {
      // Diagonal
      if (keys.length) document.querySelectorAll(`[data-key="${key}"]`).forEach(e => {
        e.classList.add('dActive');
      });
    });
    sendCmd(keys);
    if (vibrate) navigator.vibrate(15);
  }
}; // Fim do toque


document.ontouchend = e => {
  for (const touch of e.changedTouches) {
    const i = currentTouches.findIndex(t => {
      return t.touch.identifier === touch.identifier;
    });
    if (i < 0) continue;

    if (!currentTouches[i].joystick && currentTouches[i].target) {
      var _currentTouches$i$tar;

      currentTouches[i].target.classList.remove('active');
      const keys = (_currentTouches$i$tar = currentTouches[i].target.dataset.key) === null || _currentTouches$i$tar === void 0 ? void 0 : _currentTouches$i$tar.split(' ');
      keys === null || keys === void 0 ? void 0 : keys.forEach(key => {
        // Diagonal
        if (keys.length) document.querySelectorAll(`[data-key="${key}"]`).forEach(e => {
          e.classList.remove('dActive');
        });
      });
      sendCmd(keys, true);
    }

    currentTouches.splice(i, 1);
  }
}; // Clique do mouse


document.onmousedown = e => {
  var _target$dataset$key3;

  if ('ontouchstart' in document.documentElement) return;
  let target = e.target;
  if (!target.classList.contains('joystick') && (!target.classList.contains('touch') || target.classList.contains('active') || target.classList.contains('lock'))) target = null;
  if (!target) return;
  target.classList.add('active');
  const keys = (_target$dataset$key3 = target.dataset.key) === null || _target$dataset$key3 === void 0 ? void 0 : _target$dataset$key3.split(' ');
  keys === null || keys === void 0 ? void 0 : keys.forEach(key => {
    if (keys.length) document.querySelectorAll(`[data-key="${key}"]`).forEach(e => {
      e.classList.add('dActive');
    });
  });
  sendCmd(keys); // Fim do clique

  document.onmouseup = e => {
    var _target$dataset$key4;

    target.classList.remove('active');
    const keys = (_target$dataset$key4 = target.dataset.key) === null || _target$dataset$key4 === void 0 ? void 0 : _target$dataset$key4.split(' ');
    keys === null || keys === void 0 ? void 0 : keys.forEach(key => {
      if (keys.length) document.querySelectorAll(`[data-key="${key}"]`).forEach(e => {
        e.classList.remove('dActive');
      });
    });
    sendCmd(keys, true);
    document.onmouseup = null;
  };
}; // Botões bloqueáveis


document.querySelectorAll('.lock').forEach(el => {
  el.ontouchstart = event;
  el.onmousedown = event;

  function event(e) {
    if ('ontouchstart' in document.documentElement && e.type === 'mousedown') return;
    if (vibrate) navigator.vibrate(15);

    if (el.classList.contains('active')) {
      var _keymappings$el$datas;

      // Ativa o botão
      el.classList.remove('active');
      sendCmd((_keymappings$el$datas = keymappings[el.dataset.key]) === null || _keymappings$el$datas === void 0 ? void 0 : _keymappings$el$datas[player], true);
    } else {
      var _keymappings$el$datas2;

      // Desativa o botão
      el.classList.add('active');
      sendCmd((_keymappings$el$datas2 = keymappings[el.dataset.key]) === null || _keymappings$el$datas2 === void 0 ? void 0 : _keymappings$el$datas2[player]);
    }
  }
}); // Controle por acelerômetro

const driveHTML = $drive.innerHTML;
if (!(location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) $drive.style.display = 'none'; // Ligar/desligar sensor

$drive.onclick = e => {
  const SENSITIVITY = 2; // Sensibilidade do sensor

  if (e.target.classList.contains('active')) {
    e.target.classList.remove('active');
    e.target.innerHTML = driveHTML;
    window.ondevicemotion = null;
    return;
  }

  e.target.classList.add('active');
  e.target.innerHTML = '<i class="mdi mdi-arrow-up"></i>';
  let driveY = 0,
      driveDirection = null; // Detecta os movimentos

  window.ondevicemotion = e => {
    const orientation = e.accelerationIncludingGravity.x >= 0 ? true : false;
    driveY = parseFloat(e.accelerationIncludingGravity.y.toFixed(1));

    if (driveY > SENSITIVITY) {
      direction = orientation ? 'joyLRight' : 'joyLLeft';
    } else if (driveY < -SENSITIVITY) {
      direction = orientation ? 'joyLLeft' : 'joyLRight';
    } else {
      direction = null;
    }

    if (direction === driveDirection) return;

    switch (direction) {
      case 'joyLLeft':
        $drive.innerHTML = '<i class="mdi mdi-undo"></i>';
        break;

      case 'joyLRight':
        $drive.innerHTML = '<i class="mdi mdi-redo"></i>';
        break;

      default:
        $drive.innerHTML = '<i class="mdi mdi-arrow-up"></i>';
    }

    driveDirection = direction;

    if (direction === null) {
      sendCmd(['joyLLeft'], true);
      sendCmd(['joyLRight'], true);
    } else {
      sendCmd([direction]);
    }
  };
}; // Macros


const $recordMacro = document.querySelector('.recordMacro');
const $playMacro = document.querySelector('.playMacro');
let recordingMacro = false;
let lastMacro = [];

$recordMacro.onclick = function () {
  this.classList.toggle('active');
  if (!recordingMacro) lastMacro = [];
  recordingMacro = !recordingMacro;
};

$playMacro.onclick = async function () {
  $playMacro.classList.add('active');

  for (command of lastMacro) {
    if (socket.readyState !== 1) break;
    socket.send(command);
    await new Promise(r => setTimeout(r, 50));
  }

  $playMacro.classList.remove('active');
}; // Atualiza os dados dos joysticks


function updateJoystick(joystick, id, angle, direction) {
  const keys = (joystick.dataset.keys || joystick.dataset.keys).split(' ');

  if (!direction) {
    update('up', false);
    update('left', false);
    update('down', false);
    update('right', false);
    return;
  }

  if (angle > 22.5 && angle < 157.5) update('up', true);else update('up', false);
  if (angle > 112.5 && angle < 247.5) update('left', true);else update('left', false);
  if (angle > 202.5 && angle < 337.5) update('down', true);else update('down', false);
  if (angle > 292.5 || angle < 67.5) update('right', true);else update('right', false); // Atualiza a direção do joystick

  function update(dir, value, key) {
    switch (dir) {
      case 'up':
        key = keys[0];
        break;

      case 'left':
        key = keys[1];
        break;

      case 'down':
        key = keys[2];
        break;

      case 'right':
        key = keys[3];
        break;
    }

    if (joysticks[id][dir] === value) return;
    joysticks[id][dir] = value;
    sendCmd([key], !value);
  }
} // Envia comandos para o servidor


function sendCmd(keys, release = false) {
  if (!keys || !keys.length) return;
  keys = keys.map(key => {
    var _keymappings$key;

    key = (_keymappings$key = keymappings[key]) === null || _keymappings$key === void 0 ? void 0 : _keymappings$key[player];
    return key;
  });
  if (recordingMacro) return lastMacro.push((release ? 'R ' : 'P ') + keys); // Não envia o comando se o websocket não estiver conectado

  if (socket.readyState !== 1) return; // Envia o comando

  socket.send((release ? 'R ' : 'P ') + keys);
} // Corrige bugs do joystick e ajusta à tela


function resizeJoystick() {
  $viewport.setAttribute('content', `width=${width()}, user-scalable=0`);

  for (j in joysticks) joysticks[j].instance.destroy();

  ['joystickL', 'joystickR', 'joystickA'].forEach(id => {
    const $el = document.getElementById(id);
    joysticks[id] = {
      up: false,
      down: false,
      left: false,
      right: false
    };
    joysticks[id].instance = nipplejs.create({
      zone: $el,
      size: 90,
      mode: 'static',
      position: {
        left: '50%',
        top: '50%'
      }
    }).on('move end', (e, d) => {
      var _d$angle;

      updateJoystick($el, id, d === null || d === void 0 ? void 0 : (_d$angle = d.angle) === null || _d$angle === void 0 ? void 0 : _d$angle.degree, d === null || d === void 0 ? void 0 : d.direction);
    });
  });
  document.querySelectorAll('.joystick .nipple .front').forEach(e => {
    e.classList.add('joystick', 'touch');
  });

  function inadequateHeight() {
    if (window.outerWidth >= 640) return window.outerHeight < 360 ? true : false;else return window.outerWidth / window.outerHeight > 1.7777777777777778 ? true : false;
  }

  function width() {
    if (inadequateHeight()) return window.outerWidth * (360 / window.outerHeight);else if (window.outerWidth <= 640) return 640;else return 'device-width';
  }
}