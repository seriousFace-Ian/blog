---
title: Ardot 公测体验
date: 2026-06-17
excerpt: 腾讯 AI 设计工具 Ardot 上手体验
tags:
  - Ardot
  - AI Design
  - LLM
  - UI
  - UX
  - Figma
---

# Ardot

腾讯在设计领域推出的一款 AI 产品，整体风格与 Figma 相似。但是从实现上交给的 AI 更多的自主权，对于开发者来说，在完成一轮 AI 对话生图之后，难免有细节不尽人意。想要调整到自己满意的状态还是需要懂一点设计软件的基础操作，根据官方提供这份的 [Ardot 文档](https://docs.ardot.tencent.com/get-started.html) 还是很容易上手的。

## 与 Figma AI 功能横向对比

**Ardot**

1. 通过对话生图方式创建直出设计稿，可以在设计稿基础上调整
2. 主力国产大模型，Kimi、智普、Deepseek，图像模型支持即梦、可灵
3. 本地运行 MCP 服务对接 Codebuddy、Workbuddy、Cursor、Claude code，完成设计稿转换

通过对话模型、图像模型

**Figma Make** 

1. 提示词创建代码工程（更像是一个前端项目，补充结构图片），通过交互跳转到其他设计单页，开发可以直接通过代码调整设计稿问题
2. 通过 copy as Design 将设计同步到 Figma Draft 中参与编辑
3. 运行云端 MCP 服务，对接 Curosr、Claude code 等，完成设计稿转换（Figma MCP 是收费服务，针对普通用户每日只有 6 次的免费调用资格，开启本地 MCP 服务实测可以绕过这个限制，但存在用不到最新的 MCP 接口的限制）


## 基本功能

- 项目管理方式

```text
组织（Organization）
└── 团队（Team）
    └── 项目（Project）
        └── 文件（File）
```

- 工作区
  - 左边栏 - 设计目录
  - 右边栏 - AI 交互 + 设计调整

  ![workspace](/tencent-ardot-using-experience/main.webp)
  
  ![model](/tencent-ardot-using-experience/model-list.webp#w=300&align=left)
  
  实测生成一张 800 * 900 的设计稿，需要消耗 120+ Ardot 积分
  

## 一个开发的设计视角

### 连接 MCP

1. 进入项目右上角，MCP 入口配置 ![mcp-entrance](/tencent-ardot-using-experience/mcp-entrance.webp#w=300&align=left)
2. 开启需要支持的 AI 模型或客户端
3. 按照标准的 MCP 配置指引在本地添加 MCP 配置
4. 验证是否配置成功，Ardot MCP 亮绿灯，Cursor 配置显示正常

![mcp-config](/tencent-ardot-using-experience/mcp-config.webp#w=300&align=left)

### 调试

- MCP 同时只能服务一个项目，如果存在交叉项目，Ardot 取第一个建立 MCP 服务的项目，好处是没有调用限制，线上 MCP 产品负责人则在内测群表示后续再推出
- 积分消耗完可以通过 MCP 连接本地模型继续使用

![mcp-limit](/tencent-ardot-using-experience/mcp-limit.webp#w=300&align=left)

## 离生产的距离

模型理解能力有限，面对一行文本的需求出来的效果一般。AI 生图过程中也存在缺陷，比如简单的用户头像默认 icon，在设计稿的几个版本的更新迭代中都没能一个达到居中的效果，每次默认 icon 或者文本在圆形 avatar 中都是偏移的。原稿修改的提示词有时还会额外生成一张新的设计稿，属实是浪费 token。

![build-result](/tencent-ardot-using-experience/error-result.webp#w=300&align=left)

👆 简单修改 icon 布局，直接新建一个全新风格

**优点**

1. 使用 codeBuddy 或者 workBuddy 的用户在同一套体系下能够有更好的体验
2. 迭代速度快 [Ardot 更新日志](https://docs.ardot.tencent.com/release-notes.html)
3. 中文社区

**缺点**

1. 任务执行没有强制中断，曾连续执行 30min 以上，结果不符合预期之外还导致消耗过多 token
2. Ardot 还是一款主要面向设计师的产品，对比 Figma Make 的 AI 构建项目工程的方式，对开发角色上手还是有点门槛
3. 模型支持限制，同样的提示词效果差强人意
4. 暂时不支持设计回退

总的来说，在鹅放弃 codesign 全力投身 Ardot 的背景下，还是挺看好这款产品，不足就在于模型的能力还有一些产品细节。如果是对与刚涉猎 UI 设计的开发者，想做自己的 side project 是个不错的练手工具。

##  参考资料

[Figma Local Server Guide](https://developers.figma.com/docs/figma-mcp-server/local-server-installation/)