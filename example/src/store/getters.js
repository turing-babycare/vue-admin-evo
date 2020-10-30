const getters = {
  subMenu: state => state.setting.subMenu,
  menuData: state => state.setting.menuData,
  wsToken: state => state.account.wsToken,
  user: state => state.account.user,
  permissions: state => state.account.permissions,
  roles: state => state.account.roles,
  routesConfig: state => state.account.routesConfig,
  errorCount: state => state.log.errorList.length
}
export default getters
