export const validateEmail = (email) => {
  const sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
  const sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
  const sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
  const sQuotedPair = '\\x5c[\\x00-\\x7f]';
  const sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
  const sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
  const sDomain_ref = sAtom;
  const sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
  const sWord = '(' + sAtom + '|' + sQuotedString + ')';
  const sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
  const sLocalPart = sWord + '(\\x2e' + sWord + ')*';
  const sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
  const sValidEmail = '^' + sAddrSpec + '$'; // as whole string

  const reValidEmail = new RegExp(sValidEmail);

  return reValidEmail.test(email)
    ? { result: true }
    : { result: false, message: "This address does not exist" };
};

export const validatePassword = (password) => {
  const isValidLength = /^.{8,}$/.test(password);
  const atLeastTwoUpperCaseChars = /^(.*[A-Z].*[A-Z].*)$/.test(password);
  const isWithoutSpaces = /^\S+$/.test(password);
  const atLeastOneSpecialChar = /^.*(?=.*[@#$%^№*~&!+?=]).*$/.test(password);

  if (!isValidLength) {
     return {
       result: false,
       message: "The password must contain 8 letters)",
     };
  }

  if (!atLeastTwoUpperCaseChars) {
    return {
      result: false,
      message: "The password must contain capital letters",
    };
  }

  if (!isWithoutSpaces) {
    return {
      result: false,
      message: "The password must not contain white spaces",
    }
  }

  if (!atLeastOneSpecialChar) {
    return {
      result: false,
      message: "The password must contain one special symbol",
    }

  }


  return { result: true };
};
