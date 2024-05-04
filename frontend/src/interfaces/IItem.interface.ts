export interface IItem {
    id: number;
    name: string;
    description: string;
  }

export interface GiveItemToUserFromAdminDto {
    itemId: number;
    userId: number;
    adminId: number;
}