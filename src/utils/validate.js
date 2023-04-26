export const isEmail = (text) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text)) {
    return true;
  }
  return false;
}

export const isValidatePW = (password) => {
  if (password?.length >= 6 && password?.length <= 32) {
    return true;
  } return false
}
