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
