# vite-plugin-unified-version

一个 Vite 插件，用于自动注入 Git commit ID 和构建时间到 HTML 的 meta 标签和 window 对象中。

## 特性

- 🚀 自动获取当前 Git 仓库的 commit hash（简短版）
- ⏰ 自动记录构建时间（本地时间格式）
- 🔧 可自定义 meta 标签和 window 对象的键名
- 🎛️ 可控制是否注入 meta 标签
- 📦 兼容 Vite 3.x, 4.x, 5.x, 7.x+

## 安装

```bash
npm install vite-plugin-unified-version --save-dev
# 或
yarn add vite-plugin-unified-version -D
# 或
pnpm add vite-plugin-unified-version -D
```

## 使用方法

### 基础用法

在 `vite.config.js` 或 `vite.config.ts` 中引入并配置插件：

```javascript
import { defineConfig } from 'vite';
import unifiedVersion from 'vite-plugin-unified-version';

export default defineConfig({
  plugins: [
    unifiedVersion()
  ]
});
```

### 高级配置

插件支持以下配置选项：

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `app_version` | `string` | `'app_version'` | 自定义版本号的键名 |
| `app_build_time` | `string` | `'app_build_time'` | 自定义构建时间的键名 |
| `inject_meta` | `boolean` | `true` | 是否注入 meta 标签到 HTML |

#### 自定义键名

```javascript
import unifiedVersion from 'vite-plugin-unified-version';

export default defineConfig({
  plugins: [
    unifiedVersion({
      app_version: 'myAppVersion',
      app_build_time: 'myBuildTime'
    })
  ]
});
```

#### 禁用 meta 标签注入

```javascript
import unifiedVersion from 'vite-plugin-unified-version';

export default defineConfig({
  plugins: [
    unifiedVersion({
      inject_meta: false
    })
  ]
});
```

## 注入效果

插件会在构建时自动注入以下内容：

### Meta 标签（默认启用）

```html
<head>
  <!-- Injected by vite-plugin-unified-version -->
  <meta name="app_version" content="a1b2c3d" />
  <meta name="app_build_time" content="2026/2/10 14:30:00" />
  <script>
    // 注入到 window 对象，全局可访问
    window.app_version = "a1b2c3d";
    window.app_build_time = "2026/2/10 14:30:00";
  </script>
</head>
```

### Window 对象

注入后可以在 JavaScript 中直接访问：

```javascript
console.log(window.app_version);      // 输出: "a1b2c3d"
console.log(window.app_build_time);   // 输出: "2026/2/10 14:30:00"
```

### 编译时变量

插件还会注入编译时变量，可以在代码中使用：

```javascript
console.log(__app_version__);      // 输出: "a1b2c3d"
console.log(__app_build_time__);   // 输出: "2026/2/10 14:30:00"
```

## 构建输出

构建完成后，控制台会显示注入的信息：

```
✅ [vite-plugin-unified-version] 版本 a1b2c3d 已注入 (构建于: 2026/2/10 14:30:00)
   使用键名: app_version, app_build_time
   Meta标签: 已添加
```

## 常见问题

### Q: 如果不在 Git 仓库中运行会怎样？

A: 插件会自动检测 Git 环境，如果不在 Git 仓库中，commit ID 会显示为 `unknown`，并在控制台输出提示信息。

### Q: 如何在 TypeScript 中使用注入的变量？

A: 需要在 `src/vite-env.d.ts` 或全局类型声明文件中添加类型声明：

```typescript
declare global {
  interface Window {
    app_version: string;
    app_build_time: string;
  }
}

export {};
```

## 许可证

MIT

## 作者

[jywud](https://github.com/jywud)

## 仓库

https://github.com/jywud/vite-plugin-unified-version

