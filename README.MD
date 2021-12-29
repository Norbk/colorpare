# COOLORS
A typescript/javascript library for color conversion and comparison.

## Usage
### Creating a color object.
Supported spaces: `HEX`, `RGB`, `HSL`, `HSV`, `CMYK`, `XYZ`, `CIELab`.
```js
// default constructor - empty (black) color object
const color = new Color();

// from hex string
const color = Color.fromHex("FA56E1");

// from RGB values (r, g, b = 0 - 255)
const color = Color.fromRgb({r: 10, g: 36, b: 192});

// from HSL values (h = 0 - 360; s, l = 0 - 100)
const color = Color.fromHsl({h: 240, s: 11, l: 37});

// from HSV values (h = 0 - 360; s, v = 0 - 100)
const color = Color.fromHsv({h: 240, s: 11, v: 37});

// from CMYK values (c, m, y, k = 0 - 100)
const color = Color.fromCmyk(c: 3, m: 89, y: 29, k: 4);

// from XYZ values (x = 0 - 95.05; y = 0 - 100; z = 0 - 108.88)
const color = Color.fromXyz(x: 45.3, y: 23.4, z: 78.9);

// from CIELab values (l = 0 - 100; a, b = -128 - 128)
const color = Color.fromLab(l: 74, a = -41.02, b: 81.160;
```
Getting specific color space values:
```js
const color = Color.fromHex("FA56E1");

color.hex() // FA56E1

color.rgb(); // { r: 250, g: 86, b: 225 }

color.hsl(); // { h: 309, s: 94, l: 66 }

color.hsv(); // { h: 309, s: 66, v: 98 }

color.cmyk(); // { c: 0, m: 66, y: 10, k: 2 }

color.xyz(); // { x: 56.34, y: 32.42, z: 74.52 }

color.lab(); // { l: 63.69, a: 76.53, b: -38.86 }

color.all();
/*
{
  hex: 'FA56E1',
  rgb: { r: 250, g: 86, b: 225 },
  hsl: { h: 309, s: 94, l: 66 },
  hsv: { h: 309, s: 66, v: 98 },
  cmyk: { c: 0, m: 66, y: 10, k: 2 },
  xyz: { x: 56.34, y: 32.42, z: 74.52 },
  lab: { l: 63.69, a: 76.53, b: -38.86 }
}
*/
```
## Transformation
You can transform a color based on any of the color spaces (except for HEX, just create a new color with that).
```js
// RGB
color.red(121);
color.green(20);
color.blue(76);

// HSL
color.hueHsl(341);
color.saturationHsl(60);
color.lightness(20);

// HSV
color.hueHsv(341);
color.saturationHsv(60);
color.value(29);

// CMYK
color.cyan(21);
color.magenta(76);
color.yellow(10);
color.black(29);

// XYZ
color.X(91);
color.Y(58);
color.Z(37);

// CIELab
color.L(28);
color.A(-60);
color.B(111);

// You can also chain them together
color.green(244).saturationHsl(20).yellow(10);
```
## Distanse Calculation
For now it supports CIE76, CIE94 and CIE2000.
```js
const color1 = Color.fromHex("FFFFFF");
const color2 = Color.fromHex("000000");

color1.distanceFrom(color2); // {cie76: 100, cie94: 100, cie2000: 100}
```
## What's next
- &#9744; better hex constructor
- &#9744; constructor for default css values like: `yellow`, `black`, `red`, `...`
- &#9744; constructor for css rgb string values like: `rgb(255, 0, 0)`
- &#9744; return function for css rgb

