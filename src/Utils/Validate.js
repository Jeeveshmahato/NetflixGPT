const Validate = (email, password) => {
  const checkemail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const checkpassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  if (!checkemail && !checkpassword) return "Email and password is invalid";
  if (!checkemail) return "Invalid Email";
  if (!checkpassword) return "Invalid Password";

  return null;
};

export default Validate;
