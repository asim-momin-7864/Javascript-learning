# 📘 Fundamentals of Object-Oriented Programming (OOP) in JavaScript

## 🔗 Learning Resources
* [OOPs in JS by Hitesh Choudhary](https://youtu.be/pN-Qmv4zBcI?si=87v3wKme9NLbp-Vm)
* [Magic of Prototype in JavaScript](https://youtu.be/uMI5cNeHTOc?si=A_d5jIeGfiUyUP13)

---

## 🏗️ What is OOP?
Object-Oriented Programming is a **programming paradigm** (a style of organizing code) based on the concept of "objects." Instead of writing a long list of instructions (Procedural), we group data and behavior together into logical units.

### Other Notable Paradigms:
* **Procedural:** Step-by-step execution focusing on functions in order.
* **Functional (FP):** Focuses on pure functions and immutability.
* **Declarative:** Focuses on *what* to do (like SQL), not *how*.
* **Imperative:** Focuses on the state and *how* to change it.

> **Note:** JavaScript is **Multi-Paradigm**. You can mix OOP, Functional, or Procedural styles as needed.

---

## ❓ Why use OOP?
* To structure code effectively and avoid "spaghetti code."
* To make code readable, maintainable, and reusable through blueprints.

---

## 🤖 Does JavaScript have "Classes"?
**Technical Reality:** Historically, **No.** JavaScript is a **Prototype-based** language.
* **ES6 `class` keyword:** Added to help developers from class-based languages (Java, C++).
* **Syntactic Sugar:** Behind the scenes, everything still runs on Prototypes.

---

## 🧱 The Core Building Blocks

### 1. The Object
A collection of properties and methods. In JS, nearly everything (Arrays, Promises, etc.) is an object.

### 2. Object Literal
Creating an object directly using `{}`.

### 3. Key Pillars for Deep Dive
These are the core concepts being explored in this series:
* **Constructor Function:** The blueprint for creating objects.
* **Prototypes:** The mechanism for sharing properties/methods.
* **Classes:** The modern syntax for OOP in JS.
* **Instances:** Using `new` and `this` to create unique object versions.

---

## 🏛️ The Four Pillars of OOP
1.  **Abstraction:** Hiding complex internal details and showing only essentials.
2.  **Encapsulation:** Grouping data and methods while restricting direct access.
3.  **Inheritance:** Passing properties from a parent object to a child.
4.  **Polymorphism:** The ability of one method to take many forms.

---

## 🚀 Advanced JS & OOP Concepts


* **`call` and `this`:** Mastering how execution context changes between functions.
* **`bind`:** Explicitly tying a function to a specific object.
* **Getter & Setter:** Controlling how properties are accessed or changed (prevents Stack Overflow).
* **Lexical Scoping & Closures:** Understanding how JS remembers variables in nested scopes.
* **Static:** Defining methods that belong to the class itself, not the instance.