import { HttpException, HttpStatus } from '@nestjs/common';

export const validatePassword = (password: string): void => {
  if (!password) {
    throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
  }
  if (password.length < 4) {
    throw new HttpException('Password is too short', HttpStatus.BAD_REQUEST);
  }
};

export const validateEmail = (email: string): void => {
  if (!email) {
    throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
  }
  const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegexp.test(email)) {
    throw new HttpException('Email is invalid', HttpStatus.BAD_REQUEST);
  }
};

export const validateName = (name: string): void => {
    if (!name) {
        throw new HttpException('Name is required', HttpStatus.BAD_REQUEST);
    }
    if (name.length < 4) {
        throw new HttpException('Name is too short', HttpStatus.BAD_REQUEST);
    }
}