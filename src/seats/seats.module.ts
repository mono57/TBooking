import { Seat, SeatSchema } from './schemas/seat.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Seat.name, schema: SeatSchema }]),
  ],
  providers: [SeatsService],
  controllers: [SeatsController],
  exports: [SeatsService],
})
export class SeatsModule {}
