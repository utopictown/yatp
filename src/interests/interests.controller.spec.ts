import { Test, TestingModule } from '@nestjs/testing';
import { InterestsController } from './interests.controller';
import { InterestsService } from './interests.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { JwtService } from '@nestjs/jwt';

describe('InterestsController', () => {
  let controller: InterestsController;
  let service: InterestsService;

  const mockInterestsService = {
    create: jest.fn((dto) => Promise.resolve({ _id: '1', ...dto })),
    findAll: jest.fn(() => Promise.resolve([{ _id: '1', displayName: 'Interest 1' }])),
    search: jest.fn((query) => Promise.resolve([{ _id: '1', displayName: 'Interest 1' }])),
    findOne: jest.fn((id) => Promise.resolve({ _id: id, displayName: 'Interest 1' })),
    delete: jest.fn((id) => Promise.resolve({ deleted: true })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterestsController],
      providers: [
        {
          provide: InterestsService,
          useValue: mockInterestsService,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<InterestsController>(InterestsController);
    service = module.get<InterestsService>(InterestsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an interest', async () => {
    const dto: CreateInterestDto = { displayName: 'New Interest' };
    await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should find all interests', async () => {
    expect(await controller.findAll()).toEqual([{ _id: '1', displayName: 'Interest 1' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should search interests', async () => {
    const query = 'Interest';
    expect(await controller.search(query)).toEqual([{ _id: '1', displayName: 'Interest 1' }]);
    expect(service.search).toHaveBeenCalledWith(query);
  });

  it('should find one interest', async () => {
    const id = '1';
    expect(await controller.findOne(id)).toEqual({ _id: id, displayName: 'Interest 1' });
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should delete an interest', async () => {
    const id = '1';
    expect(await controller.delete(id)).toEqual({ deleted: true });
    expect(service.delete).toHaveBeenCalledWith(id);
  });
});
