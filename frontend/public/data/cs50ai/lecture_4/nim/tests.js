export function runTests(code) {

  if (
    code.includes("get_q_value")
    &&
    code.includes("best_future_reward")
    &&
    code.includes("choose_action")
  ) {

    return {
      success: true,
      message: "✅ Nim AI tests passed!"
    };
  }

  return {
    success: false,
    message: "❌ Nim implementation incomplete."
  };
}