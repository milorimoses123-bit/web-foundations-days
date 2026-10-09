# School Database Design Explanation

## Table Explanations
* **`students`**: Stores core information about individual students, including their unique ID, name, and a unique email address.
* **`courses`**: Stores details about available courses, including a unique course ID, course name, and code.
* **`enrolments`**: Acts as a bridge table linking students to the courses they take while storing the specific `grade` obtained for that enrolment.

## Entity Relationships
* **`students` to `enrolments`**: One-to-Many. A single student can have multiple enrolment records, but each enrolment record belongs to only one student.
* **`courses` to `enrolments`**: One-to-Many. A single course can appear in multiple enrolment records, but each enrolment record references only one course.
* **`students` to `courses`**: Many-to-Many. A student can enrol in multiple courses, and a course can have many students enrolled.
* **Why a Join Table is Needed**: Relational databases cannot directly implement a Many-to-Many relationship between two tables without duplicating data or creating redundant columns. The `enrolments` join table breaks this down into two One-to-Many relationships and provides a place to store attributes unique to the relationship itself (such as the student's `grade`).

## Database Indexing
* **Index**: `CREATE INDEX idx_students_email ON students(email);`
* **Reason**: Creating an index on the `email` column significantly speeds up lookups, authentication queries, and uniqueness verification when searching for students by their email address in large databases.

## SQL vs. NoSQL System Choice
For this school enrolment system, I would choose a **SQL (Relational)** database management system. Enrolment systems rely heavily on structured data, fixed schema enforcement, strict data integrity (such as foreign key constraints to prevent orphan enrolments), and transactional safety (ACID compliance) to ensure that student registrations and grade updates are accurate and consistent.
