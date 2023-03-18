import { Module } from '@nestjs/common';
import { RidesController } from './rides.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ride, RideSchema } from './schemas/rides.schema';
import { RidesService } from './rides.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Ride.name, schema: RideSchema }]),
  ],
  providers: [RidesService],
  controllers: [RidesController],
})
export class RidesModule {}
