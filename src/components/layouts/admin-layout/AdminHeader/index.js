/** index.js **/
import AdminHeader from './index.vue';
AdminHeader.install = Vue => Vue.component(AdminHeader.name, AdminHeader); //.name就是开始说的vue文件暴露出来的name名
export default AdminHeader;
