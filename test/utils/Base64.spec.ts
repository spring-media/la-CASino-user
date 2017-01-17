import {Base64} from "../../src/utils/Base64";
import {expect} from "chai";

describe("DecodeChecks", (): any => {

    it("should decode valid base 64 encoded data", () => {
        expect(Base64.decode("bG9sYSByZW5udA==")).to.equal("lola rennt");
    });

    it("should not throw an error on empty encoded data", () => {
        expect(Base64.decode("")).to.equal("");
    });

    it("should not throw an error on invalid encoded data", () => {
        expect(Base64.decode('üwäw02mms"!')).to.not.be.null;
    });

    it("should decode base 64 encoded data with specific char encoding", () => {
       expect(Base64.decode("RnJhbsOnb2lz")).to.equal(`François`);
       expect(Base64.decode("Z3J6ZWdyesOzxYJrYQ==")).to.equal(`grzegrzółka`);
    });

});
