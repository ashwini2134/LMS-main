def main():
    expression = input("Enter an arithmetic expression: ").strip()

    x, y, z = expression.split(" ")
    x = int(x)
    z = int(z)

    if y == "+":
        result = x + z
    elif y == "-":
        result = x - z
    elif y == "*":
        result = x * z
    elif y == "/":
        result = x / z
    else:
        print("Invalid operator!")
        return

    print(f"{result:.1f}")

main()
