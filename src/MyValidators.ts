export const MyValidators = {
  required: (value: string) =>
    value.length === 0 ? { isMissing: 'Answer required.' } : null,
  email: (value: string) =>
    value.length === 0 || value.includes('@')
      ? null
      : { invalidEmail: 'Invalid email address.' },
};
