import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as Fs from 'fs';
import * as Path from 'path';
import * as Util from 'util';
import * as Handlebars from 'handlebars';
import { ConfigService } from '../config/config.service';
const readFile = Util.promisify(Fs.readFile);

@Injectable()
export class MailerService {
  private mailConfig: any;
  private mailUser: any;
  private mailPass: any;

  constructor(config: ConfigService) {
    this.mailConfig = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: `${config.get('NODEMAILER_USER')}`,
        pass: `${config.get('NODEMAILER_PASSWORD')}`,
      },
    };
  }

  private async getTemplate() {
    const filePath = Path.resolve(__dirname, `./templates/verify-email.html`);
    const options = { encoding: 'utf-8' };
    const source = await readFile(filePath, options);
    return source;
  }

  async compileTemplate() {
    const blankTemplate = await this.getTemplate();
    const temp = Handlebars.compile(blankTemplate);
    const context = {
      userName: 'Test',
      domainName: 'testis',
    };
    const html = temp(context);
    return html;
  }

  async sendMail() {
    const emailTemplate = await this.compileTemplate();
    const transporter = nodemailer.createTransport(this.mailConfig);
    return transporter
      .sendMail({
        from: '"Fred Foo 👻" <hardtimo@isu.edu>', // sender address
        to: 'hardtimo@isu.edu', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: `${emailTemplate}`, // html body
      })
      .then(res => console.log(' ---- email sucesss -----', res))
      .catch(console.log);
  }
}
