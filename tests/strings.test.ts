import { Color } from "../src/colorTypes";
import { fromString } from "../src/creators";

describe("Color created from string", () => {
  describe("HEX", () => {
    it("#45A91F", () => {
      const color: Color = fromString("#45A91F");
      expect(color.hex()).toEqual("45A91F");
    });
    it("#X5A9GF", () => {
      expect(() => fromString("#X5A9GF"))
        .toThrowError("\"#X5A9GF\" is not a valid String color value");
    });
  });
  describe("CSS", () => {
    it("magenta", () => {
      const color: Color = fromString("magenta");
      expect(color.hex()).toEqual("ff00ff");
    });
    it("pirple", () => {
      expect(() => fromString("pirple"))
        .toThrowError("\"pirple\" is not a valid String color value");
    });
  });
  describe("RGB", () => {
    it("rgb(123, 54, 211)", () => {
      const color: Color = fromString("rgb(123, 54, 211)");
      expect(color.rgb()).toEqual({r: 123, g: 54, b: 211});
    });
    it("rgb(-12, 276, 11)", () => {
      expect(() => fromString("rgb(-12, 276, 11)"))
        .toThrowError("\"rgb(-12, 276, 11)\" is not a valid String color value");
    });
  });
  describe("HSV", () => {
    it("hsv(189, 50, 61)", () => {
      const color: Color = fromString("hsv(189, 50, 61)");
      expect(color.hsv()).toEqual({h: 189, s: 50, v: 61});
    });
    it("hsv(391, 101, -888)", () => {
      expect(() => fromString("hsv(391, 101, -888)"))
        .toThrowError("\"hsv(391, 101, -888)\" is not a valid String color value");
    });
  });
  describe("HSL", () => {
    it("hsl(189, 50, 61)", () => {
      const color: Color = fromString("hsl(189, 50, 61)");
      expect(color.hsl()).toEqual({h: 189, s: 50, l: 61});
    });
    it("hsl(391, 101, -888)", () => {
      expect(() => fromString("hsl(391, 101, -888)"))
        .toThrowError("\"hsl(391, 101, -888)\" is not a valid String color value");
    });
  });
  describe("CMYK", () => {
    it("cmyk(44, 50, 61, 81)", () => {
      const color: Color = fromString("cmyk(44, 50, 61, 81)");
      expect(color.cmyk()).toEqual({c: 44, m: 50, y: 61, k: 81});
    });
    it("cmyk(-44, 150, 61, 81)", () => {
      expect(() => fromString("cmyk(-44, 150, 61, 81)"))
        .toThrowError("\"cmyk(-44, 150, 61, 81)\" is not a valid String color value");
    });
  });
  describe("XYZ", () => {
    it("xyz(81, 50, 101)", () => {
      const color: Color = fromString("xyz(81, 50, 101)");
      expect(color.xyz()).toEqual({x: 81, y: 50, z: 101});
    });
    it("xyz(95.87, 50, -31)", () => {
      expect(() => fromString("xyz(95.87, 50, -31)"))
        .toThrowError("\"xyz(95.87, 50, -31)\" is not a valid String color value");
    });
  });
  describe("CIELab", () => {
    it("lab(81, -11, 71)", () => {
      const color: Color = fromString("lab(81, -11, 71)");
      expect(color.lab()).toEqual({l: 81, a: -11, b: 71});
    });
    it("lab(132, -211, 71)", () => {
      expect(() => fromString("lab(132, -211, 71)"))
        .toThrowError("\"lab(132, -211, 71)\" is not a valid String color value");
    });
  });
  describe("Bad strings", () => {
    it("not_a_color", () => {
      expect(() => fromString("not_a_color")).toThrowError("\"not_a_color\" is not a valid String color value");
    });
    it("gbr(10, 10, 10)", () => {
      expect(() => fromString("gbr(10, 10, 10)")).toThrowError("\"gbr(10, 10, 10)\" is not a valid String color value");
    });
    it("xyz[10, 10, 10]", () => {
      expect(() => fromString("xyz[10, 10, 10]")).toThrowError("\"xyz[10, 10, 10]\" is not a valid String color value");
    });
    it("hsl(abx, red, ???)", () => {
      expect(() => fromString("hsl(abx, red, ???)")).toThrowError("\"hsl(abx, red, ???)\" is not a valid String color value");
    });
  });
});