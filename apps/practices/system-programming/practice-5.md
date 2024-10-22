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

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=e41e25580ce86bf8042a32e0ac5a833c)


### Метод [```contains```](https://doc.rust-lang.org/std/string/struct.String.html#method.contains)

Возвращает ```true```, если переданная строка содержится в строке.

Возвращает ```false```, если не содержит.

```rs
let bananas = "bananas";

assert!(bananas.contains("nana"));
assert!(!bananas.contains("apples"));
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=da31dbb68dd3fe0eac26ad4dc6d855c7)

### Метод [```ends_with```](https://doc.rust-lang.org/std/string/struct.String.html#method.ends_with)

Возвращает ```true```, если строка заканчивается подстрокой, переданной в качестве параметра.

Возвращает ```false```, если не заканчивается.


```rs
let bananas = "bananas";

assert!(bananas.ends_with("anas"));
assert!(!bananas.ends_with("nana"));
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=d5dfd4bda2b91bacc71bbb892b407f9d)

### Метод [```starts_with```](https://doc.rust-lang.org/std/string/struct.String.html#method.starts_with)

Возвращает ```true```, если строка начинается с подстроки, переданной в качестве параметра.

Возвращает ```false```, если не начинается.

```rs
let bananas = "bananas";

assert!(bananas.starts_with("bana"));
assert!(!bananas.starts_with("nana"));
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=a2e4afa8feabe3b1b1f8e6905a5cc272)

### Метод [```find```](https://doc.rust-lang.org/std/string/struct.String.html#method.find)

Возвращает ```Some(index)``` - индекс первого, который соответствует переданной подстроке.

Возвращает ```None```, если подстрока не найдена в строке.

```rs
let s = "Löwe 老虎 Léopard Gepardi";

assert_eq!(s.find('L'), Some(0));
assert_eq!(s.find('é'), Some(14));
assert_eq!(s.find("pard"), Some(17));
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=b61eb5e6bb72e7a8122cb6db22195157)

### Метод [```to_uppercase```](https://doc.rust-lang.org/std/string/struct.String.html#method.to_uppercase)

Возвращает новую строку в верхнем регистре.

```rs
let s = "hello";

assert_eq!("HELLO", s.to_uppercase());
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=2ac099315f5c63d9e2509928f95056a7)

### Метод [```to_lowercase```](https://doc.rust-lang.org/std/string/struct.String.html#method.to_lowercase)

Возвращает новую строку в нижнем регистре.

```rs
let s = "HELLO";

assert_eq!("hello", s.to_lowercase());
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=ca39c370db001a36e3089b3971ae6dd1)

### Метод [```trim```](https://doc.rust-lang.org/std/string/struct.String.html#method.trim)

Возвращает новую строки, в которой удалены пробельные символы и переносы строк в начале и конце строки.

```rs
let s = "\n Hello\tworld\t\n";

assert_eq!("Hello\tworld", s.trim());
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=eb2fb0f49dd8a13fc5b7b7a0b3006c7f)

[Полное API строк](https://doc.rust-lang.org/std/string/struct.String.html)

## Модульная система rust

**Rust** предоставляет мощную систему модулей, которая используется для иерархического разделения кода на логические единицы (модули) и управления видимостью (публичное и приватное) между ними.

**Модуль** - это набор элементов, таких как: функции, структуры, типажи, блоки реализации (```impl```) и даже другие модули.

### Объявление модуля

**Rust** предоставляет несколько вариантов определения модулей:

- Используя ключевое слово ```mod```;
- Используя отдельный файл с названием модуля;
- Используя папку с названием модуля и файлом ```mod.rs``` внутри этой папки.

Рассмотрим каждый вариант объявления модуля:

#### Ключевое слово ```mod```:

Для объявления модуля можно использовать ключевое слово ```mod```, после которого следует название модуля. Модули, который объявлены следующем образом могут быть вложенными. Самый внешний по уровню вложенности будет по-умолчанию доступен всему файлу в рамках файла, в котором он объявлен.

```rs [ключевое слово mod]
mod first_mod {
    mod second_mod {
        // Модификатор pub используется, чтобы иметь возможность вызывать функцию
        pub fn second_fn() { println!("Второй модуль!") }
    }

