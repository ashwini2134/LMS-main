from logic import *

rain = Symbol("rain")
hagrid = Symbol("hagrid")
dumbledore = Symbol("dumbledore")

knowledge = And(
    Implication(Not(rain), hagrid),
    Or(hagrid, dumbledore),
    Not(And(hagrid, dumbledore)),
    dumbledore
)

print("Knowledge Base:", knowledge.formula())
print("\nResults:\n")

for symbol in [rain, hagrid, dumbledore]:
    if model_check(knowledge, symbol):
        print(f"{symbol} : YES")
    elif model_check(knowledge, Not(symbol)):
        print(f"{symbol} : NO")
    else:
        print(f"{symbol} : MAYBE")