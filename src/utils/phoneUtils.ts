export const formatPhoneNumber = (
  phoneNumber: string,
  format: string
): string => {
  let formatted = "";
  let numberIndex = 0;

  for (let i = 0; i < format.length && numberIndex < phoneNumber.length; i++) {
    if (format[i] === "#") {
      formatted += phoneNumber[numberIndex];
      numberIndex++;
    } else {
      formatted += format[i];
    }
  }

  return formatted.trim();
};

export const validatePhoneNumber = (
  phoneNumber: string,
  format: string
): boolean => {
  const digitsInFormat = (format.match(/#/g) || []).length;
  const digitsInPhoneNumber = phoneNumber.replace(/\D/g, "").length;
  return digitsInPhoneNumber === digitsInFormat;
};