    // Модификатор pub используется, чтобы иметь возможность вызывать функцию
    pub fn first_fn() { println!("Первый модуль!"); }
}

fn main() {
    first_mod::first_fn(); // функция доступна
    // first_mod::second_mod::second_fn() // вызовет ошибку, так как модуль
                                          // second_mod является приватным
}
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=9ad0276bcf356905b8d475d3b737d616)

#### Используя отдельный файл с названием модуля или ```mod.rs```, вложенный в папку с названием модуля

Для объявления модуля можно использовать файловую структуру. **Rust** воспринимает каждый файл или папку внутри крейта, как отдельный модуль. Так, например, для создания модуля ```first_mod``` можно использовать файл с этим названием: ```first_mod.rs```. Альтернативным вариантом может быть папка с названием модуля и файлом ```mod.rs``` внутри: ```first_mod/mod.rs```.

Для создания вложенного модуля необходимо желаемый модуль помещать внутрь папки, навзанной в качестве родительского модуля. Например, для создания вложенного модуля ```second_mod``` родителя ```first_mod``` необходимо создать папку ```first_mod``` и объявить модуль ```second_mod``` в ней.

::: code-group
```sh [Файловая структура]
crate
├── main.rs                 # файл
├── first_mod.rs            # файл
└── first_mod               # папка
     └── second_mod.rs      # файл
```

```rs [файл main.rs]
mod first_mod;

fn main() {
    first_mod::first_fn(); // функция доступна
    // first_mod::second_mod::second_fn() // вызовет ошибку, так как модуль
                                          // second_mod является приватным
}
```

```rs [файл first_mod.rs]
mod second_mod;

pub fn first_fn() {
    println!("Первый модуль!");
}
```

```rs [файл first_mod/second_mod.rs]
pub fn second_fn() {
    println!("Второй модуль!")
}
```
:::

### Видимость элементов модуля

По умолчанию элементы модуля имеют приватную видимость, но ее можно переопределить с помощью модификатора ```pub```. Только публичные элементы модуля могут быть доступны за пределами области видимости модуля.

```rs
// Модуль доступен всем
pub mod visible_mod {
    // Функция доступна только в рамках модуля visible_mod
    fn hidden_fn() {
        hidden_nested_mod::visible_fn();
    }

    // Функция доступна всем
    pub fn visible_fn() {
        visible_nested_mod::visible_fn();
    }

    // Модуль доступен всем как дочерний модуль visible_mod
    pub mod visible_nested_mod {
        // Функция не доступна вне модуля
        fn hidden_fn() {}

        // Функция доступна всем
        pub fn visible_fn() {}
    }

    // Модуль доступен только внетри родительского модуля visible_mod
    mod hidden_nested_mod {
        // Функция не доступна вне модуля
        fn hidden_fn() {}

        // Функция доступна в рамках родительского модуля visibe_mod
        pub fn visible_fn() {}
    }
}

fn main() {
    // visible_mod::hidden_fn(); // Ошибка
    visible_mod::visible_fn();
    visible_mod::visible_nested_mod::visible_fn();
    // visible_mod::visible_nested_mod::hidden_fn(); // Ошибка
    // visible_mod::hidden_nested_mod::visible_fn(); // Ошибка
    // visible_mod::hidden_nested_mod::hidden_fn(); // Ошибка
}
```

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=b1230c55e5db46ec739aee2fa1641ca4)

### Видимость полей структур

Структуры имеют дополнительный уровень видимости своих полей и методов. По умолчанию видимость приватна, и ее можно переопределить с помощью модификатора ```pub```. Эта видимость имеет значение только тогда, когда к структуре обращаются извне модуля, в котором она определена, и преследует цель скрыть информацию (инкапсулировать).

Рассмотрим следующую файловую структуру:

::: code-group
```sh [Файловая структура]
├── main.rs
├── point_2d.rs
└── point_nd.rs
```

