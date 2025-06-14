-- CreateTable
CREATE TABLE "Student" (
    "NIM" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Faculty" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Club" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "Description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Students_Club_Member" (
    "StudentNIM" TEXT NOT NULL,
    "ClubID" TEXT NOT NULL,
    "JoinDate" DATETIME NOT NULL,
    "Role" INTEGER NOT NULL,
    "Status" BOOLEAN NOT NULL,

    PRIMARY KEY ("StudentNIM", "ClubID"),
    CONSTRAINT "Students_Club_Member_StudentNIM_fkey" FOREIGN KEY ("StudentNIM") REFERENCES "Student" ("NIM") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Students_Club_Member_ClubID_fkey" FOREIGN KEY ("ClubID") REFERENCES "Club" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Event" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "ClubID" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Date" DATETIME NOT NULL,
    "Location" TEXT NOT NULL,
    CONSTRAINT "Event_ClubID_fkey" FOREIGN KEY ("ClubID") REFERENCES "Club" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Events_Participant" (
    "EventID" TEXT NOT NULL,
    "StudentNIM" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "Role" TEXT NOT NULL,

    PRIMARY KEY ("StudentNIM", "EventID"),
    CONSTRAINT "Events_Participant_StudentNIM_fkey" FOREIGN KEY ("StudentNIM") REFERENCES "Student" ("NIM") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Events_Participant_EventID_fkey" FOREIGN KEY ("EventID") REFERENCES "Event" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);
