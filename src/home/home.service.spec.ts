import { Test, TestingModule } from '@nestjs/testing';
import { HomeService } from './home.service';
import { ConfigService } from '@nestjs/config';

describe('HomeService', () => {
  let homeService: HomeService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomeService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    homeService = module.get<HomeService>(HomeService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(homeService).toBeDefined();
  });

  describe('appInfo', () => {
    it('should return app name from config', () => {
      // Mocking the configService.get method
      const mockAppName = 'TestApp';
      jest.spyOn(configService, 'get').mockReturnValueOnce(mockAppName);

      const result = homeService.appInfo();

      expect(result).toEqual({ name: mockAppName });
      // Ensure that configService.get is called with the correct arguments
      expect(configService.get).toHaveBeenCalledWith('app.name', {
        infer: true,
      });
    });
  });
});
