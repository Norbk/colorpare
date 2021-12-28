import { Color } from "../src";

describe("A Color created with the default constructor", () => {
  const color = new Color();
  it("is black in RGB", () => {
    expect(color.rgb()).toEqual({r: 0, g: 0, b: 0});
  });
  it("is black in hex string", () => {
    expect(color.hex()).toEqual("000000");
  });
  it("is black in HSL", () => {
    expect(color.hsl()).toEqual({h: 0, s: 0, l: 0});
  });
  it("is black in HSV", () => {
    expect(color.hsv()).toEqual({h: 0, s: 0, v: 0});
  });
  it("is black in CMYK", () => {
    expect(color.cmyk()).toEqual({c: 0, m: 0, y: 0, k: 0});
  });
  it("is black in XYZ", () => {
    expect(color.xyz()).toEqual({x: 0, y: 0, z: 0});
  });
  it("is black in CIELab", () => {
    expect(color.lab()).toEqual({l: 0, a: 0, b: 0});
  });
});