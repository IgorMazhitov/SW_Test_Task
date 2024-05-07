import { ActionType, IAction } from "../interfaces/IAction.interface";

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
};

export const getRandomMatrix = (matrix: number[][]) => {
  const randomMatrix = matrix.map((row: number[]) => {
    return row.map((cell: number) => {
      return Math.random() > 0.5 ? 1 : 0;
    });
  });
  return randomMatrix;
};

export const formatRequestForLogs = (jsonRequest: string): string => {
  if (!jsonRequest) return "No request data"
  const request = JSON.parse(jsonRequest);
  const { url, method, body } = request;
  const formattedRequestBody = JSON.stringify(body);

  return `${method} ${url} \n ${
    formattedRequestBody !== "{}" ? formattedRequestBody : "No request body"
  }`;
};

export const formatResponseForLogs = (jsonResponse: string) => {
  if (!jsonResponse) return "No response data"
  const response = JSON.parse(jsonResponse);
  if (!response) {
    return `Response is void`;
  }
  const { status } = response;
  return `Status: ${status}`;
};

export const columnsForUserTable: string[] = [
  "id",
  "role",
  "userName",
  "email",
  "Actions"
];

export const filterColumnsForUserTable = (isUserAdmin: boolean) => {
  if (!isUserAdmin) {
    return columnsForUserTable.filter((column) => column !== "password" && column !== 'created_at' && column !== 'email');
  }
  return columnsForUserTable;
}

export const fakeActions: IAction[] = [
  {
    id: 5,
    type: ActionType.TYPE_1,
    userId: 2,
    requestedTime: new Date(),
    active: true,
    approved: false,
    itemId: 1,
    description: "Description",
  },
];