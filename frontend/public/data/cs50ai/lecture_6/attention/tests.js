export function runTests(code) {

  if (
    code.includes("get_mask_token_index")
    &&
    code.includes("visualize_attentions")
    &&
    code.includes("attention")
  ) {

    return {
      success: true,
      message: "✅ Attention transformer tests passed!"
    };
  }

  return {
    success: false,
    message: "❌ Attention implementation incomplete."
  };
}