import { CIELab, CMYK, HSL, HSV, RGB, XYZ } from "../colorTypes";

const toRgb = (value: string): RGB => {
  const [r, g, b] = value.substring(value.indexOf("("), value.indexOf(")")).split(",");
  return {
    r: parseInt(r.trim()),
    g: parseInt(g.trim()),
    b: parseInt(b.trim())
  };
}

const toHsv = (value: string): HSV => {
  const [h, s, v] = value.substring(value.indexOf("("), value.indexOf(")")).split(",");
  return {
    h: parseFloat(h.trim()),
    s: parseFloat(s.trim()),
    v: parseFloat(v.trim())
  };
}

const toHsl = (value: string): HSL => {
  const [h, s, l] = value.substring(value.indexOf("("), value.indexOf(")")).split(",");
  return {
    h: parseFloat(h.trim()),
    s: parseFloat(s.trim()),
    l: parseFloat(l.trim())
  };
}

const toCmyk = (value: string): CMYK => {
  const [c, m, y, k] = value.substring(value.indexOf("("), value.indexOf(")")).split(",");
  return {
    c: parseFloat(c.trim()),
    m: parseFloat(m.trim()),
    y: parseFloat(y.trim()),
    k: parseFloat(k.trim())
  };
}

const toXyz = (value: string) : XYZ => {
  const [x, y, z] = value.substring(value.indexOf("("), value.indexOf(")")).split(",");
  return {
    x: parseFloat(x.trim()),
    y: parseFloat(y.trim()),
    z: parseFloat(z.trim())
  };
}

const toCIELab = (value: string): CIELab => {
  const [l, a, b] = value.substring(value.indexOf("("), value.indexOf(")")).split(",");
  return {
    l: parseFloat(l.trim()),
    a: parseFloat(a.trim()),
    b: parseFloat(b.trim())
  };
}