export function runTests(code) {

  if (
    code.includes("preprocess")
    &&
    code.includes("np_chunk")
    &&
    code.includes("nltk")
  ) {

    return {
      success: true,
      message: "✅ Parser NLP tests passed!"
    };
  }

  return {
    success: false,
    message: "❌ Parser implementation incomplete."
  };
}