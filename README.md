# 🌸 OMP Web — Galgame / Eroge 视觉小说主题版 (`♥ Galgame`)

将 [Oh My Pi (`omp-web`)](https://github.com/17380936778/omp-web) 变成一款真正的 **日式 Galgame / Eroge 视觉小说（Yuzusoft 柚子社 / KiriKiri ADV 引擎风格）**！和 AI 写代码、跑任务就像在攻略美少女视觉小说一样沉浸。

---

## ✨ 实机界面预览

### 1. 白昼线 — 「放課後の部室 · 桜舞う放課後のプロンプト 🌸」（学院制服）
![Galgame 白昼线 — 放課後の部室](./docs/screenshots/galgame-day.png)

### 2. 深夜 Eroge 线 — 「深夜の私室 · 真夜中の二人きりデバッグ ♥」（露肩蝴蝶结私服）
![Galgame 深夜线 — 深夜の私室](./docs/screenshots/galgame-night.png)

---

## 🎮 核心游戏化特性

- **🌸 双路线全屏背景 CG + 动态樱花飘落粒子舞台 (`components/GalgameStage.tsx`)**
  - **放課後の部室 🌸（白昼线）**：夕阳樱花社团活动室背景 CG + 学院制服看板娘立绘（白桜 詩乃 / Shino）。
  - **深夜の私室 ♥（深夜 Eroge 线）**：月夜樱花阳台卧室背景 CG + 露肩蝴蝶结私服害羞立绘。
  - 全屏飘落动态樱花花瓣（`@keyframes gal-petal-fall`）与镜头呼吸微动效。
- **🎛️ 右上角 Galgame 快捷系统栏 (`.gal-quick-bar`)**
  - `♥ SCENE: 放課後 🌸 / 深夜の私室 ♥`：一键切换白昼/深夜路线背景 CG、看板娘服装立绘与专属台词。
  - `🔊 VOICE / 台詞`（或直接点击右侧看板娘立绘）：触发看板娘互动台词气泡与爱心飘飞特效（`♥`）。
  - `👗 立ち絵: ON/OFF`：随时开关右侧看板娘立绘（桌面端开启立绘时自动预留右侧舞台空间，绝不遮挡代码与对话；手机端自动退居背景层，不阻挡任何点击）。
  - `✨ CG鑑賞 (HIDE)`：一键隐藏所有 UI 窗口，纯享全屏 CG 与角色立绘（点击屏幕任意处恢复）。
- **📅 左上角 Galgame 日历 / 章节 / 好感度 HUD (`.gal-corner-hud`)**
  - 显示日期徽章 `10.25 [SUN]`、时间段胶囊（`☀ 放課後 AFTER SCHOOL` / `🌙 深夜 SECRET NIGHT ♥`）、章节名及动态跳动的 **`好感度 ♥♥♥♥♥`**。
- **💬 KiriKiri / 柚子社风格 ADV 对话框与分支选项条 (`app/galgame.css`)**
  - **AI 回复 = ADV 游戏对话框**：顶部镶嵌带角色头像勋章的姓名铭牌 **`【白桜 詩乃 ✦ 模型名 🔊 CV.AI】`**，双层香槟金与樱粉雕花边框、右上角菱形花纹（`❖`）及右下角跳动的翻页指示符 **`▼ ♥`**。
  - **用户提问 = Galgame 分支选项条（`◆ 選択肢 // CHOICE ♥`）**：呈现为视觉小说标志性的发光分支选项横幅。
  - **左侧历史会话 = 存档槽（`SAVE DATA 01`, `SAVE DATA 02`...）**：侧边栏自动编号为游戏存档卡，当前会话高亮显示 `▶ PLAYING · DATA ♥`。
- **🎨 随时自由切换主题**
  - 顶部主题选择器内置 `♥ Galgame`（默认）、`Light`、`Dark`、`★ Starfield` 四套主题，可随时一键切换。

---

## 🚀 安装与使用指南

### 方式一：为已安装的 `omp-web` 一键打入 Galgame 主题补丁（推荐）

如果你服务器上已经安装了原版 `omp-web`（例如位于 `/opt/omp-web`），只需运行以下一行命令即可完成主题安装：

```bash
curl -fsSL https://raw.githubusercontent.com/yisallu/omp-web-galgame/main/install-galgame-theme.sh | bash -s -- /opt/omp-web
```

然后重新编译并重启服务即可：

```bash
cd /opt/omp-web
npm run build
systemctl restart omp-web   # 或使用你自己的进程管理方式重启
```

---

### 方式二：直接克隆本仓库完整运行

本仓库包含完整的 `omp-web` 源码与预置的 Galgame 视觉小说主题（以及后台空闲重连超时修复）：

```bash
git clone https://github.com/yisallu/omp-web-galgame.git
cd omp-web-galgame
npm install
npm run build
npm start
```

启动后打开 `http://127.0.0.1:30141` 即可直接进入 **Galgame / Eroge 视觉小说界面**！

---

## 📁 自定义看板娘立绘与背景 CG

如果你想替换成自己最喜欢的 Galgame 老婆立绘或背景 CG，只需替换 `public/galgame/` 目录下的同名文件（无需改代码）：

| 文件路径 | 用途说明 | 推荐尺寸 / 格式 |
| :--- | :--- | :--- |
| `public/galgame/bg-sakura.jpg` | 白昼线（放課後の部室）背景 CG | 16:9 宽屏 JPG/PNG |
| `public/galgame/bg-night.jpg` | 深夜线（深夜の私室 ♥）背景 CG | 16:9 宽屏 JPG/PNG |
| `public/galgame/heroine.png` | 白昼线看板娘立绘 | 透明背景 PNG（半身/立绘） |
| `public/galgame/heroine-night.png` | 深夜线看板娘立绘 | 透明背景 PNG（半身/立绘） |
| `public/galgame/heroine-avatar.png` | 对话框左上角角色头像勋章 | 1:1 方形 PNG（如 240×240） |

修改台词可编辑 [`components/GalgameStage.tsx`](./components/GalgameStage.tsx) 顶部的 `AFTERSCHOOL_LINES` 与 `MIDNIGHT_LINES` 数组。
