# GitHub 提交与推送指南（完整流程）

这份文档用于把本地项目提交并推送到 GitHub。

---

## 1. 前置准备

- 已安装 `git`
- 已有 GitHub 账号
- 已创建（或准备使用）远程仓库地址，例如：
  - `https://github.com/Zoeynote/ZBlog.git`

---

## 2. 进入项目目录

```bash
cd /Users/Shared/portfolio-site
```

---

## 3. 初始化仓库（首次）

如果项目还不是 git 仓库，执行：

```bash
git init -b main
```

如果你的 Git 版本不支持 `-b`，可改为：

```bash
git init
git branch -M main
```

---

## 4. 查看当前变更

```bash
git status
```

---

## 5. 添加文件到暂存区

提交全部文件：

```bash
git add .
```

如果只提交部分文件，可指定路径：

```bash
git add src/app/page.tsx src/components/sections/content-sections.tsx
```

---

## 6. 创建提交（commit）

```bash
git commit -m "feat: update portfolio UI and theme behavior"
```

建议提交信息格式：

- `feat:` 新功能
- `fix:` 修复问题
- `refactor:` 重构
- `style:` 纯样式变更
- `docs:` 文档更新

---

## 7. 绑定远程仓库

首次绑定：

```bash
git remote add origin https://github.com/Zoeynote/ZBlog.git
```

如果远程已存在，先查看：

```bash
git remote -v
```

如需替换为新地址：

```bash
git remote set-url origin https://github.com/Zoeynote/ZBlog.git
```

---

## 8. 推送到 GitHub

首次推送（建立 upstream）：

```bash
git push -u origin main
```

后续推送：

```bash
git push
```

---

## 9. 常见问题

## 9.1 push 被拒绝（non-fast-forward）

远程有更新，本地落后：

```bash
git pull --rebase origin main
git push
```

## 9.2 认证失败

推荐使用 GitHub Token（PAT）代替密码。

可参考 GitHub 官方文档：
- [https://docs.github.com/en/authentication](https://docs.github.com/en/authentication)

## 9.3 提交了不该提交的文件

先从暂存区移除（不删除本地文件）：

```bash
git restore --staged <file>
```

并在 `.gitignore` 中加入对应规则。

---

## 10. 推荐检查清单（每次 push 前）

- `git status` 确认无意外文件
- 运行项目并检查关键页面
- 若有 lint：先通过 lint
- 提交信息清晰描述本次改动

---

## 11. 一套最常用命令（可直接复制）

```bash
cd /Users/Shared/portfolio-site
git init -b main
git add .
git commit -m "feat: update portfolio site"
git remote add origin https://github.com/Zoeynote/ZBlog.git
git push -u origin main
```

