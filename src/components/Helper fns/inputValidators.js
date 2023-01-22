const specialCharacter = "!@#$%^&*()";
const numbers = "0123456789";

export const checkSpecialCharacter = (val) => {
  let res;
  for (const n of specialCharacter) {
    if (val.includes(n)) {
      res = false;
      return;
    } else {
      res = true;
    }
  }

  return res;
};

export const checkNumber = (val) => {
  let res;
  for (const n of numbers) {
    if (val.includes(n)) {
      res = false;
      return;
    } else {
      res = true;
    }
  }

  return res;
};

export const checkForUppercase = (val) => {
  let res;
  if (val !== val.toLowerCase()) {
    res = false;
  } else {
    res = true;
  }

  return res;
};
