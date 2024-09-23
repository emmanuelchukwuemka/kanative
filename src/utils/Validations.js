// export default isPasswordValid = password => {
//   const hasCapitalLetter = /[A-Z]/.test(password);
//   const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
//   const hasNumericValue = /\d/.test(password); // At least one numeric value
//   const hasMinimumLength = password?.length >= 8;

//   return (
//     hasCapitalLetter &&
//     hasSpecialCharacter &&
//     hasNumericValue &&
//     hasMinimumLength
//   );
// };

const GeneratePassword = () => {
  const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
  const digits = '0123456789';

  const getRandomChar = characters => {
    return characters[Math.floor(Math.random() * characters.length)];
  };

  const capitalLetter = getRandomChar(upperCaseLetters);
  const smallLetter = getRandomChar(lowerCaseLetters);
  const symbol = getRandomChar(symbols);
  const digit = getRandomChar(digits);

  let password = capitalLetter + smallLetter + symbol + digit;

  // Shuffle the password to make it more secure
  password = password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');

  return password;
};
export default GeneratePassword;
