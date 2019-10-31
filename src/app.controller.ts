import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MailerService } from './mailer/mailer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailerService: MailerService,
  ) {}

  @Get('hello')
  getHello(): string {
    console.log(' --- hitting base route -----');
    //this.mailerService.sendMail();
    return this.appService.getHello();
  }
}
