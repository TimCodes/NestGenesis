import { Test, TestingModule } from '@nestjs/testing';
import { VerificationtokenService } from './verificationtoken.service';

describe('VerificationtokenService', () => {
  let service: VerificationtokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerificationtokenService],
    }).compile();

    service = module.get<VerificationtokenService>(VerificationtokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
