---
layout: 'intro'
---

# CLI

---

# Именованные аргументы

```console
$ program --string-arg "Hello world" --bool-arg
string argument: Hello world
boolean argument: true

$ program --string-arg "Hello world"
string argument: Hello world
boolean argument: false
```

---

# Позиционные аргументы

```console
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

```rs

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

```console
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
```rs
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

```rs
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

```console
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
```rs
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

```rs
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
```rs
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

```rs
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

```rs
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

```rs
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

---
---
---
---
---
---
---
---
---
---
---

# clap
