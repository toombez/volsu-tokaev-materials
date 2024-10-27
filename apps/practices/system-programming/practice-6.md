# Реализация общих признаков данных

## Generic-типы

Generic-типы позволяют частично определить функцию, трейты, структуру или перечисление, позволяя компилятору создать полностью определенную версию во время компиляции на основе использования нашего кода.

### Generic-функции

::: code-group
```rs [Код без generic]
fn largest_i32(list: &[i32]) -> &i32 {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn largest_char(list: &[char]) -> &char {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];

    let result = largest_i32(&number_list);
    println!("The largest number is {result}");

    let char_list = vec!['y', 'm', 'a', 'q'];

    let result = largest_char(&char_list);
    println!("The largest char is {result}");
}
```

```rs [Код с generic]
fn largest<T>(list: &[T]) -> &T {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}
```
:::

В примере без generic-типов необходимо реализовывать сразу две функции, для одной и той же логики. Generic-типы позволяют создать общую функцию, которая во время компиляции определит, какие функции надо сгенерировать и скомпилировать.

::: warning Ошибка кода с generic
Код не получится скомпилировать из-за ошибки требуемых признаков. Для операций ```>``` необходимо, чтобы ```T``` реализовывал признак ```PartialOrd```.
:::

[Запуск кода без generic в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=d3ac914bedba221b85b03160adb67e20)

[Запуск кода с generic в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=ad1cc58c37551d983b2d7571d39410dd)

### Generic-структуры

```rs
struct Point<T> {
    x: T,
    y: T,
}

fn main() {
    let integer = Point { x: 5, y: 10 };
    let float = Point { x: 1.0, y: 4.0 };
}
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=af478c802c409c1b8cd94d5f7676af91)

Структуры также, как и функции могут иметь generic-типы. Благодаря такой возможности можно определить одну общую структуру, чтобы **Rust** сам определил, с какими типами необходимо скомпилировать программу.

::: warning Несколько generic-типов
**Rust** позволяет указывать несколько generic-типов, если мы хотим иметь несколько общих значений:

```rs
struct Point<T, U> {
    x: T,
    y: U,
}

fn main() {
    let both_integer = Point { x: 5, y: 10 };
    let both_float = Point { x: 1.0, y: 4.0 };
    let integer_and_float = Point { x: 5, y: 4.0 };
}
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=dc7ea9d17b073e56118ab2c88ec7f01e)
:::

### Generic-перечисления

Перечисления в **Rust** также могут иметь generic-типы. Примером из стандартной библиотеки является перечисление ```Option<T>```, которое либо хранил значение ```Some(T)```, либо хранит ничего ```None```.

Определить generic-enum можно следующим образом:

```rs
enum Option<T> {
    Some(T),
    None,
}
```

Другим примером generic-перечислений является встроенное перечисление ```Result<T, E>```, которое хранит или результат ```Ok(T)```, или Ошибку ```Err(E)```.

### Generic-методы

Для структур можно определять generic-методы для обобщения метода:

```rs
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

fn main() {
    let p = Point { x: 5, y: 10 };

    println!("p.x = {}", p.x());
}
```

Так, например, структура ```Point``` имеет один generic-тип: ```T```. Для того, чтобы иметь возможность вызывать метод x с разными типами ```T```, необходимо создать этот метод как generic-метод.

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=5990a411e4619ab6a9f02305c03f2535)

Однако, **Rust** не обязывает создавать generic-метод. Вместо этого можно указать конкретный тип, который предоставить метод только для соответствующей структуры:

```rs
impl Point<f32> {
    fn distance_from_origin(&self) -> f32 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=1330c0c53d9c1470114d69b51611b786)

## Trait

Trait определяет функциональность, которой обладает конкретный тип и которую он может разделять с другими типами. Мы можем использовать трейты для абстрактного определения общего поведения. Мы можем использовать границы трейтов, чтобы указать, что общим типом может быть любой тип, обладающий определенным поведением.

С помощью трейтов можно обязать структуры реализовывать определенные методы. Трейты состоят из блока ```impl```, в котором описывается функциональность, которую другие структуры или перечисления обязаны реализовывать:

```rs
// Определение трейта
trait Shape {
    fn area(&self) -> f64;
}

