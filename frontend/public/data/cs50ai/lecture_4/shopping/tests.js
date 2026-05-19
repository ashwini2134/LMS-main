export function runTests(code) {

  if (
    code.includes("load_data")
    &&
    code.includes("train_model")
    &&
    code.includes("evaluate")
  ) {

    return {
      success: true,
      message: "✅ Shopping ML tests passed!"
    };
  }

  return {
    success: false,
    message: "❌ Shopping implementation incomplete."
  };
}