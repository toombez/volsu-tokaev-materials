# Unit-тестирование

Тесты - это функции на **Rust**, которые проверяют, что тестируемый код работает ожидаемым образом. Тело тестовых функций обычно выполняет некоторую настройку, запускает код, который мы тестируем, и затем сравнивает полученный результат с тем, что мы ожидаем.

Большинство модульных тестов располагается в модуле `tests`, помеченном атрибутом `#[cfg(test)]`. Тестовые функции помечаются атрибутом `#[test]`.

Тесты заканчиваются неудачей, когда что-либо в тестовой функции вызывает панику. Есть несколько вспомогательных макросов:

- `assert!(expression)` - паникует, если результат выражения равен `false`.
- `assert_eq!(left, right)` и `assert_ne!(left, right)` - сравнивает левое и правое выражения на равенство и неравенство соответственно.

```rs
pub fn add(left: usize, right: usize) -> usize {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
```

Тесты могут быть запущены при помощи команды `cargo test`.

## `panic!()` в тестах

Для тестирования функций, которые должны паниковать при определённых обстоятельствах, используется атрибут `#[should_panic]`. Этот атрибут принимает необязательный параметр `expected =` с текстом сообщения о панике. Если ваша функция может паниковать в разных случаях, то этот параметр поможет вам быть уверенным, что вы тестируете именно ту панику, которую собирались.

```rs
pub fn divide_non_zero_result(a: u32, b: u32) -> u32 {
    if b == 0 {
        panic!("Divide-by-zero error");
    } else if a < b {
        panic!("Divide result is zero");
    }
    a / b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_divide() {
        assert_eq!(divide_non_zero_result(10, 2), 5);
    }

    #[test]
    #[should_panic]
    fn test_any_panic() {
        divide_non_zero_result(1, 0);
    }

    #[test]
    #[should_panic(expected = "Divide result is zero")]
    fn test_specific_panic() {
        divide_non_zero_result(1, 10);
    }
}
```

## игнорирование тестов

Тесты могут быть помечены атрибутом `#[ignore]`, чтобы они были исключены из списка запускаемых командой `cargo test`. Такие тесты можно запустить с помощью команды `cargo test -- --ignored`.

```rs
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 2), 4);
    }

    #[test]
    fn test_add_hundred() {
        assert_eq!(add(100, 2), 102);
        assert_eq!(add(2, 100), 102);
    }

    #[test]
    #[ignore]
    fn ignored_test() {
        assert_eq!(add(0, 0), 0);
    }
}
```

## Задание для выполнения

Необходимо создать стркутуру `Person` и `Rectangle`.

Обе структуры должны пройти все тесты, описанные в модуле `tests`. (Для запуска тестов необходимо использовать команду `cargo test`)

::: warning Логика структур
На основании описанных тестов необходимо определить данные и методы, которые должны быть реализованы в структурах.
:::

```rs
#[cfg(test)]
mod tests {
    use super::*;

    mod person {
        use super::*;

        #[test]
        fn constructor_correct() {
            let _person = Person::new(
                "Иванов",
                "Дмитрий",
                Some("Петрович")
            );
        }

        #[test]
        fn full_name_with_middle_name_correct() {
            let person = Person::new(
                "Иванов",
                "Дмитрий",
                Some("Петрович"),
            );

            assert_eq!(person.full_name(), "Иванов Дмитрий Петрович".to_string());
        }

        #[test]
        fn full_name_without_middle_name_correct() {
            let person = Person::new(
                "Иванов",
                "Дмитрий",
                None,
            );

            assert_eq!(person.full_name(), "Иванов Дмитрий".to_string());
        }

        #[test]
        fn check_middle_name() {
            let person = Person::new(
                "Иванов",
                "Дмитрий",
                None,
            );

            assert!(!person.is_have_middle_name());

            let person = Person::new(
                "Иванов",
                "Дмитрий",
                Some("Петрович"),
            );

            assert!(person.is_have_middle_name());
        }
    }

    mod rectangle {
        use super::Rectangle;

        #[test]
        fn constructor_correct() {
            let _rectangle = Rectangle::new(10, 10);
            let _rectangle = Rectangle::new(70, 50);
        }

        #[test]
        #[should_panic(expected = "width cannot be equal zero")]
        fn constructor_width_error() {
            let _rectangle = Rectangle::new(0, 6);
        }

        #[test]
        #[should_panic(expected = "height cannot be equal zero")]
        fn constructor_height_error() {
            let _rectangle = Rectangle::new(6, 0);
        }

        #[test]
        #[should_panic(expected = "width cannot be equal zero")]
        fn constructor_width_height_error() {
            let _rectangle = Rectangle::new(0, 0);
        }

        #[test]
        fn is_square_correct() {
            let rectangle = Rectangle::new(10, 10);
            assert!(rectangle.is_square());

            let rectangle = Rectangle::new(10, 20);
            assert!(!rectangle.is_square());
        }

        #[test]
        fn square_constructor() {
            let square = Rectangle::square(25);
            assert!(square.is_square());
        }

        #[test]
        fn diagonal_correct() {
            let square = Rectangle::square(25);

            assert_eq!(
                square.diagonal(),
                (25.0_f64 * 25.0_f64 + 25.0_f64 * 25.0_f64).sqrt()
            )
        }

        #[test]
        fn inner_circle_radius_correct() {
            let rectangle = Rectangle::new(6, 10);
            assert_eq!(rectangle.inner_circle_radius(), 3);

            let rectangle = Rectangle::new(10, 6);
            assert_eq!(rectangle.inner_circle_radius(), 3);

            let rectangle = Rectangle::new(10, 10);
            assert_eq!(rectangle.inner_circle_radius(), 5);
        }

        #[test]
        fn outer_circle_radius_correct() {
            let rectangle = Rectangle::new(10, 10);

            assert_eq!(
                rectangle.outer_circle_radius(),
                (10.0_f64.powf(2.0) + 10.0_f64.powf(2.0)).powf(0.5)
            )
        }
    }
}
```
