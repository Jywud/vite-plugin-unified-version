import { execSync } from 'child_process';

export default function unifiedVersionPlugin(options = {}) {
  // 只接受三个配置参数：自定义键名和meta开关
  const VERSION_KEY = options.app_version || 'app_version';
  const BUILD_TIME_KEY = options.app_build_time || 'app_build_time';
  const INJECT_META = options.inject_meta !== false; // 默认 true
  
  let commitId = 'unknown';
  let buildTime = new Date().toLocaleString('zh-CN');
  
  // 获取 Git commit ID（固定逻辑）
  try {
    commitId = execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    console.log('ℹ️  vite-plugin-unified-version: No git repo');
  }
  
  return {
    name: 'vite-plugin-unified-version',
    
    // 注入到 Vite 的 define 配置中（用于编译时代码替换）
    config() {
      return {
        define: {
          [`__${VERSION_KEY}__`]: JSON.stringify(commitId),
          [`__${BUILD_TIME_KEY}__`]: JSON.stringify(buildTime)
        }
      };
    },
    
    // 转换 HTML，注入 meta 标签和 window 变量
    transformIndexHtml(html) {
      let injectContent = `
    <!-- Injected by vite-plugin-unified-version -->
    <script>
      // 注入到 window 对象，全局可访问
      window.${VERSION_KEY} = "${commitId}";
      window.${BUILD_TIME_KEY} = "${buildTime}";
    </script>
    `;
      
      // 根据开关决定是否添加 meta 标签
      if (INJECT_META) {
        injectContent = `
    <!-- Injected by vite-plugin-unified-version -->
    <meta name="${VERSION_KEY}" content="${commitId}" />
    <meta name="${BUILD_TIME_KEY}" content="${buildTime}" />
    <script>
      // 注入到 window 对象，全局可访问
      window.${VERSION_KEY} = "${commitId}";
      window.${BUILD_TIME_KEY} = "${buildTime}";
    </script>
    `;
      }
      
      // 将内容插入到 </head> 标签之前
      return html.replace('</head>', `${injectContent}\n</head>`);
    },
    
    // 构建完成后的提示
    closeBundle() {
      const metaStatus = INJECT_META ? '已添加' : '未添加';
      console.log(`✅ [vite-plugin-unified-version] 版本 ${commitId} 已注入 (构建于: ${buildTime})`);
      console.log(`   使用键名: ${VERSION_KEY}, ${BUILD_TIME_KEY}`);
      console.log(`   Meta标签: ${metaStatus}`);
    }
  };
}