import IMailProvider from '@providers/IMailProvider';

export default class MockMailProvider implements IMailProvider {
  private messages: any[] = [];

  async sendMail(
    to: string,
    cc: string[],
    from: string,
    subject: string,
    filePath: string,
    variables: object
  ) {
    this.messages.push({
      to,
      cc,
      from,
      subject,
      filePath,
      variables,
    });
    
    return Promise.resolve();
  }

  getMessages() {
    return this.messages;
  }

  clearMessages() {
    this.messages.splice(0, this.messages.length);
  }
  
}
