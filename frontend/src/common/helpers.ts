import { ActionType } from "../interfaces/IAction";

export const typeMappingWithUndefined: {
  [key: string]: ActionType | undefined;
} = {
  ALL: undefined,
  ...Object.fromEntries(Object.values(ActionType).map((type) => [type, type])),
};

export const typeMapping: { [key: string]: ActionType } = {
  ...Object.fromEntries(Object.values(ActionType).map((type) => [type, type]).filter(type => type[0] !== 'item')),
};
