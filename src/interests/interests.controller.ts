import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Interest } from './schemas/interest.schema';
import { InterestsService } from './interests.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('interests')
export class InterestsController {
  constructor(private readonly interestService: InterestsService) {}

  @Post()
  async create(@Body() createInterestDto: CreateInterestDto) {
    await this.interestService.create(createInterestDto);
  }

  @Get()
  async findAll(): Promise<Interest[]> {
    return this.interestService.findAll();
  }

  @Get('/search')
  async search(@Query('q') query: string): Promise<Interest[]> {
    return this.interestService.search(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Interest> {
    return this.interestService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.interestService.delete(id);
  }
}
