/*
  Warnings:

  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NoteLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_boardId_fkey";

-- DropForeignKey
ALTER TABLE "NoteLink" DROP CONSTRAINT "NoteLink_noteId_fkey";

-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "attachments" TEXT[];

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "attachments" TEXT[];

-- DropTable
DROP TABLE "Note";

-- DropTable
DROP TABLE "NoteLink";
