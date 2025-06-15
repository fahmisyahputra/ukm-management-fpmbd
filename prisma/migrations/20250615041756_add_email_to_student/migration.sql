/*
  Warnings:

  - A unique constraint covering the columns `[Email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN "Email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Student_Email_key" ON "Student"("Email");
