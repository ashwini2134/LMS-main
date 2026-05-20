def main():
    fruit_calories = {
        "Apple": 130,
        "Avocado": 50,
        "Banana": 110,
        "Cantaloupe": 50,
        "Grapefruit": 60,
        "Grapes": 90,
        "Honeydew Melon": 50,
        "Kiwifruit": 90,
        "Lemon": 15,
        "Lime": 20,
        "Nectarine": 60,
        "Orange": 80,
        "Papaya": 70,
        "Pear": 100,
        "Pineapple": 80,
        "Plum": 70,
        "Strawberries": 50,
        "Sweet Cherries": 100,
        "Tangerine": 50,
        "Watermelon": 80
    }

    user_input = input("Enter a fruit: ")
    fruit = user_input.title()

    if fruit in fruit_calories:
        calories = fruit_calories[fruit]
        print(f"Calories: {calories}")

if __name__ == "__main__":
    main()
