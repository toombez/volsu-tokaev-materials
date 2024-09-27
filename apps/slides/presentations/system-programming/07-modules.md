---
layout: intro
---

# 07. Модули

---

# Модули

- Пакеты.
- Крейты.
- Модули и **use**.
- Пути.

---

# Структура модуля

````md magic-move
```sh
backyard
├── Cargo.lock
├── Cargo.toml
└── src
    ├── garden
    │   └── vegetables.rs
    ├── garden.rs
    └── main.rs
```

```rs{*|2|4|7|*}
// file: src/main.rs
use crate::garden::vegetables::Asparagus;

pub mod garden;

fn main() {
    let plant = Asparagus {};
    println!("I'm growing {plant:?}!");
}
```

```rs
// file: src/garden.rs
pub mod vegetables;
```

```rs
// file: src/garden/vegetables.rs
#[derive(Debug)]
pub struct Asparagus {}
```
````

---

# Группировка модулей

````md magic-move
```rs{*|1|2|8|3|5|9|11|13|*}
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}

        fn seat_at_table() {}
    }

    mod serving {
        fn take_order() {}

        fn serve_order() {}

        fn take_payment() {}
    }
}
```

```sh
crate
 └── front_of_house
     ├── hosting
     │   ├── add_to_waitlist
     │   └── seat_at_table
     └── serving
         ├── take_order
         ├── serve_order
         └── take_payment
```
````

---

# Пути в модулях

- **Абсолютный путь** - это полный путь, начинающийся с корня ```crate```;

- **Относительный путь** начинается с текущего модуля и использует ```self```, ```super``` или идентификатор в текущем модуле.

---

# Пути в модулях и модификатор доступа

````md magic-move
```rs{*|1|2|3|4|9-10|12-13|*|10,13}
// file: /src/lib.rs
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // Абсолютный путь
    crate::front_of_house::hosting::add_to_waitlist();

    // Относительный путь
    front_of_house::hosting::add_to_waitlist();
}
```

```rs{*|4|*}
// file: src/lib.rs
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // Абсолютный путь
    crate::front_of_house::hosting::add_to_waitlist();

    // Относительный путь
    front_of_house::hosting::add_to_waitlist();
}
```
````

---

# Ключевое слово super

```rs{*|2|4|5|7|*}
// file: src/lib.rs
fn deliver_order() {}

mod back_of_house {
    fn fix_incorrect_order() {
        cook_order();
        super::deliver_order();
    }

    fn cook_order() {}
}
```

---

# Ключевое слово use

````md magic-move
```rs{*|1|3|7|*}
use std;

fn function1() -> std::fmt::Result {
    // --snip--
}

fn function2() -> std::io::Result<()> {
    // --snip--
}
```

```rs{*|1-2|4|8|*}
use std::fmt::Result;
use std::io::Result as IoResult;

fn function1() -> Result {
    // --snip--
}

fn function2() -> IoResult<()> {
    // --snip--
}
```
````
