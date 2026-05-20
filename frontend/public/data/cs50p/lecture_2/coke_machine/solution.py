def coke():
    n = 50  # Total cost of the Coke
    valid_coins = [25, 10, 5]  # Allowed denominations

    while n > 0:
        print("Amount Due:", n)  
        try:
            m = int(input("Insert Coin: "))  # Convert input to an integer
        except ValueError:
            print("Invalid input. Please enter a valid coin.")
            continue  # Skip to the next loop iteration if input is not a number

        if m in valid_coins:  # Only accept 25, 10, or 5
            n -= m  # Reduce amount due
        else:
            print("Invalid coin. Please insert 25, 10, or 5 cents.")  # Ignore invalid coins

    print("Change Owed:", abs(n))  # If n < 0, give change

coke()
