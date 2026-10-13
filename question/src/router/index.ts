import HomeView from '@/views/HomeView/Index.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useMaterialStore } from '@/stores/useMaterial';
import type { ComsKey } from '@/types';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/editor/:id?',
      name: 'editor',
      component: () => import('@/views/EditorView/Index.vue'),
      redirect: '/editor/survey-type',
      children: [
        {
          path: 'survey-type',
          name: 'survey-type',
          component: () =>
            import('@/views/EditorView/components/LeftSide/components/SurveyType.vue'),
        },
        {
          path: 'outline',
          name: 'outline',
          component: () => import('@/views/EditorView/components/LeftSide/components/OutLine.vue'),
        },
      ],
    },
    {
      path: '/materials',
      name: 'materials',
      component: () => import('@/views/MaterialsView/Index.vue'),
      redirect: '/select-group',
      children: [
        {
          // 子路由这里前面加/，这样访问的时候可以省略父路由，直接访问子路由
          path: '/select-group',
          name: 'select-group',
          component: () => import('@/views/MaterialsView/components/SelectGroupView.vue'),
          redirect: '/single-select',
          children: [
            {
              path: '/single-select',
              name: 'single-select',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/SingleSelect.vue'),
            },
            {
              path: '/multi-select',
              name: 'multi-select',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/MultiSelect.vue'),
            },
            {
              path: '/options-select',
              name: 'options-select',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/OptionsSelect.vue'),
            },
            {
              path: '/single-pic-select',
              name: 'single-pic-select',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/SinglePicSelect.vue'),
            },
            {
              path: '/multi-pic-select',
              name: 'multi-pic-select',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/MultiPicSelect.vue'),
            },
          ],
        },
        {
          path: '/input-group',
          name: 'input-group',
          redirect: '/text-input',
          component: () => import('@/views/MaterialsView/components/InputGroupView.vue'),
          children: [
            {
              path: '/text-input',
              name: 'text-input',
              component: () => import('@/components/SurveyComs/Materials/InputComs/TextInput.vue'),
            },
          ],
        },
        {
          path: '/advanced-group',
          name: 'advanced-group',
          component: () => import('@/views/MaterialsView/components/AdvancedGroupView.vue'),
          redirect: '/evaluate-mark',
          children: [
            {
              path: '/evaluate-mark',
              name: 'evaluate-mark',
              component: () =>
                import('@/components/SurveyComs/Materials/AdvancedComs/EvaluateMark.vue'),
            },
            {
              path: '/date-time',
              name: 'date-time',
              component: () =>
                import('@/components/SurveyComs/Materials/AdvancedComs/DateTime.vue'),
            },
          ],
        },
        {
          path: '/note-group',
          name: 'note-group',
          component: () => import('@/views/MaterialsView/components/NoteGroupView.vue'),
          redirect: '/text-note',
          children: [
            {
              path: '/text-note',
              name: 'text-note',
              component: () => import('@/components/SurveyComs/Materials/NoteComs/TextNote.vue'),
            },
          ],
        },
        {
          path: '/personal-info-group',
          name: 'personal-info-group',
          component: () => import('@/views/MaterialsView/components/PersonalInfoGroupView.vue'),
          redirect: '/personal-info-name',
          children: [
            {
              path: '/personal-info-name',
              name: 'personal-info-name',
              component: () => import('@/components/SurveyComs/Materials/InputComs/TextInput.vue'),
            },
            {
              path: '/personal-info-id',
              name: 'personal-info-id',
              component: () => import('@/components/SurveyComs/Materials/InputComs/TextInput.vue'),
            },
            {
              path: '/personal-info-birth',
              name: 'personal-info-birth',
              component: () =>
                import('@/components/SurveyComs/Materials/AdvancedComs/DateTime.vue'),
            },
            {
              path: '/personal-info-gender',
              name: 'personal-info-gender',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/SingleSelect.vue'),
            },
            {
              path: '/personal-info-age',
              name: 'personal-info-age',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/SingleSelect.vue'),
            },
            {
              path: '/personal-info-education',
              name: 'personal-info-education',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/SingleSelect.vue'),
            },
            {
              path: '/personal-info-collage',
              name: 'personal-info-collage',
              component: () => import('@/components/SurveyComs/Materials/InputComs/TextInput.vue'),
            },
            {
              path: '/personal-info-major',
              name: 'personal-info-major',
              component: () => import('@/components/SurveyComs/Materials/InputComs/TextInput.vue'),
            },
            {
              path: '/personal-info-industry',
              name: 'personal-info-industry',
              component: () => import('@/components/SurveyComs/Materials/InputComs/TextInput.vue'),
            },
            {
              path: '/personal-info-career',
              name: 'personal-info-career',
              component: () =>
                import('@/components/SurveyComs/Materials/SelectComs/SingleSelect.vue'),
            },
            {
              path: '/personal-info-company',
              name: 'personal-info-company',
              component: () => import('@/components/SurveyComs/Materials/InputComs/TextInput.vue'),
            },
            {
              path: '/personal-info-position',
              name: 'personal-info-position',
              component: () => import('@/components/SurveyComs/Materials/InputComs/TextInput.vue'),
            },
          ],
        },
        {
          path: '/contact-group',
          name: 'contact-group',
          redirect: 'personal-info-tel',
          component: () => import('@/views/MaterialsView/components/ContactGroupView.vue'),
          children: [
            {
              path: '/personal-info-tel',
              name: 'personal-info-tel',
              component: () => import('@/components/SurveyComs/Materials/InputComs/TextInput.vue'),
            },
            {
              path: '/personal-info-wechat',
              name: 'personal-info-wechat',
              component: () => import('@/components/SurveyComs/Materials/InputComs/TextInput.vue'),
            },
            {
              path: '/personal-info-qq',
              name: 'personal-info-qq',
              component: () => import('@/components/SurveyComs/Materials/InputComs/TextInput.vue'),
            },
            {
              path: '/personal-info-email',
              name: 'personal-info-email',
              component: () => import('@/components/SurveyComs/Materials/InputComs/TextInput.vue'),
            },
            {
              path: '/personal-info-address',
              name: 'personal-info-address',
              component: () => import('@/components/SurveyComs/Materials/InputComs/TextInput.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/preview/:id', // 接收一个动态参数为问卷的id，且限制必须为数字
      name: 'preview',
      component: () => import('@/views/Preview/Index.vue'),
    },
    {
      path: '/online-survey/:id',
      name: 'online-survey',
      component: () => import('@/views/OnlineSurvey/Index.vue'),
    },
  ],
  scrollBehavior: () => {
    return {
      top: 0,
      behavior: 'smooth',
    };
  },
});

// 后置前置路由守卫，用前置会导致那边组件没销毁数据就更新了，造成数据格式不符的警告
router.afterEach((to) => {
  // 获取当前显示的路由
  const activeView = localStorage.getItem('active-view');
  const materialStore = useMaterialStore();

  // 只有在组件市场才需要切换
  if (activeView === 'materials' && to.name) {
    materialStore.changeCurrentMaterialCom(to.name as ComsKey);
  }
  return true;
});

export default router;
