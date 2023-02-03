import challenge from ".";
describe("CtrlC Challenge", () => {
  test("should copy and paste a string", () => {
    expect(
      challenge(
        "the first[CTRL+C] Coding Challenge was [CTRL+V] string manipulation task"
      )
    ).toBe("the first Coding Challenge was the first string manipulation task");
  });
  test("should only remove commands if CTRL V occurs before CTRL C", () => {
    expect(
      challenge(
        "the first[CTRL+V] Coding Challenge was [CTRL+C] string manipulation task"
      )
    ).toBe("the first Coding Challenge was string manipulation task");
  });
  test("should also support CTRL X to cut string", () => {
    expect(
      challenge(
        "the first[CTRL+X] Coding Challenge was [CTRL+V] string manipulation task"
      )
    ).toBe("Coding Challenge was the first string manipulation task");
  });
  test("should only remove command if CTRL V occurs before CTRL X", () => {
    expect(
      challenge(
        "the first[CTRL+V] Coding Challenge was [CTRL+X] string manipulation task"
      )
    ).toBe("the first Coding Challenge was string manipulation task");
  });
  test("should remove command if it occurs at the start of string", () => {
    expect(
      challenge(
        "[CTRL+X]a fluffy white cloud drifts [CTRL+V][CTRL+C] across the sky, [CTRL+V]"
      )
    ).toBe(
      "a fluffy white cloud drifts across the sky, a fluffy white cloud drifts"
    );
  });
});
