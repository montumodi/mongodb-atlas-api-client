import {script} from "@hapi/lab";
export const lab = script();
const {describe, it} = lab;
import {expect} from "@hapi/code";
import getQueryStringFromOptions from "../src/helper.js";

describe("Helper Methods", () => {

  describe("When getQueryStringFromOptions is called with emmpty object", () => {

    it("should return empty string", async () => {
      const result = getQueryStringFromOptions({});
      expect(result).to.equal("");
    });
  });

  describe("When getQueryStringFromOptions is called without httpOptions but other properties", () => {

    it("should return other properties as string", async () => {
      const result = getQueryStringFromOptions({"a": 1, "b": 23, "httpOptions": {"key": "value"}});
      expect(result).to.equal("a=1&b=23");
    });
  });

  describe("When getQueryStringFromOptions is called with only httpOptions", () => {

    it("should return empty string", async () => {
      const result = getQueryStringFromOptions({"httpOptions": {"key": "value"}});
      expect(result).to.equal("");
    });
  });

  describe("When getQueryStringFromOptions is called without any parameters", () => {

    it("should return empty string", async () => {
      const result = getQueryStringFromOptions();
      expect(result).to.equal("");
    });
  });
});
