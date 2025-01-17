---
layout: 'intro'
---

# rataui

<img src="https://ratatui.rs/_astro/hero-light.DXG5UAQy_1YWiFp.webp" width="130">

---

# Установка

````md magic-move
```console
$ cargo add ratatui
```

```console
$ cargo install cargo-generate

$ cargo generate ratatui/templates
```
````

---

# Hello world

````md magic-move
```rs{*|1|2|3|*}
use color_eyre::Result;
use crossterm::event::{self, Event};
use ratatui::{DefaultTerminal, Frame};
```

```rs{*|2|3-5|6,1|*}
fn main() -> Result<()> {
    color_eyre::install()?;
    let terminal = ratatui::init();
    let result = run(terminal);
    ratatui::restore();
    result
}
```

```rs{*|2-7|3|4-6|1|*}
fn run(mut terminal: DefaultTerminal) -> Result<()> {
    loop {
        terminal.draw(render)?;
        if matches!(event::read()?, Event::Key(_)) {
            break Ok(());
        }
    }
}
```

```rs
fn render(frame: &mut Frame) {
    frame.render_widget("hello world", frame.area());
}
```
````

---

# Backends

- Crossterm (**CrosstermBackend**) и **crossterm** (по умолчанию).

- Termion (**TermionBackend**) с **termion** фичей.

- Termwiz (**TermwizBackend**) с **termwiz** фичей.

- **TestBackend**, используемый для тестирования UI.

---

# Widgets

````md magic-move
```rs{*|1-4|6-10|*}
pub trait Widget {
    fn render(self, area: Rect, buf: &mut Buffer)
       where Self: Sized;
}

pub trait StatefulWidget {
    type State;

    fn render(self, area: Rect, buf: &mut Buffer, state: &mut Self::State);
}
```

```rs
pub fn render_widget<W: Widget>(&mut self, widget: W, area: Rect)
```
````

---

# Layout

```rs{*|1|2|3-6|7|*}
let layout = Layout::default()
    .direction(Direction::Vertical)
    .constraints(vec![
        Constraint::Percentage(50),
        Constraint::Percentage(50),
    ])
    .split(frame.area());
```

---

# Event Handling

````md magic-move
```rs{*|2-8|3-6|*}
impl App{
    pub fn run(&mut self, terminal: &mut DefaultTerminal) -> io::Result<()> {
        while !self.exit {
            terminal.draw(|frame| self.draw(frame))?;
            self.handle_events()?;
        }
        Ok(())
    }

    fn draw(&self, frame: &mut Frame) {
        todo!()
    }

    fn handle_events(&mut self) -> io::Result<()> {
        todo!()
    }
}
```

```rs{*|2,3|*}
fn draw(&self, frame: &mut Frame) {
    // Trait Widget for App
    frame.render_widget(self, frame.area());
}
```

```rs{*|2-7|2|3-5|6|*}
fn handle_events(&mut self) -> io::Result<()> {
    match event::read()? {
        Event::Key(key_event) if key_event.kind == KeyEventKind::Press => {
            self.handle_key_event(key_event)
        }
        _ => {}
    };
    Ok(())
}
```

```rs{*|2-7|3|4|5|6|*}
fn handle_key_event(&mut self, key_event: KeyEvent) {
    match key_event.code {
        KeyCode::Char('q') => self.exit(),
        KeyCode::Left => self.decrement_counter(),
        KeyCode::Right => self.increment_counter(),
        _ => {}
    }
}
```
````
