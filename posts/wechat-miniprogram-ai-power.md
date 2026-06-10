---
title: 小程序 AI 开发模式体验，微信 AI 思考
date: 2026-06-10
excerpt: 微信小程序 AI 
tags:
  - Tecent
  - AI
  - LLM
  - wechat
  - 微信小程序
---

# 官方文档

https://developers.weixin.qq.com/miniprogram/dev/ai/guide.html

# 开发模式

- 自动模式（也就是大家所诟病的霸王协议模式）
- 开发模式

![公众平台功能开关](/wechat-miniprogram-ai-power/wechat-ai-entrance.webp)


# 小程序 AI 入口

## 生产入口
根据文档描述，可以使用 API `wx.openAgent` 调起服务

根据微信生态，远期可能的入口猜想（类似千问 App 调起闪购服务的形式）
- 微信搜索框
- 元宝对话唤起
- 微信输入法语言输入

## 开发入口

### 小程序开发者工具

在编译模式打开 AI 编译模式，既有可供输入文本的对话框（需要升级到指定的 Nightly 版本）
![微信开发者工具入口](/wechat-miniprogram-ai-power/wechat-developer-tools-entrance.webp#w=300)


### 真机入口

![真机入口](/wechat-miniprogram-ai-power/ai-entrance.webp#w=300) ![聊天窗口](/wechat-miniprogram-ai-power/chat-window.webp#w=300)

点击右上角 🔧 标志进入对话框，进入 AI 交互

# 主体（三方）

- 微信客户端
  - 小程序 AI 后台
    - **第三方服务（开发者）**

# 接入方式

在原生小程序工程结构下构建能够给微信小程序 AI 调用的 SKILL。为此，微信提供了三个面向 Agent 开发的 skill 来帮助我们快速的开发符合规范的技能 [wechat-miniprogram/ai-mode-skills](https://github.com/wechat-miniprogram/ai-mode-skills)

分别是：wxa-skills-generate、wxa-skills-validate、wxa-skills-eval 。对应生成、验证、评测三个环节。只要在你的 Agent 工作流中调用 `/wxa-skills-generate 开发提示词` 即可进入微信提供的开发流程。

当中包含了很多设计规范，例如对原子组件的完成度有严格的校验标准，值得一看。

## 项目结构

```text
|-- path/to/pkg/weather-skill
| |-- SKILL.md     // SKILL 说明
| |-- mcp.json     // MCP 服务生命
| |-- components/  // 原子组件
| |-- apis/        // 原子接口
| |-- index.js     // 注册原子接口
```

## 开发形式

- 原子接口
  - 支持中间件
- 原子组件
  - 交互限制较多，支持半屏唤起小程序（业务兜底）
  - 支持定义实时原子组件，可以使用 `wx.request` 请求
  - 组件过期逻辑

Agent + 微信提供的 3 个开发 SKILL，因为都是对已有的业务做提炼，实际开发周期很短就能完成，开发者只需要关注设计和工程管理即可，还需关注后续小程序 AI 以何种形式面向公众。

# 总结：

小程序 Agent 的推出，可以说是微信利用小程序能力快速拉拢第三方服务的一步棋。相较于阿里千问内部花了很大功夫打通的阿里系应用，形成 Agent 生态。微信这招可谓是四两拨千斤，更具广度和深度的小程序护城河再一次被深挖。根据分发渠道，第三方也多了一个流量入口，小程序的形态也进一步压缩成一个服务卡片组件，更加轻量化。