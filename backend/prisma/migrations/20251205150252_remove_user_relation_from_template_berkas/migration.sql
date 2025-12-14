/*
  Warnings:

  - You are about to drop the column `user_id` on the `template_berkas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "template_berkas" DROP CONSTRAINT "template_berkas_user_id_fkey";

-- AlterTable
ALTER TABLE "template_berkas" DROP COLUMN "user_id";
