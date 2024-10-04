---
layout: intro
---

# 10. Traits

---

# trait

````md magic-move
```rs
// summary.rs
pub trait Summary {
    fn summarize(&self) -> String;
}
```

```rs{2-7|9-13|*}
// news_article.rs
pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}
```

```rs{2-7|9-13|*}
// tweet.rs
pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}
```

```rs{*|2|3|6-13|15|*}
// main.rs
use summary::Summary;
use tweet::Tweet;

fn main() {
    let tweet = Tweet {
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply: false,
        retweet: false,
    };

    println!("1 new tweet: {}", tweet.summarize());
}
```
````

---

# реализация по-умолчанию

````md magic-move
```rs{*|2-4|*}
pub trait Summary {
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
}
```

```rs{*|2-8|3|5-7|11-15|*}
// summary.rs
pub trait Summary {
    fn summarize_author(&self) -> String;

    fn summarize(&self) -> String {
        format!("(Read more from {}...)", self.summarize_author())
    }
}

// tweet.rs
impl Summary for Tweet {
    fn summarize_author(&self) -> String {
        format!("@{}", self.username)
    }
}
```
````

---

# trait в качестве параметра

````md magic-move
```rs{*|1}
pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}
```

```rs{*|1}
pub fn notify<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}
```

```rs
// 1 вариант
pub fn notify(item1: &impl Summary, item2: &impl Summary) {}

// 2 вариант
pub fn notify<T: Summary>(item1: &T, item2: &T) {}
```
````

---

# параметр, реализующий несколько trait

```rs
// 1 вариант
pub fn notify(item: &(impl Summary + Display)) {}

// 2 вариант
pub fn notify<T: Summary + Display>(item: &T) {}
```

---

# ключевое слово where

```rs{*|1-4|6-9|11-15|*}
fn some_functionU(
    t: &(impl Display + Clone),
    u: &(impl Clone + Debug)
) -> i32 {}

fn some_function<
    T: Display + Clone,
    U: Clone + Debug
>(t: &T, u: &U) -> i32 {}

fn some_function<T, U>(t: &T, u: &U) -> i32
where
    T: Display + Clone,
    U: Clone + Debug,
{}
```

---

# Возвращаемое значение как trait

````md magic-move
```rs{*|1|2-9|*}
fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply: false,
        retweet: false,
    }
}
```

```rs{*|1|3-13|15-22|*}
fn returns_summarizable(switch: bool) -> impl Summary {
    if switch {
        NewsArticle {
            headline: String::from(
                "Penguins win the Stanley Cup Championship!",
            ),
            location: String::from("Pittsburgh, PA, USA"),
            author: String::from("Iceburgh"),
            content: String::from(
                "The Pittsburgh Penguins once again are the best \
                 hockey team in the NHL.",
            ),
        }
    } else {
        Tweet {
            username: String::from("horse_ebooks"),
            content: String::from(
                "of course, as you probably already know, people",
            ),
            reply: false,
            retweet: false,
        }
    }
}
```

````

---

# услованая реализация на основе trait

````md magic-move
```rs{*|1-4|6-10|*}
struct Pair<T> {
    x: T,
    y: T,
}

impl<T> Pair<T> {
    fn new(x: T, y: T) -> Self {
        Self { x, y }
    }
}
```

```rs{*|1|8-16|*}
use std::fmt::Display;

struct Pair<T> {
    x: T,
    y: T,
}

impl<T: Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.x >= self.y {
            println!("The largest member is x = {}", self.x);
        } else {
            println!("The largest member is y = {}", self.y);
        }
    }
}
```
````

---

# Реализация базовых trait через derive

````md magic-move
```rs{*|1|*}
#[derive(Debug)]
struct User {/* ... */}
```

```rs{*|2|3|4-5|6-7|*}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    PartialOrd,
    Ord
)]
struct User {/* ... */}
```

```rs{*|3|6-10|*}
#[derive(/* ... */)]
struct User {
    id: usize,
}

impl PartialEq for User {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}
```
````

---

# Реализация базовых trait через derive

