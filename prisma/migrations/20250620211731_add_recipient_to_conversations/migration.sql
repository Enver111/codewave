-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "recipientId" TEXT;

-- CreateIndex
CREATE INDEX "Conversation_recipientId_idx" ON "Conversation"("recipientId");

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
