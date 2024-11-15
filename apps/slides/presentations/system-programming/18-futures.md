---
layout: 'intro'
---

# Futures

---

# Futures

````md magic-move
```toml
[dependencies]
futures = "0.3"
```

```rs
async fn do_something() { /* ... */ }
```

```rs{*|1|3-5|7-10|8|9|*}
use futures::executor::block_on;

async fn hello_world() {
    println!("hello, world!");
}

fn main() {
    let future = hello_world();
    block_on(future);
}
```
````

---

# Futures

````md magic-move
```rs
async fn learn_song() -> Song { ... }
async fn sing_song(song: Song) { ... }
async fn dance() { ... }
```

```rs{*|2-4|2|3|4|*}
fn main() {
    let song = block_on(learn_song());
    block_on(sing_song(song));
    block_on(dance());
}
```

```rs{*|1-4|6-11|13-15|7,8|10|*}
async fn learn_and_sing() {
    let song = learn_song().await;
    sing_song(song).await;
}

async fn async_main() {
    let f1 = learn_and_sing();
    let f2 = dance();

    futures::join!(f1, f2);
}

fn main() {
    block_on(async_main());
}
```
````

---

# await

```rs{*|1|3-8|4-7|5|*}
async fn foo() -> u8 { 5 }

fn bar() -> impl Future<Output = u8> {
    async {
        let x: u8 = foo().await;
        x + 5
    }
}
```

---

# async block

```rs{*|4-7|*|1|3-8|*}
async fn foo() -> u8 { 5 }

fn bar() -> impl Future<Output = u8> {
    async {
        let x: u8 = foo().await;
        x + 5
    }
}
```

---

# async move

````md magic-move
```rs{*|2|4-6,8-10|*}
async fn blocks() {
    let my_string = "foo".to_string();

    let future_one = async {
        println!("{my_string}");
    };

    let future_two = async {
        println!("{my_string}");
    };

    let ((), ()) = futures::join!(future_one, future_two);
}
```

```rs{*|2|3-5|*}
fn move_block() -> impl Future<Output = ()> {
    let my_string = "foo".to_string();
    async move {
        println!("{my_string}");
    }
}
```
````

---

# join!

````md magic-move
```rs{*|1-5|7-11|2-3,8-9|4,10|*}
async fn get_book_and_music() -> (Book, Music) {
    let book = get_book().await;
    let music = get_music().await;
    (book, music)
}

async fn get_book_and_music() -> (Book, Music) {
    let book_future = get_book();
    let music_future = get_music();
    (book_future.await, music_future.await)
}
```

```rs{*|1|3-7|4,5|6|*}
use futures::join;

async fn get_book_and_music() -> (Book, Music) {
    let book_fut = get_book();
    let music_fut = get_music();
    join!(book_fut, music_fut)
}
```
````

---

# try_join!

````md magic-move
```rs{*|3,4|6-10|9|*}
use futures::try_join;

async fn get_book() -> Result<Book, String> { /* ... */ Ok(Book) }
async fn get_music() -> Result<Music, String> { /* ... */ Ok(Music) }

async fn get_book_and_music() -> Result<(Book, Music), String> {
    let book_fut = get_book();
    let music_fut = get_music();
    try_join!(book_fut, music_fut)
}
```

```rs{}
use futures::{
    future::TryFutureExt,
    try_join,
};

async fn get_book() -> Result<Book, ()> { /* ... */ Ok(Book) }
async fn get_music() -> Result<Music, String> { /* ... */ Ok(Music) }

async fn get_book_and_music() -> Result<(Book, Music), String> {
    let book_fut = get_book().map_err(|()| "Unable to get book".to_string());
    let music_fut = get_music();
    try_join!(book_fut, music_fut)
}
```
````

---

# select!

````md magic-move
```rs{*|7,8|11-12|16-19|*}
use futures::{
    future::FutureExt, // for `.fuse()`
    pin_mut,
    select,
};

async fn task_one() { /* ... */ }
async fn task_two() { /* ... */ }

async fn race_tasks() {
    let t1 = task_one().fuse();
    let t2 = task_two().fuse();

    pin_mut!(t1, t2);

    select! {
        () = t1 => println!("task one completed first"),
        () = t2 => println!("task two completed first"),
    }
}
```

```rs{*|4,5|6|8-15|9-14|10,11|12|13|*}
use futures::{future, select};

async fn count() {
    let mut a_fut = future::ready(4);
    let mut b_fut = future::ready(6);
    let mut total = 0;

    loop {
        select! {
            a = a_fut => total += a,
            b = b_fut => total += b,
            complete => break,
            default => unreachable!(),
        };
    }
    assert_eq!(total, 10);
}
```
````
