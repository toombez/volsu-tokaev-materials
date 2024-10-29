---
layout: 'intro'
---

# 15. Lifetimes

---

# Висячие указатели и lifetime

````md magic-move
```rs{*|2|4-7|9}
fn main() {
    let r;

    {
        let x = 5;
        r = &x;
    }

    println!("r: {r}");
}
```
```rs{5,6,9}
fn main() {
    let r;

    {
        let x = 5;
        r = &x;
    }

    println!("r: {r}");
}
```

```rs{*|2-10|5-7|*}
fn main() {
    let r;                // ---------+-- 'a
                          //          |
    {                     //          |
        let x = 5;        // -+-- 'b  |
        r = &x;           //  |       |
    }                     // -+       |
                          //          |
    println!("r: {r}");   //          |
}                         // ---------+
```

```rs{*|2-8|4-7|*}
fn main() {
    let x = 5;            // ----------+-- 'b
                          //           |
    let r = &x;           // --+-- 'a  |
                          //   |       |
    println!("r: {r}");   //   |       |
                          // --+       |
}                         // ----------+
```
````

---

# Generic lifetimes

````md magic-move
```rs{*|2,3|5|*}
fn main() {
    let string1 = String::from("abcd");
    let string2 = "xyz";

    let result = longest(string1.as_str(), string2);
    println!("The longest string is {result}");
}
```
```rs{*|2-6|1|*}
fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```
```rs{1|*}
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

```rs{*|1-7|9-17|2,10|3,13|5,11,14|*}
fn main() {
    let string1 = String::from("abcd");
    let string2 = "xyz";

    let result = longest(string1.as_str(), string2);
    println!("The longest string is {result}");
}
// ==========================================================
fn main() {
    let string1 = String::from("long string is long");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
    }
    println!("The longest string is {result}");
}
```
````

---

# lifetimes

```rs{*|1|2,3|*}
fn longest<'a>(x: &str, y: &str) -> &'a str {
    let result = String::from("really long string");
    result.as_str()
}
```

---

# Struct lifetime

```rs{*|1-3|*}
struct ImportantExcerpt<'a> {
    part: &'a str,
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.').next().unwrap();
    let i = ImportantExcerpt {
        part: first_sentence,
    };
}
```

---

# Правила определения lifetime

````md magic-move
```rs{*|1}
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    &s[..]
}
```

```rs
fn first_word<'a>(s: &'a str) -> &'a str {
```
````

<v-click>
1. Установить время жизни параметрам.

2. Если параметр один, то возвращаемое значение берет время жизни параметра.

3. Если один из параметров ```&self``` или ```&mut self```, то установить входному параметру время жизни этого параметра.
</v-click>

---

# Пример определения lifetime

````md magic-move
```rs{1|2|3}
fn first_word(s: &str) -> &str {
fn first_word<'a>(s: &'a str) -> &str {
fn first_word<'a>(s: &'a str) -> &'a str {
```

```rs{1|2}
fn longest(x: &str, y: &str) -> &str {
fn longest<'a, 'b>(x: &'a str, y: &'b str) -> &str {
```
````

---

# impl lifetime

````md magic-move
```rs
impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> i32 {
        3
    }
}
```

```rs
impl<'a> ImportantExcerpt<'a> {
    fn announce_and_return_part(&self, announcement: &str) -> &str {
        println!("Attention please: {announcement}");
        self.part
    }
}
```
````

---

# static lifetime

```rs
let s: &'static str = "I have a static lifetime.";
```

---

# Trait lifetime

```rs
use std::fmt::Display;

fn longest_with_an_announcement<'a, T>(
    x: &'a str,
    y: &'a str,
    ann: T,
) -> &'a str
where
    T: Display,
{
    println!("Announcement! {ann}");
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```
