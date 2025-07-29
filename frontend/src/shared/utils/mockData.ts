import { ActionType, IAction } from "../../types/action.types";
import { IItem } from "../../types/item.types";
import { IRole } from "../../types/role.types";
import { IUser } from "../../types/user.types";

/**
 * Mock actions data
 */
export const mockActions: IAction[] = [
  {
    id: 5,
    type: ActionType.TYPE_1,
    userId: 2,
    requestedTime: new Date(),
    active: true,
    approved: false,
    itemId: 1,
    description: "Sample action description",
  },
  {
    id: 6,
    type: ActionType.TYPE_2,
    userId: 1,
    requestedTime: new Date(Date.now() - 86400000), // yesterday
    active: false,
    approved: true,
    itemId: 2,
    description: "Another sample action",
    approvedTime: new Date(),
    approvedBy: 3
  },
];

/**
 * Mock roles data
 */
export const mockRoles: IRole[] = [
  {
    id: 1,
    name: "admin"
  },
  {
    id: 2,
    name: "user"
  }
];

/**
 * Mock users data
 */
export const mockUsers: Partial<IUser>[] = [
  {
    id: 1,
    userName: "admin",
    email: "admin@example.com",
    role: mockRoles[0]
  },
  {
    id: 2,
    userName: "user",
    email: "user@example.com",
    role: mockRoles[1]
  },
];

/**
 * Helper function to generate a large number of mock items
 * @param count Number of items to generate
 */
export const generateMockItems = (count: number): IItem[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
    description: `Description for item ${index + 1}`,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000),
  } as IItem));
};
