# Моделирование данных с помощью структур

## Методы String

Строки в **rust** имеют множество методов, которые позволяю удобно реализовывать те или иные задачи. Ниже представлена часть методов, которые могут понадобиться в заданиях:

### Метод [```len```](https://doc.rust-lang.org/std/string/struct.String.html#method.len)

Возвращает длину данной строки в байтах.

```rs
let a = String::from("foo");
assert_eq!(a.len(), 3);

let fancy_f = String::from("ƒoo");
assert_eq!(fancy_f.len(), 4);
assert_eq!(fancy_f.chars().count(), 3);
```

### Метод [```contains```](https://doc.rust-lang.org/std/string/struct.String.html#method.contains)

Возвращает ```true```, если переданная строка содержится в строке.

Возвращает ```false```, если не содержит.

```rs
let bananas = "bananas";

assert!(bananas.contains("nana"));
assert!(!bananas.contains("apples"));
```

### Метод [```ends_with```](https://doc.rust-lang.org/std/string/struct.String.html#method.ends_with)

Возвращает ```true```, если строка заканчивается подстрокой, переданной в качестве параметра.

Возвращает ```false```, если не заканчивается.


```rs
let bananas = "bananas";

assert!(bananas.ends_with("anas"));
assert!(!bananas.ends_with("nana"));
```

### Метод [```starts_with```](https://doc.rust-lang.org/std/string/struct.String.html#method.starts_with)

Возвращает ```true```, если строка начинается с подстроки, переданной в качестве параметра.

Возвращает ```false```, если не начинается.

```rs
let bananas = "bananas";

assert!(bananas.starts_with("bana"));
assert!(!bananas.starts_with("nana"));
```

### Метод [```find```](https://doc.rust-lang.org/std/string/struct.String.html#method.find)

Возвращает ```Some(index)``` - индекс первого, который соответствует переданной подстроке.

Возвращает ```None```, если подстрока не найдена в строке.

```rs
let s = "Löwe 老虎 Léopard Gepardi";

assert_eq!(s.find('L'), Some(0));
assert_eq!(s.find('é'), Some(14));
assert_eq!(s.find("pard"), Some(17));
```

### Метод [```to_uppercase```](https://doc.rust-lang.org/std/string/struct.String.html#method.to_uppercase)

Возвращает новую строку в верхнем регистре.

```rs
let s = "hello";

assert_eq!("HELLO", s.to_uppercase());
```

### Метод [```to_lowercase```](https://doc.rust-lang.org/std/string/struct.String.html#method.to_lowercase)

Возвращает новую строку в нижнем регистре.

```rs
let s = "HELLO";

assert_eq!("hello", s.to_lowercase());
```

### Метод [```trim```](https://doc.rust-lang.org/std/string/struct.String.html#method.trim)

Возвращает новую строки, в которой удалены пробельные символы и переносы строк в начале и конце строки.

```rs
let s = "\n Hello\tworld\t\n";

assert_eq!("Hello\tworld", s.trim());
```

