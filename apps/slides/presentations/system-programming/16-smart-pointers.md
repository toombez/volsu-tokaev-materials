---
layout: 'intro'
---

# 16. Smart pointers

---

# Smart point

1. `Box<T>` для расположения значений в куче.

2. `Rc<T>`, тип для подсчета количества ссылок на значение, включающий множественное владение.

3. `Ref<T>` и `RefMut<T>`, получаемые из `RefCell<T>`, тип, который применяет правила заимствования в **runtime**, а не во время **complile**.

---
layout: 'intro'
---

# `Box<T>`

---

# `Box<T>`

```rs
fn main() {
    let b = Box::new(5);
    println!("b = {b}");
}
```

---

# Рекурсивные структуры

````md magic-move
```rs
(1, (2, (3, Nil)))
```

```rs{*|1-4|6,8-10|*}
enum List {
    Cons(i32, List),
    Nil,
}

use crate::List::{Cons, Nil};

fn main() {
    let list = Cons(1, Cons(2, Cons(3, Nil)));
}
```
````

---

# Рекурсивные структуры

<img src="https://doc.rust-lang.ru/book/img/trpl15-01.svg" />

---

# Рекурсивные структуры

```rs{*|1-4|6,8-10|*}
enum List {
    Cons(i32, Box<List>),
    Nil,
}

use crate::List::{Cons, Nil};

fn main() {
    let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
}
```

---

# Рекурсивные структуры

<img src="https://doc.rust-lang.ru/book/img/trpl15-02.svg" />

---
layout: 'intro'
---

# `Deref` trait

---

# `Deref`

````md magic-move
```rs
fn main() {
    let x = 5;
    let y = &x;

    assert_eq!(5, x);
    assert_eq!(5, *y);
}
```

```rs
fn main() {
    let x = 5;
    let y = Box::new(x);

    assert_eq!(5, x);
    assert_eq!(5, *y);
}
```
````

---

# `Deref` struct

````md magic-move
```rs
struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}
```

```rs
fn main() {
    let x = 5;
    let y = MyBox::new(x);

    assert_eq!(5, x);
    assert_eq!(5, *y);
}
```

```rs{*|1,3|4|6-8|*}
use std::ops::Deref;

impl<T> Deref for MyBox<T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
```
````

---
layout: 'intro'
---

# `Drop`

---

# `Drop`

````md magic-move
```rs{*|1-3|5-9|11-19|18|13,16|*}
struct CustomSmartPointer {
    data: String,
}

impl Drop for CustomSmartPointer {
    fn drop(&mut self) {
        println!("Dropping CustomSmartPointer with data `{}`!", self.data);
    }
}

fn main() {
    let c = CustomSmartPointer {
        data: String::from("my stuff"),
    };
    let d = CustomSmartPointer {
        data: String::from("other stuff"),
    };
    println!("CustomSmartPointers created.");
}
```

```sh
CustomSmartPointers created.
Dropping CustomSmartPointer with data `other stuff`!
Dropping CustomSmartPointer with data `my stuff`!
```
````

---

# `std::mem::drop`

````md magic-move
```rs{*|1|7|8|9|*}
use std::mem::drop;

fn main() {
    let c = CustomSmartPointer {
        data: String::from("some data"),
    };
    println!("CustomSmartPointer created.");
    drop(c);
    println!("CustomSmartPointer dropped before the end of main.");
}
```

```sh
CustomSmartPointer created.
Dropping CustomSmartPointer with data `some data`!
CustomSmartPointer dropped before the end of main.
```
````

---
layout: 'intro'
---

# `Rc<T>`

---

# Рекурсивные структуры

<img src="https://doc.rust-lang.ru/book/img/trpl15-03.svg" />

---

# `Rc<T>`

