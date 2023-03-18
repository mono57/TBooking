import { SeatsModule } from 'src/seats/seats.module';
import { RideSeat, RideSeatSchema } from './schemas/ride-seat.schema';
import { Module } from '@nestjs/common';
import { RidesController } from './rides.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ride, RideSchema } from './schemas/rides.schema';
import { RidesService } from './rides.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    SeatsModule,
    MongooseModule.forFeature([
      { name: Ride.name, schema: RideSchema },
      { name: RideSeat.name, schema: RideSeatSchema },
    ]),
  ],
  providers: [RidesService],
  controllers: [RidesController],
  exports: [RidesService],
})
export class RidesModule {}
