import itertools


class Sentence():
    def evaluate(self, model):
        raise Exception("nothing to evaluate")

    def formula(self):
        return ""

    def symbols(self):
        return set()

    @classmethod
    def validate(cls, sentence):
        if not isinstance(sentence, Sentence):
            raise TypeError("must be a logical sentence")

    @classmethod
    def parenthesize(cls, s):
        def balanced(s):
            count = 0
            for c in s:
                if c == "(":
                    count += 1
                elif c == ")":
                    if count <= 0:
                        return False
                    count -= 1
            return count == 0

        if not len(s) or s.isalpha() or (s[0] == "(" and s[-1] == ")" and balanced(s[1:-1])):
            return s
        else:
            return f"({s})"


class Symbol(Sentence):
    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return self.name

    def evaluate(self, model):
        try:
            return bool(model[self.name])
        except KeyError:
            raise Exception(f"variable {self.name} not in model")

    def formula(self):
        return self.name

    def symbols(self):
        return {self.name}


class Not(Sentence):
    def __init__(self, operand):
        Sentence.validate(operand)
        self.operand = operand

    def __repr__(self):
        return f"Not({self.operand})"

    def evaluate(self, model):
        return not self.operand.evaluate(model)

    def formula(self):
        return f"¬{Sentence.parenthesize(self.operand.formula())}"

    def symbols(self):
        return self.operand.symbols()


class And(Sentence):
    def __init__(self, *conjuncts):
        for conjunct in conjuncts:
            Sentence.validate(conjunct)
        self.conjuncts = list(conjuncts)

    def __repr__(self):
        return f"And({', '.join([str(c) for c in self.conjuncts])})"

    def add(self, conjunct):
        Sentence.validate(conjunct)
        self.conjuncts.append(conjunct)

    def evaluate(self, model):
        return all(conjunct.evaluate(model) for conjunct in self.conjuncts)

    def formula(self):
        if len(self.conjuncts) == 1:
            return self.conjuncts[0].formula()
        return " ∧ ".join([Sentence.parenthesize(c.formula()) for c in self.conjuncts])

    def symbols(self):
        return set.union(*[conjunct.symbols() for conjunct in self.conjuncts])


class Or(Sentence):
    def __init__(self, *disjuncts):
        for disjunct in disjuncts:
            Sentence.validate(disjunct)
        self.disjuncts = list(disjuncts)

    def __repr__(self):
        return f"Or({', '.join([str(d) for d in self.disjuncts])})"

    def evaluate(self, model):
        return any(disjunct.evaluate(model) for disjunct in self.disjuncts)

    def formula(self):
        if len(self.disjuncts) == 1:
            return self.disjuncts[0].formula()
        return " ∨ ".join([Sentence.parenthesize(d.formula()) for d in self.disjuncts])

    def symbols(self):
        return set.union(*[disjunct.symbols() for disjunct in self.disjuncts])


class Implication(Sentence):
    def __init__(self, antecedent, consequent):
        Sentence.validate(antecedent)
        Sentence.validate(consequent)
        self.antecedent = antecedent
        self.consequent = consequent

    def __repr__(self):
        return f"Implication({self.antecedent}, {self.consequent})"

    def evaluate(self, model):
        return (not self.antecedent.evaluate(model)) or self.consequent.evaluate(model)

    def formula(self):
        return f"{Sentence.parenthesize(self.antecedent.formula())} → {Sentence.parenthesize(self.consequent.formula())}"

    def symbols(self):
        return set.union(self.antecedent.symbols(), self.consequent.symbols())


class Biconditional(Sentence):
    def __init__(self, left, right):
        Sentence.validate(left)
        Sentence.validate(right)
        self.left = left
        self.right = right

    def __repr__(self):
        return f"Biconditional({self.left}, {self.right})"

    def evaluate(self, model):
        return self.left.evaluate(model) == self.right.evaluate(model)

    def formula(self):
        return f"{Sentence.parenthesize(self.left.formula())} ↔ {Sentence.parenthesize(self.right.formula())}"

    def symbols(self):
        return set.union(self.left.symbols(), self.right.symbols())


def model_check(knowledge, query):
    def check_all(knowledge, query, symbols, model):
        if not symbols:
            if knowledge.evaluate(model):
                return query.evaluate(model)
            return True

        remaining = symbols.copy()
        p = remaining.pop()

        model_true = model.copy()
        model_true[p] = True

        model_false = model.copy()
        model_false[p] = False

        return (check_all(knowledge, query, remaining, model_true) and
                check_all(knowledge, query, remaining, model_false))

    symbols = list(knowledge.symbols().union(query.symbols()))
    return check_all(knowledge, query, symbols, dict())