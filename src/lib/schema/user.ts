
import { pgTable, uuid, varchar, integer, timestamp } from "drizzle-orm/pg-core";
 
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    firstName: varchar("firstName", { length: 100 }).notNull(),
    lastName: varchar("lastName", { length: 100 }).notNull(),
    phoneNumber: varchar("phoneNumber", { length: 15 }),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    token: varchar("token", { length: 500 }), // nullable by default -> will be NULL
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().$onUpdateFn(() => new Date()),
  });
  