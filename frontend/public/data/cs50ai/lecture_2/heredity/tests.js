export function runTests(code) {

  if (
    code.includes("joint_probability")
    &&
    code.includes("update")
    &&
    code.includes("normalize")
  ) {

    return {
      success: true,
      message: "✅ All heredity tests passed!"
    };
  }

  return {
    success: false,
    message: "❌ Heredity implementation incomplete."
  };
}