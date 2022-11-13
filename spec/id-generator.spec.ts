import "jasmine";
import { idGenerator } from "../src/id-generator";

describe("Id Generator", () => {
  it("should generate a unique id", () => {
    const idGeneratorInstance = idGenerator();

    const id = idGeneratorInstance.next().value;

    const id2 = idGeneratorInstance.next().value;

    expect(id).not.toEqual(id2);
  });
});
