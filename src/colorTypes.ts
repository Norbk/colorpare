export type RGB = {
  r: number
  g: number
  b: number
}

export type HSL = {
  h: number
  s: number
  l: number
}

export type HSV = {
  h: number
  s: number
  v: number
}

export type CMYK = {
  c: number
  m: number
  y: number
  k: number
}

export type XYZ = {
  x: number
  y: number
  z: number
}

export type CIELab = {
  l: number
  a: number
  b: number
}

export type Options = {
  roundTo?: number
  cssRgbOnly?: boolean
  xyzRef?: XYZ
}

export type Color = {
  hex(): string
  css(): string
  rgb(): RGB
  hsl(): HSL
  hsv(): HSV
  cmyk(): CMYK
  xyz(): XYZ
  lab(): CIELab
  
  red(value: number): Color 
  green(value: number): Color
  blue(value: number): Color

  hueHsl(value: number): Color
  saturationHsl(value: number): Color
  lightness(value: number): Color

  hueHsv(value: number): Color
  saturationHsv(value: number): Color
  value(value: number): Color

  cyan(value: number): Color
  magenta(value: number): Color
  yellow(value: number): Color
  black(value: number): Color

  X(value: number): Color
  Y(value: number): Color
  Z(value: number): Color

  L(value: number): Color
  A(value: number): Color
  B(value: number): Color

  distanceFrom(color: Color): {
    cie76: number
    cie94: number
    cie2000: number
  }

  complementary(): Color
  triadic(): Array<Color>
  tetradic(): Array<Color>
}