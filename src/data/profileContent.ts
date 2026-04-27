export type ProfileCategory = "all" | "项目" | "盘点" | "活动" | "采访" | "技术";

export type ProfileBanner = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

export type ProfilePost = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  category: Exclude<ProfileCategory, "all">;
  tags: string[];
  link?: string;
  cover?: string | null;
};

export const profileBanners: ProfileBanner[] = [
  {
    id: "b1",
    title: "RWA Narrative Map 2026",
    subtitle: "A visual intelligence report for capital flow, protocol momentum and category leaders.",
    image: "/placeholder-1.svg"
  },
  {
    id: "b2",
    title: "ZK Builders Week",
    subtitle: "Event campaign system from concept to distribution with unified design language.",
    image: "/placeholder-2.svg"
  },
  {
    id: "b3",
    title: "DeFi Growth Playbook",
    subtitle: "Cross-channel experimentation with content, data instrumentation and conversion strategy.",
    image: "/placeholder-3.svg"
  }
];

export const profilePosts: ProfilePost[] = [
  {
    slug: "meme-research-navigation",
    title: "【投研导航】meme 热潮冷思考：该如何玩转？数据分析｜投资逻辑｜实用工具",
    summary: "面对生命周期极短且价格波动巨大的 meme 项目，究竟该如何选择和评估？",
    image: "",
    category: "盘点",
    tags: ["meme", "数据", "盘点"],
    link: "https://chainfeeds.substack.com/p/meme",

    cover: "https://substackcdn.com/image/fetch/$s_!A6wa!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F50349900-71dd-4762-b919-da333f2dd932_1600x810.png",
  },
  {
    slug: "erc-5169-tokenscript-smart-layer",
    title: "ERC-5169 和 TokenScript 为何需要 Smart Layer？",
    summary: "以代币为中心的架构如何带来 Web3 结构演变？",
    image: "",
    category: "项目",
    tags: ["中间件", "空投", "项目介绍"],
    link: "https://chainfeeds.substack.com/p/erc-5169-tokenscript-smart-layer",

    cover: "https://substackcdn.com/image/fetch/$s_!L7Oi!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb08089a9-a67e-4208-98ae-7d16c625b917_1280x712.jpeg",
  },
  {
    slug: "chainfeeds-ario-campaign",
    title: "ChainFeeds 回馈季第二期：参与获取 AR.IO 链上积分",
    summary: "活动将于 2024 年 10 月 30 日开启，先到先得。",
    image: "",
    category: "活动",
    tags: ["AR.IO", "活动"],
    link: "https://chainfeeds.substack.com/p/chainfeeds-ario",

    cover: "https://substackcdn.com/image/fetch/$s_!yveK!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F088bdcb4-7325-4909-9235-35dd0f1609d8_1092x720.png",
  },
  {
    slug: "dialogue-gulu-ethereum-endgame",
    title: "对话咕噜：以太坊终局解读，以太坊真的胜出了吗？",
    summary: "Layer1 + Layer2、非国家空间、交易范式演进",
    image: "",
    category: "采访",
    tags: ["DeFi", "以太坊", "观点"],
    link: "https://chainfeeds.substack.com/p/7a9",

    cover: "https://substackcdn.com/image/fetch/$s_!CujQ!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa6ef40a4-0555-492e-a01f-5940efd9da63_3590x2640.jpeg",
  },
  {
    slug: "dialogue-taiko-mainnet-roadmap",
    title: "对话 Taiko：主网上线后将如何发展？与以太坊终局有何关联？",
    summary: "主网上线前，Vitalik Buterin 作为区块提议者 propose 了首个区块，并附言期待其主网上线。",
    image: "",
    category: "采访",
    tags: ["Taiko", "以太坊", "观点"],
    link: "https://chainfeeds.substack.com/p/taiko",

    cover: "https://substackcdn.com/image/fetch/$s_!3BDG!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5ce5fc2d-1689-4183-ad7f-3a637a29eed8_1092x720.png",
  },
  {
    slug: "nillion-privacy-computing-2025",
    title: "Nillion 盲计算：定义 2025 隐私计算新未来",
    summary: "Nillion 核心团队围绕技术架构、产品路径与生态策略进行解读，并分享其对隐私计算未来发展的最新见解。",
    image: "",
    category: "采访",
    tags: ["Nillion", "隐私计算", "观点"],
    link: "https://www.binance.com/zh-CN/square/post/04-16-2025-nillion-2025-22934390200257",

    cover: "/nillion-blind-compute-cover.png",
  },
  {
    slug: "wspn-stablecoin-2",
    title: "WSPN 谈「稳定币 2.0」：能否开启稳定币市场新纪元？",
    summary: "所有努力最终都指向一个核心目标：最大化用户体验价值。",
    image: "",
    category: "采访",
    tags: ["WSPN", "稳定币", "观点"],
    link: "https://chainfeeds.substack.com/p/wspn-20",

    cover: "https://substackcdn.com/image/fetch/$s_!tgeh!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdf0145cc-6de1-4eb5-bbdc-c9f910175fde_1092x720.png",
  },
  {
    slug: "based-rollup-preconfs",
    title: "为什么 Based Rollup 需要预确认（Preconfs）技术？",
    summary: "预确认机制如何提升 Rollup 用户体验与流动性效率。",
    image: "",
    category: "技术",
    tags: ["Based Rollup", "预确认", "技术"],
    link: "https://chainfeeds.substack.com/p/based-rollup-preconfs",

    cover: "https://substackcdn.com/image/fetch/$s_!GyZV!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F45c5a4f5-1509-4de3-9a33-50d6cfc124e1_1092x720.png",
  },
  {
    slug: "risc-zero-zk",
    title: "解密 RISC Zero 产品矩阵：如何助力以太坊迈向 ZK 化未来？",
    summary: "近日，RISC Zero zkVM 发布了 1.2 版本，引入了一种全新的预编译方式，允许开发者将预编译逻辑与应用程序一起部署，而无需内置于 zkVM 本身。",
    image: "",
    category: "项目",
    tags: ["ZK", "项目介绍", "zkVM"],
    link: "https://chainfeeds.substack.com/p/risc-zero-zk",

    cover: "https://substackcdn.com/image/fetch/$s_!Oawh!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F51822228-97a1-45b7-8381-f19e03ef7fee_1792x1024.webp",
  },
  {
    slug: "orb-land-600",
    title: "加密经济实验 Orb Land：600% 哈伯格税能否实现个人咨询服务？",
    summary: "你愿意支付多少 ETH 以向 Taproot Wizards 发起人 Eric Wall 咨询一个问题？",
    image: "",
    category: "项目",
    tags: ["NFT", "加密经济", "项目介绍"],
    link: "https://chainfeeds.substack.com/p/orb-land600",

    cover: "https://substackcdn.com/image/fetch/$s_!Wxml!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F97946026-90a7-418d-9048-1fb29e1c9d6f_1280x712.jpeg",
  },
  {
    slug: "lrt-puffer",
    title: "从 LRT 协议到去中心化基础设施供应商：Puffer 如何对齐以太坊生态？",
    summary: "Puffer 在设计和产品演进中始终践行了与以太坊一致的原则，并展现了对以太坊长期愿景的支持。",
    image: "",
    category: "项目",
    tags: ["LRT", "DeFi", "项目介绍"],
    link: "https://chainfeeds.substack.com/p/lrt-puffer",

    cover: "https://substackcdn.com/image/fetch/$s_!rD4u!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd8d721bb-846b-49f1-90a9-c34ebcfce663_1092x720.png",
  },
  {
    slug: "ckb-layer2",
    title: "重返初心：CKB 转向比特币 Layer2 赛道，炒作还是机遇？",
    summary: "CKB 的过去、现在和未来",
    image: "",
    category: "项目",
    tags: ["比特币", "Layer2", "项目介绍"],
    link: "https://chainfeeds.substack.com/p/ckb-layer2",

    cover: "https://substackcdn.com/image/fetch/$s_!-cHX!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffef86ffe-1415-47c3-a84e-b7a7bf8e0578_1280x712.jpeg",
  },
  {
    slug: "symbiotic-thin-coordination-layer",
    title: "Symbiotic 架构简析：灵活且无需许可的 Thin Coordination Layer",
    summary: "获 Lido 和 Paradigm 支持，Symbiotic 能否打破 EigenLayer 一家独大的局面？",
    image: "",
    category: "项目",
    tags: ["Symbiotic", "DeFi", "项目介绍"],
    link: "https://chainfeeds.substack.com/p/symbiotic-thin-coordination-layer",

    cover: "https://substackcdn.com/image/fetch/$s_!SkUH!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F92a6f956-a4ee-457a-b6c7-7d26a7c81255_1092x720.png",
  },
  {
    slug: "the-graph-ai-web3",
    title: "The Graph 如何扩展为 AI 驱动的 Web3 基础设施？",
    summary: "如何让 dApp 更易于集成 AI 技术？",
    image: "",
    category: "项目",
    tags: ["AI", "基础设施", "项目介绍"],
    link: "https://chainfeeds.substack.com/p/the-graph-ai-web3",

    cover: "https://substackcdn.com/image/fetch/$s_!UAye!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcc45f3bf-3ab2-4a99-9a30-3ba00e52b4b6_1092x720.png",
  },
  {
    slug: "dex-orderbook-evolution",
    title: "订单簿 DEX 演进之路：这十年都有哪些变化？",
    summary: "随着链的吞吐量提升，去中心化交易最终将回归至订单薄模式",
    image: "",
    category: "盘点",
    tags: ["DeGate", "DEX", "盘点"],
    link: "https://chainfeeds.substack.com/p/dex",

    cover: "https://substackcdn.com/image/fetch/$s_!07US!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd36ffc22-12bf-4563-bc0d-fb149ff7d914_3590x2640.jpeg",
  },
  {
    slug: "layer2-midyear-review",
    title: "Layer2 赛道年中回顾：增长数据是真是假？",
    summary: "Arbitrum、Optimism、zkSync、Starknet、Base、Taiko 及 Scroll",
    image: "",
    category: "盘点",
    tags: ["Layer2", "数据", "盘点"],
    link: "https://chainfeeds.substack.com/p/layer2",

    cover: "https://substackcdn.com/image/fetch/$s_!B9fZ!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbd223cfd-4242-4949-8348-3d76b5d8f2ec_1092x720.png",
  },
  {
    slug: "fuel-ecosystem-overview",
    title: "主网上线在即，Fuel Network 生态大盘点",
    summary: "Fuel 生态当前发展情况与核心项目梳理",
    image: "",
    category: "盘点",
    tags: ["生态", "Fuel", "盘点"],
    link: "https://mp.weixin.qq.com/s/1SvB8-8ALGTs4tQFgACuRQ",

    cover: "/fuel-ecosystem-cover.png",
  },
  {
    slug: "ethshanghai-wrap-up",
    title: "ETHShanghai 圆满落幕！共话以太坊应用的未来新篇章！",
    summary: "大会期间深入探讨 Web3 生态未来趋势与应用落地。",
    image: "",
    category: "活动",
    tags: ["ETHShanghai", "以太坊", "活动"],
    link: "https://mp.weixin.qq.com/s/imT0oQzYTm6sO9kBQzYM-Q",

    cover: "/ethshanghai-wrap-up-cover.png",
  },
  {
    slug: "tee-privacy-outlook",
    title: "TEE 再度热议：隐私技术发展困境中的新曙光？",
    summary: "TEE 在 MPC 与 ZK 限制下的现实机会。",
    image: "",
    category: "技术",
    tags: ["TEE", "隐私", "技术"],
    link: "https://chainfeeds.substack.com/p/tee",

    cover: "https://substackcdn.com/image/fetch/$s_!9Isk!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd205be54-b92d-464b-aead-add119663d3a_1092x720.png",
  },
  {
    slug: "fuel-efficient-execution-layer",
    title: "致力于成为最高效执行层，Fuel 做对了哪些事情？",
    summary: "Fuel 专注于避免状态增长，并且不局限于任何一种配置，无论是主权 Rollup、结算链还是单体链。",
    image: "",
    category: "项目",
    tags: ["Rollup", "执行层", "项目介绍"],
    link: "https://mp.weixin.qq.com/s/zdNt_a2iNeJqDuLhDrP0Zg",

    cover: "/fuel-efficient-execution-cover.png",
  }
];
