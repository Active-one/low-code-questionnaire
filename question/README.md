# 低代码问卷搭建平台 · 前端

Vue3 + TypeScript 前端。项目完整说明见仓库根目录 [README](../README.md)。

## 开发

```bash
npm install
npm run dev      # 开发服务，默认 http://localhost:5173
npm run build    # 类型检查 + 构建
npm run lint     # ESLint 检查并修复
```

## 说明

- 题型与配置项的映射表在 `src/configs/`，新增题型从这里开始
- 编辑器的渲染完全由「状态对象」驱动，详见根目录 README 的「技术亮点」
- 后端位于 `../server`，`/api` 已在 `vite.config.ts` 中代理到 `http://localhost:3001`
