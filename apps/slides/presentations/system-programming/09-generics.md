---
layout: intro
---

# 09. Generics

---

# generic

````md magic-move
```rs
fn largest_i32(list: &[i32]) -> &i32 {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}
```

```rs
fn largest_char(list: &[char]) -> &char {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}
```

```rs{1,4}
fn largest_i32(list: &[i32]) -> &i32 {
    // --snip--
}
fn largest_char(list: &[char]) -> &char {
    // --snip--
}
```

```rs
fn largest<T>(list: &[T]) -> &T {/* ... */}
```

```rs
fn largest<T>(list: &[T]) -> &T {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}
```

```rs{5}
fn largest<T>(list: &[T]) -> &T {
    let mut largest = &list[0];

    for item in list {
        if item > largest { // Ошибка
            largest = item;
        }
    }

    largest
}
```
````

---

# generic-структуры

````md magic-move
```rs{*|1-4|*}
struct Point<T> {
    x: T,
    y: T,
}

fn main() {
    let integer = Point { x: 5, y: 10 };
    let float = Point { x: 1.0, y: 4.0 };
}
```

```rs{2,3,7|*}
struct Point<T> {
    x: T,
    y: T,
}

fn main() {
    let wont_work = Point { x: 5, y: 4.0 };
}
```

```rs{1-4|7|8|9|*}
struct Point<T, U> {
    x: T,
    y: U,
}

fn main() {
    let both_integer = Point { x: 5, y: 10 };
    let both_float = Point { x: 1.0, y: 4.0 };
    let integer_and_float = Point { x: 5, y: 4.0 };
}
```
````

---

# generic-enum

```rs{*|1,6|2,3,7,8|*}
enum Option<T> {
    Some(T),
    None,
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

---

# generic-методы (функции)

```rs{*|1-4|6-10|*}
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

fn main() {
    let p = Point { x: 5, y: 10 };

    println!("p.x = {}", p.x());
}
```

---

# реализация методов определенного generic-типа

````md magic-move
```rs
impl Point<f32> {
    fn distance_from_origin(&self) -> f32 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}
```

```rs{*|1|8,11|9,12|*}
impl Point<f32> {
    fn distance_from_origin(&self) -> f32 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}

fn main() {
    let int_point = Point { x: 5 };
    let float_point = Point { x: 5.0 };

    int_point.distance_from_origin() // Ошибка
    float_point.distance_from_origin() // Сработает
}
```

````
---

# Производительность generic


````md magic-move
```rs
let integer = Some(5);
let float = Some(5.0);
```

```rs
enum Option_i32 {
    Some(i32),
    None,
}

enum Option_f64 {
    Some(f64),
    None,
}

fn main() {
    let integer = Option_i32::Some(5);
    let float = Option_f64::Some(5.0);
}
```
````
