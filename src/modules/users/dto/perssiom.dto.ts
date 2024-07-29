export class PermissionsCreateDto {
  name: string;
  description: string;
  resourceType: string;
  resourceId: string;
  parent: string;
  path: string;
  icon: string;
  level: number;
  sort: number;
  status: number;
  createdTime: Date;
  updatedTime: Date;
  remark: string;
}