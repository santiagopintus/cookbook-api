class HttpError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const handleError = (err: any, objectName: string) => {
  if (err.code == "11000") {
    return new HttpError(
      `Could not create the ${objectName} since it already exists!`,
      400
    );
  } else {
    return err;
  }
};
