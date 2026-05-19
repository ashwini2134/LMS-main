# Lecture 0

Humans reason based on existing knowledge and draw conclusions. The concept of representing knowledge and drawing conclusions from it is also used in AI, and in this lecture we will explore how we can achieve this behavior.

---

# Knowledge-Based Agents

These are agents that reason by operating on internal representations of knowledge.

## What does "reasoning based on knowledge to draw a conclusion" mean?

Let's start answering this with a Harry Potter example. Consider the following sentences:

1. If it didn't rain, Harry visited Hagrid today.
2. Harry visited Hagrid or Dumbledore today, but not both.
3. Harry visited Dumbledore today.

Based on these three sentences, we can answer the question:

> Did it rain today?

Even though none of the individual sentences tells us directly whether it rained today.

### Reasoning

From sentence 3, we know that Harry visited Dumbledore.  
From sentence 2, we know Harry visited either Dumbledore or Hagrid, but not both.

So we conclude:

4. Harry did not visit Hagrid.

Now, from sentence 1:

- If it didn't rain, Harry would have visited Hagrid.

But we know he did **not** visit Hagrid. Therefore:

5. It rained today.

To come to this conclusion, we used logic, and today's lecture explores how AI can use logic to reach new conclusions based on existing information.

---

# Sentence

A sentence is an assertion about the world in a knowledge representation language.  
A sentence is how AI stores knowledge and uses it to infer new information.

---

# Propositional Logic

Propositional logic is based on propositions: statements about the world that can be either **true** or **false**, as in sentences above.

---

## Propositional Symbols

Propositional symbols are most often letters (`P`, `Q`, `R`) used to represent propositions.

---

## Logical Connectives

Logical connectives are logical symbols that connect propositional symbols to reason in a more complex way about the world.

---

### NOT (¬)

**Not (¬)** inverses the truth value of the proposition.

Example:

- `P`: It is raining
- `¬P`: It is not raining

Truth table:

| P     | ¬P    |
|-------|-------|
| false | true  |
| true  | false |

![NOT Operation](/static/images/image_122856940665.png)

---

### AND (∧)

**And (∧)** connects two propositions.  
`P ∧ Q` is true only if both `P` and `Q` are true.

Truth table:

| P     | Q     | P ∧ Q |
|-------|-------|-------|
| false | false | false |
| false | true  | false |
| true  | false | false |
| true  | true  | true  |

![AND Operation](/static/images/image_122856940758.png)

---

### OR (∨)

**Or (∨)** is true as long as at least one argument is true.

Truth table:

| P     | Q     | P ∨ Q |
|-------|-------|-------|
| false | false | false |
| false | true  | true  |
| true  | false | true  |
| true  | true  | true  |

![OR Operation](/static/images/image_122856940803.png)

#### Inclusive OR vs Exclusive OR

There are two types of OR:

- **Inclusive OR**: `P ∨ Q` is true if either is true OR both are true.
- **Exclusive OR (XOR)**: `P ⊕ Q` is false if both are true.

Examples:

- Inclusive OR: "To eat dessert, you must clean your room OR mow the lawn."  
  (If you do both, you still get dessert.)

- Exclusive OR: "For dessert, you can have either cookies OR ice cream."  
  (You cannot have both.)

---

### Implication (→)

**Implication (→)** represents:  
"If P then Q"

Example:

- `P`: It is raining
- `Q`: I'm indoors
- `P → Q`: If it is raining, then I'm indoors.

Here:

- `P` is the **antecedent**
- `Q` is the **consequent**

Truth table:

| P     | Q     | P → Q |
|-------|-------|-------|
| false | false | true  |
| false | true  | true  |
| true  | false | false |
| true  | true  | true  |

If the antecedent is false, the implication is always true (trivially true).

![Implication Operation](/static/images/image_122856941538.png)

---

### Biconditional (↔)

**Biconditional (↔)** means:  
"If and only if"

`P ↔ Q` is equivalent to:

- `(P → Q) ∧ (Q → P)`

Example:

- `P`: It is raining
- `Q`: I'm indoors

Then `P ↔ Q` means:

- If it is raining, I'm indoors.
- If I'm indoors, it is raining.

Truth table:

| P     | Q     | P ↔ Q |
|-------|-------|-------|
| false | false | true  |
| false | true  | false |
| true  | false | false |
| true  | true  | true  |

![Biconditional Operation](/static/images/image_122856941571.png)

---

# Model

A **model** is an assignment of truth values to every proposition.

Example:

- `P`: It is raining
- `Q`: It is Tuesday

Model:

| P     | Q     |
|-------|-------|
| true  | false |

