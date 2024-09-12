---
layout: intro
---

# 03. Управлением потоком программы

---

# Statement/Expression

<hr>

**Statement** - это инструкции, которые выполняют некоторое действие и не возвращают значение.

**Expression** вычисляются до результирующего значения.

````md magic-move
```rs
// Statement
fn main() {
    let y = 6;
}
```

```rs
// Statement
fn main() {
    let x = (let y = 6); // Error
}
```

```rs
// Expression
fn main() {
    let y = {
        let x = 3;
        x + 1
    };

    println!("Значение y: {y}");
}
```

```rs
// Expression
fn main() {
    let y = {
        let x = 3;
        x * 2
    } + {
        let x: i32 = -2;
        x.pow(3_u32)
    }; // -2
}
```

````

---

# Возврат результата выполнения функции

```rs
fn main() {
    let r1 = add(1, 2);
    let r2 = add_explicitly(1, 2);
}

fn add(a: u32, b: u32) -> u32 {
    a + b
}

fn add_explicitly(a: u32, b: u32) -> u32 {
    return a + b;
}
```

---

# Условные конструкции

````md magic-move
```rs{*|5}
fn main() {
    let number = 3;

    if number < 5 {
        println!("условие было true"); // <- выполняется данная ветка
    } else {
        println!("условие было false");
    }
}
```

```rs{*|7}
fn main() {
    let number = 7;

    if number < 5 {
        println!("условие было true");
    } else {
        println!("условие было false"); // <- выполняется данная ветка
    }
}
```

```rs{*|4-5|6-7|8-9|10-11}
fn main() {
    let number = 6;

    if number % 4 == 0 {
        println!("число делится 4");
    } else if number % 3 == 0 {
        println!("число делится 3");
    } else if number % 2 == 0 {
        println!("число делится 2");
    } else {
        println!("число не делится 4, 3, or 2");
    }
}
```
````

---

# Конструкция let if

````md magic-move
```rs{*|3}
fn main() {
    let condition = true;
    let number = if condition { 5 } else { 6 };

    println!("Значение числа: {number}");
}
```

```rs{*|3}
fn main() {
    let condition = true;
    let number = if condition { 5 } else { "6" };

    println!("Значение числа: {number}");
}
```
````

---

# Массивы/Кортежи

````md magic-move
```rs
// Кортежи
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);

    let t0 = tup.0;
    let t1 = tup.1;
    let t2 = tup.2;
}
```

```rs
// Массивы
fn main() {
    let b = [1, 2, 3, 4, 5];
    let a: [i32; 5] = [1, 2, 3, 4, 5];

    let a0 = a[0];
    let a1 = a[1];
}
```
````

---

# Циклические конструкции

````md magic-move
```rs
// while
fn main() {
    let mut number = 3;

    while number != 0 {
        println!("{number}!");

        number -= 1;
    }

    println!("END");
}
```

```rs
// for
fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a {
        println!("значение element: {element}");
    }
}
```

```rs
// for по диапазону
fn main() {
    for number in (1..4).rev() {
        println!("значение element: {number}!");
    }
    println!("END");
}
```
````
