import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelType } from '@prisma/client';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) { }

  @Post('/createChannel/:senderId')
  createChannel(@Body() createChannelDto: any,
    @Param('senderId') senderId: string) {
    console.log(typeof createChannelDto.channelType, createChannelDto.channelType);
    const channelData: CreateChannelDto = {
      ...createChannelDto,
      channelType: (createChannelDto.channelType == '1') ? ChannelType.Private : ChannelType.Public,
    }
    return this.channelService.createChannel(channelData, senderId);
  }

  @Get('/getMembersChannel/:id')
  getMembersChannel(@Param('id') id: string) {
    return this.channelService.getMembersChannel(id);
  }


}
