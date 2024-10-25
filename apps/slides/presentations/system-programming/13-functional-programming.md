---
layout: 'intro'
---

# 13. Functional programming

---

# Closure

```rs{*|1|2|3|4|*}
fn  add_one_v1   (x: u32) -> u32 { x + 1 }
let add_one_v2 = |x: u32| -> u32 { x + 1 };
let add_one_v3 = |x|             { x + 1 };
let add_one_v4 = |x|               x + 1  ;
```

---

# Closure

````md magic-move
```rs{*|1|3|4|1|*}
let example_closure = |x| x;

let s = example_closure(String::from("hello"));
let n = example_closure(5);
```
````

---

# Borrowing

````md magic-move
```rs{*|1,4,7|2|6|8|*}
let list = vec![1, 2, 3];
println!("Before defining closure: {list:?}");

let only_borrows = || println!("From closure: {list:?}");

println!("Before calling closure: {list:?}");
only_borrows();
println!("After calling closure: {list:?}");
```

```sh
Before defining closure: [1, 2, 3]
Before calling closure: [1, 2, 3]
From closure: [1, 2, 3]
After calling closure: [1, 2, 3]
```

```rs{*|1,4,6|2|7|*}
let mut list = vec![1, 2, 3];
println!("Before defining closure: {list:?}");

let mut borrows_mutably = || list.push(7);

borrows_mutably();
println!("After calling closure: {list:?}");
```

```sh
Before defining closure: [1, 2, 3]
After calling closure: [1, 2, 3, 7]
```
````

---

# Closure

````md magic-move
```rs
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}
```

```rs
let mut list = [
    Rectangle { width: 10, height: 1 },
    Rectangle { width: 3, height: 5 },
    Rectangle { width: 7, height: 12 },
];
```

```rs
list.sort_by_key(|r| r.width);
println!("{list:#?}");
```

```sh
[
    Rectangle {
        width: 3,
        height: 5,
    },
    Rectangle {
        width: 7,
        height: 12,
    },
    Rectangle {
        width: 10,
        height: 1,
    },
]
```
````

---

# Closure и Iterator

````md magic-move
```rs
let v1 = vec![1, 2, 3];
let v1_iter = v1.iter()
```
```rs{*|1|3|5-7|*}
let v1 = vec![1, 2, 3];

let v1_iter = v1.iter();

for val in v1_iter {
    println!("Got: {val}");
}
```

```rs{*|1|3|5|7|*}
let v1 = vec![1, 2, 3];

let v1_iter = v1.iter();

let total: i32 = v1_iter.sum();

assert_eq!(total, 6);
```
````

---

# Iterator map

````md magic-move
```rs{*|1|3}
let v1: Vec<i32> = vec![1, 2, 3];

v1.iter().map(|x| x + 1);
```

```rs{3|*}
let v1: Vec<i32> = vec![1, 2, 3];

v1.iter().map(|x| x + 1); // Ошибка
```

```rs{*|1|3|5|*}
let v1: Vec<i32> = vec![1, 2, 3];

let v2: Vec<_> = v1.iter().map(|x| x + 1).collect();

assert_eq!(v2, vec![2, 3, 4]);
```
````

---

# Iterator filter

```rs{*|1-6|8|9|10|11|12|*}
let months = vec![
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

let filtered_months = months
    .into_iter()
    .filter(|month| month.len() < 5)
    .filter(|month| month.contains("u"))
    .collect::<Vec<&str>>();

println!("{:?}", filtered_months);
```

---

# Iterator fold

```rs{*|1|3|4|5|*}
let numbers: u32 = vec![1, 2, 3, 4, 5, 6];

let sum = numbers
    .iter()
    .fold(0u32, |sum, val| sum += val);

println!("{sum}")
```

---

# unwrap_or|unwrap_or_else

````md magic-move
```rs
fn func(in_num: u8) -> Option<&'static str> {
    if in_num % 2 != 0 {
        return None;
    }
    Some("even")
}
```

```rs{*|1-2|4-5|*}
let b = func(3)
    .unwrap_or("default")

let a = func(3)
    .unwrap_or_else(|| { "default" });
```
````
