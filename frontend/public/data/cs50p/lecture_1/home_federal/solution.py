def bank():
    n = input('Greeting:').strip().lower()
    if 'hello' in n:
        print('$0')
    elif n.startswith('h'):
        print('$20')
    else:
        print('$100')

bank()
