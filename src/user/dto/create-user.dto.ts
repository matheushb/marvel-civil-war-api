export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export const createUserDto = {
  name: {
    required: "name is required",
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: "email",
    required: "email is required",
  },
  password: {
    required: "password is required",
    minLength: 5,
    maxLength: 25,
  },
};
