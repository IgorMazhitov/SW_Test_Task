import { ActionType } from "../interfaces/IAction";

export const typeMappingWithUndefined: {
  [key: string]: ActionType | undefined;
} = {
  ALL: undefined,
  ...Object.fromEntries(Object.values(ActionType).map((type) => [type, type])),
};

export const typeMapping: { [key: string]: ActionType } = {
  ...Object.fromEntries(
    Object.values(ActionType)
      .map((type) => [type, type])
      .filter((type) => type[0] !== "item")
  ),
};

export const columnsForActionsTable: string[] = [
  "userId",
  "type",
  "description",
  "id",
  "approved",
  "active",
  "itemId",
  "requestedTime",
  "text",
  "approvedTime",
  "approvedBy",
  "approve",
  "decline",
];

export const filterColumnsForActionsTable = (isUserAdmin: boolean) => {
  if (!isUserAdmin) {
    return columnsForActionsTable.filter(
      (column) => column !== "approve" && column !== "decline"
    );
  }
  return columnsForActionsTable;
}

export const getRandomMatrix = (matrix: number[][]) => {
  const randomMatrix = matrix.map((row: number[]) => {
    return row.map((cell: number) => {
      return Math.random() > 0.5 ? 1 : 0;
    });
  });
  return randomMatrix;
}