````md magic-move
```rs{*|1-4|6,8-12|9|10,11|*}
enum List {
    Cons(i32, Box<List>),
    Nil,
}

use crate::List::{Cons, Nil};

fn main() {
    let a = Cons(5, Box::new(Cons(10, Box::new(Nil))));
    let b = Cons(3, Box::new(a));
    let c = Cons(4, Box::new(a));
}
```

```rs{*|2,7|10|11,12|*}
enum List {
    Cons(i32, Rc<List>),
    Nil,
}

use crate::List::{Cons, Nil};
use std::rc::Rc;

fn main() {
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    let b = Cons(3, Rc::clone(&a));
    let c = Cons(4, Rc::clone(&a));
}
```

```rs
fn main() {
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    println!("count after creating a = {}", Rc::strong_count(&a));

    let b = Cons(3, Rc::clone(&a));
    println!("count after creating b = {}", Rc::strong_count(&a));

    {
        let c = Cons(4, Rc::clone(&a));
        println!("count after creating c = {}", Rc::strong_count(&a));
    }

    println!("count after c goes out of scope = {}", Rc::strong_count(&a));
}
```

```sh
count after creating a = 1
count after creating b = 2
count after creating c = 3
count after c goes out of scope = 2
```
````

---
layout: 'intro'
---

# `RefCell<T>`

---

# `RefCell<T>`

````md magic-move
```rs{*|2,3|5|7,8|3|*}
fn main() {
    let x = 5;
    let y = &mut x;

    y += 1;

    println!("{x}");
    println!("{y}");
}
```

```rs{*|2,3|5|7,8|*}
fn main() {
    let x = 5;
    let y = Rc::new(RefCell::new(x));

    *y.borrow_mut() += 1;

    println!("{x}");
    println!("{:?}", y.borrow_mut());}
```
````

---

# RefCell List

````md magic-move
```rs{*|4-8|*}
use std::cell::RefCell;
use std::rc::Rc;

#[derive(Debug)]
enum List {
    Cons(Rc<RefCell<i32>>, Rc<List>),
    Nil,
}
```

```rs{*|4|6,8,9|11|13-15|*}
use crate::List::{Cons, Nil};

fn main() {
    let value = Rc::new(RefCell::new(5));

    let a = Rc::new(Cons(Rc::clone(&value), Rc::new(Nil)));

    let b = Cons(Rc::new(RefCell::new(3)), Rc::clone(&a));
    let c = Cons(Rc::new(RefCell::new(4)), Rc::clone(&a));

    *value.borrow_mut() += 10;

    println!("a after = {a:?}");
    println!("b after = {b:?}");
    println!("c after = {c:?}");
}
```

```sh
a after = Cons(RefCell { value: 15 }, Nil)
b after = Cons(RefCell { value: 3 }, Cons(RefCell { value: 15 }, Nil))
c after = Cons(RefCell { value: 4 }, Cons(RefCell { value: 15 }, Nil))
```
````

---

# `dyn`

````md magic-move
```rs
trait Animal {
    fn noise(&self);
}
```

```rs{*|1-7|9-15|*}
struct Sheep;

impl Animal for Sheep {
    fn noise(&self) {
        println!("beeeeh");
    }
}

struct Cow;

impl Animal for Cow {
    fn noise(&self) -> &'static str {
        "moooooo!"
    }
}
```

```rs{*|1,3,5|1|*}
fn get_animal_by_str_bad(s: &str) -> Result<impl Animal, String> {
    if s == "Cow" {
        Ok(Cow{})
    } else if s == "Sheep" {
        Ok(Sheep{})
    } else {
        Err("Unknown animal".to_string())
    }
}
```

```rs{*|1,3,5|*}
fn get_animal_by_str(s: &str) -> Result<Box <dyn Animal>, String> {
    if s == "Cow" {
        Ok(Box::new(Cow{}))
    } else if s == "Sheep" {
        Ok(Box::new(Sheep{}))
    } else {
        Err("Unknown animal".to_string())
    }
}
```
````
