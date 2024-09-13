SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
-- ----------------------------
-- Table structure for sys_roles
-- ----------------------------
DROP TABLE IF EXISTS `sys_roles`;
CREATE TABLE `sys_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `desc` varchar(255) NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- ----------------------------
-- Records of sys_roles
-- ----------------------------
BEGIN;
INSERT INTO `sys_roles` (`id`, `key`, `name`, `desc`, `status`, `created_at`, `updated_at`) VALUES (1, 'ADMIN', '管理员', '系统管理员', 1, '2024-09-10 16:56:44.163055', '2024-09-10 16:56:44.163055');
INSERT INTO `sys_roles` (`id`, `key`, `name`, `desc`, `status`, `created_at`, `updated_at`) VALUES (2, 'STORE_ADMIN', '店铺管理员', '店铺管理员', 1, '2024-09-10 16:56:44.163055', '2024-09-10 16:56:44.163055');
INSERT INTO `sys_roles` (`id`, `key`, `name`, `desc`, `status`, `created_at`, `updated_at`) VALUES (3, 'STORE_SERVICE', '店铺客服', '店铺客服', 1, '2024-09-10 16:56:44.163055', '2024-09-10 16:56:44.163055');
INSERT INTO `sys_roles` (`id`, `key`, `name`, `desc`, `status`, `created_at`, `updated_at`) VALUES (4, 'TECHNICIST', '技术人员', '技术人员', 1, '2024-09-10 16:56:44.163055', '2024-09-10 16:56:44.163055');

COMMIT;
-- ----------------------------
-- Table structure for sys_permission
-- ----------------------------
DROP TABLE IF EXISTS `sys_perms`;
CREATE TABLE `sys_perms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL COMMENT '权限标识',
  `name` varchar(255) NOT NULL COMMENT '权限名称',
  `parentId` int NOT NULL COMMENT '父级权限',
  `type` varchar(255) NOT NULL COMMENT '权限类型',
  `path` varchar(255) NOT NULL COMMENT '路径',
  `icon` varchar(255) NOT NULL COMMENT '图标',
  `sort` int NOT NULL COMMENT '排序',
  `level` int NOT NULL COMMENT '层级',
  `desc` varchar(255) NOT NULL COMMENT '描述',
  `status` tinyint NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- ----------------------------
-- Records of sys_perms
-- ----------------------------
BEGIN;
INSERT INTO `sys_perms` (`id`, `key`, `name`, `parentId`, `type`, `path`, `icon`, `sort`, `level`, `desc`, `created_at`, `updated_at`) VALUES (1, 'SYSTEM', '系统管理', 0, 'menu', '/system', 'el-icon-setting', 1, 1, '系统管理', '2024-09-10 16:56:44.163055', '2024-09-10 16:56:44.163055');
INSERT INTO `sys_perms` (`id`, `key`, `name`, `parentId`, `type`, `path`, `icon`, `sort`, `level`, `desc`, `created_at`, `updated_at`) VALUES (2, 'SYSTEM_USER', '用户列表', 1, 'menu', '/system/user', 'el-icon-user', 1, 2, '用户列表', '2024-09-10 16:56:44.163055', '2024-09-10 16:56:44.163055');
INSERT INTO `sys_perms` (`id`, `key`, `name`, `parentId`, `type`, `path`, `icon`, `sort`, `level`, `desc`, `created_at`, `updated_at`) VALUES (4, 'SYSTEM_PERM', '权限列表', 1, 'menu', '/system/perm', 'el-icon-s-operation', 3, 2, '权限列表', '2024-09-10 16:56:44.163055', '2024-09-10 16:56:44.163055');
INSERT INTO `sys_perms` (`id`, `key`, `name`,  `parentId`, `type`, `path`, `icon`, `sort`, `level`, `desc`, `created_at`, `updated_at`) VALUES (5, 'ACCOUNT', '账号管理', 0, 'menu', '/account', 'el-icon-s-operation', 2, 1, '账号管理', '2024-09-10 16:56:44.163055', '2024-09-10 16:56:44.163055');
INSERT INTO `sys_perms` (`id`, `key`, `name`,  `parentId`, `type`, `path`, `icon`, `sort`, `level`, `desc`, `created_at`, `updated_at`) VALUES (6, 'ACCOUNT_LIST', '账号列表', 5, 'menu', '/account/list', 'el-icon-s-operation', 1, 2, '账号管理/列表', '2024-09-10 16:56:44.163055', '2024-09-10 16:56:44.163055');
INSERT INTO `sys_perms` (`id`, `key`, `name`,  `parentId`, `type`, `path`, `icon`, `sort`, `level`, `desc`, `created_at`, `updated_at`) VALUES (7, 'ROLE', '角色管理', 0, 'menu', '/role', 'el-icon-s-operation', 3, 1, '角色管理', '2024-09-10 16:56:44.163055', '2024-09-10 16:56:44.163055');
INSERT INTO `sys_perms` (`id`, `key`, `name`,  `parentId`, `type`, `path`, `icon`, `sort`, `level`, `desc`, `created_at`, `updated_at`) VALUES (8, 'ROLE_LIST', '角色列表', 7, 'menu', '/role/list', 'el-icon-s-operation', 1, 2, '角色管理/列表', '2024-09-10 16:56:44.163055', '2024-09-10 16:56:44.163055');
INSERT INTO `sys_perms` (`id`, `key`, `name`,  `parentId`, `type`, `path`, `icon`, `sort`, `level`, `desc`, `created_at`, `updated_at`) VALUES (9, 'ORDER', '订单管理', 0, 'menu', '/order', 'el-icon-s-operation', 4, 1, '订单管理', '2024-09-10 16:56:44.163055', '2024-09-10 16:56:44.163055');
INSERT INTO `sys_perms` (`id`, `key`, `name`,  `parentId`, `type`, `path`, `icon`, `sort`, `level`, `desc`, `created_at`, `updated_at`) VALUES (10, 'ORDER_LIST', '订单列表', 9, 'menu', '/order/list', 'el-icon-s-operation', 1, 2, '订单列表', '2024-09-10 16:56:44.163055', '2024-09-10 16:56:44.163055');
COMMIT;
-- ----------------------------
-- Table structure for sys_role_perms
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_perms`;
CREATE TABLE `sys_role_perms` (
  `roleId` int NOT NULL COMMENT '角色ID',
  `permId` int NOT NULL COMMENT '权限ID',
  PRIMARY KEY (`roleId`,`permId`),
  CONSTRAINT `FK_rp_permId` FOREIGN KEY (`permId`) REFERENCES `sys_perms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_rp_roleId` FOREIGN KEY (`roleId`) REFERENCES `sys_roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- ----------------------------
