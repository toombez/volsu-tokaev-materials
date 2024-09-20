---
layout: intro
---

# 05. Структуры

---

# Структуры

````md magic-move
```rs
// Объявление структуры
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}
```

```rs
// Создание структуры
fn main() {
    let user1 = User {
        active: true,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
    };
}
```

```rs
// Изменение данных структуры
fn main() {
    let mut user1 = User {
        active: true,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
    };

    user1.email = String::from("anotheremail@example.com");
}
```

```rs
// Сокращение для имен переменных при создании структуры
fn build_user(email: String, username: String) -> User {
    User {
        active: true,
        username: username,
        email: email,
        sign_in_count: 1,
    }
}
```

```rs
// Функция-конструктор
fn build_user(email: String, username: String) -> User {
    User {
        active: true,
        username,
        email,
        sign_in_count: 1,
    }
}
```

```rs
// Создание структуры из данных другой структуры
fn main() {
    // --snip--

    let user2 = User {
        active: user1.active,
        username: user1.username,
        email: String::from("another@example.com"),
        sign_in_count: user1.sign_in_count,
    };
}
```

```rs
// Синтаксис .. при создании из другой структуры
fn main() {
    // --snip--

    let user2 = User {
        email: String::from("another@example.com"),
        ..user1
    };
}
```

```rs
// Tuple-структуры
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);
}
```

```rs
// Unit-like-структуры
struct AlwaysEqual;

fn main() {
    let subject = AlwaysEqual;
}
```
````

---

# Методы структур

````md magic-move
```rs
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "Площаль прямоугольника {} пикселей.",
        rect1.area()
    );
}
```

```rs
// Методы с названием полей
impl Rectangle {
    fn width(&self) -> bool {
        self.width > 0
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    if rect1.width() {
        println!("Ширина прямоугольника не равна 0: {}", rect1.width);
    }
}
```

```rs
// Методы с дополнительными параметрами
fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    let rect2 = Rectangle {
        width: 10,
        height: 40,
    };
    let rect3 = Rectangle {
        width: 60,
        height: 45,
    };

    println!("Может ли rect1 поместить rect2? {}", rect1.can_hold(&rect2));
    println!("Может ли rect1 поместить rect3? {}", rect1.can_hold(&rect3));
}
```

```rs
// Методы с дополнительными параметрами
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}
```

```rs
// Ассоциативные функции
impl Rectangle {
    fn square(size: u32) -> Self {
        Self {
            width: size,
            height: size,
        }
    }
}
```

```rs
// Несколько impl блоков
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}
```
````
