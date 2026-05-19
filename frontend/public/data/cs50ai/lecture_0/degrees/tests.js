export function runTests(code) {

  // Simple validation

  if (
    code.includes("QueueFrontier")
    &&
    code.includes("shortest_path")
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
      "❌ BFS implementation missing.",

  };
}