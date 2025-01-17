---
layout: 'intro'
---

# CLI

---

# Именованные аргументы

```console{*|1-3|5-7|2,6|3,7|*}
$ program --string-arg "Hello world" --bool-arg
string argument: Hello world
boolean argument: true

$ program --string-arg "Hello world"
string argument: Hello world
boolean argument: false
```

---

# Позиционные аргументы

```console{*|1-3|5-7|*}
$ program foo bar
first: foo
second: bar

$ program bar foo
first: bar
second: foo
```

---

# clap

````md magic-move
```shell
cargo add clap --features derive
```

```rs{*|1|4,5|6-14|7-9,11-13|16-22|17|19-21|*}
use clap::Parser;

/// Простая прогрмамм, приветствующая пользователя
#[derive(Parser, Debug)]
#[command(version, about, long_about = None)]
struct Args {
    /// Имя пользователя для приветствия
    #[arg(short, long)]
    name: String,

    /// Количество приветствий
    #[arg(short, long, default_value_t = 1)]
    count: u8,
}

fn main() {
    let args = Args::parse();

    for _ in 0..args.count {
        println!("Hello {}!", args.name);
    }
}
```

```console{*|1|2|4|6-10|12-17|*}
$ demo --help
Простая прогрмамм, приветствующая пользователя

Usage: rust-bin-test.exe [OPTIONS] --name <NAME>

Options:
  -n, --name <NAME>    Имя пользователя для приветствия
  -c, --count <COUNT>  Количество приветствий [default: 1]
  -h, --help           Print help
  -V, --version        Print version

$ demo --name Me --count 5
Hello Me!
Hello Me!
Hello Me!
Hello Me!
Hello Me!
```
````

---

# Subcommand

````md magic-move
```rs{*|2|4-9|*}
use std::path::PathBuf;
use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(version, about, long_about = None)]
struct Cli {
    #[command(subcommand)]
    command: Option<Commands>,
}
```

```rs
#[derive(Subcommand)]
enum Commands {
    /// проводит испытания
    Test {
        /// списки тестовых значений
        #[arg(short, long)]
        list: bool,
    },
}
```

```rs{*|4-13|*}
fn main() {
    // ...

    match &cli.command {
        Some(Commands::Test { list }) => {
            if *list {
                println!("Printing testing lists...");
            } else {
                println!("Not printing testing lists...");
            }
        },
        None => {}
    }

    // ...
}
```

```console{*|6-8|*}
$ program --help
A simple to use, efficient, and full-featured Command Line Argument Parser

Usage: program[EXE] [OPTIONS] [COMMAND]

Commands:
  test  проводит испытания
  help  Print this message or the help of the given subcommand(s)

Options:
  -h, --help           Print help
  -V, --version        Print version
```
````

---

# Настройка парсера

````md magic-move
```rs{*|1|2|3|4|6-9|*}
#[derive(Parser)]
#[command(name = "MyApp")]
#[command(version = "1.0")]
#[command(about = "Does awesome things", long_about = None)]
struct Cli {
    #[arg(long)]
    two: String,
    #[arg(long)]
    one: String,
}
```

```rs{*|2|*}
#[derive(Parser)]
#[command(version, about, long_about = None)] // Read from `Cargo.toml`
struct Cli {
    #[arg(long)]
    two: String,
    #[arg(long)]
    one: String,
}
```
````

---

# Валидация значений аргументов

````md magic-move
```rs{*|4,5|8-12|*}
#[derive(Parser)]
#[command(version, about, long_about = None)]
struct Cli {
    #[arg(value_enum)]
    mode: Mode,
}

#[derive(Copy, Clone, PartialEq, Eq, PartialOrd, Ord, ValueEnum)]
enum Mode {
    Fast,
    Slow,
}
```

```rs{*|4-11|*}
fn main() {
    let cli = Cli::parse();

    match cli.mode {
        Mode::Fast => {
            println!("Hare");
        }
        Mode::Slow => {
            println!("Tortoise");
        }
    }
}
```

```rs{*|6,7|11|*}
use clap::Parser;

#[derive(Parser)]
#[command(version, about, long_about = None)]
struct Cli {
    #[arg(value_parser = clap::value_parser!(u16).range(1..))]
    port: u16,
}

fn main() {
    let cli = Cli::parse();

    println!("PORT = {}", cli.port);
}
```

```rs{*|1,7|*}
use std::ops::RangeInclusive;
use clap::Parser;

#[derive(Parser)]
#[command(version, about, long_about = None)]
struct Cli {
    #[arg(value_parser = port_in_range)]
    port: u16,
}

fn main() {
    let cli = Cli::parse();

    println!("PORT = {}", cli.port);
}
```

```rs
const PORT_RANGE: RangeInclusive<usize> = 1..=65535;

fn port_in_range(s: &str) -> Result<u16, String> {
    let port: usize = s
        .parse()
        .map_err(|_| format!("`{s}` isn't a port number"))?;
    if PORT_RANGE.contains(&port) {
        Ok(port as u16)
    } else {
        Err(format!(
            "port not in range {}-{}",
            PORT_RANGE.start(),
            PORT_RANGE.end()
        ))
    }
}
```
````
