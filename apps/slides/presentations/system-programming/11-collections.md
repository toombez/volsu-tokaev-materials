---
layout: 'intro'
---

# 11. Collections

---
layout: 'intro'
---

# ```HashSet<T>```

---

# HashSet new

```rs
let mut my_set: HashSet<i32> = HashSet::new();
```

---

# HashSet from

```rs
let my_vector = vec![1, 2, 3, 4];
// множество из вектора
let my_set: HashSet<i32> = my_vector.into_iter().collect();
println!("my_set: {:?}", my_set);       // my_set: {1, 3, 2, 4}

let my_array = [5, 6, 7];
let my_set2 = HashSet::from(my_array);  // множество из массива
println!("my_set2: {:?}", my_set2);     // my_set2: {5, 6, 7}
```

---

# HashSet len

```rs
let my_set = HashSet::from([1, 2, 3, 4, 5]);

println!("my_set len: {}", my_set.len());     // my_set len: 5
```

---

# HashSet insert

```rs
let mut users: HashSet<&str> = HashSet::new();
users.insert("Tom");
users.insert("Bob");
users.insert("Sam");

println!("{:?}", users);     // {"Tom", "Bob", "Sam"}
```

---

# HashSet remove

```rs
let mut users = HashSet::from(["Tom", "Bob", "Alice"]);
users.remove("Tom");
// "Sam" нет в множестве, поэтому никакого эффекта не происходит
users.remove("Sam");
println!("{:?}", users);     // {"Bob", "Alice"}
```

---

# Перебор HashSet

```rs
let users = HashSet::from(["Tom", "Bob", "Alice"]);
for user in &users{
    println!("{}", user);
}
```

---

# Логические операции HashSet

- union;
- intersection;
- difference;
- is_subset;
- is_superset.

---
layout: 'intro'
---

# ```HashMap<K, V>```

---

# HashMap

````md magic-move

```rs
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);
```

```rs
use std::collections::HashMap;

let mut scores: HashMap<String, i32> = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);
```
````

---

# HashMap from

````md magic-move

```rs
let people = HashMap::from([
    ("Alice", 35),
    ("Tom", 39)
]);

println!("{:?}", people);   // {"Alice": 35, "Tom": 39}
```

```rs
let raw_data = vec![ ("Alice", 35), ("Tom", 39) ];
let people = raw_data.iter().cloned().collect();

println!("{:?}", people);   // {"Alice": 35, "Tom": 39}
```
````

---

# HashMap len

```rs
let people = HashMap::from([
    ("Alice", 35),
    ("Tom", 39)
]);

println!("len: {}", people.len());  // len: 2
```

---

# HashMap insert

```rs
let mut people: HashMap<&str, i32> = HashMap::new();
people.insert("Tom", 39);
people.insert("Bob", 43);

println!("{:?}", people);   // {"Tom": 39, "Bob": 43}
```

---

# HashMap ownership

```rs
let mut people = HashMap::new();
let age = 39;
let name = String::from("Tom");
people.insert(name, age);

println!("age: {}", age);  //
println!("name: {}", name);  // ! Ошибка
```

---

# HashMap получение значений

````md magic-move
```rs
let mut people = HashMap::new();
people.insert("Tom", 39);

let tom_age = people["Tom"];    // Получим значение элемента с ключом "Tom"
println!("Tom's age: {}", tom_age);
```

```rs
let mut people = HashMap::new();
people.insert("Tom", 39);

let bob_age = people.get("Bob");

match bob_age {
    Some(age) => println!("age: {}", age),
    None => println!("Key not found"),
}
```

````

---

# Перебор HashMap

```rs
let mut people = HashMap::new();
people.insert("Tom", 39);
people.insert("Alice", 35);

for (key, value) in &people{
    println!("{}: {}", key, value);
}
```

---

# HashMap contains_key

```rs
let mut people = HashMap::new();
people.insert("Tom", 39);
people.insert("Alice", 35);

match people.contains_key("Alice") {
    true => println!("{}", people["Alice"]),
    false => println!("Элемента Alice не существует"),
}

match people.contains_key("Bob") {
    true => println!("{}", people["Bob"]),
    false => println!("Элемента Bob не существует"),
}
```

---

# HashMap remove

```rs
let mut people = HashMap::new();
people.insert("Tom", 39);
people.insert("Alice", 35);
people.remove("Tom");   // удаляем элемент с ключом "Tom"

println!("{:?}", people);   // {"Alice": 35}
```

---

# HashMap clear

```rs
let mut people = HashMap::new();
people.insert("Tom", 39);
people.insert("Alice", 35);
people.clear();

println!("{:?}", people);   // { }
```

---
layout: 'intro'
---

# Iterator

---

# Iterator

```rs
trait Iterator {
    type Item;
    fn next(&mut self) -> Option<Self::Item>;
    // остальные методы
}
```

---

# Реализация Iterator

````md magic-move
```rs
struct Counter {
    count: u32
}

impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        if self.count < 10 {
            self.count += 1;
            Some(self.count)
        } else {
            None
        }
    }
}
```
```rs
let mut counter = Counter { count: 0 };
for number in &mut counter {
    println!("Counter: {}", number);
}
```
````

---

# Итератор простых чисел

````md magic-move
```rs
struct PrimeGenerator {
    current: u32
}
```

```rs
fn is_prime(num: u32) -> bool {
    if num <= 1 { return false; }

    for i in 2..(num / 2 + 1) {
        if num % i == 0 { return false; }
    }
    true
}
```

```rs
impl Iterator for PrimeGenerator {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        loop {
            self.current += 1;
            if is_prime(self.current) {
                return Some(self.current);
            }
        }
    }
}
```

```rs
let prime_sequence = PrimeGenerator { current: 1 };

for prime in prime_sequence.take(10) {
    println!("{}", prime);
}
```
````

---

# IntoIterator

````md magic-move
```rs
struct MyCollection {
    data: Vec<i32>
}
```

```rs
impl MyCollection {
    // определяем функцию-конструктор
    fn new() -> Self { MyCollection { data: Vec::new() } }

    // Добавляем в коллекцию
    fn add(&mut self, value: i32) {
        self.data.push(value);
    }
}
```

```rs
impl IntoIterator for MyCollection {
    type Item = i32;

    type IntoIter = std::vec::IntoIter<Self::Item>;

    fn into_iter(self) -> Self::IntoIter {
        self.data.into_iter()
    }
}
```

```rs
let mut collection = MyCollection::new();

collection.add(2);
collection.add(4);
collection.add(8);

for item in collection { // перебираем коллекцию
    println!("Item: {}", item);
}
```

````
