import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './schemas/profile.schema';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    await this.profilesService.create(createProfileDto);
  }

  @Get()
  async findAll(): Promise<Profile[]> {
    return this.profilesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Profile> {
    return this.profilesService.findOne(id);
  }

  @Delete()
  async delete() {
    return this.profilesService.delete();
  }
}
