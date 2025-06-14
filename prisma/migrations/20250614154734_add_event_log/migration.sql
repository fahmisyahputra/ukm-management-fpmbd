-- CreateTable
CREATE TABLE "EventLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventID" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
