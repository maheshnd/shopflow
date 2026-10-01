import { AppError } from "../../errors/app-error.js";

export class ProductNotFoundError
  extends AppError {
  constructor() {
    super(
      404,
      "PRODUCT_NOT_FOUND",
      "Product not found",
    );
  }
}