- Признаки сравнения: ```Eq```, ```PartialEq```, ```Ord```, ```PartialOrd```.
- ```Clone``` - создание ```T``` из ```&T``` путем клонирования.
- ```Copy```, чтобы использовать копирование вместо перемещения.
- ```Hash``` - вычислить хэш из ```&T```.
- ```Default``` - создать пустой экземпляр типа данных.
- ```Debug``` - форматирование значения с помощью форматировщика ```{:?}```.

---
layout: intro
---

# Примеры реализации trait из std

---

# Default

````md magic-move
```rs{*|1|5-8|7|10-14|*}
use std::default::Default;

const MATRIX_SIZE: usize = 10;

#[derive(Debug)]
pub struct Matrix {
    _matrix: [[i32; MATRIX_SIZE]; MATRIX_SIZE],
}

impl Default for Matrix {
    fn default() -> Self {
        Self { _matrix: [[0; MATRIX_SIZE]; MATRIX_SIZE] }
    }
}
```

```rs{*|1|3-7|9-13|*}
use std::default::Default;

pub enum Role {
    Admin,
    Editor,
    User,
}

impl Default for Role {
    fn default() -> Self {
        Self::User
    }
}
```

```rs
fn main() {
    let default_matrix = Matrix::default();
    let default_role = Role::default();
}
```
````

---

# Debug и Display

```rs{*|1|4|5-8|11-15|19|20|*}
use std::fmt;

// Debug использует реализацию по-умолчанию
#[derive(Debug)]
struct Point {
    x: u32,
    y: u32
}

// Display необходимо реализовать
impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "x={}, y={}", self.x, self.y)
    }
}

fn main() {
    let t = MyType{x:1,y:2};
    println!("{}", t); // x=1, y=2
    println!("{:?}", t); // Point { x: 1, y: 2 }
}
```

---

# From

```rs{*|1-3|5-9|12|*}
pub struct User {
    pub username: String
}

impl From<&str> for User {
    fn from(value: &str) -> Self {
        Self { username: String::from(value) }
    }
}

fn main() {
    let user = User::from("username");
}
```

---

# Into

```rs{*|1-3|7|*}
pub struct User {
    pub username: String
}

fn main() {
    let user = User { username: 'username' }
    let user_string: String = user.into();
}
```

---

# IntoIter

````md magic-move
```rs{*|1|*}
for n in [10, 20, 30].iter() {
    println!("got {}", n);
}
```

```rs{*|1-4|6-9|11-15|*}
#[derive(Debug, Clone, Copy)]
pub struct Product {
    pub price: usize
}

#[derive(Debug, Clone)]
pub struct Cart {
    products: Vec<Product>
}

impl Cart {
    pub fn add_item(&mut self, item: &Product) {
        self.products.push(item.clone());
    }
}
```

```rs{*|2|4|6-8|12-16|18-20|*}
impl IntoIterator for Cart {
    type Item = Product;

    type IntoIter = std::vec::IntoIter<Self::Item>;

    fn into_iter(self) -> Self::IntoIter {
        self.products.into_iter()
    }
}

fn main() {
    let mut cart = Cart { products: vec![] };

    cart.add_item(&Product { price: 10 });
    cart.add_item(&Product { price: 20 });
    cart.add_item(&Product { price: 15 });

    for product in cart.into_iter() {
        println!("{:?}", product.price)
    }
}
```
````

---

# Index

````md magic-move

```rs{*|1-4|6-9|11-17|*}
#[derive(Debug, Clone, Copy)]
pub struct Product {
    pub price: usize
}

#[derive(Debug, Clone)]
pub struct Cart {
    products: Vec<Product>
}

impl Index<usize> for Cart {
    type Output = Product;

    fn index(&self, index: usize) -> &Self::Output {
        &self.products[index]
    }
}
```

```rs{*|2-6|8|*}
fn main() {
    let mut cart = Cart { products: vec![] };

    cart.add_item(&Product { price: 10 });
    cart.add_item(&Product { price: 20 });
    cart.add_item(&Product { price: 15 });

    println!("{:?}", cart[1])
}
```
````
