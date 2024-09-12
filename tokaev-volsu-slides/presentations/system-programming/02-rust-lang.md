---
layout: intro
---

# 02. Язык программирования Rust

---

# Файловая структура проекта Rust

````md magic-move
```sh
project
├── cargo.toml
└── src
   ├── main.rs
   └── lib.rs
```

```sh {5}
# Исполняемый файл
project
├── cargo.toml
└── src
   ├── main.rs
   └── lib.rs
```

```sh {6}
# Библиотека
project
├── cargo.toml
└── src
   ├── main.rs
   └── lib.rs
```
````

---

# Типы данных

<v-switch>
<template #0>

## Скалярные типы данных

- Знаковые целочисленные: ```i8```, ```i16```, ```i32```, ```i64``` и ```isize```
- Беззнаковые целочисленные: ```u8```, ```u16```, ```u32```, ```u64``` и ```usize```
- Вещественные: ```f32```, ```f64```
- ```char``` скалярное значение Unicode, например: ```'a'```, ```'α'``` и ```'∞'```
- ```bool```: ```true``` или ```false```
- Единичный тип ```()```, значение которого так же ```()```

</template>
<template #1>

## Составные типы данных

- Массивы: ```[1, 2, 3]```
- Кортежи: ```(1, true)```

</template>
</v-switch>

---

# Объявление переменных и констант

```rs{*|1-2|4-5|6-8|10-11}
// Объявление константных значений
const DAYS_PER_WEEK = 7;

// Объявление переменных значений
let user_input = String::new();

// Объявление переменной с указанием типа данных
let small_number: i8 = 32;

// Объявление мутабельных переменных
let mut cells: vec![vec![1; 5]; 5];
```

<div v-click>
```rs
// Перезапись переменных
let user_input = String::new();
let user_input = my_string.parse::<i32>().unwrap();
```
</div>

---

# Вывод в терминал

````md magic-move
```rs
println!("Hello, world!")
```

```rs
println!("Hello, {}!", "world");
```

```rs
let hello_word = "Hello";
let world_word = "world";

println!("{}, {}!", hello_word, world_word);
```

```rs
println!("{0}: {1} - {0}", "A", "B") // "A: B - A"
```
````

---

# Математические операции

- ```+``` для операций сложения;
- ```-``` для операций вычитания;
- ```*``` для операций умножения;
- ```/``` для операций деления;
- ```%``` для операций нахождения остатка от деления.

````md magic-move
```rs
println!("{}", 1 + 2); // 3
println!("{}", 7 - 9); // -2
println!("{}", 4 * 2); // 8
println!("{}", 9 / 3); // 3
println!("{}", 5 % 2); // 1
```

```rs

println!("{}", 1.add(2)); // 3
println!("{}", 7.sub(9)); // -2
println!("{}", 4.mul(2)); // 8
println!("{}", 9.div(3)); // 3
println!("{}", 5.rem(2)); // 1
println!("{}", 5.pow(2)); // 25
```
````

---

# Анатомия программы и библиотеки

<v-switch>
<template #0>

```rs
fn main() {
    println!("Hello, world!");
}
```

</template>
<template #1>

```sh
project
├── cargo.toml
└── src
   ├── mod_1.rs
   ├── mod_2.rs
   └── lib.rs
```

```rs
// lib.rs

pub mod mod_1;
use mod_2::utility;

pub fn hello() {
    println!("Hello!");
}
```
</template>
</v-switch>

---

# Написание функций

````md magic-move
```rs
fn main() {
    println!("Hello, world!");
}
```

```rs
fn function_name(arg1: Type1, arg2: Type2, /** ...args */): ReturnType {
    // ...

    <ReturnType>
}
```
````