// Структуры, которые будут реализовывать трейт
struct Circle {
    pub radius: usize,
}

struct Rectangle {
    pub width: usize,
    pub height: usize,
}

// Реализация трейта для структур
impl Shape for Circle {
    fn area(&self) -> f64 {
        (self.radius.pow(2) as f64) * PI
    }
}

impl Shape for Rectangle {
    fn area(&self) -> f64 {
        (self.width * self.height) as f64
    }
}
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=f00cdd3443702e343e5bbe729b0d9822)

### Реализация по-умолчанию

Трейты могуть иметь реализацию методов по-умолчанию. Для этого при определении трейта необходимо написать логику метода. Однако, **Rust** оставляет возможно переопределить поведение по-умолчанию при реализации трейта для структуры или перечисления.

```rs
trait Shape {
    fn area(&self) -> f64;

    fn print(&self) { // [!code ++]
        println!("Фигура. Площадь: {}", self.area()); // [!code ++]
    } // [!code ++]
}

struct Circle {
    pub radius: usize,
}

impl Shape for Circle {
    fn area(&self) -> f64 {
        (self.radius.pow(2) as f64) * PI
    }
}

struct Rectangle {
    pub width: usize,
    pub height: usize,
}

impl Shape for Rectangle {
    fn area(&self) -> f64 {
        (self.width * self.height) as f64
    }

    fn print(&self) { // [!code ++]
        println!("Прямоугольник. Площадь: {}", self.area()); // [!code ++]
    } // [!code ++]
}
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=540a194430c2ca2d6fb034b9ef576c2e)

### Трейты в качестве параметров

Трейты можно использовать для определения сигнатур функция и методов. С помощью этой возможность можно сделать функцию или метод более гибким. Вместо того, чтобы использовать конкретную структуру, появляется возможность использовать любую структуру, которая реализует указанный трейт, в качестве параметра.

```rs
// --snip--

fn lower_area(shape1: impl Shape, shape2: impl Shape) -> f64 {
    shape1.area().min(shape2.area())
}

fn main() {
    // --snip--

    println!("Наименьшая площадь: {}", lower_area(circle, rectangle));
}
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=72a756ac5c72a3f6d7286a2e75beb1cf)

### Generic-типы и их ограничения

Трейты можно использовать для ограничения generic-параметров. Трейт, который ограничивает generic-параметр, обязывает, чтобы данные, которые передавались в generic-тип, реализовывали указанный набор трейтов.

```rs
struct Rectangle<T> {
    width: T,
    height: T,
}

// Параметр T должен реализовывать PartialEq. Если T не реализует данный трейт,
// то метод is_square не будет доступен в конечной структуре.
impl<T: PartialEq> Rectangle<T> {
    fn is_square(&self) -> bool {
        self.width == self.height
    }
}
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=36c5a39c2bb754f004f52a944766a55b)

При определении границ generic-типов можно указывать несколько трейтов, которые необходимо реализовывать generic-типы, используя ```+```.

```rs
struct Rectangle<T> {
    width: T,
    height: T,
}

// Параметр T должен реализовывать PartialEq и Eq. Если T не реализует данный
// трейт, то метод is_square не будет доступен в конечной структуре
impl<T: PartialEq + Eq> Rectangle<T> {
    fn is_square(&self) -> bool {
        self.width == self.height
    }
}
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=4e4d207d5cc2099332226926e9fa5203)

### Перегрузка операторов

Трейты **Rust** позволяют перегружать операторы для пользовательских структур. Так, для структуры ```Length(i32)``` можно реализовать перегрузку математических операций.

