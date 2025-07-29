import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActionsService } from './actions.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { CreateItemDto, GiveItemDto } from './dtos/create-item.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import {
  ActionRequestDto,
  ApproveActionDto,
  GetAllActionsDto,
} from './dtos/action-request.dto';
import { ActionType } from '../../entities/action.entity';
import { LoggerInterceptor } from 'src/interceptors/logger.interceptor';

@ApiTags('Actions')
@Controller('actions')
@ApiBearerAuth()
@UseInterceptors(LoggerInterceptor)
export class ActionsController {
  constructor(private actionsService: ActionsService) {}

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Post('item')
  @ApiOperation({
    summary: 'Create Item',
    description: 'Endpoint to create a new item.',
  })
  async createItem(@Body() dto: CreateItemDto) {
    return await this.actionsService.createItem(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('item')
  @ApiOperation({
    summary: 'Get All Items',
    description: 'Endpoint to get all items for a user.',
  })
  async getAllItems(@Query('userId') userId: number) {
    return await this.actionsService.getAllItems(userId);
  }

  @UseGuards(RolesGuard)
  @Roles('User')
  @Post('action')
  @ApiOperation({
    summary: 'Request Action',
    description: 'Endpoint to request a new action.',
  })
  async requestAction(@Body() dto: ActionRequestDto) {
    return await this.actionsService.requestAction(dto);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Patch('approve')
  @ApiOperation({
    summary: 'Approve Action',
    description: 'Endpoint to approve an action.',
  })
  async approveAction(@Body() dto: ApproveActionDto) {
    return await this.actionsService.approveAction(dto);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Patch('decline')
  @ApiOperation({
    summary: 'Decline Action',
    description: 'Endpoint to decline an action.',
  })
  async declineAction(@Body() dto: ApproveActionDto) {
    return await this.actionsService.declineAction(dto);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Post('admin/item')
  @ApiOperation({
    summary: 'Give Item (Admin)',
    description: 'Endpoint to give an item to a user by an admin.',
  })
  async giveItemAdmin(@Body() dto: GiveItemDto) {
    return await this.actionsService.giveItemAdmin(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Get All Actions',
    description: 'Endpoint to get all actions for a user.',
  })
  async getAllActions(
    @Query('userId') userId: number,
    @Query('active') active: boolean,
    @Query('type') type: ActionType,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const request: GetAllActionsDto = {
      userId,
      active,
      type,
      page,
      limit,
    };
    return await this.actionsService.getAllActions(request);
  }
}
