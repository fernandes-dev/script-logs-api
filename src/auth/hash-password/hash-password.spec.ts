// noinspection TypeScriptValidateTypes

import { Test, TestingModule } from '@nestjs/testing';
import { HashPassword } from './hash-password';

describe('HashPassword', () => {
  let provider: HashPassword;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashPassword],
    }).compile();

    provider = module.get<HashPassword>(HashPassword);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