```rs [point_2d.rs]
pub struct Point2D(i32, i32);

impl Point2D {
    // Функция доступна всем
    pub fn zero() -> Self {
        Self::private_static_fn();

        Self::new(0, 0)
    }

    // Функция доступна всем
    pub fn new(x: i32, y: i32) -> Self {
        Self(x, y)
    }

    // Функция доступна в рамках объявленной структуры
    fn private_static_fn() {}

    // Функция доступна в рамках экземпляра структуры
    fn private_fn(&self) {}

    // Функция доступна на экземпляре структуры
    pub fn x(&self) -> i32 {
        self.private_fn();
        self.0
    }

    // Функция доступна на экземпляре структуры
    pub fn y(&self) -> i32 { self.1 }
}
```

```rs [point_nd.rs]
pub struct PointND {
    components: Vec<i32>
}

impl PointND {
    // Функция доступна всем
    pub fn new(components: Vec<i32>) -> Self {
        Self { components }
    }

    // Функция доступна всем
    pub fn zeros(size: usize) -> Self {
        Self::private_static_fn();
        Self::new(vec![0; size])
    }

    // Функция доступна в рамках объявленной структуры
    fn private_static_fn() {}

    // Функция доступна в рамках экземпляра структуры
    fn private_fn(&self) {}

    // Функция доступна на экземпляре структуры
    pub fn x(&self) -> i32 {
        self.private_fn();
        self.components[0]
    }

    // Функция доступна на экземпляре структуры
    pub fn y(&self) -> i32 { self.components[1] }

    // Функция доступна на экземпляре структуры
    pub fn z(&self) -> i32 { self.components[1] }
}
```

```rs [main.rs]
pub mod point_2d;
pub mod point_nd;

fn main() {
    let point2d = point_2d::Point2D::new(2, 4);
    let zero_point2d = point_2d::Point2D::zero();
    // point_2d::Point2D::private_static_fn(); // Ошибка

    println!("x: {}, y: {}", point2d.x(), point2d.y());
    // point2d.private_fn(); // Ошибка

    let pointnd = point_nd::PointND::new(vec![1, 2, 3]);
    let zero_pointnd = point_nd::PointND::zeros(6);
    // point_nd::PointND::private_static_fn(); // Ошибка

    println!("x: {}, y: {}, z: {}", pointnd.x(), pointnd.y(), pointnd.z());
    // pointnd.private_fn(); // Ошибка
}
```
:::

### Ключевое слово ```use```

Объявление ```use``` можно использовать для привязки полного пути к новому имени, чтобы облегчить доступ.

::: warning ```use``` с файловыми модулями
Для использования ```use``` при использовании модулей, расположенных в отдельных файлах, необходимо сначала их подключать с помощью ```mod``` или ```pub mod```;
:::

