import Main from '@/view/main'
import parentView from '@/components/parent-view'

// - in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// const _import = file => {
//   if (process.env.NODE_ENV !== 'production') {
//     return () => import(`@/view/${file}.vue`)
//   } else {
//     return require(`@/view/${file}.vue`).default
//   }
// }

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

const appRouter = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true
        },
        component: () => import('@/view/single-page/home')
      },

    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]

const userRouter = [
  {
    path: '/coupon',
    name: 'coupon',
    component: Main,
    children: [
      {
        path: 'coupon-list',
        name: 'coupon-list',
        meta: {
          icon: 'ios-open',
          title: '优惠券管理'
        },
        component: () => import('@/view/coupon/coupon-list.vue')
      }
    ]
  },
  {
    path: '/purchase-manage',
    name: 'purchase-manage',
    meta: {
      icon: 'ios-basket',
      title: '采购管理',
    },
    component: Main,
    children: [
      {
        path: 'supplier-list',
        name: 'supplier-list',
        meta: {
          icon: 'ios-person',
          title: '供货商管理'
        },
        component: () => import('@/view/purchase-manage/supplier-list.vue')
      },
      {
        path: 'enquiry-list',
        name: 'enquiry-list',
        meta: {
          icon: 'md-pricetags',
          title: '询价明细'
        },
        component: () => import('@/view/purchase-manage/enquiry-list.vue')
      },
      {
        path: 'purchase-list',
        name: 'purchase-list',
        meta: {
          icon: 'ios-basket',
          title: '采购管理'
        },
        component: () => import('@/view/purchase-manage/purchase-list.vue')
      },
      {
        path: 'purchase-add',
        name: 'purchase-add',
        meta: {
          hideInMenu: true,
          title: '新增采购单'
        },
        component: () => import('@/view/purchase-manage/purchase-add.vue')
      }
    ]
  },
  {
    path: '/goods-manage',
    name: 'goods-manage',
    meta: {
      icon: 'md-card',
      title: '商品管理',
    },
    component: Main,
    children: [
      {
        path: 'goods-list',
        name: 'goods-list',
        meta: {
          icon: 'md-menu',
          title: '商品列表'
        },
        component: () => import('@/view/goods-manage/goods-list.vue')
      },
      {
        path: 'goods-category',
        name: 'goods-category',
        meta: {
          icon: 'logo-buffer',
          title: '商品分类'
        },
        component: () => import('@/view/goods-manage/goods-category.vue')
      },
      {
        path: 'goods-desc',
        name: 'goods-desc',
        meta: {
          hideInMenu: true,
          title: '填写商品详细信息'
        },
        component: () => import('@/view/goods-manage/goods-desc.vue')
      }
    ]
  }
]

const demoRouter = [
  {
    path: '',
    name: 'doc',
    meta: {
      title: '文档',
      href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'ios-book'
    }
  },
  {
    path: '/join',
    name: 'join',
    component: Main,
    children: [
      {
        path: 'join_page',
        name: 'join_page',
        meta: {
          icon: '_qq',
          title: 'QQ群'
        },
        component: () => import('@/view/join-page.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      icon: 'logo-buffer',
      title: '组件'
    },
    component: Main,
    children: [
      {
        path: 'count_to_page',
        name: 'count_to_page',
        meta: {
          icon: 'md-trending-up',
          title: '数字渐变'
        },
        component: () => import('@/view/components/count-to/count-to.vue')
      },
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: 'md-grid',
          title: '多功能表格'
        },
        component: () => import('@/view/components/tables/tables.vue')
      },
      {
        path: 'split_pane_page',
        name: 'split_pane_page',
        meta: {
          icon: 'md-pause',
          title: '分割窗口'
        },
        component: () => import('@/view/components/split-pane/split-pane.vue')
      },
      {
        path: 'markdown_page',
        name: 'markdown_page',
        meta: {
          icon: 'logo-markdown',
          title: 'Markdown编辑器'
        },
        component: () => import('@/view/components/markdown/markdown.vue')
      },
      {
        path: 'editor_page',
        name: 'editor_page',
        meta: {
          icon: 'ios-create',
          title: '富文本编辑器'
        },
        component: () => import('@/view/components/editor/editor.vue')
      },
      {
        path: 'icons_page',
        name: 'icons_page',
        meta: {
          icon: '_bear',
          title: '自定义图标'
        },
        component: () => import('@/view/components/icons/icons.vue')
      }
    ]
  },
  {
    path: '/update',
    name: 'update',
    meta: {
      icon: 'md-cloud-upload',
      title: '数据上传'
    },
    component: Main,
    children: [
      {
        path: 'update_table_page',
        name: 'update_table_page',
        meta: {
          icon: 'ios-document',
          title: '上传Csv'
        },
        component: () => import('@/view/update/update-table.vue')
      },
      {
        path: 'update_paste_page',
        name: 'update_paste_page',
        meta: {
          icon: 'md-clipboard',
          title: '粘贴表格数据'
        },
        component: () => import('@/view/update/update-paste.vue')
      }
    ]
  },
  {
    path: '/directive',
    name: 'directive',
    meta: {
      hide: true
    },
    component: Main,
    children: [
      {
        path: 'directive_page',
        name: 'directive_page',
        meta: {
          icon: 'ios-navigate',
          title: '指令'
        },
        component: () => import('@/view/directive/directive.vue')
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'md-menu',
      title: '多级菜单'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'arrow-graph-up-right',
          title: '二级-1'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          access: ['super_admin'],
          icon: 'arrow-graph-up-right',
          showAlways: true,
          title: '二级-2'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'arrow-graph-up-right',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-3-1.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'arrow-graph-up-right',
          title: '二级-3'
        },
        component: () => import('@/view/multilevel/level-2-3.vue')
      },
    ]
  }
]

export default [
  // ...demoRouter,
  ...appRouter,
  ...userRouter
]
