// Module 18: Date and Time API (Topics 171-176)

module.exports = [
  {
    topicId: 171,
    slug: 'legacy-date-calendar-limitations',
    title: 'Legacy Date and Time (java.util.Date, Calendar & Limitations)',
    definition: `- **Legacy Date & Time API**: The original date/time classes introduced in Java 1.0 (\`java.util.Date\`) and Java 1.1 (\`java.util.Calendar\`).
- **Architectural Flaws & Limitations**:
  1. **Mutability**: Both \`Date\` and \`Calendar\` are mutable, meaning any method can mutate their state, creating severe multi-threaded race conditions.
  2. **Zero-Based Month Indexing Trap**: Months were 0-indexed (January = 0, December = 11), causing endless off-by-one bugs.
  3. **Year Offset Flaw**: Years were indexed from 1900 (e.g., year 2026 was represented as 126).
  4. **Poor Separation of Concerns**: \`java.util.Date\` represents both date and time with a millisecond timestamp, while lacking time-zone handling without \`Calendar\`.
  5. **Not Thread-Safe**: None of the legacy classes were safe to share across threads.`,
    simpleExplanation: `- **A Shared Wall Clock with Exposed Gears**: If two people in an office both reach out and twist the hands of the shared wall clock to see different time zones, both end up with the wrong time. Because legacy \`Date\` is mutable, passing it to another method gives that method permission to change your date!`,
    importantDifferences: `| Dimension | Legacy API (java.util.Date / Calendar) | Modern API (java.time / JSR-310) |
|---|---|---|
| **Immutability** | Mutable (Can be modified via \`setTime()\`) | **100% Immutable and Thread-Safe** |
| **Month Numbering** | 0-based (January = 0) | **1-based (January = 1)** |
| **Thread Safety** | NOT Thread-Safe | **Inherently Thread-Safe** |
| **Time-Zone Clarity** | Confusing and intertwined | Clean separation (\`LocalDateTime\` vs \`ZonedDateTime\`) |
| **Fluent API** | Clunky, verbose methods (\`calendar.add(Calendar.DATE, 1)\`) | Fluent and expressive (\`date.plusDays(1)\`) |`,
    javaCodeExamples: `import java.util.Calendar;
import java.util.Date;

public class LegacyDateFlawsDemo {
    public static void main(String[] args) {
        // Flaw 1: Months are 0-indexed! (Month 10 is November!)
        Calendar cal = Calendar.getInstance();
        cal.set(2026, 10, 8); // November 8, 2026, NOT October 8!

        Date date = cal.getTime();
        System.out.println("Legacy Date: " + date);

        // Flaw 2: Mutability - external modification alters original date!
        date.setTime(date.getTime() + 86400000L); // Mutated via setTime!
        System.out.println("Mutated Date: " + date);
    }
}`,
    outputExplanation: `- Illustrates 0-based month pitfalls and mutable state alteration in legacy date representations.`,
    interviewReadyAnswer: `- "The legacy Date and Calendar API suffered from mutability (not thread-safe), confusing 0-indexed months, year offsets from 1900, and clunky manipulation methods."
- "Java 8 replaced them completely with the immutable, thread-safe java.time package (JSR-310)."`,
    quickRevisionPoints: `- \`java.util.Date\` and \`Calendar\` are mutable and not thread-safe.
- Months were 0-based (January = 0).
- Replaced by Java 8 \`java.time\` package.
- Legacy classes should be avoided in modern Java applications.`
  },
  {
    topicId: 172,
    slug: 'simpledateformat-custom-formatting',
    title: 'SimpleDateFormat & Custom Date Formatting',
    definition: `- **SimpleDateFormat (\`java.text.SimpleDateFormat\`)**: A concrete class for formatting and parsing dates in a locale-sensitive manner.
- **The Critical Interview Flaw: THREAD-SAFETY DISASTER**:
  • \`SimpleDateFormat\` is **NOT thread-safe**!
  • It maintains internal calendar state in an instance variable (\`calendar\`).
  • If a single \`static\` or shared \`SimpleDateFormat\` instance is accessed concurrently by multiple threads, it produces corrupted dates or throws \`NumberFormatException\`!`,
    simpleExplanation: `- **A Shared Typewriter with One Paper Roller**: If three people try to type on the same typewriter at the same time, the letters collide and print as gibberish. \`SimpleDateFormat\` has only one internal paper roller; sharing it between web threads scrambles dates for users!`,
    howItWorks: `- **How to Use SimpleDateFormat Safely (Pre-Java 8)**:
  1. Instantiate a new \`SimpleDateFormat\` instance inside each method call (high GC allocation overhead).
  2. Use a \`ThreadLocal<SimpleDateFormat>\` so each thread has its own private formatter.
  3. Synchronize access with a lock (\`synchronized (sdf)\`).
  4. **The Modern Java 8+ Solution**: Migrate completely to the immutable, thread-safe **\`java.time.format.DateTimeFormatter\`**!`,
    javaCodeExamples: `import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class SimpleDateFormatSafetyDemo {
    // Thread-safe wrapper using ThreadLocal for legacy codebases
    private static final ThreadLocal<SimpleDateFormat> safeFormatter =
        ThreadLocal.withInitial(() -> new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));

    public static void main(String[] args) throws ParseException {
        // Format Date to String
        Date now = new Date();
        String formatted = safeFormatter.get().format(now);
        System.out.println("Formatted Date: " + formatted);

        // Parse String to Date
        Date parsed = safeFormatter.get().parse("2026-11-08 15:30:00");
        System.out.println("Parsed Date: " + parsed);
    }
}`,
    outputExplanation: `- Demonstrates the \`ThreadLocal\` pattern used to protect \`SimpleDateFormat\` in multi-threaded environments.`,
    interviewReadyAnswer: `- "SimpleDateFormat is NOT thread-safe because its format and parse methods alter internal shared calendar state."
- "To use it safely across threads, wrap it in ThreadLocal or migrate to Java 8's immutable DateTimeFormatter."`,
    quickRevisionPoints: `- \`SimpleDateFormat\` is NOT thread-safe.
- Sharing a static instance causes corrupted date outputs.
- Protect with \`ThreadLocal<SimpleDateFormat>\`.
- Replace with \`DateTimeFormatter\` in modern Java.`
  },
  {
    topicId: 173,
    slug: 'java-8-time-api-overview',
    title: 'Java 8 Modern Date/Time API Overview (java.time package)',
    definition: `- **Modern Date & Time API (JSR-310)**: The comprehensive date and time domain model introduced in Java 8 under the **\`java.time\`** package, heavily inspired by the Joda-Time library.
- **Architectural Core Principles**:
  1. **Immutability**: All classes (\`LocalDate\`, \`LocalTime\`, \`Instant\`, etc.) are immutable and thread-safe. Any modification method returns a new object.
  2. **Clarity**: Explicit separation between human-readable dates and machine-readable epoch timestamps.
  3. **Standard ISO-8601 Compliance**: Uses international standard calendar formats by default.
  4. **Fluent API**: Methods follow clear prefix conventions: \`plusXxx()\`, \`minusXxx()\`, \`withXxx()\`, \`isXxx()\`.`,
    simpleExplanation: `- **Human Time vs Machine Time**:
  • A database server doesn't care about leap years or daylight saving time; it measures machine ticks since 1970 (\`Instant\`).
  • A person planning a birthday cares about the calendar date without a time zone (\`LocalDate\`).
  • An international flight scheduling app cares about exact coordinated time across world zones (\`ZonedDateTime\`). \`java.time\` separates these cleanly!`,
    importantConcepts: `- **Core Classes and Roles**:
  • **\`Instant\`**: A point on the timeline (nanosecond precision from Unix epoch).
  • **\`LocalDate\`**: Date without time or time zone (year-month-day).
  • **\`LocalTime\`**: Time without date or time zone (hour-minute-second-nanos).
  • **\`LocalDateTime\`**: Date and time without time zone.
  • **\`ZonedDateTime\`**: Date and time with full time zone and daylight saving rules.
  • **\`Period\`**: Date-based amount of time (years, months, days).
  • **\`Duration\`**: Time-based amount of time (seconds, nanoseconds).`,
    javaCodeExamples: `import java.time.Instant;
import java.time.LocalDate;
import java.time.Month;

public class Java8TimeOverviewDemo {
    public static void main(String[] args) {
        // 1. Human calendar date (1-based month!)
        LocalDate releaseDate = LocalDate.of(2014, Month.MARCH, 18);
        System.out.println("Java 8 Release: " + releaseDate);

        // 2. Fluent calculations: returns new instance
        LocalDate nextYear = releaseDate.plusYears(1);
        System.out.println("One year later: " + nextYear);

        // 3. Machine timestamp (Epoch nanoseconds)
        Instant nowUtc = Instant.now();
        System.out.println("Current UTC Instant: " + nowUtc);
    }
}`,
    outputExplanation: `- Shows clean instantiation, 1-based months, and immutability where \`plusYears(1)\` returns a fresh object.`,
    interviewReadyAnswer: `- "The java.time package (JSR-310) provides an immutable, thread-safe, and fluent date/time framework."
- "It cleanly separates machine timestamps (Instant) from human calendar dates (LocalDate, LocalDateTime) and time-zoned contexts (ZonedDateTime)."`,
    quickRevisionPoints: `- 100% immutable and thread-safe.
- 1-based months (January = 1).
- Distinct classes for dates, times, zones, and intervals.
- Follows ISO-8601 standard.`
  },
  {
    topicId: 174,
    slug: 'localdate-localtime-localdatetime',
    title: 'LocalDate, LocalTime, and LocalDateTime',
    definition: `- **\`LocalDate\`**: An immutable date-time object representing a date, often viewed as year-month-day (e.g. \`2026-11-08\`). Does NOT store time or time-zone offset.
- **\`LocalTime\`**: An immutable object representing a time, viewed as hour-minute-second (e.g. \`14:30:45.123\`). Does NOT store date or time-zone offset.
- **\`LocalDateTime\`**: An immutable object representing both date and time (e.g. \`2026-11-08T14:30:45\`). Does NOT store time-zone offset.`,
    simpleExplanation: `- **The Wall Calendar, Watch, and Wall Clock**:
  • \`LocalDate\`: The printed calendar hanging on your kitchen wall showing "November 8".
  • \`LocalTime\`: The digital wristwatch showing "3:30 PM".
  • \`LocalDateTime\`: An appointment entry in your journal: "Dentist on Nov 8 at 3:30 PM". It doesn't mention time zones because you and the dentist are in the same town.`,
    syntax: `// Factory Instantiation
LocalDate d = LocalDate.now();
LocalDate birth = LocalDate.of(1995, 5, 23);

LocalTime t = LocalTime.of(15, 30, 0);

LocalDateTime dt = LocalDateTime.of(birth, t);`,
    javaCodeExamples: `import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Period;

public class LocalDataTimeDemo {
    public static void main(String[] args) {
        LocalDate today = LocalDate.of(2026, 11, 8);
        LocalTime examTime = LocalTime.of(10, 0);

        // Combining into LocalDateTime
        LocalDateTime appointment = LocalDateTime.of(today, examTime);
        System.out.println("Combined appointment: " + appointment);

        // Fluent date arithmetic
        LocalDate futureDate = today.plusDays(45);
        System.out.println("45 days from today: " + futureDate);

        // Inspecting properties cleanly
        System.out.println("Day of week: " + today.getDayOfWeek());
        System.out.println("Is leap year? " + today.isLeapYear());
    }
}`,
    outputExplanation: `- Illustrates straightforward creation, composition, date arithmetic, and leap year checks without \`Calendar\` boilerplate.`,
    interviewReadyAnswer: `- "LocalDate, LocalTime, and LocalDateTime represent local human dates and times without timezone offsets."
- "They are immutable, thread-safe, use 1-based months, and offer fluent methods like plusDays() and isLeapYear()."`,
    quickRevisionPoints: `- \`LocalDate\`: Date only (\`yyyy-MM-dd\`).
- \`LocalTime\`: Time only (\`HH:mm:ss\`).
- \`LocalDateTime\`: Date + Time (\`yyyy-MM-ddTHH:mm:ss\`).
- Zero timezone information; completely immutable.`
  },
  {
    topicId: 175,
    slug: 'zoneddatetime-period-duration',
    title: 'ZonedDateTime, Period, and Duration',
    definition: `- **\`ZonedDateTime\`**: An immutable representation of a date-time with a time-zone (e.g. \`2026-11-08T15:30+05:30[Asia/Kolkata]\`). Automatically handles Daylight Saving Time (DST) shifts.
- **\`Period\`**: An amount of time modeled in **date-based units** (years, months, and days).
- **\`Duration\`**: An amount of time modeled in **time-based units** (seconds, nanoseconds).`,
    importantDifferences: `| Dimension | Period | Duration |
|---|---|---|
| **Measurement Scale** | Date-based (Years, Months, Days) | Time-based (Seconds, Milliseconds, Nanos) |
| **Typical Target** | Used with \`LocalDate\` | Used with \`LocalTime\`, \`Instant\`, \`LocalDateTime\` |
| **DST Awareness** | Conceptual (adds calendar days) | Exact physical seconds elapsed |
| **Example Value** | "2 Years, 3 Months, 5 Days" | "PT45M30S" (45 mins, 30 seconds) |`,
    javaCodeExamples: `import java.time.*;

public class ZonedPeriodDurationDemo {
    public static void main(String[] args) {
        // 1. ZonedDateTime: Time with Zone ID
        ZoneId tokyoZone = ZoneId.of("Asia/Tokyo");
        ZonedDateTime tokyoTime = ZonedDateTime.now(tokyoZone);
        System.out.println("Current Tokyo Time: " + tokyoTime);

        // 2. Period: Date difference in years/months/days
        LocalDate birth = LocalDate.of(2000, 1, 15);
        LocalDate today = LocalDate.of(2026, 11, 8);
        Period age = Period.between(birth, today);
        System.out.printf("Age: %d years, %d months, %d days%n", age.getYears(), age.getMonths(), age.getDays());

        // 3. Duration: Elapsed time in seconds/nanos
        LocalTime start = LocalTime.of(9, 0);
        LocalTime end = LocalTime.of(17, 30);
        Duration workHours = Duration.between(start, end);
        System.out.println("Work duration: " + workHours.toHours() + " hours, " + (workHours.toMinutes() % 60) + " mins");
    }
}`,
    outputExplanation: `- Demonstrates time-zone adjustments, human calendar age calculation via \`Period\`, and elapsed work time calculation via \`Duration\`.`,
    interviewReadyAnswer: `- "ZonedDateTime incorporates full timezone rules and daylight saving time."
- "Period measures date intervals in years, months, and days, while Duration measures physical time intervals in seconds and nanoseconds."`,
    quickRevisionPoints: `- \`ZonedDateTime\` handles time zones and Daylight Saving Time.
- \`ZoneId.of("Region/City")\` specifies time zones.
- \`Period\` = Years, Months, Days (Date-based).
- \`Duration\` = Hours, Minutes, Seconds, Nanos (Time-based).`
  },
  {
    topicId: 176,
    slug: 'datetimeformatter-thread-safety',
    title: 'DateTimeFormatter (Thread-Safe Date Formatting)',
    definition: `- **\`DateTimeFormatter\` (\`java.time.format.DateTimeFormatter\`)**: The modern replacement for \`SimpleDateFormat\` used for formatting and parsing date-time objects.
- **Core Advantage: 100% IMMUTABLE & THREAD-SAFE**:
  • Can be safely stored in \`public static final\` constants and shared across hundreds of concurrent threads without any synchronization or \`ThreadLocal\` wrapping!
- **Predefined Formatters**: Comes pre-configured with industry standard formatters like \`ISO_LOCAL_DATE\`, \`ISO_DATE_TIME\`, \`BASIC_ISO_DATE\`.`,
    simpleExplanation: `- **A High-Speed Laser Stencil**: Instead of a typewriter with moving ink rollers, \`DateTimeFormatter\` is a laser stencil carved in steel. Any number of workers can use the steel stencil simultaneously; it never bends, never gets ink smudged, and never alters internal state.`,
    syntax: `// Declaring a shared static thread-safe formatter
public static final DateTimeFormatter FORMATTER = 
    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

// Formatting
String text = localDateTime.format(FORMATTER);

// Parsing
LocalDateTime parsed = LocalDateTime.parse(text, FORMATTER);`,
    javaCodeExamples: `import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeFormatterDemo {
    // Shared safely across the entire application without locks!
    public static final DateTimeFormatter CUSTOM_FORMATTER =
        DateTimeFormatter.ofPattern("dd-MMM-yyyy hh:mm a");

    public static void main(String[] args) {
        LocalDateTime now = LocalDateTime.of(2026, 11, 8, 15, 45);

        // 1. Formatting
        String formatted = now.format(CUSTOM_FORMATTER);
        System.out.println("Formatted Date: " + formatted); // 08-Nov-2026 03:45 PM

        // 2. Parsing back to LocalDateTime
        LocalDateTime parsed = LocalDateTime.parse(formatted, CUSTOM_FORMATTER);
        System.out.println("Parsed Year: " + parsed.getYear());
        System.out.println("Parsed Hour: " + parsed.getHour());
    }
}`,
    outputExplanation: `- Illustrates bidirectional conversion between String and \`LocalDateTime\` with thread-safe custom pattern formatters.`,
    interviewReadyAnswer: `- "DateTimeFormatter is the Java 8 replacement for SimpleDateFormat. It is immutable and thread-safe, making it suitable for shared static constants across concurrent threads."
- "It supports ISO standards out of the box and uses ofPattern() for custom formatting and parsing."`,
    quickRevisionPoints: `- 100% immutable and thread-safe.
- Replaces \`SimpleDateFormat\`.
- Store as \`public static final DateTimeFormatter\` constants safely.
- Pre-built constants: \`ISO_LOCAL_DATE\`, \`ISO_DATE_TIME\`.`
  }
];

