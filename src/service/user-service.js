import { validate } from '../validation/validation.js';
import { registerUserValidation, loginUserValidation, getUserValidation, updateUserValidation, getUserIdValidation } from '../validation/user-validation.js';
import { ResponseError } from '../error/response-error.js';
import { prismaClient } from '../application/database.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  // Cek apakah email sudah ada di dalam database
  const existingUser = await prismaClient.user.findUnique({
    where: {
      email: user.email, // Menggunakan email sebagai argumen where
    },
  });

  if (existingUser) {
    throw new ResponseError(400, 'Email already exists');
  }

  // Jika email belum digunakan, lanjutkan dengan proses registrasi
  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: {
      email: user.email,
      password: user.password,
      nama: user.nama,
      role: 'user',
    },
    select: {
      nama: true,
      email: true,
      role: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      email: loginRequest.email,
    },
    select: {
      email: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, 'Username or password wrong');
  }

  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
  if (!isPasswordValid) {
    throw new ResponseError(401, 'Username or password wrong');
  }

  const token = uuid().toString();
  return prismaClient.user.update({
    data: {
      nama: user.nama,
      token: token,
      role: user.role,
    },
    where: {
      email: user.email,
    },
    select: {
      nama: true,
      email: true,
      token: true,
      role: true,
    },
  });
};

const getUsers = async () => {
  const allUsers = await prismaClient.user.findMany({
    select: {
      userId: true,
      nama: true,
      email: true,
      role: true,
    },
  });

  return allUsers;
};

const getUsersById = async (userId) => {
  userId = validate(getUserIdValidation, userId);

  const user = await prismaClient.user.findFirst({
    where: {
      userId: userId,
    },
    select: {
      email: true,
      nama: true,
      role: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  return user;
};

const update = async (userId) => {
  const user = validate(updateUserValidation, userId);
  if (!user.userId) {
    throw new ResponseError(404, 'User not found');
  }

  return prismaClient.user.update({
    where: {
      userId: user.userId,
    },
    data: {
      email: user.email,
      password: user.password,
      nama: user.nama,
      role: user.role,
    },
    select: {
      nama: true,
      email: true,
      role: true,
    },
  });
};

const deleteUser = async (userId) => {
  userId = validate(getUserIdValidation, userId);
  return prismaClient.user.delete({
    where: {
      userId: userId,
    },
  });
};

const logout = async (userId) => {
  userId = validate(getUserIdValidation, userId);

  const user = await prismaClient.user.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!user) {
    throw new ResponseError(404, 'user is not found');
  }

  return prismaClient.user.update({
    where: {
      userId: user.userId,
    },
    data: {
      token: null,
    },
    select: {
      userId: true,
    },
  });
};

export default {
  register,
  login,
  update,
  getUsersById,
  logout,
  getUsers,
  deleteUser,
};
