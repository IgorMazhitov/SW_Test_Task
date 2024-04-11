import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ActionsService } from './actions.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { CreateItemDto, GiveItemDto } from './dto/create-item.dto';
import { ChangeItemDto } from './dto/change-item.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ActionRequestDto, ApproveActionDto } from './dto/action-request.dto';

@Controller('actions')
export class ActionsController {
  constructor(private actionsService: ActionsService) {}

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Post('item')
  createItem(@Body() dto: CreateItemDto) {
    return this.actionsService.createItem(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('item')
  getAllItems(@Req() req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
    return this.actionsService.getAllItems(token);
  }

  @UseGuards(RolesGuard)
  @Roles('User')
  @Post('action')
  requestAction(@Body() dto: ActionRequestDto) {
    console.log('request action', dto)
    return this.actionsService.requestAction(dto);
  }

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Post('action/approve')
  approveAction(@Body() dto: ApproveActionDto, @Req() req) {
    console.log('approve action', dto)
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
  @Post('admin/item')
  giveItemAdmin(@Body() dto: GiveItemDto, @Req() req) {
    console.log(dto, 'giving admin')
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
  getAllActions(@Req() req, @Body() body: {active: boolean}) {
    console.log('get all actions', body)
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
    return this.actionsService.getAllActions(token, body.active);
  }
}
