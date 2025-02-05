export const maskMail = (mail: string) => {
  const [localPart, domain] = mail.split("@");
  const maskedLocalPart =
    localPart.slice(0, 2) + "*".repeat(localPart.length - 2);
  return `${maskedLocalPart}@${domain}`;
};

