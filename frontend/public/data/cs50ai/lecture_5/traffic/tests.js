export function runTests(code) {

  if (
    code.includes("load_data")
    &&
    code.includes("get_model")
    &&
    code.includes("Conv2D")
  ) {

    return {
      success: true,
      message: "✅ Traffic CNN tests passed!"
    };
  }

  return {
    success: false,
    message: "❌ Traffic implementation incomplete."
  };
}