// https://juejin.cn/post/6844904008495153165
const { PageConfig, User } = require("../../models");

class PageConfigServer {
  // 创建布局配置
  async adminCreateConfig({
    bindUserIds,
    userId,
    layout,
    layoutSet,
    cardLayout,
    coverImgs,
  }) {
    // 根据绑定的前台账户（可能同时绑定多个前台账户）生成对应的布局配置
    const configList = bindUserIds.map((i) => ({
      bindUserId: i,
      adminUserId: userId,
      layout, // 布局选择：1 上下布局，2 左右布局
      layoutSet, // 是否开启布局切换：1 开启，2 不开启
      cardLayout, // 卡片展示控制：1 左右布局模式，2 上下布局模式
      coverImgs, // 首页封面图（默认选择两张）
      createTime: new Date().valueOf(),
    }));

    const findBinds = await PageConfig.find({
      adminUserId: userId,
      bindUserId: { $in: bindUserIds },
    });

    if (findBinds.length) {
      await PageConfig.updateMany(
        { adminUserId: userId, bindUserId: { $in: bindUserIds } },
        {
          $set: {
            layout, // 布局选择：1 上下布局，2 左右布局
            layoutSet, // 是否开启布局切换：1 开启，2 不开启
            cardLayout, // 卡片展示控制：1 左右布局模式，2 上下布局模式
            coverImgs, // 首页封面图（默认选择两张）
            createTime: new Date().valueOf(),
          },
        }
      );
    } else {
      await PageConfig.create(configList);
    }
  }
}

module.exports = new PageConfigServer();
