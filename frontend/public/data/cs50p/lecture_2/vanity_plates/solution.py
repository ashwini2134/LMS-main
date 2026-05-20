def main():
    plate = input("Plate: ")
    if is_valid(plate):
        print("Valid")
    else:
        print("Invalid")


def is_valid(s):
    x = ['HELLO','CS50','ECTO88','NRVOUS']
    if s in x:
        return True


main()
