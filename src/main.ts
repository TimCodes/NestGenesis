import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const Fs = require('fs');
const Path = require('path');
const Util = require('util');
const readFile = Util.promisify(Fs.readFile);
const Handlebars = require('handlebars');
const nodemailer = require('nodemailer');

async function testMail() {
  const filePath = Path.resolve(
    __dirname,
    `../src/mailer/templates/user-invite.html`,
  );
  const options = { encoding: 'utf-8' };
  const source = await readFile(filePath, options);
  const temp = Handlebars.compile(source);

  const context = {
    content: {
      inviteURL: 'facebook.com',
    },
  };
  const html = temp(context);

  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'i3eredeye@gmail.com',
      pass: 'june1969',
    },
  });

  transporter
    .sendMail({
      from: '"Fred Foo 👻" <hardtimo@isu.edu>', // sender address
      to: 'hardtimo@isu.edu', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: `${html}`, // html body
    })
    .then(res => console.log(' ---- email sucesss -----', res))
    .catch(console.log);
}

//testMail().catch(console.error);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3002);
}
bootstrap();