In this model, `P` is true and `Q` is false. A model represents one possible state of the world.

![Model Example](/static/images/image_122856941572.png)

---

# Knowledge Representation

Knowledge representation is the field of AI dedicated to representing information about the world in a form that a computer system can utilize to solve complex tasks. 

## Types of Knowledge

1. **Declarative Knowledge**: Facts about the world
2. **Procedural Knowledge**: How to do things
3. **Meta-knowledge**: Knowledge about knowledge

## Knowledge Representation Schemes

- **Logic**: Propositional logic, first-order logic
- **Rules**: Production rules, if-then statements
- **Frames**: Data structures for representing stereotypical situations
- **Semantic Networks**: Graph-based representations
- **Ontologies**: Formal specifications of conceptualizations

![Knowledge Representation](/static/images/image_122857395167.png)

---

# Inference

Inference is the process of deriving logical conclusions from premises known or assumed to be true.

## Types of Inference

1. **Deduction**: Deriving specific conclusions from general principles
2. **Induction**: Deriving general principles from specific examples  
3. **Abduction**: Finding the best explanation for observed facts

## Inference Rules

- **Modus Ponens**: If P → Q and P, then Q
- **Modus Tollens**: If P → Q and ¬Q, then ¬P
- **Chain Rule**: If P → Q and Q → R, then P → R

---

# Summary

In this lecture, we explored:
- Knowledge-based agents and how they reason
- Propositional logic and logical connectives
- Truth tables and logical reasoning
- Models and knowledge representation
- Inference mechanisms

These concepts form the foundation for building AI systems that can reason about the world and make intelligent decisions based on available information.

---

## Navigation

<div class="navigation-buttons my-4">
  <button data-section="quiz" class="nav-button bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2">
    📝 Quiz
  </button>
  <button data-section="project" class="nav-button bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
    🚀 Project
  </button>
</div>

<div id="quiz-section" class="section-content" style="display: none;">
## [__Quiz 0__](https://cs50.harvard.edu/ai/quizzes/0/#quiz-0)

Quizzes are *optional, but encouraged*. They are a good way to test your conceptual understanding, before diving into the programming projects. Consider each question below, then reveal the answer. If you didn't get it right, consider why you may have had that misunderstanding!

### [__Question 1__](https://cs50.harvard.edu/ai/quizzes/0/#question-1)

__Between depth first search (DFS) and breadth first search (BFS), which will find a shorter path through a maze?__

- DFS will always find a shorter path than BFS
- BFS will always find a shorter path than DFS
- DFS will sometimes, but not always, find a shorter path than BFS
- BFS will sometimes, but not always, find a shorter path than DFS
- Both algorithms will always find paths of the same length

<details class="cursor-pointer my-4 p-4 rounded bg-slate-800 border border-slate-700">
  <summary class="font-bold text-blue-400">Click here for the answer to Question 1</summary>
  <div class="mt-2 text-slate-300">BFS will sometimes, but not always, find a shorter path than DFS</div>
</details>

### [__Question 2__](https://cs50.harvard.edu/ai/quizzes/0/#question-2)

__Consider the below maze. Grey cells indicate walls. A search algorithm was run on this maze, and found the yellow highlighted path from point A to B. In doing so, the red highlighted cells were the states explored but that did not lead to the goal.__

__Of the four search algorithms discussed in lecture — depth-first search, breadth-first search, greedy best-first search with Manhattan distance heuristic, and A* search with Manhattan distance heuristic — which one (or multiple, if multiple are possible) could be the algorithm used?__

- Could only be A*
- Could only be greedy best-first search
- Could only be DFS
- Could only be BFS
- Could be either A* or greedy best-first search
- Could be either DFS or BFS
- Could be any of the four algorithms
- Could not be any of the four algorithms

