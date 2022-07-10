import { fromHex } from "../src";

describe("Theory ", () => {
  describe("of complementer ", () => {
    it("where #1ECBE1 has the complementer #E1341E", () => {
      expect(fromHex("1ECBE1").complementary().hex()).toEqual("E1341E");
    });
    it("where #DE21C5 has the complementer #21DE3A", () => {
      expect(fromHex("DE21C5").complementary().hex()).toEqual("21DE3A");
    });
    it("where #2CD36F has the complementer #21DE3A", () => {
      expect(fromHex("2CD36F").complementary().hex()).toEqual("D32C90");
    });
  });
  describe("of triadic ", () => {
    it("where #3146CE has the triadic values of #CE3146 and #46CE31", () => {
      const color = fromHex("3146CE");
      const triadic = color.triadic();
      expect(triadic.length).toEqual(2);
      expect(triadic[0].hex()).toEqual("CE3146");
      expect(triadic[1].hex()).toEqual("46CE31");
    });
    it("where #D22DB3 has the triadic values of #B3D22D and #2DB3D2", () => {
      const color = fromHex("D22DB3");
      const triadic = color.triadic();
      expect(triadic.length).toEqual(2);
      expect(triadic[0].hex()).toEqual("B3D22D");
      expect(triadic[1].hex()).toEqual("2DB3D2");
    });
    it("where #CBB134 has the triadic values of #34CBB1 and #B134CB", () => {
      const color = fromHex("CBB134");
      const triadic = color.triadic();
      expect(triadic.length).toEqual(2);
      expect(triadic[0].hex()).toEqual("34CBB1");
      expect(triadic[1].hex()).toEqual("B134CB");
    });
    it("where #2CD36F has the triadic values of #6F2CD3 and #D36F2C", () => {
      const color = fromHex("2CD36F");
      const triadic = color.triadic();
      expect(triadic.length).toEqual(2);
      expect(triadic[0].hex()).toEqual("6F2CD3");
      expect(triadic[1].hex()).toEqual("D36F2C");
    });
  });
  describe("of tetradic ", () => {
    it("where #2CD36F has the tetradic values of, #2C3DD3, #D32C90 and #D3C22C", () => {
      const color = fromHex("2CD36F");
      const tetradic = color.tetradic();
      expect(tetradic.length).toEqual(3);
      expect(tetradic[0].hex()).toEqual("2C3DD3");
      expect(tetradic[1].hex()).toEqual("D32C90");
      expect(tetradic[2].hex()).toEqual("D3C22C");
    });
    it("where #2426DB has the tetradic values of, #DB2482, #DBD924 and #24DB7D", () => {
      const color = fromHex("2426DB");
      const tetradic = color.tetradic();
      expect(tetradic.length).toEqual(3);
      expect(tetradic[0].hex()).toEqual("DB2482");
      expect(tetradic[1].hex()).toEqual("DBD924");
      expect(tetradic[2].hex()).toEqual("24DB7D");
    });
    it("where #DB24B5 has the tetradic values of, #DBA524, #24DB4A and #245ADB", () => {
      const color = fromHex("DB24B5");
      const tetradic = color.tetradic();
      expect(tetradic.length).toEqual(3);
      expect(tetradic[0].hex()).toEqual("DBA624");
      expect(tetradic[1].hex()).toEqual("24DB4A");
      expect(tetradic[2].hex()).toEqual("2459DB");
    });
  });
});