import { Action } from 'src/entities/action.entity';
import { ApproveActionDto } from '../dtos/action-request.dto';

export interface IHandleAction {
  action: Action;
  dto: ApproveActionDto;
}
