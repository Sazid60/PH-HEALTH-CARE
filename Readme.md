# PH-HEALTHCARE PROJECT-FOUNDATION-AND-DATABASE-SETUP

## 56-1 Introduction to the “PH Health Care” Project

![alt text](image.png)

## 56-2 Requirement Analysis – Part 1

- Patient Works in My Ph Healthcare Site

![alt text](image-1.png)

## 56-3 Requirement Analysis – Part 2

- Doctor works and relations

![alt text](image-2.png)

## 56-4 Requirement Analysis – Part 3

- Lets see admin works

![alt text](image-3.png)

- Lets Finalize Tech Stacks first

- we will use
  1. Node.js
  2. Express.js
  3. Postgresql
  4. Prisma
  5. sslcomerz
  6. nodemailer/resend/mailgun
  7. Ai Agent
  8. Rate limiter

## 56-5 Cloning & Running the Starter Pack

[Starter Template](https://github.com/Apollo-Level2-Web-Dev/ph-health-care-server/tree/part-1)

## 56-6 Setting up Prisma in the Starter Pack

- Install The dependency

```
npm install
```

- Install prisma

```
npm install prisma --save-dev
```

- install prisma Client

```
npm install @prisma/client
```

- now generate prisma folder

```
npx prisma init
```

- setup schema.prisma

```ts

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

- set the database url from prisma site and your pass of postgres

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model user {
  id Int @id @default(autoincrement())
  name String
}
```
- run this command for migrating the database 

```
npx prisma migrate dev
```