![Quiz 0, Question 2](https://cs50.harvard.edu/ai/quizzes/images/q0q2.png)

<details class="cursor-pointer my-4 p-4 rounded bg-slate-800 border border-slate-700">
  <summary class="font-bold text-blue-400">Click here for the answer to Question 2</summary>
  <div class="mt-2 text-slate-300">Could only be DFS</div>
</details>

### [__Question 3__](https://cs50.harvard.edu/ai/quizzes/0/#question-3)

__Why is depth-limited minimax sometimes preferable to minimax without a depth limit?__

- Depth-limited minimax can arrive at a decision more quickly because it explores fewer states
- Depth-limited minimax will achieve the same output as minimax without a depth limit, but can sometimes use less memory
- Depth-limited minimax can make a more optimal decision by not exploring states known to be suboptimal
- Depth-limited minimax is never preferable to minimax without a depth limit

<details class="cursor-pointer my-4 p-4 rounded bg-slate-800 border border-slate-700">
  <summary class="font-bold text-blue-400">Click here for the answer to Question 3</summary>
  <div class="mt-2 text-slate-300">Depth-limited minimax can arrive at a decision more quickly because it explores fewer states</div>
</details>

### [__Question 4__](https://cs50.harvard.edu/ai/quizzes/0/#question-4)

__Consider the Minimax tree below, where the green up arrows indicate the MAX player and red down arrows indicate the MIN player. The leaf nodes are each labelled with their value.__

__What is the value of the root node?__

![Quiz 0, Question 4](https://cs50.harvard.edu/ai/quizzes/images/q0q4.png)

<details class="cursor-pointer my-4 p-4 rounded bg-slate-800 border border-slate-700">
  <summary class="font-bold text-blue-400">Click here for the answer to Question 4</summary>
  <div class="mt-2 text-slate-300">5</div>
</details>
</div>

<div id="project-section" class="section-content" style="display: none;">
## [__Project 0__](https://cs50.harvard.edu/ai/projects/0/#project-0)

Projects are *optional, but encouraged*. They are a good way to apply the concepts learned in lecture to practical problems. Consider the following project to deepen your understanding of search algorithms and graph traversal.

### [__Degrees__](https://cs50.harvard.edu/ai/projects/0/degrees/#degrees)

## 📋 [__Solution & Code__](https://www.notion.so/Solution-2eff244881af80d191e7e3615c2bb375?pvs=21)

**Click here to view the complete solution and implementation code on Notion**

---

The latest version of Python you should use in this course is Python 3.12.

Write a program that determines how many "degrees of separation" apart two actors are.

```
$ python degrees.py large
Loading data...
Data loaded.
Name: Emma Watson
Name: Jennifer Lawrence
3 degrees of separation.
1: Emma Watson and Brendan Gleeson starred in Harry Potter and the Order of the Phoenix
2: Brendan Gleeson and Michael Fassbender starred in Trespass Against Us
3: Michael Fassbender and Jennifer Lawrence starred in X-Men: First Class
```

## [__When to Do It__](https://cs50.harvard.edu/ai/projects/0/degrees/#when-to-do-it)

By [Wednesday, July 1, 2026 at 5:29 AM GMT+5:30](https://time.cs50.io/20260630T235900Z)

## [__How to Get Help__](https://cs50.harvard.edu/ai/projects/0/degrees/#how-to-get-help)

1. Ask questions via [Ed](https://cs50.edx.org/ed)!
2. Ask questions via any of CS50's [communities](https://cs50.harvard.edu/ai/communities/)!

## [__Background__](https://cs50.harvard.edu/ai/projects/0/degrees/#background)

According to the [Six Degrees of Kevin Bacon](https://en.wikipedia.org/wiki/Six_Degrees_of_Kevin_Bacon) game, anyone in the Hollywood film industry can be connected to Kevin Bacon within six steps, where each step consists of finding a film that two actors both starred in.

In this problem, we're interested in finding the shortest path between any two actors by choosing a sequence of movies that connects them. For example, the shortest path between Jennifer Lawrence and Tom Hanks is 2: Jennifer Lawrence is connected to Kevin Bacon by both starring in "X-Men: First Class," and Kevin Bacon is connected to Tom Hanks by both starring in "Apollo 13."

We can frame this as a search problem: our states are people. Our actions are movies, which take us from one actor to another (it's true that a movie could take us to multiple different actors, but that's okay for this problem). Our initial state and goal state are defined by the two people we're trying to connect. By using breadth-first search, we can find the shortest path from one actor to another.

## [__Getting Started__](https://cs50.harvard.edu/ai/projects/0/degrees/#getting-started)

- Download the distribution code from https://cdn.cs50.net/ai/2023/x/projects/0/degrees.zip and unzip it.

## [__Understanding__](https://cs50.harvard.edu/ai/projects/0/degrees/#understanding)

The distribution code contains two sets of CSV data files: one set in the `large` directory and one set in the `small` directory. Each contains files with the same names, and the same structure, but `small` is a much smaller dataset for ease of testing and experimentation.

Each dataset consists of three CSV files. A CSV file, if unfamiliar, is just a way of organizing data in a text-based format: each row corresponds to one data entry, with commas in the row separating the values for that entry.

Open up `small/people.csv`. You'll see that each person has a unique `id`, corresponding with their `id` in [IMDb](https://www.imdb.com/)'s database. They also have a `name`, and a `birth` year.

Next, open up `small/movies.csv`. You'll see here that each movie also has a unique `id`, in addition to a `title` and the `year` in which the movie was released.

Now, open up `small/stars.csv`. This file establishes a relationship between the people in `people.csv` and the movies in `movies.csv`. Each row is a pair of a `person_id` value and a `movie_id` value. The first row (ignoring the header), for example, states that the person with id 102 starred in the movie with id 104257. Checking that against `people.csv` and `movies.csv`, you'll find that this line is saying that Kevin Bacon starred in the movie "A Few Good Men."

Next, take a look at `degrees.py`. At the top, several data structures are defined to store information from the CSV files. The `names` dictionary is a way to look up a person by their name: it maps names to a set of corresponding ids (because it's possible that multiple actors have the same name). The `people` dictionary maps each person's id to another dictionary with values for the person's `name`, `birth` year, and the set of all the `movies` they have starred in. And the `movies` dictionary maps each movie's id to another dictionary with values for that movie's `title`, release `year`, and the set of all the movie's `stars`. The `load_data` function loads data from the CSV files into these data structures.

The `main` function in this program first loads data into memory (the directory from which the data is loaded can be specified by a command-line argument). Then, the function prompts the user to type in two names. The `person_id_for_name` function retrieves the id for any person (and handles prompting the user to clarify, in the event that multiple people have the same name). The function then calls the `shortest_path` function to compute the shortest path between the two people, and prints out the path.

The `shortest_path` function, however, is left unimplemented. That's where you come in!

## [__Specification__](https://cs50.harvard.edu/ai/projects/0/degrees/#specification)

Complete the implementation of the `shortest_path` function such that it returns the shortest path from the person with id `source` to the person with id `target`.

- Assuming there is a path from the `source` to the `target`, your function should return a list, where each list item is the next `(movie_id, person_id)` pair in the path from the source to the target. Each pair should be a tuple of two strings.
    - For example, if the return value of `shortest_path` were `[(1, 2), (3, 4)]`, that would mean that the source starred in movie 1 with person 2, person 2 starred in movie 3 with person 4, and person 4 is the target.
- If there are multiple paths of minimum length from the source to the target, your function can return any of them.
- If there is no possible path between two actors, your function should return `None`.
- You may call the `neighbors_for_person` function, which accepts a person's id as input, and returns a set of `(movie_id, person_id)` pairs for all people who starred in a movie with a given person.

You should not modify anything else in the file other than the `shortest_path` function, though you may write additional functions and/or import other Python standard library modules.

## [__Hints__](https://cs50.harvard.edu/ai/projects/0/degrees/#hints)

- While the implementation of search in lecture checks for a goal when a node is popped off the frontier, you can improve the efficiency of your search by checking for a goal as nodes are added to the frontier: if you detect a goal node, no need to add it to the frontier, you can simply return the solution immediately.
- You're welcome to borrow and adapt any code from the lecture examples. We've already provided you with a file `util.py` that contains the lecture implementations for `Node`, `StackFrontier`, and `QueueFrontier`, which you're welcome to use (and modify if you'd like).

## [__Testing__](https://cs50.harvard.edu/ai/projects/0/degrees/#testing)

If you'd like, you can execute the below (after [setting up `check50`](https://cs50.readthedocs.io/projects/check50/en/latest/index.html) on your system) to evaluate the correctness of your code. This isn't obligatory; you can simply submit following the steps at the end of this specification, and these same tests will run on our server. Either way, be sure to compile and test it yourself as well!

```
check50 ai50/projects/2024/x/degrees
```

Execute the below to evaluate the style of your code using `style50`.

```
style50 degrees.py
```

Remember that **you may not import any modules** (other than those in the Python standard library) **other than those explicitly authorized herein**. Doing so will not only prevent `check50` from running, but will also prevent `submit50` from scoring your assignment, since it uses `check50`. If that happens, you've likely imported something disallowed or otherwise modified the distribution code in an unauthorized manner, per the specification. There are certainly tools out there that trivialize some of these projects, but that's not the goal here; you're learning things at a lower level. If we don't say here that you can use them, you can't use them.

## [__How to Submit__](https://cs50.harvard.edu/ai/projects/0/degrees/#how-to-submit)

1. Visit [this link](https://submit.cs50.io/invites/d03c31aef1984c29b5e7b268c3a87b7b), log in with your GitHub account, and click **Authorize cs50**. Then, check the box indicating that you'd like to grant course staff access to your submissions, and click **Join course**.
2. [Install Git](https://git-scm.com/downloads) and, optionally, [install `submit50`](https://cs50.readthedocs.io/submit50/).
3. If you've installed `submit50`, execute
    
    ```
    submit50 ai50/projects/2024/x/degrees
    ```
    
    Otherwise, using Git, push your work to `https://github.com/me50/USERNAME.git`, where `USERNAME` is your GitHub username, on a branch called `ai50/projects/2024/x/degrees`.

If you submit your code directly using Git, rather than `submit50`, **do not** include either the `large` or `small` directories as part of your submission. `submit50` will automatically exclude these for you. You should only include files you are actually instructed to modify per the specification above.

Work should be graded within five minutes. You can then go to https://cs50.me/cs50ai to view your current progress!

## [__Acknowledgements__](https://cs50.harvard.edu/ai/projects/0/degrees/#acknowledgements)

Information courtesy of [IMDb](https://www.imdb.com/). Used with permission.

[Tic-Tac-Toe](https://www.notion.so/Tic-Tac-Toe-2dcf244881af80f1a8d9dcba60df8943?pvs=21)

---

## 🔗 [__Complete Solution & Code Implementation__](https://www.notion.so/Solution-2eff244881af80d191e7e3615c2bb375?pvs=21)

**📁 View the full solution, code examples, and implementation details on Notion**

This link contains:
- Complete working solution for the Degrees project
- Step-by-step code implementation
- Explanation of the BFS algorithm approach
- Sample input/output examples
- Debugging tips and common issues

<details class="cursor-pointer my-4 p-4 rounded bg-slate-800 border border-slate-700">
  <summary class="font-bold text-blue-400">Click here for implementation hints</summary>
  <div class="mt-2 text-slate-300">
    <p><strong>Implementation Tips:</strong></p>
    <ul>
      <li>Use breadth-first search (BFS) to find the shortest path between actors</li>
      <li>Represent the actor-movie relationships as a graph data structure</li>
      <li>Use a queue frontier for BFS implementation</li>
      <li>Keep track of visited nodes to avoid cycles</li>
      <li>Store the path information to reconstruct the solution once found</li>
      <li>Test with the small dataset first before using the large dataset</li>
    </ul>
  </div>
</details>
</div>

---

<script>
// Enhanced navigation function with better error handling
function toggleSection(section) {
  try {
    const quizSection = document.getElementById('quiz-section');
    const projectSection = document.getElementById('project-section');
    
    // Debug: Check if elements exist
    if (!quizSection || !projectSection) {
      console.error('Sections not found');
      return;
    }
    
    // Hide all sections first
    quizSection.style.display = 'none';
    projectSection.style.display = 'none';
    
    // Show the selected section
    if (section === 'quiz') {
      quizSection.style.display = 'block';
      console.log('Showing quiz section');
    } else if (section === 'project') {
      projectSection.style.display = 'block';
      console.log('Showing project section');
    }
  } catch (error) {
    console.error('Error in toggleSection:', error);
  }
}

// Enhanced initialization with multiple approaches
function initializeNavigation() {
  try {
    console.log('Initializing navigation...');
    
    // Method 1: Use data attributes
    const navButtons = document.querySelectorAll('[data-section]');
    console.log('Found navigation buttons:', navButtons.length);
    
    navButtons.forEach(button => {
      const section = button.getAttribute('data-section');
      console.log('Setting up button for section:', section);
      
      button.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Button clicked for section:', section);
        toggleSection(section);
      });
    });
    
    // Method 2: Fallback to onclick if needed
    const quizButton = document.querySelector('button[data-section="quiz"]');
    const projectButton = document.querySelector('button[data-section="project"]');
    
    if (quizButton) {
      quizButton.onclick = function(e) {
        e.preventDefault();
        toggleSection('quiz');
      };
    }
    
    if (projectButton) {
      projectButton.onclick = function(e) {
        e.preventDefault();
        toggleSection('project');
      };
    }
    
    // Show quiz section by default
    setTimeout(() => {
      toggleSection('quiz');
      console.log('Default quiz section shown');
    }, 100);
    
  } catch (error) {
    console.error('Error initializing navigation:', error);
  }
}

// Multiple initialization attempts to ensure it works in different environments
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeNavigation);
} else {
  initializeNavigation();
}

// Backup initialization
window.addEventListener('load', function() {
  setTimeout(initializeNavigation, 200);
});

// Additional backup - try initialization every second for first 5 seconds
let initAttempts = 0;
const initInterval = setInterval(() => {
  initAttempts++;
  if (initAttempts > 5) {
    clearInterval(initInterval);
    return;
  }
  
  const buttons = document.querySelectorAll('[data-section]');
  if (buttons.length > 0) {
    initializeNavigation();
    clearInterval(initInterval);
  }
}, 1000);
</script>
