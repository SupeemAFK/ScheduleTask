/*
  Warnings:

  - You are about to drop the column `deadline` on the `Task` table. All the data in the column will be lost.
  - Added the required column `end` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "deadline",
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL;
