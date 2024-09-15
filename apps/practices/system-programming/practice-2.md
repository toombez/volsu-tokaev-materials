# Управление потоком Rust

## Кортежи

**Кортеж** - это набор значений разных типов.

Кортежи строятся с помощью круглых скобок ```()```, а каждый кортеж сам по себе является значением с сигнатурой типа ```(T1, T2, ...)```, где ```T1```, ```T2``` - типы его членов. Функции могут использовать кортежи для возврата нескольких значений, так как кортежи могут содержать любое количество значений.

```rs
let long_tuple = (1u8, 2u16, 3u32, 4u64,
                    -1i8, -2i16, -3i32, -4i64,
                    0.1f32, 0.2f64,
                    'a', true);
```

## Массивы

**Массив** - это коллекция объектов одного типа ```T```, хранящихся в непрерывной памяти. Массивы создаются с помощью скобок ```[]```, а их длина, которая известна во время компиляции, является частью сигнатуры типа ```[T; length]```.

```rs
let xs: [i32; 5] = [1, 2, 3, 4, 5];
let ys: [i32; 500] = [0; 500]
```

## Statement/Expression

**Statement** - это инструкции, которые выполняют некоторое действие и не возвращают значение.

**Expression** вычисляются до результирующего значения.

```rs Statement
fn main() {
    let y = 6 + 1;
}
```

```rs Expression
fn main() {
    let y = {
        let x = 6;
        x + 1
    };
}
```

::: info Объяснение разницы **Statement** и **Expression**
В обоих случаях значения ```y``` равны, однако в варианте Expression создается и инициализируется дополнительная область видимости со своей переменной ```x```, к которой добавляется значение ```1```. После завершения выполнения блока кода переменная ```x``` становится недоступной.
:::

## Возврат значения из функций

В качестве возвращаемого значения будет использоваться конечное выражение в функции. Кроме того, оператор ```return``` можно использовать для возврата значения, полученного ранее внутри функции, даже внутри циклов или операторов ```if```.

```rs
fn main() {
    let r1 = add(1, 2);
    let r2 = add_explicitly(1, 2);
}

fn add(a: u32, b: u32) -> u32 {
    a + b
}

fn add_explicitly(a: u32, b: u32) -> u32 {
    return a + b;
}
```

## Условная конструкция

Ветвление с помощью ```if-else``` похоже на аналоги в других языка программирования. В отличие от многих из них, логическое условие не должно быть заключено в круглые скобки, а после каждого условия должен следовать блок. Условные операторы ```if-else``` являются выражениями, и все ветки должны возвращать значения одного и того же типа.

```rs
fn main() {
    let n = 5;

    if n < 0 {
        print!("{} - отрицательное", n);
    } else if n > 0 {
        print!("{} - положительное", n);
    } else {
        print!("{} - нуль", n);
    }
}
```

## Циклические контрукции

### ```while```

Ключевое слово ```while``` может использоваться для запуска цикла, пока условие истинно.

```rs
fn main() {
    let mut number = 3;

    while number != 0 {
        println!("{number}!");

        number -= 1;
    }

    println!("END");
}
```

### ```for```

Конструкция ```for in``` может быть использована для итерации по итератору. Один из самых простых способов создания итератора - использовать обозначение диапазона ```a..b```. Это позволяет получить значения от ```a``` (включительно) до ```b``` (исключительно) с шагом в единицу.

```rs
// Итерирование по массиву
fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a {
        println!("значение element: {element}");
    }
}
```

```rs
// Итерирование по диапазону
fn main() {
    for element in 0..10 {
        println!("значение element: {element}");
    }
}
```


::: info Включающие диапазоны
В качестве альтернативы можно использовать ```a...=b``` для диапазона, который включает в себя оба конца.
:::

# Задания для выполнения

## Задание 1

Напишите программу, которая генерирует $20$ чисел Фибоначчи.

### Пример

```sh
cargo run
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765
```

::: info Числа Фибоначчи
Числа Фибоначчи - числовой ряд, при котором каждое последующее число равно сумме двух предыдущих
:::

## Задание 2

Напишите программу, которая будет рассчитывать значение факториала для выражения:

$$(n + 20) \bmod 8,$$

где $n$ - номер по списку группы.

### Пример

Для студента, который идет $15$-м по списку группы, будет вычислено значение $6$.

::: info Факториал
Факториал числа $n$ - это произведение всех натуральных чисел от единицы до $n$. Обозначается факториал символом восклицательного знака: $!$.
:::

## Задание 3

Напишите программу, в которой создается массив на $n + 20$ целых чисел, где $n$ - номер по списку группы.

Для каждого элемента созданного массива рассчитать значения по следующей формуле:
$$\left( n^ 2 \bmod \frac{n}{2}\right) * (5 + n)$$

### Пример

Для студента, который идет $5$ по списку группы, будет выведено следующее:

```sh
cargo run
0, 72, 0, 0, 2, 0, 56, 98, 0, 0, 0, 62, 74, 0, 0, 0, 74, 0, 0, 116, 0, 0, 12, 60, 62,
```

::: info
Массив, используемый в примере:
```rs
[12, 67, 114, -54, -7, -100, 51, -103, -64, -126, -84, 57, 69, -6, -74, 80, -79, 100, 18, 111, 76, 26, -17, -65, -67]
```
:::

## Задание 4

Напишите программу, которая инициализирует массив размером $10$. Для каждого элемента массива проверьте делимость на число $n * 2$, где $n$ - номер по списку группы.

### Пример

Для студента, который идет $5$ по списку группы, будет выведено следующее:

```sh
cargo run
Число -24: false
Число 67: false
Число 64: false
Число 108: false
Число -65: false
Число -52: false
Число 10: true
Число -122: false
Число 120: true
Число -97: false
```

::: info
Массив, используемый в примере:

```rs
[-24, 67, 64, 108, -65, -52, 10, -122, 120, -97]
```
:::

## Задание 5

Напишите программу, которая инициализирует два массива размера $10$. Для $i$ элементов массивов вычислить следующее выражение:

$$
\left(\frac{a_i}{2} + \frac{b_i}{2}\right) * n,
$$

где $a_i$ - $i$-й элемент массива $a$, $b_i$ - $i$-й элемент массива $b$, $n$ - номер по списку группы.

### Пример

```sh
cargo run
Для чисел 121 и 98: 0
Для чисел 82 и -101: 0
Для чисел -77 и -107: 1
Для чисел -43 и 25: 0
Для чисел -108 и 8: 0
Для чисел -1 и -126: 63
Для чисел -71 и -33: 0
Для чисел -97 и 114: 0
Для чисел 8 и 120: 8
Для чисел -64 и 37: 0
```

::: info
Массивы, используемые в примере:

```rs
[121, 82, -77, -43, -108, -1, -71, -97, 8, -64]
[98, -101, -107, 25, 8, -126, -33, 114, 120, 37]
```
:::

## Задание 6

Напишите программу, которая инициализирует массив на $30$ элементов. Необходимо найти количество чисел $n$ в этом массиве, где $n$ - номер по списку группы.

### Пример

Для студента, который $10$ в списке, будет вычислено значение 2.

::: info
Массив, используемый в примере:

```rs
[113, -85, 14, 95, -38, 24, -27, 65, -54, 127, 88, 108, 99, 122, 71, -77, 124, -92, -105, 48, -25, -110, 10, -109, 96, 10, 110, 35, 108, 17]
```
:::