[Полное API строк](https://doc.rust-lang.org/std/string/struct.String.html)

## Модульная система rust

**Rust** предоставляет мощную систему модулей, которая используется для иерархического разделения кода на логические единицы (модули) и управления видимостью (публичное и приватное) между ними.

**Модуль** - это набор элементов, таких как: функции, структуры, типажи, блоки реализации (```impl```) и даже другие модули.

### Видимость элементов модуля

По умолчанию элементы модуля имеют приватную видимость, но ее можно переопределить с помощью модификатора ```pub```. Только публичные элементы модуля могут быть доступны за пределами области видимости модуля.

### Видимость полей структур

Структуры имеют дополнительный уровень видимости своих полей. По умолчанию видимость приватна, и ее можно переопределить с помощью модификатора ```pub```. Эта видимость имеет значение только тогда, когда к структуре обращаются извне модуля, в котором она определена, и преследует цель скрыть информацию (инкапсулировать).

### Ключевое слово ```use```

Объявление ```use``` можно использовать для привязки полного пути к новому имени, чтобы облегчить доступ.

### Ключевые слова ```super``` и ```self```

Ключевые слова ```super``` и ```self``` могут быть использованы в пути, чтобы устранить двусмысленность при обращении к элементам и предотвратить ненужное жесткое кодирование путей.

#### Пример модуля

::: code-group
```sh [Структура пакета rust]
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

```rs [Структура модулей через файл lib.rs]
pub mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {
            // Подключение модуля, используя super
            use super::serving::serve_order;
            serve_order();
        }

        pub fn seat_at_table() {
            // Подключение модуля, используя crate
            use crate::front_of_house::serving::take_payment;

            take_payment();
        }
    }

    pub mod serving {
        // Подключение модуля на уровне другого модуля
        pub use crate::front_of_house::hosting;

        // Функция приватная и доступна только внутри модуля, в котором объявлена
        fn take_order() {
            // Использование функции из другого модуля
            hosting::add_to_waitlist();
        }

        pub fn serve_order() {}

        pub fn take_payment() {}
    }

    // Модуль, доступный только в модуле front_of_house
    mod private_mod {}
}
```
:::

Ту же структуру модуля можно реализовать, используя файловую систему:

```sh
crate
 │   lib.rs # Точка входа для всех модулей
 ├── front_of_house.rs # Модуль front_of_house, подключающий дочерние модули
 ├── hosting.rs # Модуль hosting.rs, подключающий функции
 │   ├── add_to_waitlist # Публичная функция модуля
 │   └── seat_at_table # Публичная функция модуля
 ├── serving.rs # Модуль serving.rs, подключающий функции
 │   ├── take_order # Приватная функция модуля
 │   ├── serve_order # Публичная функция модуля
 │   └── take_payment # Публичная функция модуля
 └── private_mod.rs # Приватный модуль private_mod
```

---

# Задания для выполнения

## Задание 1

Реализуйте структуру ```Person```, которая хранит следующие данные о пользователе:

- уникальный идентификатор пользователя (```id```)
- имя (```first_name```);
- фамилия (```last_name```);
- отчество (```patronymic```);
- электронный почтовый адрес (```email```);
- роль в системе (```role```);
- возраст (```age```).

### Дополнительные условия

Каждое из полей, за исключением поля ```role```, необходимо реализовать как структуру. У каждой подобной структуры необходимо создать приватную статический метод для валидации данных, метод для получения значения, хранящегося в структуре и метод, возвращающий значение по-умолчанию. Например, рассмотрим поле ```age```:


::: code-group
```rs [age.rs]
// Объявление структуры
#[derive(Debug)]
pub struct Age(/* Модификатора доступа нет, значит значение приватное */ i8);

// Реализация структуры Age
impl Age {
    const DEFAULT_VALUE: i8 = 18;

    // Приватная функция-валидатор
    fn validate(value: i8) -> bool {
        if (value) > 100 { false } else { true }
    }

    // Функция-геттер значения структуры
    pub fn value(&self) -> i8 {
        self.0
    }

    // Функция-конструктор, возвращающая Option тип со экземпляром
    pub fn new(value: i8) -> Option<Self> {
        if Self::validate(value) {
            Some(Self(value))
        } else {
            None
        }
    }

    // Функция, которая возвращает значение по-умолчанию
    pub fn default() -> Self {
        Self(Self::DEFAULT_VALUE)
    }
}
```

```rs [person.rs]
pub use age;

// Объявление структуры Person
#[derive(Debug)]
pub struct Person {
    pub age: Age,
    // --snip--
}

// Реализация структуры Person
impl Person {
    pub fn from_primitives(age: i8, /* ...rest */) -> Self {
        // Валидация и создание значения поля age
        let age = match Age::new(age) {
            Some(age) => age,
            None => Age::default(),
            //   ^
            //   | Обработка None значения после создания структуры
        };

        // --snip--

        Self {
            age,
            // ...rest
        }
    }

