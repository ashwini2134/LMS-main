def camelcase():
    text = input('camelCase: ')
    result = ""

    for i in text:
        if i.isupper():
            result += "_" + i.lower()
        else:
            result += i  
    print("snake_case:", result)

camelcase()
