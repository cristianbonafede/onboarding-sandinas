const set = (theme) => {
  const rgb = convertToRgb(theme.color);
  const isDark = isColorDark(rgb);
  const accent = isDark
    ? shadeColor(theme.color, 50)
    : shadeColor(theme.color, -50);
  const text = isDark ? '#ffffff' : '#333333';

  sessionStorage.setItem('logo', theme.logo);
  sessionStorage.setItem('background', theme.background);
  sessionStorage.setItem('font-family', theme.fuente);
  sessionStorage.setItem('color-primary', theme.color);
  sessionStorage.setItem('color-accent', accent);
  sessionStorage.setItem('color-text', text);
};

const convertToRgb = (hex) => {
  hex = hex?.trim()?.replace('#', '');
  var rgbHex = hex.match(/.{1,2}/g);
  var rgb =
    `rgb(${parseInt(rgbHex[0], 16)},` +
    `${parseInt(rgbHex[1], 16)},` +
    `${parseInt(rgbHex[2], 16)})`;
  return rgb;
};

const shadeColor = (hex, percent) => {
  let R = parseInt(hex.substring(1, 3), 16);
  let G = parseInt(hex.substring(3, 5), 16);
  let B = parseInt(hex.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  let RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16);
  let GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16);
  let BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16);

  return '#' + RR + GG + BB;
};

const isColorDark = (color) => {
  var r, g, b, hsp;

  if (color.match(/^rgb/)) {
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  return hsp <= 140;
};

export const theme = {
  set: set,
  convertToRgb: convertToRgb,
  shadeColor: shadeColor,
  isColorDark: isColorDark,
};
