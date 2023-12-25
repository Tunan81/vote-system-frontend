import AccessEnum from "@/access/accessEnum";

/**
 * 检查用户是否有权限
 * @param loginUser 登录用户
 * @param needAccess 需要的权限
 */
const checkAccess = (loginUser: any, needAccess = AccessEnum.NOT_LOGIN) => {
  // 获取当前登录用户具有的权限 （如果没有loginUser,则表示未登录）
  const loginUserAccess = loginUser?.userRole ?? AccessEnum.NOT_LOGIN;
  if (needAccess === AccessEnum.NOT_LOGIN) {
    return true;
  }
  // 如果用户登录才能访问
  if (loginUserAccess === AccessEnum.USER) {
    if (loginUserAccess === AccessEnum.NOT_LOGIN) {
      return false;
    }
  }
  if (needAccess === AccessEnum.ADMIN) {
    if (loginUserAccess !== AccessEnum.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
