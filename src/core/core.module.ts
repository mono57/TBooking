import { MailService } from './services/mail.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [MailService],
  controllers: [],
  exports: [MailService],
})
export class CoreModule {}
