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

