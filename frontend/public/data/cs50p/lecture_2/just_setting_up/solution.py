def twttr():
    vowels = ['a', 'e', 'i', 'o', 'u']
    text = input("Input: ").strip()
    result = ''

    for x in text:
        if x.lower() in vowels:
            continue
        else:
            result += x

    print("Output:", result)  
twttr()
