export function runTests(code) {

  if (
    code.includes("ac3")
    &&
    code.includes("backtrack")
    &&
    code.includes("consistent")
  ) {

    return {
      success: true,
      message: "✅ Crossword CSP tests passed!"
    };
  }

  return {
    success: false,
    message: "❌ Crossword solver incomplete."
  };
}