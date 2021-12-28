import { Color } from "../src";

describe("Calculate distance of", () => {
  describe("#00000 from #FFFFFF", () => {
    const color1 = Color.fromHex("000000");
    const color2 = Color.fromHex("FFFFFF");
    it("should be all 100", () => {
      expect(color1.distanceFrom(color2)).toEqual({
        cie76: 100,
        cie94: 100,
        cie2000: 100
      });
    });
  });
  describe("#00000 from #000000", () => {
    const color1 = Color.fromHex("000000");
    const color2 = Color.fromHex("000000");
    it("should be all 0", () => {
      expect(color1.distanceFrom(color2)).toEqual({
        cie76: 0,
        cie94: 0,
        cie2000: 0
      });
    });
  });
  describe("#00000 from #080808", () => {
    const color1 = Color.fromHex("000000");
    const color2 = Color.fromHex("080808");
    it("should be all 0", () => {
      expect(color1.distanceFrom(color2)).toEqual({
        cie76: 2.17,
        cie94: 2.17,
        cie2000: 1.26
      });
    });
  });
});