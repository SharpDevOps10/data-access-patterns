# Data Access Patterns Exam

# Task

* Add `Repository` and `RepositoryImpl` example.
* Add `DAO` example.
* Add `Query Builder` example.
* Add `Active Record` example.
* Add `ORM` example.

# Implementation

* [Repository Implementation](https://github.com/SharpDevOps10/data-access-patterns/blob/main/src/repositories/user.repository.ts)
    * [Repository Usage](https://github.com/SharpDevOps10/data-access-patterns/blob/main/src/repositories/usage.ts)
* [DAO Implementation](https://github.com/SharpDevOps10/data-access-patterns/blob/main/src/dao/user.dao.ts)
    * [DAO Usage](https://github.com/SharpDevOps10/data-access-patterns/blob/main/src/dao/usage.ts)
* [Query Builder Implementation](https://github.com/SharpDevOps10/data-access-patterns/blob/main/src/queryBuilders/sql.builder.ts)
    * [Query Builder Usage](https://github.com/SharpDevOps10/data-access-patterns/blob/main/src/queryBuilders/usage.ts)
* [Active Record Implementation](https://github.com/SharpDevOps10/data-access-patterns/blob/main/src/active-record(antipattern)/user.model.ts)
    * [Active Record Usage](https://github.com/SharpDevOps10/data-access-patterns/blob/main/src/active-record(antipattern)/usage.ts)
* [ORM Implementation](https://github.com/SharpDevOps10/data-access-patterns/blob/main/src/orm/prisma.repository.ts)
    * [ORM Usage](https://github.com/SharpDevOps10/data-access-patterns/blob/main/src/orm/usage.ts)

## DAO (Data Access Object)

**Pros:**

- Encapsulates all low-level database access logic.
- Easy to test and maintain.
- Decouples business logic from persistence logic.

**Cons:**

- Can become repetitive for CRUD operations.
- Requires boilerplate code.

**Difference:** Focuses on direct DB interaction (SQL/queries). No domain logic — just raw data access.

## Repository

**Pros:**

- Provides abstraction over data layer, using DAOs internally.
- Returns domain objects instead of raw DB rows.
- Promotes domain-driven design (DDD).

**Cons:**

- Adds an extra layer over DAO.
- Might seem redundant in simple applications.

**Difference:** Works on domain models (e.g., `User`), while DAO works with raw data/records.

## Query Builder

**Pros:**

- Offers full control over raw SQL.
- Flexible for dynamic and complex query generation.
- Fluent API for building queries.

**Cons:**

- No domain abstraction or validation.
- High risk of SQL injection if not using parameterized queries.

**Difference:** Focuses on query **generation**, not execution. Can be used by both DAOs and Repositories.

## Active Record (Considered an anti-pattern)

**Pros:**

- Simple and intuitive for small applications.
- Puts data and behavior in the same class.

**Cons:**

- Mixes persistence with domain logic (violates SRP).
- Hard to test and scale.
- Encourages tight coupling to DB schema.

**Difference:** Entity manages its own persistence (e.g., `.save()`, `.delete()` inside the model).

## ORM (Object-Relational Mapping)

**Pros:**

- Auto-generates SQL from model definitions.
- Reduces boilerplate for CRUD.
- Supports migrations, validations, and relations.

**Cons:**

- Less control over raw SQL.
- Hard to optimize complex queries.
- Adds overhead in large-scale systems.

**Difference:** Abstracts SQL entirely. You interact with models and ORM handles the rest.

# How to Run

* Repository: `npm run repository:usage`;
* DAO: `npm run dao:usage`;
* Query Builder: `npm run query-builder:usage`;
* Active Record: `npm run active-record:usage`;
* ORM: `npm run orm:usage`.