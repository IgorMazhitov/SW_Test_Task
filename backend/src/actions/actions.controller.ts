import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { CreateItemDto } from './dto/create-item.dto';
import { ChangeItemDto } from './dto/change-item.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ActionRequestDto } from './dto/action-request.dto';

@Controller('actions')
export class ActionsController {
  constructor(private actionsService: ActionsService) {}

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Post('item')
  createItem(@Body() dto: CreateItemDto) {
    return this.actionsService.createItem(dto);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Put('item')
  changeItem(@Body() dto: ChangeItemDto) {
    return this.actionsService.changeItem(dto);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Get('item')
  getAllItems() {
    return this.actionsService.getAllItems();
  }

  @UseGuards(RolesGuard)
  @Roles('User')
  @Post('action')
  requestAction(@Body() dto: ActionRequestDto) {
    return this.actionsService.requestAction(dto);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Get('action')
  getAllActions() {
    return this.actionsService.getAllActions();
  }
}
