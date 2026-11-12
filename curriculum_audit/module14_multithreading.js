// Module 14: Multithreading (Topics 136-143)

module.exports = [
  {
    topicId: 136,
    slug: 'multitasking-vs-multithreading',
    title: 'Multitasking vs Multithreading Concepts',
    definition: `- **Multitasking**: The capability of an operating system to execute multiple distinct tasks or processes concurrently (e.g. running Chrome, Spotify, and IntelliJ simultaneously).
- **Process**: An executing instance of an application with its own isolated memory address space allocated by the OS.
- **Multithreading**: The capability of a single process to execute multiple lightweight sub-tasks (threads) concurrently within the same shared memory space.
- **Thread**: The smallest unit of CPU execution ("lightweight process") within a program.`,
    simpleExplanation: `- **The Restaurant Analogy**:
  • **Multitasking / Processes**: Running two completely different restaurants on opposite sides of town (Pizza Place vs Sushi Bar). Each has its own separate kitchen, inventory, and rent (isolated memory).
  • **Multithreading**: Inside the Pizza Place, you have 4 chefs (threads). One rolls dough, one ladles tomato sauce, one adds cheese, and one operates the oven. All four chefs share the same kitchen, ingredients, and counter space (shared Heap memory).`,
    importantDifferences: `| Dimension | Process-Based Multitasking | Thread-Based Multitasking (Multithreading) |
|---|---|---|
| **Memory Isolation** | Each process has its own separate memory space | All threads of a process share the same Heap & Metaspace |
| **Creation Overhead** | Heavyweight (OS allocates process control blocks) | Lightweight (shares process resources) |
| **Context Switching** | High overhead (swapping memory maps and registers) | Low overhead (swapping registers and program counters) |
| **Communication** | Inter-Process Communication (IPC: sockets, pipes) | Direct communication via shared memory & objects |
| **Failure Impact** | One process crash does not affect other processes | An unhandled fatal crash in one thread can affect the whole process |`,
    javaCodeExamples: `public class ThreadConceptDemo {
    public static void main(String[] args) {
        System.out.println("Main thread executing in Process ID: " + ProcessHandle.current().pid());

        // Spawning concurrent worker threads sharing process resources
        Thread worker1 = new Thread(() -> {
            System.out.println("Worker 1 executing on: " + Thread.currentThread().getName());
        }, "Worker-Chef-1");

        Thread worker2 = new Thread(() -> {
            System.out.println("Worker 2 executing on: " + Thread.currentThread().getName());
        }, "Worker-Chef-2");

        worker1.start();
        worker2.start();
    }
}`,
    outputExplanation: `- Both worker threads run concurrently within the same Java process, sharing its memory while maintaining their own independent execution stacks.`,
    interviewReadyAnswer: `- "Multitasking executes multiple independent processes with isolated memory spaces, while multithreading executes multiple concurrent threads within a single process sharing heap memory."
- "Threads provide faster context switching and efficient shared-memory communication at the cost of requiring concurrency synchronization."`,
    quickRevisionPoints: `- Process = heavyweight, separate memory space.
- Thread = lightweight, shared memory within a process.
- Context switching between threads is much faster than processes.
- Threads share Heap and Metaspace, but maintain private Stacks and PC Registers.`
  },
  {
    topicId: 137,
    slug: 'thread-life-cycle-states',
    title: 'Thread Life Cycle & States in Java',
    definition: `- **Thread Life Cycle**: The architectural progression of states that a Java thread transitions through from birth to completion.
- **The 6 States defined in \`Thread.State\` enum**:
  1. **\`NEW\`**: Thread created with \`new Thread()\` but \`start()\` not yet called.
  2. **\`RUNNABLE\`**: Thread executing in the JVM or waiting for CPU resource scheduling.
  3. **\`BLOCKED\`**: Thread waiting to acquire an intrinsic monitor lock to enter a \`synchronized\` block/method.
  4. **\`WAITING\`**: Thread waiting indefinitely for another thread to perform a specific action (e.g. \`wait()\`, \`join()\`, \`LockSupport.park()\`).
  5. **\`TIMED_WAITING\`**: Thread waiting for a specified timeout duration (e.g. \`sleep(ms)\`, \`wait(ms)\`, \`join(ms)\`).
  6. **\`TERMINATED\`**: Thread has finished execution (run method completed or fatal uncaught exception).`,
    simpleExplanation: `- **The Job Applicant Analogy**:
  • **NEW**: Submitting an application form (thread object exists on heap).
  • **RUNNABLE**: Standing in the candidate queue ready to be interviewed (waiting for CPU time slice).
  • **BLOCKED**: Waiting outside the interview door because another candidate is inside with the door locked (monitor lock contention).
  • **WAITING**: Waiting at home for the HR department to call back (\`wait()\`).
  • **TIMED_WAITING**: Taking a 30-minute coffee break before returning (\`sleep(30 mins)\`).
  • **TERMINATED**: Interview process finished, applicant has left the building.`,
    importantConcepts: `- **start() vs run()**:
  • Calling **\`start()\`** creates a new OS thread and transitions state from \`NEW\` to \`RUNNABLE\`, then invokes \`run()\` on the new thread.
  • Calling **\`run()\`** directly does NOT start a new thread; it executes synchronously in the caller's thread like a normal method!
  • Calling \`start()\` twice on the same thread instance throws **\`IllegalThreadStateException\`**.`,
    javaCodeExamples: `public class ThreadLifecycleDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(() -> {
            try {
                Thread.sleep(200); // Transitions to TIMED_WAITING
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        // 1. NEW state
        System.out.println("State after creation: " + t.getState()); // NEW

        // 2. RUNNABLE state
        t.start();
        System.out.println("State after start(): " + t.getState());  // RUNNABLE

        // 3. TIMED_WAITING state
        Thread.sleep(50);
        System.out.println("State during sleep(): " + t.getState()); // TIMED_WAITING

        // 4. TERMINATED state
        t.join(); // Wait for thread completion
        System.out.println("State after completion: " + t.getState()); // TERMINATED
    }
}`,
    outputExplanation: `- Traces thread state progression through \`NEW -> RUNNABLE -> TIMED_WAITING -> TERMINATED\`.`,
    interviewReadyAnswer: `- "A Java thread has 6 states in Thread.State: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED."
- "Calling start() registers the thread with the OS scheduler to invoke run() asynchronously, whereas calling run() directly executes sequentially on the calling thread."`,
    quickRevisionPoints: `- 6 States: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED.
- \`start()\` creates a new thread; \`run()\` does not.
- Calling \`start()\` twice throws \`IllegalThreadStateException\`.
- BLOCKED waits for a monitor lock; WAITING waits for notification.`
  },
  {
    topicId: 138,
    slug: 'thread-creation-thread-vs-runnable',
    title: 'Thread Creation: Thread Class vs Runnable Interface',
    definition: `- **Two Standard Ways to Create Threads in Java**:
  1. **Extending \`java.lang.Thread\` class**: Subclass overrides the \`run()\` method.
  2. **Implementing \`java.lang.Runnable\` interface**: Class implements \`void run()\` and passes the instance to a \`Thread\` object constructor.
- **Architectural Consensus**: Implementing **\`Runnable\` (or \`Callable\`)** is overwhelmingly preferred in enterprise development.`,
    simpleExplanation: `- **Owning a Delivery Truck vs Hiring a Courier Service**:
  • Extending \`Thread\` is like manufacturing your own custom delivery truck just to deliver a parcel. You are locked in and cannot extend any other vehicle.
  • Implementing \`Runnable\` is writing the shipping label (the task) and handing it to an existing courier service (\`Thread\` or \`ExecutorService\`). Your class is still free to inherit from any other business class.`,
    importantDifferences: `| Dimension | Extending Thread Class | Implementing Runnable Interface |
|---|---|---|
| **Multiple Inheritance** | Java doesn't support multiple class inheritance; cannot extend another class | Class can implement multiple interfaces and extend another domain class |
| **Separation of Concerns** | Tightly couples task definition with thread execution mechanics | Cleanly separates the task (\`Runnable\`) from the runner (\`Thread\`) |
| **Thread Pooling** | Cannot be submitted directly to \`ExecutorService\` thread pools | Native fit for \`ExecutorService\` and modern thread pools |
| **Memory Overhead** | Every task instance creates a full Thread object with OS allocations | One task instance can be executed across multiple shared threads |`,
    javaCodeExamples: `// Approach 1: Implementing Runnable (RECOMMENDED)
class TaskRunner implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnable task executing on: " + Thread.currentThread().getName());
    }
}

// Approach 2: Lambda syntax for Runnable
public class ThreadCreationDemo {
    public static void main(String[] args) {
        // Modern Lambda instantiation
        Runnable task = () -> System.out.println("Lambda task running on: " + Thread.currentThread().getName());

        Thread t1 = new Thread(new TaskRunner(), "Custom-Runnable-Thread");
        Thread t2 = new Thread(task, "Lambda-Thread");

        t1.start();
        t2.start();
    }
}`,
    outputExplanation: `- Illustrates decoupled task execution using \`Runnable\` implementations and modern lambdas.`,
    interviewReadyAnswer: `- "Implementing Runnable is preferred over extending Thread because Java allows single class inheritance, and Runnable cleanly separates the task logic from thread execution."
- "Runnable also integrates seamlessly with ExecutorService thread pools and Lambda expressions."`,
    quickRevisionPoints: `- Prefer \`Runnable\` over extending \`Thread\`.
- Preserves single inheritance capability for other classes.
- Enables separation of task from execution.
- Integrates cleanly with \`ExecutorService\` thread pools.`
  },
  {
    topicId: 139,
    slug: 'thread-priorities-daemon-threads',
    title: 'Thread Priorities & Daemon Threads',
    definition: `- **Thread Priority**: An integer value between **1 and 10** assigned to a thread that hints to the JVM thread scheduler how urgently CPU time slices should be allocated:
  • \`Thread.MIN_PRIORITY = 1\`
  • \`Thread.NORM_PRIORITY = 5\` (default)
  • \`Thread.MAX_PRIORITY = 10\`
- **Daemon Thread**: A low-priority background support thread that provides services to user threads. The JVM terminates automatically as soon as all user (non-daemon) threads complete, abruptly abandoning any running daemon threads.`,
    simpleExplanation: `- **VIP Priority**: Giving a thread priority 10 is like putting an express lane tag on a car; however, the highway patrol (the OS thread scheduler) is not obligated to honor it on all platforms.
- **Daemon Thread**: Like the custodial night-crew cleaning an office building. Once the last regular employee leaves the building, the building security turns off the main power and locks the doors immediately without waiting for the cleaners to finish sweeping.`,
    importantConcepts: `- **Priority Non-Guarantee**: Thread priorities depend heavily on the host operating system's native thread scheduler. Priorities provide **no strict guarantee** of execution order and should never be relied upon for program correctness!
- **Setting Daemon Status**: Must invoke \`setDaemon(true)\` **BEFORE** calling \`start()\`. Invoking it after \`start()\` throws **\`IllegalThreadStateException\`**.
- **Common Daemon Examples**: The JVM Garbage Collector thread, Finalizer thread, and background timer threads are daemons.`,
    javaCodeExamples: `public class DaemonAndPriorityDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread daemonWorker = new Thread(() -> {
            while (true) {
                System.out.println("Daemon service doing background housekeeping...");
                try { Thread.sleep(500); } catch (InterruptedException e) { break; }
            }
        });

        // Set priority and daemon status BEFORE start()
        daemonWorker.setPriority(Thread.MIN_PRIORITY); // Priority 1
        daemonWorker.setDaemon(true); // Marked as background daemon
        daemonWorker.start();

        System.out.println("Main user thread running for 1.2 seconds...");
        Thread.sleep(1200);
        System.out.println("Main user thread exiting. JVM will terminate daemon immediately!");
    }
}`,
    outputExplanation: `- The daemon loop runs indefinitely, but when the main user thread finishes, the JVM shuts down and terminates the daemon instantly without waiting.`,
    interviewReadyAnswer: `- "Thread priorities range from 1 to 10 with 5 as default; they are platform-dependent hints and do not guarantee execution order."
- "Daemon threads are background service threads (like GC) that do not prevent the JVM from exiting when all user threads finish. setDaemon(true) must be called before start()."`,
    quickRevisionPoints: `- Priority range: 1 (\`MIN_PRIORITY\`) to 10 (\`MAX_PRIORITY\`), default 5.
- Priorities are advisory hints, not execution guarantees.
- Daemon threads terminate abruptly when all user threads finish.
- \`setDaemon(true)\` must be called before \`start()\`.`
  },
  {
    topicId: 140,
    slug: 'thread-synchronization-synchronized',
    title: 'Thread Synchronization & synchronized Keyword',
    definition: `- **Thread Synchronization**: The capability to control the concurrent access of multiple threads to any shared mutable resource (critical section) to prevent data corruption and race conditions.
- **Race Condition**: A concurrency bug occurring when multiple threads read and write shared data concurrently, causing the final outcome to depend on non-deterministic thread scheduling order.
- **Intrinsic Lock (Monitor Lock)**: Every object in Java has an associated monitor lock. A thread must acquire this lock before entering a \`synchronized\` block or method.`,
    simpleExplanation: `- **The Single-Occupancy Restroom**: When a person enters the restroom (synchronized block), they lock the door from the inside (acquire monitor lock). Other people must wait in the hallway (BLOCKED state). When the person exits, they unlock the door, allowing the next person in line to enter.`,
    syntax: `// 1. Synchronized Instance Method (locks on 'this' instance)
public synchronized void deposit(double amount) { ... }

// 2. Synchronized Static Method (locks on ClassName.class object)
public static synchronized void globalLog() { ... }

// 3. Synchronized Block (locks on explicit object monitor - RECOMMENDED)
synchronized (lockObject) {
    // Critical Section
}`,
    javaCodeExamples: `class BankAccount {
    private int balance = 1000;

    // Synchronized method locks on the current instance 'this'
    public synchronized void withdraw(int amount) {
        if (balance >= amount) {
            System.out.println(Thread.currentThread().getName() + " is withdrawing " + amount);
            try { Thread.sleep(50); } catch (InterruptedException e) {}
            balance -= amount;
            System.out.println(Thread.currentThread().getName() + " completed. Remaining: " + balance);
        } else {
            System.out.println(Thread.currentThread().getName() + " rejected! Insufficient funds.");
        }
    }

    public int getBalance() { return balance; }
}

public class SynchronizationDemo {
    public static void main(String[] args) throws InterruptedException {
        BankAccount account = new BankAccount();

        Runnable task = () -> account.withdraw(800);

        Thread t1 = new Thread(task, "User-A");
        Thread t2 = new Thread(task, "User-B");

        t1.start();
        t2.start();

        t1.join();
        t2.join();
        System.out.println("Final Account Balance: " + account.getBalance());
    }
}`,
    outputExplanation: `- Without \`synchronized\`, both threads might see balance >= 800 and overdraw to -$600.
- With \`synchronized\`, only one thread enters at a time, protecting balance integrity (remaining balance: 200).`,
    interviewReadyAnswer: `- "The synchronized keyword provides mutual exclusion by requiring threads to acquire an object's intrinsic monitor lock before entering critical sections."
- "Instance methods lock on 'this', static methods lock on 'Class.class', and synchronized blocks lock on a specified monitor object for finer-grained control."`,
    quickRevisionPoints: `- Protects critical sections from race conditions.
- Instance synchronized methods lock on \`this\`.
- Static synchronized methods lock on \`ClassName.class\`.
- Synchronized blocks are preferred over synchronized methods for performance.`
  },
  {
    topicId: 141,
    slug: 'inter-thread-communication-wait-notify',
    title: 'Inter-Thread Communication (wait, notify, notifyAll)',
    definition: `- **Inter-Thread Communication (ITC)**: A coordination mechanism that allows synchronized threads to communicate with each other regarding resource availability and state changes.
- **The Core Methods in \`java.lang.Object\`**:
  1. **\`wait()\`**: Releases the monitor lock and puts current thread into WAITING state until notified.
  2. **\`notify()\`**: Wakes up a single arbitrary thread waiting on this object's monitor.
  3. **\`notifyAll()\`**: Wakes up all threads waiting on this object's monitor.`,
    simpleExplanation: `- **The Restaurant Waiter & Chef**:
  • The waiter arrives at the kitchen hatch to pick up food. If no dishes are ready, the waiter steps aside into the waiting area and sleeps (\`wait()\`), releasing the kitchen counter.
  • The chef cooks the meal, places it on the counter, and rings the bell (\`notify()\`).
  • The bell wakes the waiter, who re-checks the counter, takes the plate, and serves the customer.`,
    importantConcepts: `- **Why in \`Object\` Class, NOT in \`Thread\`?**:
  • Locks belong to **Objects**, not to Threads. \`wait()\` and \`notify()\` operate on the object's intrinsic monitor lock.
  • Must be called from inside a **\`synchronized\` context** holding that object's monitor lock! Calling outside throws **\`IllegalMonitorStateException\`**.
  • **Always Call wait() inside a While Loop**: Spurious wakeups can cause a thread to wake without being explicitly notified. A \`while (condition)\` loop re-checks the state before proceeding!`,
    javaCodeExamples: `class MessageQueue {
    private String message;
    private boolean empty = true;

    public synchronized void writeMessage(String msg) {
        while (!empty) {
            try { wait(); } catch (InterruptedException e) {}
        }
        this.message = msg;
        this.empty = false;
        System.out.println("Produced: " + msg);
        notifyAll(); // Wake up waiting consumers
    }

    public synchronized String readMessage() {
        while (empty) {
            try { wait(); } catch (InterruptedException e) {}
        }
        this.empty = true;
        System.out.println("Consumed: " + message);
        notifyAll(); // Wake up waiting producers
        return message;
    }
}

public class ProducerConsumerDemo {
    public static void main(String[] args) {
        MessageQueue queue = new MessageQueue();
        new Thread(() -> {
            queue.writeMessage("Interview Question 1");
            queue.writeMessage("Interview Question 2");
        }, "Producer").start();

        new Thread(() -> {
            queue.readMessage();
            queue.readMessage();
        }, "Consumer").start();
    }
}`,
    outputExplanation: `- Demonstrates coordinated Producer-Consumer execution using \`wait()\` and \`notifyAll()\` with monitor lock handoffs.`,
    interviewReadyAnswer: `- "wait, notify, and notifyAll are defined in Object class because locks are tied to objects. They must be invoked within a synchronized block to avoid IllegalMonitorStateException."
- "wait() must always be called inside a while loop to protect against spurious wakeups and state invalidation."`,
    quickRevisionPoints: `- Defined in \`Object\` class, not \`Thread\`.
- Must hold the object's monitor lock; else throws \`IllegalMonitorStateException\`.
- \`wait()\` releases the monitor lock; \`sleep()\` does NOT release locks!
- Always guard \`wait()\` inside a \`while (condition)\` loop.`
  },
  {
    topicId: 142,
    slug: 'thread-safety-volatile-atomic',
    title: 'Thread Safety, Volatile Keyword & Atomic Variables',
    definition: `- **Thread Safety**: Property of code that guarantees correct and predictable execution when accessed concurrently by multiple threads without extra caller synchronization.
- **\`volatile\` Keyword**: Field modifier guaranteeing **Visibility** and **Ordering (Prevents Instruction Reordering)** by forcing reads and writes directly to main memory, bypassing CPU L1/L2 caches.
- **Atomic Classes (\`java.util.concurrent.atomic\`)**: Classes like \`AtomicInteger\` providing lock-free, thread-safe compound operations using low-level hardware **Compare-And-Swap (CAS)** instructions.`,
    simpleExplanation: `- **Volatile**: A shared whiteboard in the center of the office. Whenever anyone writes on it, everyone sees the update immediately instead of relying on outdated notes in their private notebooks (CPU caches).
- **Atomic**: An electronic turnstile with a hardware sensor. Increments the headcount in a single unbroken physical step, eliminating race conditions without locking the entrance.`,
    importantDifferences: `| Dimension | \`volatile\` Keyword | \`synchronized\` Keyword | \`AtomicInteger\` (CAS) |
|---|---|---|---|
| **Locking Mechanism** | Lock-free | Blocking (Intrinsic Monitor Lock) | Lock-free (Hardware CAS) |
| **Visibility Guarantee** | YES | YES | YES |
| **Atomicity Guarantee** | NO (e.g. \`count++\` is not atomic!) | YES | YES |
| **Performance Overhead** | Very Low | Higher (thread context switching) | Low to Medium |`,
    javaCodeExamples: `import java.util.concurrent.atomic.AtomicInteger;

public class VolatileAtomicDemo {
    // Volatile ensures visibility of the shutdown flag across threads
    private static volatile boolean running = true;

    // AtomicInteger guarantees atomic increment without synchronized locks
    private static AtomicInteger counter = new AtomicInteger(0);

    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {
            while (running) {
                counter.incrementAndGet(); // Thread-safe CAS increment
            }
            System.out.println("Worker stopped cleanly. Final count: " + counter.get());
        });

        worker.start();
        Thread.sleep(100);
        running = false; // Immediately visible to worker thread!
        worker.join();
    }
}`,
    outputExplanation: `- \`volatile\` ensures the worker thread immediately observes the \`running = false\` update from the main thread.
- \`AtomicInteger\` safely increments the counter without lock contention.`,
    interviewReadyAnswer: `- "volatile guarantees visibility and prevents instruction reordering by reading/writing directly to main memory, but does not provide atomicity for compound operations like count++."
- "Atomic classes provide both visibility and lock-free atomicity using CPU-level Compare-And-Swap (CAS) instructions."`,
    quickRevisionPoints: `- \`volatile\` = Visibility + Ordering; does NOT guarantee Atomicity.
- \`synchronized\` = Mutual exclusion + Visibility + Atomicity (blocking).
- Atomic classes (\`AtomicInteger\`) = Lock-free thread-safe updates via CAS.
- Modern architectures favor Atomic classes for single-variable counters.`
  },
  {
    topicId: 143,
    slug: 'deadlock-causes-prevention',
    title: 'Deadlock in Multithreading: Causes, Detection & Prevention',
    definition: `- **Deadlock**: A catastrophic concurrency condition where two or more threads are permanently blocked, each waiting for a lock held by the other, resulting in complete system freeze.
- **The 4 Coffman Conditions Required for Deadlock**:
  1. **Mutual Exclusion**: Resources cannot be shared simultaneously.
  2. **Hold and Wait**: Threads hold at least one resource while waiting to acquire another.
  3. **No Preemption**: Resources cannot be forcibly taken from a thread holding them.
  4. **Circular Wait**: A closed chain of threads exists where each thread holds a resource needed by the next.`,
    simpleExplanation: `- **The Narrow Bridge Analogy**: Two cars meet head-to-head in the exact middle of a narrow one-lane bridge over a river. Neither car can move forward because the other blocks the lane. If neither driver is willing to reverse (No Preemption), both cars sit there forever in complete deadlock.`,
    howItWorks: `- **Classic Scenario**:
  • Thread 1 acquires Lock A and attempts to acquire Lock B.
  • Simultaneously, Thread 2 acquires Lock B and attempts to acquire Lock A.
  • Neither thread can proceed, and neither releases its held lock!`,
    javaCodeExamples: `public class DeadlockPreventionDemo {
    private static final Object lockA = new Object();
    private static final Object lockB = new Object();

    // RULE: Acquire locks in strict, identical global order to eliminate Circular Wait!
    public static void safeOperation1() {
        synchronized (lockA) {
            System.out.println("Thread 1 acquired lockA");
            synchronized (lockB) {
                System.out.println("Thread 1 acquired lockB - safe!");
            }
        }
    }

    public static void safeOperation2() {
        // Must acquire lockA FIRST, then lockB (identical to safeOperation1)
        synchronized (lockA) {
            System.out.println("Thread 2 acquired lockA");
            synchronized (lockB) {
                System.out.println("Thread 2 acquired lockB - safe!");
            }
        }
    }

    public static void main(String[] args) {
        new Thread(DeadlockPreventionDemo::safeOperation1).start();
        new Thread(DeadlockPreventionDemo::safeOperation2).start();
    }
}`,
    outputExplanation: `- Enforcing an identical lock acquisition sequence (\`lockA\` then \`lockB\`) breaks the circular wait condition, guaranteeing deadlock-free execution.`,
    interviewReadyAnswer: `- "Deadlock occurs when two or more threads are blocked forever, each holding a lock the other requires. It requires mutual exclusion, hold-and-wait, no-preemption, and circular wait."
- "The primary prevention technique is strict Lock Ordering—ensuring all threads acquire multiple locks in the identical sequence—or using timed locks via ReentrantLock.tryLock()."`,
    quickRevisionPoints: `- 4 Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.
- Break circular wait by enforcing strict global lock ordering.
- Use \`ReentrantLock.tryLock(timeout)\` to back out if a lock is unavailable.
- Detect deadlocks in production using \`jstack\` or \`ThreadMXBean\`.`
  }
];

