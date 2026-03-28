# Claude code Teams 上手体验

## Claude Features

```text
2024.11 → MCP (Model Context Protocol)
2025.02 → Claude Code 核心发布
2025.07 → Subagents
2025.09 → Hooks  
2025.10 → Skills + Plugins
2026.02 → Agent Teams (最新)
```

Claude 绝对算得上在 AI code 话题中心，随着 Opus4.6 的推出，越来越多同行将 Claude code 融入自己的 wrokflow，相对于单独 Skill 针对单功能的 SOP 场景的处理，当 Teams 功能出现的时候，打造自己的工作流变成了现实。其实在这之前，开源社区早已有了相关的尝试，包括 crewAI、MetaGPT、OpenHands 等等，都是定好了一整套软件开发流程，体验下来整一个链条十分长。Claude Code Teams 的推出重新让业界思考多 agents 协同到底对开发有多大的收益

## Agents 参与开发的意义

整理官方的一些描述

1. 节省 token, agent 根据职责完成部分工作，可以限定在一个固定的场景中，专注处理某个领域问题
2. 每个 agent 可以独立保持独立的上下文（1M tokens）
3. 并行执行，节省时间（看自己需求，因为 Teams 模式下 token 燃烧速度也是快了）

## Claude Code Teams 配置

1. 在项目 .claude/settings.json 中开启 Teams 功能
2. Claude Code v2.1.32+ (2026.02.05 发布)
2. Claude Opus 4.6 模型（Teams 功能必需）
4. iTerm2 或 tmux（下文以 iTerm2 为例子）
5. python3 环境下安装 `pip3 install it2`
6. iTerm3 设置中开启 General → Magic -> "Enable Python API"

.claude/settings.json

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1" // 还是实验功能，需要手动开启
  },
  "teammateMode": "tmux"
}
```

## 定义 agents 组件 Teams

```text
├── agents
│   ├── backend-specialist.md
│   ├── inter.md
│   ├── product-manager.md
│   ├── qa-specialist.md
│   ├── react-specialist.md
│   ├── tech-researcher.md
│   └── vue-specialist.md
├── settings.json
├── settings.local.json
├── skills
│   └── component-developer-rules.md
└── teams
    └── frontend-team.md
```

落到具体的项目，这里主要定义了 productManager\TechSpecialist\ReactSpecialist\QASpecialist 多个角色，根据项目使用的技术栈指定 agent 研究方向还有技能树。最后在 teams 目录下组件 frontendTeam，这也是有趣的一点。可以根据不同的业务场景组件不同的 agents 成为一个对的团队成员。最终让你的开发需求在金字塔的顶部通过这种方式分发到每个 agent

## Claude Code Teams 运行效果

![Claude Code Teams 并行运行截图](/multi-agents.png)


## 总结

指定角色 agent 确实有一种一人公司具象化的感觉。应用场景更像是针对独立的项目打造一支 Team 辅助开发，本质上还是将 content 以一种大家可以接受的方式落到文档中来，当然其本身的 agents 相互分享上下文和沟通也是重点。虽然不同的项目使用不同的技术栈，在前期有一定量的工作需要完成，但是借助项目的 CLAUE.md，可以让 AI 快速给我们搭一个适合项目的框架。实际使用下来还是能够很大程度提高开发效率。