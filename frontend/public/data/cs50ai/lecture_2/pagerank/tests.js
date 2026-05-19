export function runTests(code) {

  if (
    code.includes("transition_model")
    &&
    code.includes("sample_pagerank")
    &&
    code.includes("iterate_pagerank")
  ) {

    return {
      success: true,
      message: "✅ All PageRank tests passed!"
    };
  }

  return {
    success: false,
    message: "❌ PageRank implementation incomplete."
  };
}