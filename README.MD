<h1 align="center" style="font-size: 60px">
</br>
  <img width="500px" src="logo/v1.svg" />
</br>
</h1>
<article>
  <p align="center">
  A typescript/javascript library for color translation, transformation and comparison. Supports ESM and CommonJS.
  </p>
</article>
<article>
<h3 align="center">
Supported Color Spaces
</h3>
<p align="center" >
HEX, CSS, RGB, HSL, HSV, CMYK, XYZ, CIELab
</p>
</article>
<article>
<h3 align="center">
Supported Color Distances
</h3>
<p align="center" >
CIE76, CIE94, CIE2000
</p>
</article>

---

## Install
```
npm i colorpare
```

---

## Color Object (`from...` methods)

To create a `Color` object and use that to compare, transform and translate the color, you can use the `from...` methods. All the supported color spaces and formats have their corresponding ones.

```javascript
import { fromHex, fromCss, fromRgb, fromHsl, fromHsv, fromCmyk, fromXyz, fromCIELab } from "colorpare";

// from hex string
const color = fromHex("FA56E1");

// from CSS
const color = fromCss("yellow");
const color = fromCss("rgb(123, 41, 219)");

// from RGB values (r, g, b = 0 - 255)
const color = fromRgb({r: 10, g: 36, b: 192});

// from HSL values (h = 0 - 360; s, l = 0 - 100)
const color = fromHsl({h: 240, s: 11, l: 37});

// from HSV values (h = 0 - 360; s, v = 0 - 100)
const color = fromHsv({h: 240, s: 11, v: 37});

// from CMYK values (c, m, y, k = 0 - 100)
const color = fromCmyk(c: 3, m: 89, y: 29, k: 4);

// from XYZ values (x = 0 - 95.05; y = 0 - 100; z = 0 - 108.88)
const color = fromXyz(x: 45.3, y: 23.4, z: 78.9);

// from CIELab values (l = 0 - 100; a, b = -128 - 128)
const color = fromLab(l: 74, a = -41.02, b: 81.160);
```
### Conversion
Getting specific color space values from the color object:
```js
const color = fromHex("FA56E1");

color.hex() // FA56E1

color.css() // generic colors names (yellow, black, brown, ...) or rgb string like rgb(32, 88, 51)

color.rgb(); // { r: 250, g: 86, b: 225 }

color.hsl(); // { h: 309, s: 94, l: 66 }

color.hsv(); // { h: 309, s: 66, v: 98 }

color.cmyk(); // { c: 0, m: 66, y: 10, k: 2 }

color.xyz(); // { x: 56.34, y: 32.42, z: 74.52 }

color.lab(); // { l: 63.69, a: 76.53, b: -38.86 }
```
### Transformation
You can transform a color based on any of the color spaces (except for string based like Hex and CSS, just create a new color with those).
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
### Distance Calculation
Compare two color objects to measure the distance between the two.
```js
import { fromHex } from "colorpare";

const color1 = fromHex("FFFFFF");
const color2 = fromHex("000000");

color1.distanceFrom(color2); // {cie76: 100, cie94: 100, cie2000: 100}
```

### Color Theory
Retrieve complementer colors.
```js
import { fromHex } from "colorpare";

const color = fromHex("45EF21");

color.complemetary().hex(); // CB21EF

const [t1, t2] = color.triadic();
console.log(t1.hex(), t2.hex()); // 2145EF EF2145

const [t1, t2, t3] = color.tetradic();
console.log(t1.hex(), t2.hex(), t3.hex()); // 21ACEF CB21EF EF6421
```

---

## Converters (`...to...` functions)
If you don't need the `Color` object and you're only here for the converter functions, you can access them directly. All color spaces have their corresponding `...to...` functions to convert them to all the other spaces.
```js
import { rgbToHsl } from "colorpare";

const hsl = rgbToHsl({r: 34, g: 181, b: 74});

console.log(hsl); // { h: 136.33, s: 68.37, l: 42.16 }
```

---

## Distance calculators
Distance calculator functions are accessible separately as well, but they only takes `CIELab` color values. To use them with other spaces, one needs to use `...to...` converter functions.

```js
import { rgbToCIELab, hsvToCIELab, cie76, cie94, cie2000 } from "colorpare";

const rgb = {r: 123, g: 234, b: 192};
const hsv = {h: 181, s: 52, v: 61};

console.log(cie76(rgbToCIELab(rgb), hsvToCIELab(hsv))); // 37.27
console.log(cie94(rgbToCIELab(rgb), hsvToCIELab(hsv))); // 29.57
console.log(cie2000(rgbToCIELab(rgb), hsvToCIELab(hsv))); // 24.44
```

## Color Theory functions
The standalone theory functions use HSL color space.
```js
const {fromHex, complementary, triadic, tetradic } = require("colorpare");

const color = fromHex("45EF21");
const hsl = color.hsl();

console.log(complementary(hsl)); // { h: 289.51, s: 86.55, l: 53.33 }
console.log(triadic(hsl)); // [ { h: 229.51, s: 86.55, l: 53.33 }, { h: 349.51, s: 86.55, l: 53.33 } ]
console.log(tetradic(hsl)); // [ { h: 199.51, s: 86.55, l: 53.33 }, { h: 289.51, s: 86.55, l: 53.33 }, { h: 19.51, s: 86.55, l: 53.33 } ]
```

## Options
There are a number of options you may pass to the `from...`, or to certain `...to...` functions.

| Option | Default | Description |
| :---: | :---- | :---- |
| cssRgbOnly | false | Sets the converter to avoid using CSS color values (yellow, black, ...) and only use rgb string like `rgb(12, 24, 36)`. |
| roundTo | 2 | Sets certain color values to be rounded to a given digit `(hsl, hsv, xyz, cielab)`. |
| xyzRef | <pre>{<br>  x: 95.047,<br>  y: 100.00,<br>  z: 108.883<br>}</pre> | Set an XYZ reference white value for XYZ and CIELab conversions. |

```js
const color = fromHex("DC143C", {cssRgbOnly: true, roundTo: 3})

console.log(color.css()) // rgb(220, 20, 60) instead of the string: crimson
console.log(color.hsv()) // { h: 348, s: 90.909, v: 86.275 }

console.log(rgbToCIELab({r: 132, g: 47, b: 211}, {roundTo: 4})) // { l: 40.6409, a: 64.1968, b: -68.7356 }
```