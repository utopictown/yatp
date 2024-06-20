import { Test, TestingModule } from '@nestjs/testing';
import { InterestsService } from './interests.service';
import { getModelToken } from '@nestjs/mongoose';
import { Interest } from './schemas/interest.schema';
import { Model } from 'mongoose';

describe('InterestsService', () => {
  let service: InterestsService;
  let model: Model<Interest>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InterestsService,
        {
          provide: getModelToken(Interest.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<InterestsService>(InterestsService);
    model = module.get<Model<Interest>>(getModelToken(Interest.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new interest', async () => {
      const createInterestDto = { displayName: 'Test Interest' };
      const createdInterest = { _id: 'interest-id', ...createInterestDto };
      jest.spyOn(model, 'create').mockResolvedValue(createdInterest as any);

      const result = await service.create(createInterestDto);

      expect(model.create).toHaveBeenCalledWith(createInterestDto);
      expect(result).toEqual(createdInterest);
    });
  });

  // Add more test cases for other methods (findAll, search, findOne, delete)
});