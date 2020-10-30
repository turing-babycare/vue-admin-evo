/**
 * 该插件可根据菜单配置自动生成 ANTD menu组件
 * menuOptions示例：
   [{
        path: '',
        name: 'page-a',
        meta:{
          icon: 'page-a',
          name: '',
          hidden: false,
          skipLogin: false,
          breadcrumb: undefined,
        },
        component: PageA,
        children:[{item}]
    },
 * ]
 *
 **/
import Menu from 'ant-design-vue/es/menu';
import Icon from 'ant-design-vue/es/icon';
import fastEqual from 'fast-deep-equal';

const { Item, SubMenu } = Menu;

export default {
  name: 'IMenu',
  props: {
    options: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'light'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    openKeys: Array
  },
  data() {
    return {
      selectedKeys: [],
      sOpenKeys: [],
      cachedOpenKeys: []
    };
  },
  computed: {
    menuTheme() {
      return 'light';
    }
  },
  created() {
    this.updateMenu();
    if (this.options.length && !this.options[0].fullPath) {
      this.formatOptions(this.options, '');
    }
  },
  watch: {
    options(val) {
      if (val.length > 0 && !val[0].fullPath) {
        this.formatOptions(this.options, '');
      }
    },
    collapsed(val) {
      if (val) {
        this.cachedOpenKeys = this.sOpenKeys;
        this.sOpenKeys = [];
      } else {
        this.sOpenKeys = this.cachedOpenKeys;
      }
    },
    $route: function() {
      console.log('$route==', this.$route);
      this.updateMenu();
    },
    sOpenKeys(val) {
      this.$emit('openChange', val);
      this.$emit('update:openKeys', val);
    }
  },
  methods: {
    renderIcon: function(h, icon, key) {
      if (this.$scopedSlots.icon && icon && icon !== 'none') {
        const vnodes = this.$scopedSlots.icon({ icon, key });
        vnodes.forEach(vnode => {
          vnode.data.class = vnode.data.class ? vnode.data.class : [];
          vnode.data.class.push('anticon');
        });
        return vnodes;
      }
      return !icon || icon == 'none'
        ? null
        : h(Icon, { props: { type: icon } });
    },
    renderMenuItem: function(h, menu) {
      if (menu.fullPath) {
        const path = menu.fullPath;
        const meta = menu.meta;
        return h(Item, { key: path }, [
          h(
            'router-link',
            {
              props: { to: path },
              attrs: {
                style: 'overflow:hidden;white-space:normal;text-overflow:clip;'
              }
            },
            [
              this.renderIcon(h, menu.meta ? menu.meta.icon : 'none', path),
              meta && meta.name ? meta.name : ''
            ]
          )
        ]);
      } else if (menu.path) {
        const path = menu.path;
        return h(Item, { key: path }, [
          h('a', { attrs: { href: path, target: '_blank' } }, [
            this.renderIcon(h, menu.meta ? menu.meta.icon : 'none', path),
            menu.name
          ])
        ]);
      }
    },
    renderSubMenu: function(h, menu) {
      const path = menu.fullPath ? menu.fullPath : menu.path;
      const meta = menu.meta;
      const subItem = [
        h(
          'span',
          {
            slot: 'title',
            attrs: {
              style: 'overflow:hidden;white-space:normal;text-overflow:clip;'
            }
          },
          [
            this.renderIcon(h, menu.meta ? menu.meta.icon : 'none', path),
            meta && meta.name ? meta.name : ''
          ]
        )
      ];
      const itemArr = [];
      menu.children.forEach(item => {
        itemArr.push(this.renderItem(h, item));
      });
      return h(SubMenu, { key: path }, subItem.concat(itemArr));
    },
    renderItem: function(h, menu) {
      const meta = menu.meta;
      if (!meta || !meta.hidden) {
        let renderChildren = false;
        const children = menu.children;
        if (children != undefined) {
          for (let i = 0; i < children.length; i++) {
            const childMeta = children[i].meta;
            if (!childMeta || !childMeta.hidden) {
              renderChildren = true;
              break;
            }
          }
        }
        return menu.children && renderChildren
          ? this.renderSubMenu(h, menu)
          : this.renderMenuItem(h, menu);
      }
    },
    renderMenu: function(h, menuTree) {
      const menuArr = [];
      menuTree.forEach((menu, i) => {
        menuArr.push(this.renderItem(h, menu, '0', i));
      });
      return menuArr;
    },
    formatOptions(options, parentPath) {
      options.forEach(route => {
        // 若当前路由的path为 /开头，则说明为父节点
        // const isFullPath = route.path.substring(0, 1) == '/';
        console.log('parentPath=', parentPath);
        route.fullPath = route.path;
        // route.fullPath = isFullPath
        //   ? route.path
        //   : parentPath + '/' + route.path;
        if (route.children) {
          this.formatOptions(route.children, route.fullPath);
        }
      });
    },
    updateMenu() {
      const menuRoutes = this.$route.matched.filter(item => item.path !== '');
      console.log('menuRoutes==', menuRoutes);
      this.selectedKeys = this.getSelectedKey(this.$route);
      const openKeys = menuRoutes.map(item => item.path);
      if (!fastEqual(openKeys, this.sOpenKeys)) {
        this.collapsed || this.mode === 'horizontal'
          ? (this.cachedOpenKeys = openKeys)
          : (this.sOpenKeys = openKeys);
      }
    },
    getSelectedKey(route) {
      return route.matched.map(item => item.path);
    }
  },
  render(h) {
    return h(
      Menu,
      {
        props: {
          theme: this.menuTheme,
          mode: this.$props.mode,
          selectedKeys: this.selectedKeys,
          openKeys: this.openKeys ? this.openKeys : this.sOpenKeys
        },
        on: {
          'update:openKeys': val => {
            this.sOpenKeys = val;
          },
          click: obj => {
            obj.selectedKeys = [obj.key];
            this.$emit('select', obj);
          }
        }
      },
      this.renderMenu(h, this.options)
    );
  }
};