Рассмотрим прошлый [пример](/system-programming/practice-5.html#видимость-полеи-структур). В данном примере для создания экземплятов структур используется следующая запись:

- ```point_2d::Point2D::new(2, 4)``` - для создания структуры Point2D из модуля point_2d;
- ```point_nd::PointND::new(vec![1, 2, 3])``` - для создания структуры PointND из модуля point_Nd.

Вместо того, чтобы каждый раз не обращаться к модулю и его дочерним элементам, предлагается подключить структуру напрямую в модуль:

```rs
use point_2d::Point2D;
use point_nd::PointND;

pub mod point_2d; // [!code ++]
pub mod point_nd; // [!code ++]

fn main() {
    let point2d = point_2d::Point2D::new(2, 4); // [!code --]
    let point2d = Point2D::new(2, 4); // [!code ++]
    let zero_point2d = point_2d::Point2D::zero(); // [!code --]
    let zero_point2d = Point2D::zero(); // [!code ++]
    // point_2d::Point2D::private_static_fn(); // Ошибка // [!code --]
    // point_2d::Point2D::private_static_fn(); // Ошибка // [!code ++]

    println!("x: {}, y: {}", point2d.x(), point2d.y());
    // point2d.private_fn(); // Ошибка

    let pointnd = point_nd::PointND::new(vec![1, 2, 3]); // [!code --]
    let pointnd = PointND::new(vec![1, 2, 3]); // [!code ++]
    let zero_pointnd = point_nd::PointND::zeros(6); // [!code --]
    let zero_pointnd = PointND::zeros(6); // [!code ++]
    // point_nd::PointND::private_static_fn(); // Ошибка // [!code --]
    // PointND::private_static_fn(); // Ошибка // [!code ++]

    println!("x: {}, y: {}, z: {}", pointnd.x(), pointnd.y(), pointnd.z());
    // pointnd.private_fn(); // Ошибка
}
```


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

[Запуск в песочнице](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=b6f552f0a8d28174f6ed6d15c8689180)

::: info Структура модуля через файловую систему
Ту же структуру модуля можно реализовать, используя файловую систему:

```sh
crate
 │   lib.rs                  # Точка входа для всех модулей
 ├── front_of_house.rs       # Модуль front_of_house, подключающий дочерние модули
 └── front_of_house          # Папка для подмодулей модуля front_of_house
     ├── hosting.rs          # Модуль hosting.rs, подключающий функции
     │   ├── add_to_waitlist # Публичная функция модуля
     │   └── seat_at_table   # Публичная функция модуля
     ├── serving.rs          # Модуль serving.rs, подключающий функции
     │   ├── take_order      # Приватная функция модуля
     │   ├── serve_order     # Публичная функция модуля
     │   └── take_payment    # Публичная функция модуля
     └── private_mod.rs      # Приватный модуль private_mod
```
:::

---

## Задания для выполнения

### Задание 1

Реализуйте структуру ```Person```, которая хранит следующие данные о пользователе:

- идентификатор пользователя (```id```)
- имя (```first_name```);
- фамилия (```last_name```);
- отчество (```patronymic```);
- электронный почтовый адрес (```email```);
- роль в системе (```role```);
- возраст (```age```).

#### Дополнительные условия

Каждое из полей, за исключением поля ```role```, необходимо реализовать как структуру. У каждой подобной структуры необходимо создать приватный статический метод для валидации данных, метод для получения значения, хранящегося в структуре и метод, возвращающий значение по-умолчанию. Например, рассмотрим структуру ```Age``` и поле ```age``` структуры ```Person```:

::: code-group
```rs [person/age.rs]
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
// Подключение модуля age
pub mod age;
// Создание алиаса к структуре Age
pub use age::Age;

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

- ```new(value: <T>) -> Option<K>```, где ```T``` - значение, хранящееся в структуре, ```K``` - экземпляр структуры. Функция возвращает ```Some(K)```, если валидация прошла успешно, иначе - ```None```;
- ```validate(value: <T>) -> bool```, где ```T``` - значение, хранящееся в структуре;
- ```default() -> K```, где ```K``` - экземпляр структуры

::: warning Уточнение данных ```T```
- Для поля ```id``` - ```i32```;
- Для поля ```age``` - ```i8```;
- Для поля ```first_name``` - ```&str```;
- Для поля ```last_name``` - ```&str```;
- Для поля ```patronymic``` - ```&str```;
- Для поля ```email``` - ```&str```;
- Для поля ```role``` - ```&str```.
:::

Ограничения:

- ```id``` - без ограничений;
- ```first_name```, ```last_name```, ```patronymic``` должны быть короче ```50``` символов.
- ```email``` - должен содержать символы ```@``` и ```.```. Обязательно необходимо проверять, что ```@``` находится раньше ```.```.
- ```role``` - необходимо реализовать в виде ```enum```. Допустимые значения: ```Admin```, ```User```, ```Moderator```.

::: warning Метод ```from_string``` для ```Role```
Для структуры ```Role``` реализуйте метод ```from_string(value: &str) -> Option<Self>```, которая преобразует строку в ```Role```. ```Some(Self)``` возвращается, если при проверке строки вернулось ```true```, иначе - ```None```.
:::

Для создания экземпляров структуры ```Person``` необходимо реализовать два метода:

1. Функцию ```new``` следующей сигнатуры:

```rs
new(
    id: Id,
    age: Age,
    first_name: FirstName,
    last_name: LastName,
    patronymic: Patronymic,
    email: Email,
    role: Role,
) -> Person
```

Функция принимает созданные экземпляры структур полей и возвращает экземпляр структуры ```Person```

2. Функцию ```from_primitives``` следующей сигнатуры:

```rs
from_primitives(
    id: u32,
    age: i8,
    first_name: &str,
    last_name: &str,
    patronymic: &str,
    email: &str,
    role: &str,
) -> Person
```

Функция принимает примитивные типы данных, на основании которых создаются соответствующие экземпляры структур полей. Если при создании экземпляра поля вернулось ```None```, то необходимо создать значение структуры по-умолчанию.

::: code-group
```rs [Создание без ошибок]
let person_from_primitives = Person::from_primitives(
    1,
    20,
    "Иван",
    "Александрин",
    "Олегович",
    "temp@email.test",
    "Admin",
) // Экземпляр создан со значениями, которые передавали
```

```rs [Создание с ошибокой на поле age]
let person_from_primitives = Person::from_primitives(
    1,
    1000,
    "Иван",
    "Александрин",
    "Олегович",
    "temp@email.test",
    "Admin",
) // Экземпляр создан, но для поля age было взято знаечние по-умолчанию.
  // Получаем структуру с значением поля age равным 18.
```
:::

#### Пример

```rs
// --snip--

fn main() {
    let person = Person::new(
        // .unwrap() используется для игнорирования возможной ошибки
        Id::new(1).unwrap(),
        Age::new(20).unwrap(),
        FirstName::new("Иван").unwrap(),
        LastName::new("Александрин").unwrap(),
        Patronymic::new("Олегович").unwrap(),
        Email::new("temp@email.test").unwrap(),
        Role::Admin,
    );

    let person_from_primitives = Person::from_primitives(
        1,
        20,
        "Иван",
        "Александрин",
        "Олегович",
        "temp@email.test",
        "Admin",
    )

    let person_from_primitives_with_default_age = Person::from_primitives(
        1,
        1000, // Заменится на 18 после создания
        "Иван",
        "Александрин",
        "Олегович",
        "temp@email.test",
        "Admin",
    )
}
```

### Задание 2

Необходимо реализовать следующую структуру модулей:

```sh
crate                           # точка входа
 ├── math                       # модуль
 │   ├── linear_algebra         # модуль
 │   │   ├── dot_product        # функция
 │   │   ├── vector_magnitude   # функция
 │   │   └── cross_product      # функция
 │   └── utils                  # модуль
 │       ├── factorial          # функция
 │       └── fibonacci          # функция
 └── graphics                   # модуль
     ├── cube                   # функция
     └── ball                   # функция
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

#### Объяснение модулей

##### Модуль math

Модуль, который предоставляет фунции и утилиты для работы с математикой. Является точкой входа для модулей ```linear_algebra``` и ```utils```.

##### Модуль linear_algebra

Модуль для функций линейной алгебры. Внутри модуля необходимо реализовать три функции:

1. ```dot_product(a: &Vec<f64>, b: &Vec<f64>) -> f64```;
2. ```vector_magnitude(a: &Vec<f64>) -> isize```;
3. ```cross_product(a: &Vec<f64>, b: &Vec<f64>) -> Vec<f64>```.

::: info Объяснение функций

- [dot_product](https://en.wikipedia.org/wiki/Dot_product);
- [vector_magnitude](https://en.wikipedia.org/wiki/Magnitude_(mathematics));
- [cross_product](https://en.wikipedia.org/wiki/Cross_product#Computing).

:::

##### Модуль utils

Модуль для утилитарных функций. Внутри модуля необходимо реализовать две функции:

1. ```factorial(value: usize) -> usize```;
2. ```fibonacci(count: usize) -> Vec<usize>```.

::: info Объяснение функций
- [factorial](https://en.wikipedia.org/wiki/Factorial);
- [fibonacci](https://en.wikipedia.org/wiki/Fibonacci_sequence). Первое число последовательности Фибоначчи - ```0```, второе - ```1```.
:::

##### Модуль graphics

Модуль, позволяющий создавать представление об фигурах. Необходимо реализовать две структуры, хранящие информацию об фигуре:

- ```cube``` - хранит информацию об ширине, длине и высоте куба;
- ```ball``` - хранит информацию об радиусе шара.
