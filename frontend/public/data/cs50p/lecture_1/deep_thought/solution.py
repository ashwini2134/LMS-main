text = input('enter:').strip()
# removes all spaces 
match text:
    case "42" | "Forty Two" | "forty-two" | "forty two" | "FoRty TwO" :
        print('yes')
    case _:
        print('no')
