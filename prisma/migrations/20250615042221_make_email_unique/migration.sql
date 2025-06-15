/*
  Warnings:

  - Made the column `Email` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "NIM" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Faculty" TEXT NOT NULL
);
INSERT INTO "new_Student" ("Email", "Faculty", "NIM", "Name") SELECT "Email", "Faculty", "NIM", "Name" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_Email_key" ON "Student"("Email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
