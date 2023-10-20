export const randomPromoCodeGenerator = digits => {
  let str = '0123456789ABCDEFGHIJKLMNOPQRSTUVXZ';
  let uuid = [];
  for (let i = 0; i < digits; i++) {
    uuid.push(str[Math.floor(Math.random() * str.length)]);
  }
  return uuid.join('');
};

export const randomBookingIDGenerator = (no, type) => {
  let Number = '0123456789';
  let uuid = [];
  for (let i = 0; i < no; i++) {
    uuid.push(Number[Math.floor(Math.random() * Number.length)]);
  }
  return type + uuid.join('');
};