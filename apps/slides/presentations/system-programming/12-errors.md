---
layout: 'intro'
---

# 12. Errors

---

# Result

````md magic-move

```rs
Result<T, E>
```

```rs
let res: Result<i32, String> = Ok(255);

match res {
    Ok(value) => println!("{value}"),
    Err(error_message) => println!("{error:?}"),
}
```

```rs
let res: Result<i32, String> = Err(String:from("Error message"));

match res {
    Ok(value) => println!("{value}"),
    Err(error_message) => println!("{error:?}"),
}
```
````

---

# panic!

````md magic-move
```rs
let numbers = [1, 2, 3, 4];
println!("{}", numbers[10]);
```

```rs
panic!("непредвиденная ошибка");
```

```rs
struct Person{ name: String, age:u8}

impl Person {
    fn new(name: &str, age: u8) -> Self {
        if age > 110{
            panic!("Некорректный возраст. Возраст должен быть меньше 110");
        }
        else {
            Self { name: String::from(name), age }
        }
    }
}

fn main(){
    let tom = Person::new("Tom", 136);
    println!("Name: {}  Age: {}", tom.name, tom.age);
}
```
````

---

# Ошибки как данные

````md magic-move
```rs
struct Person{ name: String, age:u8 }

impl Person {
    fn new(name: &str, age: u8) -> Result<Person, String> {
        match age < 110 {
            true => Result::Ok(Self { name: String::from(name), age }),
            false => {
                Result::Err(String::from("Возраст должен быть меньше 110"))
            }
        }
    }
}
```

```rs
let tom_result = Person::new("Tom", 36);

match tom_result{
    Ok(tom) => println!("Name: {}  Age: {}", tom.name, tom.age),
    Err(err_message) => println!("{}", err_message)
}
```
```rs
let bob_result = Person::new("Bob", 136);

match bob_result {
    Ok(bob) => println!("Name: {}  Age: {}", bob.name, bob.age),
    Err(err_message) => println!("{}", err_message)
}
```
````

---

# panic! и Result

```rs
let tom_result = Person::new("Tom", 36);

let tom = match tom_result{
    Ok(person) => person,
    Err(err_message) => panic!("Возникла проблема: {}", err_message)
};
```

---

# Unwrap

```rs
let tom = Person::new("Tom", 136).unwrap();

println!("Name: {}  Age: {}", tom.name, tom.age);
```

---

# Обработка разных ошибок

````md magic-move
```rs
struct Person{ name: String, age:u8 }

enum PersonError{
    InvalidAge(String),
    InvalidName(String)
}
```
```rs
impl Person {
    fn new(name: &str, age: u8) -> Result<Person, PersonError>{
        if name.len() < 3{
            let error_message = "name должен быть > 2 символов"
            Result::Err(PersonError::InvalidName(String::from(error_message)))
        }
        else if age > 110 {
            let error_message = "age должен быть < 110"
            Result::Err(PersonError::InvalidAge(String::from(error_message)))
        }
        else {
            Result::Ok(Person{name: String::from(username), age })
        }
    }
}
```

```rs
let tom_result = Person::new("To", 36);
let tom = match tom_result{
    Ok(person) => person,
    Err(error) => match error {
        PersonError::InvalidAge(message) => panic!("{}", message),
        PersonError::InvalidName(message) => panic!("{}", message),
    }
};

println!("Name: {}  Age: {}", tom.name, tom.age);
```
````

---

# Оператор ```?```

```rs
fn main() ->Result<(), String>{
    let tom = Person::new("Tom", 136)?;
    println!("Name: {}  Age: {}", tom.name, tom.age);
    Ok(())
}
```

---

# Цепочки вызовов

```rs
fn main() ->Result<(), String> {
    Person::new("Tom", 40)?.print();
    Person::new("Bob", 44)?.print();
    Person::new("Sam", 132)?.print();
    Person::new("Alice", 36)?.print();
    Ok(())
}

impl Person{
    // --snip--

    fn print(&self){
        println!("Name: {}  Age: {}", self.name, self.age);
    }
}
```

---

# thiserror

````md magic-move
```rs
#[derive(Debug)]
pub enum AppError {
    MissingQuery,
    MissingFilename,
    ConfigLoad,
}
```

```rs{*|1|3|5-6|7-8|9-13|11|*}
use thiserror::Error;

#[derive(Debug, Error)]
pub enum AppError {
    #[error("Didn't get a query string")]
    MissingQuery,
    #[error("Didn't get a file name")]
    MissingFilename,
    #[error("Could not load config")]
    ConfigLoad {
        #[from]
        source: io::Error,
    }
}
```
````
