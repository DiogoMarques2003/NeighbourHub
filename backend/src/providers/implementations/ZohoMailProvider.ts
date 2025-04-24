import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import Handlebars from 'handlebars';
import { readFileSync } from 'fs';

import IMailProvider from '@providers/IMailProvider';

export default class ZohoMailProvider implements IMailProvider {
  private MailClient: Mail;

  constructor() {
    console.log(process.env)
    this.MailClient = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendMail(
    to: string,
    cc: string[],
    from: string,
    subject: string,
    filePath: string,
    variables?: object
  ) {
    const templateFileContent = readFileSync(filePath).toString('utf8');

    const mailTemplateParse = Handlebars.compile(templateFileContent);

    const html = mailTemplateParse(variables);

    await this.MailClient.sendMail({
      to,
      cc,
      from,
      subject,
      html,
    });
  }
}
