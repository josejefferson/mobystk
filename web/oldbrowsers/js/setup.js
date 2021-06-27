const KEY_SEQUENCE = {
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
const ip = localStorage.getItem('joystick.code') || window.location.hostname + ':5000';
const $progress = document.querySelector('.progress');
let setup = false;
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
}

async function start(control, player) {
  if (setup) return alert('Outra configuração está em andamento!');
  if (!KEY_SEQUENCE[control]) return alert('Este emulador não está cadastrado!');
  if (!confirm('Verifique se o seu emulador está preparado para a configuração.\nAperte OK para iniciar!')) return;
  $progress.style.transition = `width ${KEY_SEQUENCE[control].pause}ms linear, background-color .3s ease`;
  setTimeout(() => scrollBottom(), 0);
  setup = true;

  for (i in KEY_SEQUENCE[control].sequence) {
    if (!setup) return setProgress(true);

    if (socket.readyState !== 1) {
      setup = false;
      setProgress(true);
      return setTimeout(() => alert('Conexão perdida, tente novamente!'), 100);
    }

    setProgress(false, i, KEY_SEQUENCE[control].sequence.length);
    sendKey(KEY_SEQUENCE[control].sequence[i], player);
    await wait(KEY_SEQUENCE[control].pause);
  }

  setup = false;
  setTimeout(() => alert('Concluído'), 100);
}

function setProgress(error, pos, max) {
  if (error) {
    $progress.classList.add('error');
  } else {
    $progress.classList.remove('error');
    const p = 1 / (max - 1) * pos;
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

async function wait(sec) {
  return new Promise(resolve => {
    setTimeout(resolve, sec);
  });
}

function scrollToY(y, duration = 0, element = document.scrollingElement) {
  if (element.scrollTop === y) return;
  const cosParameter = (element.scrollTop - y) / 2;
  let scrollCount = 0,
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