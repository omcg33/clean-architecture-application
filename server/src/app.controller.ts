import { Controller, Get, Render } from '@nestjs/common';
import { CatsService } from 'api/pages/cats.service';
import { PAGES_KEYS } from 'consts/pages';
import { SsRenderService } from 'ss-render/ss-render.service';


@Controller()
export class AppController {
  constructor(
    private readonly catsPageService: CatsService,
    private readonly ssr: SsRenderService,
  ) {}

  @Get('/cats')
  @Render('index')
  getHello() {
    const cats = this.catsPageService.get();
    
    return this.ssr.render({ location: '/cats', [PAGES_KEYS.CATS_LIST]: { cats } })
  }
}
