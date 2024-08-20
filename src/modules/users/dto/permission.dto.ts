export class PermissionDto {
  parentId: number;
  name: string;
  icon: string;
  path: string;
  type: "menu" | "page" | "api" | "button";
  sort: number;
  status: number;
  remark: string;
  level: number;
}