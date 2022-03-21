import {
  Controller,
  Get,
  Render,
  Request,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FactService } from './data/services/fact.service';
import { SkillService } from './data/services/skill.service';
import { ProjectService } from './data/services/project.service';
import { Fact as FactModel, Skill as SkillModel, Project as ProjectModel } from '@prisma/client';

import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { TimerInterceptor } from './timer.interceptor';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly factService: FactService,
    private readonly skillService: SkillService,
    private readonly projectService: ProjectService,
  ) {}

  @Get()
  @Render('index')
  root() {
    return {
      signed_in: true,
      data: {
        facts: [
          'Живу в Санкт-Петербурге',
          'Портирую игры в General Arcade',
          'Студент ИТМО',
          'Обладаю глубокими познаниями в С++ и графике',
          'Участник и призёр многих хакатонов',
          'Автор статьи на <a href="https://habr.com/ru/post/440388/" target="_blank">Хабре</a>',
        ],
        skills: [
          {
            name: 'C++',
            link: 'https://camo.githubusercontent.com/341abe5ac8494136a07b71a4ee902b1d6432e31ad08f35775b91810810ebc953/68747470733a2f2f69736f6370702e6f72672f6173736574732f696d616765732f6370705f6c6f676f2e706e67',
          },
          {
            name: 'Boost',
            link: 'https://camo.githubusercontent.com/6c9e25acf9131ff7f5ca89c5cc606bad483c1733b10eb76343aea1eef4fc0cd9/68747470733a2f2f746865626f6f73746370706c69627261726965732e636f6d2f7374617469632f6d61696e2f696d672f626f6f73742d6c6f676f2e737667',
          },
          {
            name: 'CMake',
            link: 'https://camo.githubusercontent.com/c18886afaa90feb1ad8177ed1d8f51b46304d86895b38aaf8cbf487dd567e468/68747470733a2f2f636d616b652e6f72672f77702d636f6e74656e742f75706c6f6164732f323031382f31312f636d616b655f6c6f676f5f736c696465722e706e67',
          },
          {
            name: 'OpenCL',
            link: 'https://camo.githubusercontent.com/5c4cb3688d035f32aaab3e4e320a116a47984710b88aa787467d0f4938ac2dae/68747470733a2f2f6873746f2e6f72672f67657470726f2f686162722f706f73745f696d616765732f3136642f6161642f6139392f31366461616461393961623932316561353331316336343138653435396531382e706e67',
          },
          {
            name: 'CUDA',
            link: 'https://camo.githubusercontent.com/ef12567304a64d11a16be9eb99f957eefabcbeb2e3e5578f89049ec10685c25e/68747470733a2f2f6e76776f726c642e72752f66696c65732f6e6577732f6e76696469612d637564612d33322d72656c656173652d63616e6469646174652d322f6e76696469612d637564612e6a7067',
          },
          {
            name: 'Python',
            link: 'https://camo.githubusercontent.com/888e388801f947dec7c3d843942c277af25fe2b1aed1821542c4e711f210312a/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f632f63332f507974686f6e2d6c6f676f2d6e6f746578742e7376672f37363870782d507974686f6e2d6c6f676f2d6e6f746578742e7376672e706e67',
          },
          {
            name: 'Tensorflow',
            link: 'https://camo.githubusercontent.com/b37a6f7520a19b76cdb4d21dcba8efb6bf0fb77c12710a6ba24105f0ef46fb2e/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f322f32642f54656e736f72666c6f775f6c6f676f2e7376672f3132303070782d54656e736f72666c6f775f6c6f676f2e7376672e706e67',
          },
          {
            name: 'PyTorch',
            link: 'https://camo.githubusercontent.com/3482591d996028fd207a726ac63ce563239e00990260e677e8c451c005d00888/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f312f31302f5079546f7263685f6c6f676f5f69636f6e2e7376672f36333570782d5079546f7263685f6c6f676f5f69636f6e2e7376672e706e67',
          },
          {
            name: 'OpenCV',
            link: 'https://camo.githubusercontent.com/b922b6a2486cbbae8b031fc1336b74ae50b3c568dc16a2c8691b4a0f242b5296/68747470733a2f2f7777772e706e676974656d2e636f6d2f70696d67732f6d2f3135322d313532373137335f6f70656e63762d6c6f676f2d706e672d7472616e73706172656e742d706e672e706e67',
          },
          {
            name: 'DirectX',
            link: 'https://camo.githubusercontent.com/d418e24f1d117b519f839f5a809652d883affbf555308faaf73d3a47a9fc318c/68747470733a2f2f7777772e6e6f74696369617333642e636f6d2f696d6167656e65732f6e6f7469636961732f3230313930382f447831316c6f676f2e6a7067',
          },
          {
            name: 'C#',
            link: 'https://camo.githubusercontent.com/e5f1cbf59a8752f8a31ba28ea3b788daf4c188a84870865acfc16c5567bfd5ce/68747470733a2f2f7365656b6c6f676f2e636f6d2f696d616765732f432f632d73686172702d632d6c6f676f2d303246313737313442412d7365656b6c6f676f2e636f6d2e706e67',
          },
          {
            name: 'Java',
            link: 'https://camo.githubusercontent.com/3220bf0ac0ab62fd72ebe46f2317e16a9daf3f90b7c066bcd6589f0181c113f9/68747470733a2f2f63646e2e776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f6a6176612e737667',
          },
          {
            name: 'Git',
            link: 'https://camo.githubusercontent.com/b8ee9fd2e9b26a7265ece6dbc6f5c7449928b84f45a08fe5852d6a8dfd915fb3/68747470733a2f2f6769742d73636d2e636f6d2f696d616765732f6c6f676f732f646f776e6c6f6164732f4769742d49636f6e2d31373838432e706e67',
          },
          {
            name: 'Lua',
            link: 'https://camo.githubusercontent.com/ac23621aa950bb432fda8bf60d9c75a4701dbdea34f6201d809aced5529c75b8/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f632f63662f4c75612d4c6f676f2e7376672f3132303070782d4c75612d4c6f676f2e7376672e706e67',
          },
          {
            name: 'ActionScript',
            link: 'https://camo.githubusercontent.com/72068492a769f0083ee9768ff52ddeceab503db65f656a4d11b11e53b0cf6882/68747470733a2f2f692e70696e696d672e636f6d2f6f726967696e616c732f61642f32352f31352f61643235313565396437663739343536343231363866333638663964626435372e6a7067',
          },
        ],
        projects: [
          {
            id: 'one',
            name: 'Witcher 3',
            link: 'https://ixbt.online/gametech/games/2021/01/31/CEgdlW9GHLsXlYnUXse3tNBWvu8EWiAMVvoUqCfI.jpg',
          },
          {
            id: 'two',
            name: 'Darkest Dungeon',
            link: 'https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_DarkestDungeon_image1600w.jpg',
          },
          {
            id: 'three',
            name: 'Risen',
            link: 'https://goodtorr.ru/wp-content/uploads/2018/06/risen-e1529751408214.jpg',
          },
          {
            id: 'four',
            name: 'MudRunner',
            link: 'https://i.ytimg.com/vi/v0866rNdZ8E/maxresdefault.jpg',
          },
          {
            id: 'five',
            name: 'Warhammer 40k',
            link: 'https://i.playground.ru/p/wCC1IHm7Bb6HYW81P1oBOw.jpeg',
          },
        ],
      },
    };
  }

  @Get('RenderEngineer')
  @Render('RenderEngineer')
  renderEngineerPage() {
    return;
  }

  @Get('MyForm')
  @Render('MyForm')
  @UseInterceptors(TimerInterceptor)
  myFormPage() {
    return;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async logout(@Request() req) {
    // await this.authService.logout();
    return {
      signed_in: true,
    };
  }
}
