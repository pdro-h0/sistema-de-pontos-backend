-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'employee');

-- CreateEnum
CREATE TYPE "PunchClockType" AS ENUM ('checkIn', 'checkOut');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PunchClock" (
    "id" TEXT NOT NULL,
    "punch_clock_type" "PunchClockType" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "PunchClock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "PunchClock" ADD CONSTRAINT "PunchClock_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
