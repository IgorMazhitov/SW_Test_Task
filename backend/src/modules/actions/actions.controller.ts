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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActionsService } from './actions.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles-auth.decorator';
import { CreateItemDto, GiveItemDto } from './dtos/create-item.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ActionRequestDto, ApproveActionDto, GetAllActionsDto } from './dtos/action-request.dto';
import { ActionType } from '../../entities/action.entity';
import { GetAllItems } from './dtos/get-all-items.dto';
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
  @ApiTags('Create Item')
  createItem(@Body() dto: CreateItemDto) {
    return this.actionsService.createItem(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('item')
  @ApiTags('Get All Items')
  getAllItems(@Query('userId') userId: number) {
    const request: GetAllItems = {
      userId,
    };
    return this.actionsService.getAllItems(request);
  }

  @UseGuards(RolesGuard)
  @Roles('User')
  @Post('action')
  @ApiTags('Request Action')
  requestAction(@Body() dto: ActionRequestDto) {
    return this.actionsService.requestAction(dto);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Patch('approve')
  @ApiTags('Approve Action')
  approveAction(@Body() dto: ApproveActionDto) {
    return this.actionsService.approveAction(dto);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Patch('decline')
  @ApiTags('Approve Action')
  declineAction(@Body() dto: ApproveActionDto) {
    return this.actionsService.declineAction(dto);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Post('admin/item')
  @ApiTags('Give Item (Admin)')
  giveItemAdmin(@Body() dto: GiveItemDto) {
    return this.actionsService.giveItemAdmin(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiTags('Get All Actions')
  getAllActions(
    @Query('userId') userId: number,
    @Query('active') active: boolean,
    @Query('type') type: ActionType,
  ) {
    const request: GetAllActionsDto = {
      userId,
      active,
      type
    }
    console.log(request, 'test')
    return this.actionsService.getAllActions(request);
  }
}
