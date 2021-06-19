var _localStorage$getItem, _localStorage$getItem2;

window.addEventListener('load', () => {
  document.body.classList.remove('preload');
});

document.oncontextmenu = () => false;

document.forms[0].elements.code.value = localStorage.getItem('joystick.code') || window.location.hostname + ':5000';
document.forms[0].elements.layout.value = localStorage.getItem('joystick.layout');
document.forms[0].elements.player.value = localStorage.getItem('joystick.player');
document.forms[0].elements.invert.checked = localStorage.getItem('joystick.invert') === 'true';
document.forms[0].elements.vibrate.checked = !(localStorage.getItem('joystick.vibrate') === 'false');
document.forms[0].elements.deviceInfo.checked = !(localStorage.getItem('joystick.deviceInfo') === 'false');
// document.forms[0].elements.background.value = localStorage.getItem('joystick.background') || '#000000';
// document.forms[0].elements.color.value = localStorage.getItem('joystick.color') || '#FFFFFF88';
// document.forms[0].elements.border.value = localStorage.getItem('joystick.border') || '#FFFFFF88';
// document.forms[0].elements.active.value = localStorage.getItem('joystick.active') || '#FFFFFF33';
document.forms[0].elements.bgImage.value = localStorage.getItem('joystick.bgImage');
document.forms[0].elements.bgOpacity.value = localStorage.getItem('joystick.bgOpacity') || '0.5';
document.forms[0].elements.bgBlur.value = localStorage.getItem('joystick.bgBlur') || '0';
(_localStorage$getItem = localStorage.getItem('joystick.locked')) === null || _localStorage$getItem === void 0 ? void 0 : (_localStorage$getItem2 = _localStorage$getItem.split(',')) === null || _localStorage$getItem2 === void 0 ? void 0 : _localStorage$getItem2.forEach(e => {
  if (e) document.querySelector(`[name=lock][value="${e}"]`).checked = true;
});

document.forms[0].onsubmit = function (e) {
  e.preventDefault();
  localStorage.setItem('joystick.code', this.elements.code.value);
  localStorage.setItem('joystick.layout', this.elements.layout.value);
  localStorage.setItem('joystick.player', this.elements.player.value);
  localStorage.setItem('joystick.debug', this.elements.debug.checked);
  localStorage.setItem('joystick.invert', this.elements.invert.checked);
  localStorage.setItem('joystick.vibrate', this.elements.vibrate.checked);
  localStorage.setItem('joystick.deviceInfo', this.elements.deviceInfo.checked);
  localStorage.setItem('joystick.background', this.elements.background.value);
  localStorage.setItem('joystick.color', this.elements.color.value);
  localStorage.setItem('joystick.border', this.elements.border.value);
  localStorage.setItem('joystick.active', this.elements.active.value);
  localStorage.setItem('joystick.bgImage', this.elements.bgImage.value);
  localStorage.setItem('joystick.bgOpacity', this.elements.bgOpacity.value);
  localStorage.setItem('joystick.bgBlur', this.elements.bgBlur.value);
  const lockedBtns = [];
  this.elements.lock.forEach(e => {
    if (e.checked) lockedBtns.push(e.value);
  });
  localStorage.setItem('joystick.locked', lockedBtns.join(','));
  location.href = 'joystick.html';
};

// const colors = {
//   background: createPickr('background', '#000'),
//   color: createPickr('color', '#CCC', '88'),
//   border: createPickr('border', '#CCC', '88'),
//   active: createPickr('active', '#AAA', '33')
// };

document.querySelector('.start').oncontextmenu = () => {
  document.querySelector('.links').style.display = 'block';
};

// document.querySelector('.resetColors').onclick = () => {
//   colors.background.setColor('#000');
//   colors.color.setColor('#FFF');
//   colors.border.setColor('#FFF');
//   colors.active.setColor('#FFF');
// };

// function createPickr(el, defaultColor, opacity) {
//   return Pickr.create({
//     el: `.pickr-${el}`,
//     theme: 'nano',
//     default: localStorage.getItem('joystick.' + el) || defaultColor,
//     defaultRepresentation: 'RGBA',
//     comparison: false,
//     autoReposition: true,
//     components: {
//       preview: true,
//       hue: true,
//       interaction: {
//         input: true
//       }
//     },
//     swatches: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#FFFFFF', '#000000']
//   }).on('change', color => {
//     document.forms[0].elements[el].value = color.toRGBA().toString();
//   });
// }