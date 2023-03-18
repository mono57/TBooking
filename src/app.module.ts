import { BookingModule } from './booking/booking.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RidesModule } from './rides/rides.module';
import { SeatsModule } from './seats/seats.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://tbooking:ecHmDq4leSr9PKEy@tbooking-cluster.tmztgm0.mongodb.net/?retryWrites=true&w=majority',
    ),
    RidesModule,
    SeatsModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
