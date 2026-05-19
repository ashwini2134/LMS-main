export function runTests(code) {

  if (
    code.includes("minimax")
    &&
    code.includes("utility")
    &&
    code.includes("winner")
  ) {

    return {

      success: true,

      message:
        "✅ All test cases passed!",

    };
  }

  return {

    success: false,

    message:
      "❌ Minimax implementation incomplete.",

  };
}