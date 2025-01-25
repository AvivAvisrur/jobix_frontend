export type ValidationError = {
  field: string; // Specific field with an error
  message: string; // Error message for that field
};

export type GeneralError = {
  message: string; // General error message
};
