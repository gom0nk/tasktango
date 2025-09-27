import prisma from '../lib/prisma';
import { User } from '@prisma/client';

// Function to get all users
export async function getAllUsers() {
  return await prisma.user.findMany();
}

// Function to create a new user
export async function createUser(data: User) {
  return await prisma.user.create({
    data,
  });
}