---
layout: 'intro'
---

# 17. Concurrency

---

# `std::thread`

````md magic-move
```rs{*|1|3-9|4-6|5,8}
use std::thread;

fn main() {
    thread::spawn(|| {
        println!("My Thread");
    });

    println!("End");
}
```

```console
End
```

```rs{*|8|*}
use std::thread;

fn main() {
    let my_thread = thread::spawn(|| {
        println!("My Thread");
    });

    my_thread.join().unwrap();
    println!("End");
}
```

```console
My Thread
End
```

```rs{*|4,7,10|6-11|13-15|*}
use std::thread;

fn main() {
    let mut threads = vec![];

    for _ in 1..4 {
        let my_thread = thread::spawn(|| {
            println!("Thread executed");
        });
        threads.push(my_thread);
    }

    for t in threads {
        t.join().unwrap();
    }

    println!("End");
}
```

```console
Thread executed
Thread executed
Thread executed
End
```
````

---

# Владение и потоки

```rs{*|4|6-8|10|12|*}
use std::thread;

fn main() {
    let data = String::from("Hello");

    let my_thread = thread::spawn(move || {
        println!("{}", data); //
    });

    // println!("{}", data); // ! Ошибка

    my_thread.join().unwrap();
}
```

---

# Smart pointer `Arc`

````md magic-move
```rs{*|1|5,7,8|10-13|14-17|*}
use std::sync::Arc;
use std::thread;

fn main() {
    let data = Arc::new(vec![1, 2, 3, 4, 5]);

    let clone1 = Arc::clone(&data);
    let clone2 = Arc::clone(&data);

    let thread1 = thread::spawn(move || {
        let sum: i32 = clone1.iter().sum();
        println!("Thread 1 - Sum of Data: {}", sum);
    });
    let thread2 = thread::spawn(move || {
        let len: usize = clone2.len();
        println!("Thread 2 - Length of Data: {}", len);
    });

    thread1.join().unwrap();
    thread2.join().unwrap();
}
```

```console
Thread 1 - Sum of Data: 15
Thread 2 - Length of Data: 5
```
````

---

# `Mutex`

<img src="https://metanit.com/rust/tutorial/pics/9.10.png">

---

# `Mutex`

````md magic-move
```rs{*|1,4|6-9|11|*}
use std::sync::Mutex;

fn main() {
    let data = Mutex::new(22);

    {
        let mut guard = data.lock().unwrap();
        *guard *= 2;
    }

    println!("Data: {:?}", data.lock().unwrap()); // Data: 44
}
```

```rs{*|1,2,5|8-15|9|10-13|11,12|*}
use std::sync::{Mutex, Arc};
use std::thread;

fn main() {
    let data = Arc::new(Mutex::new(0));
    let mut threads = vec![];

    for _ in 0..4 {
        let data_clone = Arc::clone(&data);
        let t = thread::spawn(move || {
            let mut data_lock = data_clone.lock().unwrap();
            *data_lock += 1;
        });
        threads.push(t);
    }

    for t in threads {
        t.join().unwrap();
    }
    println!("Data: {}", data.lock().unwrap()); // Data: 4
}
```

```console
Data: 4
```

```rs{*|1,2|3-7|5|*}
fn process_data(id:u32, data: Arc<Mutex<u32>>) {
    let mut data_lock = data.lock().unwrap();
    for _ in 0..4 {
        *data_lock = *data_lock  + 1;
        thread::sleep(Duration::from_millis(200));
        println!("Thread[{}] num={}", id, data_lock);
    }
}
```

```rs{*|2|5-9|6|7|*}
fn main(){
    let data = Arc::new(Mutex::new(0));
    let mut threads = vec! [];

    for id in 0..4 {
        let data_clone = Arc::clone(&data); // копируем Arc
        let t = thread::spawn(move || process_data(id, data_clone));
        threads.push(t);
    }

    for t in threads {
        t.join().unwrap();
    }
    println!("{}", data.lock().unwrap());
}
```

```console
Thread[0] num=1
Thread[0] num=2
Thread[0] num=3
Thread[0] num=4
Thread[2] num=5
Thread[2] num=6
Thread[2] num=7
Thread[2] num=8
Thread[1] num=9
Thread[1] num=10
Thread[1] num=11
Thread[1] num=12
Thread[3] num=13
Thread[3] num=14
Thread[3] num=15
Thread[3] num=16
16
```
````

---

# `RwLock`

<img src="https://metanit.com/rust/tutorial/pics/9.11.png">

---

# `RwLock`

````md magic-move
```rs{*|1,2|3-7|4,5|6|*}
fn write(data: Arc<RwLock<i32>>) {
    let mut data_lock = data.write().unwrap();
    for pass in 1..4 {
        *data_lock += 1;
        println!("Writer (Pass{}) - value: {}", pass, *data_lock);
        thread::sleep(Duration::from_millis(400));
    }
}
```

```rs{*|1,2|3-6|5|*}
fn read(id: u32, data: Arc<RwLock<i32>>) {
    let value = data.read().unwrap();
    for pass in 1..4 {
        println!("Reader {} (Pass{}) - value: {}", id, pass, value);
        thread::sleep(Duration::from_millis(200));
    }
}
```

```rs{*|2,5|6,7|9-14|*}
fn main() {
    let value = Arc::new(RwLock::new(0));
    let mut threads = vec![];

    let value_copy = Arc::clone(&value);
    let writer = thread::spawn(move || write(value_copy));
    threads.push(writer);

    for id in 1..4 {
        let value_copy = Arc::clone(&value);
        let reader = thread::spawn(move || read(id, value_copy));

        threads.push(reader);
    }

    for t in threads {
        t.join().unwrap();
    }
}
```

