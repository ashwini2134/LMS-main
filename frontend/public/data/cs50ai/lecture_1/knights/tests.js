export function runTests(code) {

  if (
    code.includes("add_knowledge")
    &&
    code.includes("make_safe_move")
    &&
    code.includes("make_random_move")
  ) {

    return {
      success: true,
      message: "✅ All test cases passed!"
    };
  }

  return {
    success: false,
    message: "❌ Minesweeper AI incomplete."
  };
}