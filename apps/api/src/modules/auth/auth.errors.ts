import { AppError } from "../../errors/app-error.js";

export class EmailAlreadyRegisteredError
  extends AppError {
  constructor() {
    super(
      409,
      "EMAIL_ALREADY_REGISTERED",
      "Email already registered",
    );
  }
}

export class InvalidCredentialsError
  extends AppError {
  constructor() {
    super(
      401,
      "INVALID_CREDENTIALS",
      "Invalid email or password",
    );
  }
}