```rs
use std::ops::Add;

#[derive(Debug)]
pub struct Length(pub i32);

// Length(3) + Length(5)
impl Add for Length {
    // Тип на выходе после выполнения операции
    type Output = Self;

    // Перегрузка
    fn add(self, rhs: Self) -> Self::Output {
        Self(self.0 + rhs.0)
    }
}
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=103ed9b80b2d6205a4511c958926ff11)

::: warning Трейты операций
Для перегрузки операторов есть следующие трейты:
- [Add](https://doc.rust-lang.org/std/ops/trait.Add.html) - сумма;
- [Sub](https://doc.rust-lang.org/std/ops/trait.Sub.html) - вычитание;
- [Not](https://doc.rust-lang.org/std/ops/trait.Not.html) - инверсия;
- [Neg](https://doc.rust-lang.org/std/ops/trait.Neg.html) - отрицание;
- [Neg](https://doc.rust-lang.org/std/ops/trait.Not.html) - отрицание;
- [Mul](https://doc.rust-lang.org/std/ops/trait.Mul.html) - умножение;
- [Div](https://doc.rust-lang.org/std/ops/trait.Div.html) - деление;
- [Rem](https://doc.rust-lang.org/std/ops/trait.Rem.html) - остаток от деления.

[Все трейты перегрузки](https://doc.rust-lang.org/std/ops/index.html#traits)
:::

### Примеры реализации трейтов

#### ```IntoIterator```

Трейт ```IntoIterator``` позволяет добавить возможность перебирать структуру, которая его реализует.

```rs
struct Matrix {
    cells: Vec<i32>,
    width: usize,
    height: usize,
}

impl IntoIterator for Matrix {
    type Item = i32;
    type IntoIter = std::vec::IntoIter<Self::Item>;

    fn into_iter(self) -> Self::IntoIter {
        self.cells.into_iter()
    }
}
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=4776f6f1dfc5b887ee079c45f36201c2)

::: info Документация трейта
- [IntoIterator](https://doc.rust-lang.org/std/iter/trait.IntoIterator.html)
:::


#### ```Index<T>``` и ```IndexMut<T>```

Трейты ```Index<T>``` и ```IndexMut<T>``` позволяют добавить возможность получения элементов по индексу ```T```. Отличие трейтов заключается в том, что ```IndexMut``` должен возвращать мутабельную ссылку на элемент под соответствующим индексом. В качестве индекса может выступать как примитивные данные, так и пользовательские структуры.

```rs
impl Matrix {
    pub fn new(cells: Vec<i32>, width: usize, height: usize) -> Self {
        Self { cells, width, height }
    }
}

#[derive(Debug)]
struct MatrixPoint {
    row: usize,
    column: usize,
}

impl Index<MatrixPoint> for Matrix {
    type Output = i32;

    fn index(&self, index: MatrixPoint) -> &Self::Output {
        let flat_index = self.width * index.row + index.column;

        &self.cells[flat_index]
    }
}
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=dada7aebb48fc2511d17797a61a107b8)

::: info Документация трейтов
- [Index](https://doc.rust-lang.org/std/ops/trait.Index.html)
- [IndexMut](https://doc.rust-lang.org/std/ops/trait.IndexMut.html)
:::

#### ```From<T>``` и ```Into<T>```

Трейты ```From<T>``` и ```Into<T>``` позволяют преобразовывать одни данные в другие. Generic-тип определяет из какого и в какой тип преобразуется структура, которая реализует трейт. ```From``` позволяет создать экземпляр структуры из другого типа данных. ```Into``` позволяет сам экземпляр преобразовать в данные другого типа.

```rs
#[derive(Debug, Clone)]
struct Matrix {
    cells: Vec<i32>,
    width: usize,
    height: usize,
}

impl Matrix {
    pub fn new(cells: Vec<i32>, width: usize, height: usize) -> Self {
        Self { cells, width, height }
    }
}

impl From<usize> for Matrix {
    fn from(value: usize) -> Self {
        Self::new(vec![0; value], value, 1)
    }
}

impl Into<usize> for Matrix {
    fn into(self) -> usize {
        self.width * self.height
    }
}
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=dd83967ac459795e9ca0708cbeef3cc1)

