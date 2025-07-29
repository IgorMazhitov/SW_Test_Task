import { ApproveActionDto } from '../../application/modules/actions/dtos/action-request.dto';
import { Action } from '../entities/action.entity';

export interface IHandleAction {
  action: Action;
  dto: ApproveActionDto;
}