    pub fn new(age: Age, /** ...rest */) -> Self {
        Self {
            age,
        }
    }
}
```
:::

Сигнатуры методов следующие:

- ```new(value: <T>) -> Option<K>```, где ```T``` - значение, хранящееся в структуре, ```K``` - экземпляр структуры;
- ```validate(value: <T>) -> bool```, где ```T``` - значение, хранящееся в структуре;
- ```default() -> K```, где ```K``` - экземпляр структуры

Ограничения:

- ```first_name```, ```last_name```, ```patronymic``` должны быть короче ```50``` символов.
- ```email``` - должен содержать символы ```@``` и ```.```. Обязательно необходимо проверять, что ```@``` находится раньше ```.```.
- ```role``` - необходимо реализовать в виде ```enum```. Допустимые значения: ```Admin```, ```User```, ```Moderator```.

::: warning Метод ```from_string``` для ```Role```
Для структуры ```Role``` реализуйте метод ```from_string(value: String) -> Self```, которая преобразует строку в ```Role```.
:::

Для создания экземпляров структуры ```Person``` необходимо реализовать два метода:

1. Функцию ```new``` следующей сигнатуры:

```rs
new(
    age: Age,
    first_name: FirstName,
    last_name: LastName,
    patronymic: Patronymic,
    email: Email,
    role: Role,
) -> Person
```

2. Функцию ```from_primitives``` следующей сигнатуры:

```rs
from_primitives(
    age: i8,
    first_name: String,
    last_name: String,
    patronymic: String,
    email: String,
    role: String,
) -> Person
```

### Пример

```rs
// --snip--

fn main() {
    let person = Person::new(
        // .unwrap() используется для игнорирования возможной ошибки
        Age::new(20).unwrap(),
        FirstName::new("Иван").unwrap(),
        LastName::new("Александрин").unwrap(),
        Patronymic::new("Олегович").unwrap(),
        Email::new("temp@email.test").unwrap(),
        Role::Admin,
    );

    let person_from_primitives = Person::from_primitives(
        20,
        "Иван",
        "Александрин",
        "Олегович",
        "temp@email.test",
        "Admin",
    )
}
```

## Задание 2

Необходимо реализовать следующую структуру модулей:

```sh
crate # точка входа
 └── math # модуль
 │   ├── linear_algebra # модуль
 │   │   ├── dot_product # функция
 │   │   ├── vector_magnitude # функция
 │   │   └── cross_product # функция
 │   └── utils # модуль
 │       ├── factorial # функция
 │       └── fibonacci # функция
 └── graphics # модуль
     ├── cube # функция
     └── ball # функция
```

::: info Работа в песочнице
В песочнице нет возможности работать со множеством файлов. Вместо этого используйте:

```rs
mod name {
    fn fun1() { /* ... */ }
    fn fun2() { /* ... */ }
}
```
:::

### Объяснение модулей

#### Модуль math

Модуль, который предоставляет фунции и утилиты для работы с математикой. Является точкой входа для модулей ```linear_algebra``` и ```utils```.

#### Модуль linear_algebra

Модуль для функций линейной алгебры. Внутри модуля необходимо реализовать три функции:

1. ```dot_product(a: &Vec<isize>, b: &Vec<isize>) -> Vec<isize>```;
2. ```vector_magnitude(a: &Vec<isize>) -> isize```;
3. ```cross_product(a: &Vec<isize>, b: &Vec<isize>, angle: isize) -> Vec<isize>```.

::: info Объяснение функций

- [dot_product](https://en.wikipedia.org/wiki/Dot_product)
- [vector_magnitude](https://en.wikipedia.org/wiki/Norm_(mathematics))
- [cross_product](https://en.wikipedia.org/wiki/Cross_product)

:::

#### Модуль utils

Модуль для утилитарных функций. Внутри модуля необходимо реализовать две функции:

1. ```factorial(value: usize) -> usize```;
2. ```fibonacci(count: usize) -> Vec<usize>```.

::: info Объяснение функций
- [factorial](https://en.wikipedia.org/wiki/Factorial)
- [fibonacci](https://en.wikipedia.org/wiki/Fibonacci_sequence)
:::

#### Модуль graphics

Модуль, позволяющий создавать представление об фигурах. Необходимо реализовать две структуры, хранящие информацию об фигуре:

- ```cube``` - хранит информацию об ширине, длине и высоте куба;
- ```ball``` - хранит информацию об радиусе шара.
