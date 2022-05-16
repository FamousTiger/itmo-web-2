import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Render } from '@nestjs/common';

@ApiTags('Chat')
@Controller()
export class ChatController {
  @ApiOperation({
    summary: 'Enter chat',
    description: 'Cool anonymous chat on my page!',
  })
  @Get('chat')
  @Render('chat')
  showChat() {
    return;
  }
}
