export function isEmailValid(emailAddress) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}


export function isPhoneValid(phoneArray) {
  return phoneArray.every(part => /^\d+$/.test(part));
};