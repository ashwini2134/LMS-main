# Quiz 3

Quizzes are *optional, but encouraged*. They are a good way to test your conceptual understanding before diving into the programming projects.

---

## Question 1

For which of the following will you always find the same solution, even if you re-run the algorithm multiple times?

*Assume a problem where the goal is to minimize a cost function, and every state in the state space has a different cost.*

- Steepest-ascent hill-climbing, each time starting from a different starting state
- Steepest-ascent hill-climbing, each time starting from the same starting state
- Stochastic hill-climbing, each time starting from a different starting state
- Stochastic hill-climbing, each time starting from the same starting state
- Both steepest-ascent and stochastic hill climbing, so long as you always start from the same starting state
- Both steepest-ascent and stochastic hill climbing, each time starting from a different starting state
- No version of hill-climbing will guarantee the same solution every time

<details>
<summary>Click here for the answer to Question 1</summary>

Steepest-ascent hill-climbing, each time starting from the same starting state

</details>

---

## Question 2

What would be a valid objective function for the crop optimization problem?

- 500 * C1 + 400 * C2
- 500 * 10 * C1 + 400 * 4 * C2
- 10 * C1 + 4 * C2
- -3 * C1 - 2 * C2
- C1 + C2

<details>
<summary>Click here for the answer to Question 2</summary>

500 * C1 + 400 * C2

</details>

---

## Question 3

What are the constraints for the crop optimization problem?

- 3 * C1 + 2 * C2 <= 12; C1 <= 10; C2 <= 4
- 3 * C1 + 2 * C2 <= 12; C1 + C2 <= 14
- 3 * C1 <= 10; 2 * C2 <= 4
- C1 + C2 <= 12; C1 + C2 <= 14

<details>
<summary>Click here for the answer to Question 3</summary>

3 * C1 + 2 * C2 <= 12; C1 <= 10; C2 <= 4

</details>

---

## Question 4

After enforcing arc consistency, what are the resulting domains?

- C’s domain is {Mon}, D’s domain is {Mon, Wed}, E’s domain is {Tue, Wed}
- C’s domain is {Mon}, D’s domain is {Tue}, E’s domain is {Wed}
- C’s domain is {Mon}, D’s domain is {Wed}, E’s domain is {Tue}

<details>
<summary>Click here for the answer to Question 4</summary>

C’s domain is {Mon}, D’s domain is {Mon, Wed}, E’s domain is {Tue, Wed}

</details>