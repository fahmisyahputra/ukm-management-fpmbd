-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'student'
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Club" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "ManagerID" TEXT,
    "Status" TEXT NOT NULL DEFAULT 'pending',
    CONSTRAINT "Club_ManagerID_fkey" FOREIGN KEY ("ManagerID") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Club" ("Category", "Description", "ID", "Name") SELECT "Category", "Description", "ID", "Name" FROM "Club";
DROP TABLE "Club";
ALTER TABLE "new_Club" RENAME TO "Club";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