::: info Документация трейтов
- [From](https://doc.rust-lang.org/std/convert/trait.From.html)
- [Into](https://doc.rust-lang.org/std/convert/trait.Into.html)
:::

## Задание для выполнения

Необходимо реализовать структуру ```PointND<T>```, которая хранит вектор значений ```T```.

Структура должна иметь следующие методы:

- ```new(components: Vec<T>) -> Self``` - для создания экземпляра из вектора;
- ```dim(&self) -> usize``` - для получения количества элементов внутри экземпляра;
- ```x(&self) -> Option<i32>``` - для получения первого элемента экземпляра структуры;
- ```y(&self) -> Option<i32>``` - для получения второго элемента экземпляра структуры;
- ```z(&self) -> Option<i32>``` - для получения третьего элемента экземпляра структуры.

Для данной структуры необходимо реализовать следующие признаки:

- ```IntoIterator``` - для получения итератора ```Vec```;
- ```Index<usize>``` - для получения элементов ```T``` по индексу ```usize```;
- ```IndexMut<usize>``` - для получения мутабельных элементов T по индексу usize;

- ```From<Vec<T>>``` - для получения вектора компонентов структуры;
- ```From<usize>``` - для создания экземпляра структуры размера ```usize```. Только для элеметов ```T```, которые реализуют признаки ```Default``` и ```Clone```;
- ```Into<Vec<T>>``` - для преобразования экземпляра в вектор элементов ```T```.

- ```Neg``` - для выполнения операций инверсии. Только для ```T``` равным ```i32```;
- ```Add<i32>``` - для выполнения операций сложения компонент с числом. Только для ```T``` равным ```i32```;
- ```Sub<i32>``` - для выполнения операций вычитания из компонент числа. Только для ```T``` равным ```i32```;
- ```Mul<i32>``` - для выполнения операций умножения компонент на число. Только для ```T``` равным ```i32```;
- ```Div<i32>``` - для выполнения операций деления компонент на число. Только для ```T``` равным ```i32```;
- ```Rem<i32>``` - для выполнения операций нахождения остатка от деления компонент на число. Только для ```T``` равным ```i32```.

::: warning derive-признаки
Структура дожна реализовывать следующие ```derive```-признаки: ```Debug```, ```Clone```, ```Default```, ```PartialEq```, ```Eq```, ```PartialOrd```, ```Ord```.
:::

Пример взаимодействия со структурой:

```rs
    // Методы
    let point = PointND::from(vec![6, -2, 1]);

    println!("{}", point.dim());
    println!("{:?}", point.x());
    println!("{:?}", point.y());
    println!("{:?}", point.z());

    // 3
    // 6
    // -2
    // 1

    // Generic, From<Vec>
    let mut slice_point = PointND::new(vec![
        "1",   "2",  "3",  "4",  "5",  "6",
        "7",   "8",  "9", "10", "11", "12",
        "13", "14", "15", "16", "17", "18",
        "19", "20", "21", "22", "23", "24",
    ]);
    // Debug
    println!("{slice_point:?}");

    // PointND { components: ["1", "2", "3", "4", "5", "6", "7", "8", "9",
    // "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21",
    // "22", "23", "24"] }

    // IntoIterator
    for component in slice_point.clone() {
        print!("{component} ");
    }

    println!("");

    // 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24

    // IndexMut
    slice_point[11] = "100";

    // Index
    println!("{}", slice_point[11]);

    // 100

    // From<usize>
    let integer_point: PointND<i32> = PointND::from(100);

    println!("{integer_point:?}");

    // PointND { components: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }

    // Into<Vec>
    let integer_vector: Vec<i32> = integer_point.into();

    println!("{integer_vector:?}");

    // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 0, 0, 0, 0]

    let numeric_point: PointND<i32> = PointND::from(10);

    // Operations
    println!("{:?}", -((((-(numeric_point + 10) - 90) + 50) * 2) / 4) % 10);
    // PointND { components: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5] }
```
