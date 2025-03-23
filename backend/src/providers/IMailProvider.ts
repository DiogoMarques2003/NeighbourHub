export default interface IMailProvider {
  sendMail(
    to: string,
    cc: string[],
    from: string,
    subject: string,
    filePath: string,
    variables: object
  );
}
