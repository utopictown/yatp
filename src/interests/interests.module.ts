import { Module } from '@nestjs/common';
import { InterestsController } from './interests.controller';
import { InterestsService } from './interests.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Interest, InterestSchema } from './schemas/interest.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Interest.name, schema: InterestSchema }])],
  controllers: [InterestsController],
  providers: [InterestsService],
})
export class InterestsModule {}
