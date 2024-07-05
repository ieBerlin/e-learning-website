export const nameValidator = (name: string): boolean => {
  const namePattern = /^[a-zA-Z\s.'-]{1,50}$/;
  return namePattern.test(name);
};

export const emailValidator = (email: string): boolean => {
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailPattern.test(email);
};

export const passwordValidator = (password: string): boolean => {
  const minLength = 8;
  const maxLength = 20;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,20}$/;

  return (
    password.length >= minLength &&
    password.length <= maxLength &&
    passwordPattern.test(password)
  );
};
export const phoneNumberValidatorForGuardian = (phoneNumber: number): boolean => {
  const regex = /^(?:\+213|0)(5|6|7)([0-9]{8})$/;
  return regex.test(phoneNumber.toString());
};
export const roleValidator = (role: string): boolean => {
  const validRoles = ["student", "instructor", "guardian"];
  return validRoles.includes(role);
};
