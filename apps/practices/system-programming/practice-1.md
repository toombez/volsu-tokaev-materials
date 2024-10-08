# Знакомство с языком программирования Rust

## Установка Rust

Для работы с rust можно воспользоваться 2 методами:

1. [Установка на локальную машину](https://doc.rust-lang.org/book/ch01-01-installation.html).
2. [Работа в песочнице](https://play.rust-lang.org/).

Каждый из вариантов работы с rust имеет свои недостатки и преимущества.

::: info Метод работы с rust на практиках
Во время выполнения практик предполагается, что экосистема rust установлена локально на рабочую машину.
:::

## Создание и запуск проекта

Для того, чтобы создать проект rust, необходимо выполнить следующее:

1. Перейти в директорию, в которой будет находиться проект:

```sh
cd <Путь до директории>
```

2. Создать проект:

::: code-group
```sh [Создание библиотеки]
cargo new --lib <Название библиотеки>
```

```sh [Создание исполняемого модуля]
cargo new --bin <Название модуля>
```
:::

:::info Выбор проекта для практических работ
Для выполнения практических работ будут использоваться исполняемые модули.
:::

После создания проекта, получаем следующую структуру:

```sh
project
├── cargo.toml # Метаданные для проекта
└── src # директория с исходым кодом модуля
   ├── main.rs # Если выбран параметр `--bin` | точка входа в программу
   └── lib.rs # Если выбран параметр `--lib` | публичный модуль библиотеки
```

Для запуска проекта, необходимо перейти в директорию проекта и выполнить команду запуска:

```sh
cd project
cargo run
```

::: info Детали работы ```cargo run```
1. Для успешного запуска проекта, в нем обязательно должен находиться файл ```main.rs```, который является точкой входя для приложений, написанных на rust.

2. Во время выполнения ```cargo run``` сначала запускает команду ```rustc <модуль для компиляции>``` и запуск скомпилированного модуля.
:::

## Анатомия программы rust

```rs
fn main() {
    println!("Hello, world!");
}
```

В данном блоке кода определяется функция ```main```, которая будет точкой входа в программу. В теле функции находится макрос ```println!```, который выводит в поток вывода информацию, которая передается в качестве параметра. В нашем случае строка **"Hello, world!"**.

## Вывод в терминал

Для вывода информации в терминал в rust существует несколько методов. Основным для нас сейчас является макрос ```println!()```. ```println!()``` позволяет отобразить информацию в форматированном виде:

```rs
println!("Hello, {}!", "world"); // Отобразит "Hello, world!"
```

Вместо ```{}``` подставится параметр, который мы передаем после форматированной строки.

::: info Индекс параметра, передаваемого в форматированную строку
```{}``` шаблон может принимать целое число, чтобы определить индекс параметра, который необходимо отобразить:

```rs
println!("{0}: {1} - {0}", "A", "B"); // Отобразит "A: B - A"
```
:::

## Типы данных rust

Rust предоставляет доступ к большому количеству примитивов:

### Скалярные типы

- знаковые целочисленные: ```i8```, ```i16```, ```i32```, ```i64``` и ```isize``` (размер указателя);
- беззнаковые целочисленные: ```u8```, ```u16```, ```u32```, ```u64``` и ```usize``` (размер указателя);
- вещественные: ```f32```, ```f64```;
- char скалярное значение Unicode, например: ```'a'```, ```'α'``` и ```'∞'``` (4 байта каждый);
- bool: ```true``` или ```false```;
- единичный тип ```()```, значение которого так же ```()```.


Несмотря на то, что значение единичного типа является кортежем, оно не считается составным типом, потому что не содержит нескольких значений.

### Составные типы
- массивы, например ```[1, 2, 3]```;
- кортежи, например ```(1, true)```.

::: info Аннотация типов
Переменные всегда должны быть аннотированы. Числам можно указать определённый тип с помощью суффикса, иначе будет присвоен тип по умолчанию. Целочисленные значения по умолчанию ```i32```, а вещественные ```f64```. Стоит заметить, что Rust также умеет выводить типы из контекста.
:::

## Операции над числовыми типами данных

Для числовых операций определены базовые математические операции:

- ```+``` для операций сложения;
- ```-``` для операций вычитания;
- ```*``` для операций умножения;
- ```/``` для операций деления;
- ```%``` для операций нахождения остатка от деления;
- метод ```.pow``` для операций возведения в степень.

```rs
println!("{}", 1 + 2); // 3
println!("{}", 7 - 9); // -2
println!("{}", 4 * 2); // 8
println!("{}", 9 / 3); // 3
println!("{}", 5 % 2); // 1
println!("{}", 5.pow(2)); // 25
```

::: info Ограничения при работе с разными типами
Rust не умеет автоматически преобразовывать данные одного типа в другой, что заставляет программиста явно указывать преобразование типов:

```rs
println!("{}", 2.0 * 2); // Выдаст ошибку
println!("{}", (2.0 as i32) * 2); // Выполнит вычисление
```
:::

## Объявление переменных

Для создания переменных в Rust используется ключевое слово ```let``` и ```const```, разница между которыми заключается в том, как значения создаются на моменте компиляции.

Тип данных для переменной Rust может определить сам, на основании значения:

```rs
let a = 5; // Создаст целочисленную переменную с типом i32.
let b = 5.5; // Создаст числовую переменную с плавующим знаком. По-умолчанию, f32.
let c: i8 = 2; // Создает перенную с типом данных i8.
const d = 128; // Создать константу с типом i32.
```

::: info Изменяемость переменных
Ключевое слово let создает иммутабельную переменную, значение которой изменить нельзя. Для того, чтобы сделать мутабельную переменную, необходимо использовать ключевое слово mut:

```rs
let mut a: i32 = 5; // Мутабельная переменная a с типом данных i32.
```
:::

## Написание функций

Функции объявляются с помощью ключевого слова ```fn```. Их аргументы имеют явно заданный тип, как у переменных, и, если функция возвращает значение, возвращаемый тип должен быть указан после стрелки ```->```.

Последнее выражение в функции будет использовано как возвращаемое значение. Так же можно использовать оператор ```return```, чтобы вернуть значение из функции раньше, даже из цикла или оператора ```if``` (о нем позже).

```rs
fn print_hello_world() { // Процедура, которая выводит "Hello, world!" в консоль
    println!("Hello, world!");
}

fn calc_a_plus_b(a: i32, b: i32) -> i32 { // Функция, которая считает сумму параметров `a` и `b`
    a + b
}
```

---

# Задания для выполнения

## Задание 1

Напишите программу на Rust, которая будет выводить ваш номер по списку группы и ФИО в следующем формате: ```№<Номер>: <Фамилия> <Имя> <Отчество>```.

### Пример:

```sh
cargo run
"№1: Иванов Иван Иванович"
```

## Задание 2

Выведите в консоль с помощью символов "#" первую букву вашей фамилии размером 6 строчек и 6 столбцов.

### Пример

Для студента, фамилия которого начинается на "И", будет выведено следующее:

```sh
cargo run
"#    #"
"#   ##"
"#  # #"
"# #  #"
"##   #"
"#    #"
```

## Задание 3

Напишите программу на Rust, которая будет вычислять следующее выражение:

$$ k * 15 - (k + 20)^{0.5},$$

где $k$ - номер по списку группы.

::: warning Условие для $k$
$k$ необходимо создать с помощью ключевого слова ```const```.
:::

### Пример:

Для студента, который идет 30-м по списку группы, будет выведено следующее:

```sh
cargo run
"Ответ: 442.9289"
```

## Задание 4

Необходимо написать функцию, которая будет считать площать круга по формуле:

$$ S = \pi * R^2 , $$

где $R$ - номер по списку группы.

### Пример

Для студента, который идет 30-м по списку группы, будет выведено следующее:

```sh
cargo run
"Площадь круга с радиусом 30 = 2827.4333"
```

---

# Материалы к практической

- Обучающая книга по Rust от создателей языка: [ссылка](https://doc.rust-lang.org/stable/book/);
- Список всех операторов Rust: [ссылка](https://doc.rust-lang.org/book/appendix-02-operators.html)
- Репозиторий с задачами Rust [ссылка](https://github.com/mainmatter/100-exercises-to-learn-rust)
