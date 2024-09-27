---
layout: intro
---

# 06. Enums

---

# Enum

````md magic-move
```rs
enum IpAddrKind {
    V4,
    V6,
}
```
```rs
fn main() {
    let four = IpAddrKind::V4;
    let six = IpAddrKind::V6;
}
```
````

---

# Enum в качестве параметра функции

````md magic-move
```rs
fn route(ip_kind: IpAddrKind) {}
```

```rs
fn main() {
    route(IpAddrKind::V4);
    route(IpAddrKind::V6);
}
```
````

---

# Данные enum

````md magic-move
```rs{*|1-4|6-9|11-19|*}
enum IpAddrKind {
    V4,
    V6,
}

struct IpAddr {
    kind: IpAddrKind,
    address: String,
}

let home = IpAddr {
    kind: IpAddrKind::V4,
    address: String::from("127.0.0.1"),
};

let loopback = IpAddr {
    kind: IpAddrKind::V6,
    address: String::from("::1"),
};
```

```rs{*|1-4|6-8|*}
enum IpAddr {
    V4(String),
    V6(String),
}

let home = IpAddr::V4(String::from("127.0.0.1"));

let loopback = IpAddr::V6(String::from("::1"));
```

```rs{*|2|3|4|5|*}
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
```
````

---

# Option

````md magic-move
```rs{*|2|3|*}
enum Option<T> {
    None,
    Some(T),
}
```

```rs{*|2|4|*}
let x: i8 = 5;
let y: Option<i8> = Some(5);

let sum = x + y; // Ошибка
```
````

---

# match

````md magic-move
```rs{*|1-6|9-14|*}
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
```

```rs{*|3-6|*}
fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => {
            println!("Lucky penny!");
            1
        }
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
```
````

---

# match и данные enum

````md magic-move
```rs{*|2-6|8-13|12|*}
#[derive(Debug)]
enum UsState {
    Alabama,
    Alaska,
    // --snip--
}

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState),
}
```

```rs{*|6-9|*}
fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("State quarter from {state:?}!");
            25
        }
    }
}
```
````

---

# match вместе с Option

```rs{*|2-5|3|4|*}
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

let five = Some(5);
let six = plus_one(five);
let none = plus_one(None);
```

---

# Перечисление всех значений в match

````md magic-move

```rs{*|4|*}
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        Some(i) => Some(i + 1),
    } // Ошибка
}
```

```rs{*|3|4|5|*}
let dice_roll = 9;
match dice_roll {
    3 => add_fancy_hat(),
    7 => remove_fancy_hat(),
    other => move_player(other),
}

fn add_fancy_hat() {}
fn remove_fancy_hat() {}
fn move_player(num_spaces: u8) {}
```

```rs{*|5|*}
let dice_roll = 9;
match dice_roll {
    3 => add_fancy_hat(),
    7 => remove_fancy_hat(),
    _ => reroll(),
}

fn add_fancy_hat() {}
fn remove_fancy_hat() {}
fn reroll() {}
```

```rs{*|5|*}
let dice_roll = 9;
match dice_roll {
    3 => add_fancy_hat(),
    7 => remove_fancy_hat(),
    _ => (),
}

fn add_fancy_hat() {}
fn remove_fancy_hat() {}
```
````

---

# let if enum

````md magic-move
```rs{*|2|3|4|*}
let config_max = Some(3u8);
match config_max {
    Some(max) => println!("The maximum is configured to be {max}"),
    _ => (),
}
```

```rs{*|2|*}
let config_max = Some(3u8);
if let Some(max) = config_max {
    println!("The maximum is configured to be {max}");
}
```

```rs{*|3|4|*}
let mut count = 0;
match coin {
    Coin::Quarter(state) => println!("State quarter from {state:?}!"),
    _ => count += 1,
}
```

```rs{*|2-3|4-5|*}
let mut count = 0;
if let Coin::Quarter(state) = coin {
    println!("State quarter from {state:?}!");
} else {
    count += 1;
}
```
````
