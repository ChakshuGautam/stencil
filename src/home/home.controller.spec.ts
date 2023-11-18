import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { ConfigService } from '@nestjs/config'; // Import ConfigService

describe('HomeController', () => {
  let homeController: HomeController;
  let homeService: HomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [
        HomeService,
        {
          provide: ConfigService, // Provide ConfigService
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    homeController = module.get<HomeController>(HomeController);
    homeService = module.get<HomeService>(HomeService);
  });

  it('should be defined', () => {
    expect(homeController).toBeDefined();
  });

  describe('appInfo', () => {
    it('should return app info from HomeService', () => {
      const mockAppInfo = { name: 'TestApp' };
      jest.spyOn(homeService, 'appInfo').mockReturnValueOnce(mockAppInfo);

      const result = homeController.appInfo();

      expect(result).toEqual(mockAppInfo);
      expect(homeService.appInfo).toHaveBeenCalled();
    });
  });
});
