import { PermEntity } from "~/modules/system/permission/perm.entity";

export function generateRouters(menus: PermEntity[]) {
  return filterAsyncRouters(menus, 0)
}

export function filterAsyncRouters(menus: PermEntity[], parentId?:number) {
  // 扁平数组 => 树形结构
  // [] => [{id: 1, children: [{id: 2, children: []}]}]
  const children = menus.filter(menu => menu.parentId === parentId)
  if(!children.length) {
    return []
  }
  return children.map(menu => ({
    ...menu,
    children: filterAsyncRouters(menus, menu.id)
  }))
}