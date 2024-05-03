import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'; 
import { ActionsService } from './actions.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { CreateItemDto, GiveItemDto } from './dto/create-item.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ActionRequestDto, ApproveActionDto } from './dto/action-request.dto';
import { ActionType } from './database/action.entity';
import { GetAllItems } from './dto/get-all-items.dto';

@ApiTags('Actions')
@Controller('actions')
@ApiBearerAuth() 
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
    const request: GetAllItems =  {
      userId
    }
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
  @Post('action/approve')
  @ApiTags('Approve Action') 
  approveAction(@Body() dto: ApproveActionDto, @Req() req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
    return this.actionsService.approveAction(dto, token);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Post('action/decline')
  @ApiTags('Approve Action') 
  declineAction(@Body() dto: ApproveActionDto, @Req() req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
    return this.actionsService.declineAction(dto, token);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Post('admin/item')
  @ApiTags('Give Item (Admin)') 
  giveItemAdmin(@Body() dto: GiveItemDto, @Req() req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
    return this.actionsService.giveItemAdmin(dto, token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('action/get')
  @ApiTags('Get All Actions') 
  getAllActions(@Req() req, @Body() body: {active: boolean, type?: ActionType}) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
    return this.actionsService.getAllActions(token, body.active, body?.type);
  }
}