-- Records of sys_role_perms
-- ----------------------------
BEGIN;
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (1, 1);
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (1, 2);
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (1, 4);
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (1, 5);
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (1, 6);
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (1, 7);
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (1, 8);
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (1, 9);
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (1, 10);
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (2, 5);
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (2, 6);
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (2, 7);
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (2, 8);
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (2, 9);
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (2, 10);
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (3, 9);
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (3, 10);
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (4, 1);
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (4, 2);
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (4, 9);
INSERT INTO `sys_role_perms` (`roleId`, `permId`) VALUES (4, 10);
COMMIT;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_users`;
CREATE TABLE `sys_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '账号',
  `passwordHash` varchar(255) NOT NULL COMMENT '密码',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '昵称',
  `email` varchar(255) NOT NULL COMMENT '邮箱',
  `avatar` varchar(255) NOT NULL COMMENT '头像',
  `phone` varchar(255) NOT NULL COMMENT '手机号',
  `status` int NOT NULL COMMENT '状态',
  `type` int NOT NULL COMMENT '类型',
  `remark` varchar(255) NOT NULL COMMENT '备注',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB CHARSET=utf8mb4;
-- ----------------------------
-- Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO `sys_users` (`id`,`account`, `passwordHash`, `username`, `nickname`, `email`, `avatar`, `phone`, `status`, `type`, `remark`, `created_at`, `updated_at`) VALUES (1, '13250555015', '$2b$10$RBtPUgpgDoIUWxfLKZ9riebg.KlqyGftbUUDYV5FhsBExOyDKcXkG', '管理员', '管理员', '3954@qq.com', '', '12345678901', 1, 1, '系统管理员', '2024-09-10 16:56:44.163055', '2024-09-10 16:56:44.163055');
INSERT INTO `sys_users` (`id`,`account`, `passwordHash`, `username`, `nickname`, `email`, `avatar`, `phone`, `status`, `type`, `remark`, `created_at`, `updated_at`) VALUES (2, '13250555016', '$2b$10$RBtPUgpgDoIUWxfLKZ9riebg.KlqyGftbUUDYV5FhsBExOyDKcXkG', '商户1', '商户1', '3954@qq.com', '', '12345678901', 1, 3, '商户管理员', '2024-09-10 16:56:44.163055', '2024-09-10 16:56:44.163055');
INSERT INTO `sys_users` (`id`,`account`, `passwordHash`, `username`, `nickname`, `email`, `avatar`, `phone`, `status`, `type`, `remark`, `created_at`, `updated_at`) VALUES (3, '13250555017', '$2b$10$RBtPUgpgDoIUWxfLKZ9riebg.KlqyGftbUUDYV5FhsBExOyDKcXkG', '商户1/客服', '商户1/客服', '3954@qq.com', '', '12345678901', 1, 3, '客服', '2024-09-10 16:56:44.163055', '2024-09-10 16:56:44.163055');
COMMIT;
-- ----------------------------
-- Table structure for sys_stores
-- ----------------------------
DROP TABLE IF EXISTS `sys_stores`;
CREATE TABLE `sys_stores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '店铺名称',
  `key` varchar(255) NOT NULL COMMENT '店铺标识',
  `address` varchar(255) NOT NULL COMMENT '地址',
  `remark` varchar(255) NOT NULL COMMENT '备注',
  `status` int NOT NULL COMMENT '状态',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- ----------------------------
-- Records of sys_stores
-- ----------------------------
BEGIN;
INSERT INTO `sys_stores` (`id`, `name`, `key`, `address`, `remark`, `status`, `created_at`, `updated_at`) VALUES (1, '店铺1', 'store1', '地址1', '备注1', 1, '2024-09-10 16:56:44.163055', '2024-09-10 16:56:44.163055');
INSERT INTO `sys_stores` (`id`, `name`, `key`, `address`, `remark`, `status`, `created_at`, `updated_at`) VALUES (2, '店铺2', 'store2', '地址2', '备注2', 1, '2024-09-10 16:56:44.163055', '2024-09-10 16:56:44.163055');
COMMIT;
-- ----------------------------
-- Table structure for sys_user_roles
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_roles`;
CREATE TABLE `sys_user_roles` (
  `userId` int NOT NULL COMMENT '用户ID',
  `roleId` int NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`userId`,`roleId`),
  CONSTRAINT `FK_ur_userId` FOREIGN KEY (`userId`) REFERENCES `sys_users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ur_roleId` FOREIGN KEY (`roleId`) REFERENCES `sys_roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- ----------------------------
-- Records of sys_user_roles
-- ----------------------------
BEGIN;
INSERT INTO `sys_user_roles` (`userId`, `roleId`) VALUES (1, 1);
INSERT INTO `sys_user_roles` (`userId`, `roleId`) VALUES (2, 2);
INSERT INTO `sys_user_roles` (`userId`, `roleId`) VALUES (3, 3);

COMMIT;
-- ----------------------------
-- Table structure for sys_user_stores
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_stores`;
CREATE TABLE `sys_user_stores` (
  `userId` int NOT NULL COMMENT '用户ID',
  `storeId` int NOT NULL COMMENT '店铺ID',
  PRIMARY KEY (`userId`,`storeId`),
  CONSTRAINT `FK_userId` FOREIGN KEY (`userId`) REFERENCES `sys_users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_storeId` FOREIGN KEY (`storeId`) REFERENCES `sys_stores` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- ----------------------------
-- Records of sys_user_stores
-- ----------------------------
BEGIN;
INSERT INTO `sys_user_stores` (`userId`, `storeId`) VALUES (2, 1);
INSERT INTO `sys_user_stores` (`userId`, `storeId`) VALUES (2, 2);
INSERT INTO `sys_user_stores` (`userId`, `storeId`) VALUES (3, 1);
COMMIT;
-- ----------------------------
-- Table structure for user_store_roles
-- ----------------------------
DROP TABLE IF EXISTS `user_store_roles`;
CREATE TABLE `user_store_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL COMMENT '用户ID',
  `storeId` int NOT NULL COMMENT '店铺ID',
  `roleId` int NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`id`, `userId`, `storeId`, `roleId`),
  CONSTRAINT `FK_2b95fdc95b329d66c18f5baed6o` FOREIGN KEY (`roleId`) REFERENCES `sys_roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_2b95fdc95b329d66c18f5baed6p` FOREIGN KEY (`userId`) REFERENCES `sys_users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_2b95fdc95b329d66c18f5baed6i` FOREIGN KEY (`storeId`) REFERENCES `sys_stores` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- ----------------------------
-- Records of user_store_roles
-- ----------------------------
BEGIN;
INSERT INTO `user_store_roles` (`id`, `userId`, `storeId`, `roleId`) VALUES (1, 2, 1, 2);
INSERT INTO `user_store_roles` (`id`, `userId`, `storeId`, `roleId`) VALUES (2, 2, 1, 3);
INSERT INTO `user_store_roles` (`id`, `userId`, `storeId`, `roleId`) VALUES (3, 2, 2, 2);
INSERT INTO `user_store_roles` (`id`, `userId`, `storeId`, `roleId`) VALUES (4, 2, 2, 3);
INSERT INTO `user_store_roles` (`id`, `userId`, `storeId`, `roleId`) VALUES (5, 3, 1, 3);
COMMIT;