```console
Writer (Pass1) - value: 1
Writer (Pass2) - value: 2
Writer (Pass3) - value: 3
Reader 2 (Pass1) - value: 3
Reader 1 (Pass1) - value: 3
Reader 3 (Pass1) - value: 3
Reader 2 (Pass2) - value: 3
Reader 1 (Pass2) - value: 3
Reader 3 (Pass2) - value: 3
Reader 2 (Pass3) - value: 3
Reader 1 (Pass3) - value: 3
Reader 3 (Pass3) - value: 3
```

````

---

# `Mutex` и `RwLock`

- `Mutex` - если операции чтения и записи требуют монопольности;

- `RwLock` - если операции чтения не требуют монопольность.

---

# Взаимоблокировки

<img src="https://metanit.com/rust/tutorial/pics/9.12.png" >

---

# Взаимоблокировки `Mutex`

````md magic-move
```rs{*|1,2|3-6|*}
fn check_mutex_and_increase(data_clone: Arc<Mutex<i32>>){
    let mut guard = data_clone.try_lock();
    match guard {
        Ok(ref mut value) => { **value += 1; }
        Err(_) => { println!("Failed to acquire lock, continuing…"); }
    }
}
```

```rs
let data1 = Arc::new(Mutex::new(0));
let data2 = Arc::new(Mutex::new(0));
```

```rs{*|2,3|4-9|5,6|7|8|*}
let thread1 = thread::spawn({
    let data1_clone = Arc::clone(&data1);
    let data2_clone = Arc::clone(&data2);
    move || {
        let mut guard1 = data1_clone.lock().unwrap();
        *guard1 += 1;
        thread::sleep(Duration::from_millis(200));
        check_mutex_and_increase(data2_clone);
    }
});
```

```rs{*|5,6|*}
let thread2 = thread::spawn({
    let data1_clone = Arc::clone(&data1);
    let data2_clone = Arc::clone(&data2);
    move || {
        let mut guard2 = data2_clone.lock().unwrap();
        *guard2 += 1;
        thread::sleep(Duration::from_millis(200));
        check_mutex_and_increase(data1_clone);
    }
});
```

```rs
thread1.join().unwrap();
thread2.join().unwrap();

println!("data1 = {}, data2 = {}",
    data1.lock().unwrap(),
    data2.lock().unwrap()
);
```

```console
Failed to acquire lock, continuing…
Failed to acquire lock, continuing…
data1 = 1, data2 = 1
```

````

---

# Взаимоблокировки `RwLock`

````md magic-move
```rs
let data1 = Arc::new(RwLock::new(1));
let data2 = Arc::new(RwLock::new(2));
```

```rs{*|2,3|4-13|5-7|9|11-12|*}
let thread1 = thread::spawn({
    let data1_clone = Arc::clone(&data1);
    let data2_clone = Arc::clone(&data2);
    move || {
        let mut data1_write = data1_clone.write().unwrap();
        *data1_write += 1;
        println!("Thread1 writes {} in data1", *data1_write);

        thread::sleep(std::time::Duration::from_millis(200));

        let data2_read = data2_clone.read().unwrap();
        println!("Thread1 reads {} from data1", *data2_read);
    }
});
```

```rs{*|2,3|4-19|5-10|12|14-18|*}
let thread2 = thread::spawn({
    let data1_clone = Arc::clone(&data1);
    let data2_clone = Arc::clone(&data2);
    move || {
        let data2_write = data2_clone.try_write();
        if let Ok(mut value) = data2_write{
            *value += 1;
            println!("Thread1 writes {} in data2", *value);
        }
        else{ println!("Unable to get write lock"); }

        thread::sleep(std::time::Duration::from_millis(200));

        let data1_read = data1_clone.try_read();
        if let Ok(value) = data1_read{
            println!("Thread1 reads {} from data1", *value);
        }
        else{ println!("Unable to get read lock"); }
    }
});
```

```rs
thread1.join().unwrap();
thread2.join().unwrap();

println!("Final Data1: {:?}", *data1.read().unwrap());
println!("Final Data2: {:?}", *data2.read().unwrap());
```

```console
Thread1 writes 2 in data1
Thread1 writes 3 in data2
Unable to get read lock
Thread1 reads 3 from data1
Final Data1: 2
Final Data2: 3
```
````

---

# `mpsc`

````md magic-move
```rs
let (tx, rx) = mpsc::channel();
let tx1 = tx.clone();
```

```rs{*|2-6|7-10|8|9|*}
thread::spawn(move || {
    let messages = vec![
        String::from("Hello foo"),
        String::from("Hello bar"),
        String::from("Hello baz"),
    ];
    for mes in messages {
        tx.send(mes).unwrap();
        thread::sleep(Duration::from_secs(1));
    }
});
```

```rs{*|2-5|6-9|7|8|*}
thread::spawn(move || {
    let messages = vec![
        String::from("Good bye quux"),
        String::from("Good bye bat "),
    ];
    for mes in messages {
        tx1.send(mes).unwrap();
        thread::sleep(Duration::from_secs(1));
    }
});
```

```rs
for received in rx {
    println!("{received}");
}
```

```console
Hello foo
Good bye quux
Hello bar
Good bye bat
Hello baz
```
````

<!-- atomic -->
