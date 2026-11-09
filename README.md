# 低代码问卷搭建平台

基于 **Vue3 + TypeScript** 的低代码问卷搭建平台。用户通过拖拽组件、配置属性即可搭建一份完整问卷，并一键发布为在线问卷收集答案。

前端采用 **「状态对象驱动」** 的架构：画布上的每一个题目、每一项配置，本质上都是一段可序列化的数据描述，编辑器的渲染与交互完全由这份数据驱动。

---

## 功能模块

| 模块         | 说明                                                                                                                             |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| 组件市场     | 8 种基础题型（单选 / 多选 / 下拉 / 图片单选 / 图片多选 / 文本输入 / 评价打分 / 日期时间）+ 17 种个人信息预设题型，点击添加到画布 |
| 可视化编辑器 | 拖拽排序、点击选中、左侧大纲导航、右侧属性面板实时配置                                                                           |
| 预览 / 导出  | 按线上作答样式预览，支持导出 PDF                                                                                                 |
| 在线作答     | 问卷发布后通过链接作答，答案回收至后端                                                                                           |
| 本地持久化   | 基于 IndexedDB 保存问卷，支持列表管理、编辑回显与删除                                                                            |

---

## 技术栈

- **框架**：Vue3（Composition API）、Vue Router、Pinia
- **语言 / 样式**：TypeScript、Sass
- **工程化**：Vite、ESLint、Prettier
- **UI 与交互**：Element Plus、vuedraggable、mitt
- **本地存储**：IndexedDB（Dexie）
- **后端**：Node.js、Express、Multer

---

## 技术亮点

### 1. 状态对象驱动：新增题型无需改动编辑器

画布中每个题目都是一个 `Status` 状态对象，结构为 `{ id, name, type, status }`：

- `name` —— 题型标识
- `type` —— 对应的 Vue 组件
- `status` —— 该题型的全部配置数据（标题、描述、选项、字号、颜色……）

属性面板 `EditPanel.vue` 不对任何具体题型做判断，它只做一件事：遍历 `status.status`，用 `<component :is="item.editCom">` 把每一项渲染成对应的配置控件。因此**新增题型、新增配置项都不需要改动编辑器代码**。

### 2. 双映射表扩展机制

| 映射表             | 作用                         |
| ------------------ | ---------------------------- |
| `componentMap`     | 题型 / 配置项标识 → 具体组件 |
| `defaultStatusMap` | 题型标识 → 默认状态工厂函数  |

新增一个题型 = 写组件 + 写默认状态 + 注册两张表，无需触碰编辑器、画布或属性面板。

### 3. 多态选项结构的类型收窄

`options` 字段在不同题型下有三种形态：

```ts
type optionStatusArr =
  | string[] // 普通选项
  | ValueObjStatus[] // 值对（用于日期类型等）
  | PicTitleOrDescValueObjStatus[]; // 图文选项
```

通过联合类型 + 自定义类型守卫（`isStringArray` / `isValueObjArray` / `isPicTitleOrDescValueObjArray`）在运行时收窄，配合 TS 的类型谓词（`status is T`），保证每种形态下的读写都是类型安全的——**同一套配置字段，安全承载三种数据结构**。

### 4. 持久化与还原

Vue 组件实例无法被 IndexedDB 的结构化克隆算法序列化——`render`、`setup` 等函数属性会被丢弃，直接存储会导致问卷重新打开后白屏。

方案是**只持久化可序列化的数据部分**，读取时通过 `componentMap` 反向重建 `type` 与 `editCom` 引用（`restoreComType`），实现问卷「保存 → 重开 → 完整还原」。

### 5. 统一属性更新管线

所有配置变更都收敛到单一分发函数 `updateStatus(configKey, newValue, status)`：配置组件只负责抛出 `(configKey, value)`，由分发层完成类型判断后路由到对应的 action。新增配置项时，改动点集中在一处。

---

## 目录结构

```
question/                       前端
├── src/
│   ├── configs/
│   │   ├── componentMap.ts             题型 / 配置项 → 组件映射
│   │   ├── defaultStatus/              各题型默认状态工厂
│   │   └── surveyGroupConfig.ts        组件市场分组配置
│   ├── stores/                         Pinia（编辑器 / 组件市场）
│   ├── components/
│   │   ├── SurveyComs/Materials/       业务组件（题型本体）
│   │   ├── SurveyComs/EditItems/       属性配置组件
│   │   └── Editor/                     编辑器侧边组件
│   ├── views/                          编辑器 / 组件市场 / 预览 / 在线作答
│   ├── IndexDB/                        Dexie 封装与数据操作
│   ├── types/                          类型定义与运行时类型守卫
│   └── utils/                          工具方法、事件总线、provide/inject
└── ...

server/                         后端
└── server.js                          Express：问卷存取 / 答案提交 / 图片上传
```

---

## 本地运行

**前端**（默认 `http://localhost:5173`）

```bash
cd question
npm install
npm run dev
```

**后端**（默认 `http://localhost:3001`）

```bash
cd server
npm install
npm start
```

前端已在 `vite.config.ts` 中配置 `/api` 代理到 `http://localhost:3001`，两端同时启动即可联调。

> 后端为演示实现，问卷与答案保存在内存中，重启服务后清空。图片上传至 `server/uploads/` 并作为静态资源提供访问。
