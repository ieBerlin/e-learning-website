export function processSignUpForm(formData) {
  const fd = Object.fromEntries(formData.entries());
  return {
    email: fd.email,
    password: fd.password,
    firstName: fd["first-name"],
    lastName: fd["last-name"],
  };
}
export function processLoginForm(formData) {
  const fd = Object.fromEntries(formData.entries());
  return {
    email: fd.email,
    password: fd.password,
  };
}
