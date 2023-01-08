// https://juejin.cn/post/6844904008495153165
const { PageConfig } = require("../../models");

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
    // 删除之前绑定的账号配置
    await PageConfig.deleteMany({
      bindUserId: { $nin: bindUserIds },
    });

    const findBinds = await PageConfig.find({
      adminUserId: userId,
      bindUserId: { $in: bindUserIds },
    });

    // 过滤出已经绑定过的账号
    const oldBindUserIds = findBinds.map(i => i.bindUserId)

    // 过滤出原有绑定的账号进行更新，新绑定的进行创建
    const newBinds = bindUserIds.filter(i => !oldBindUserIds.includes(i))

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
    }

    if (newBinds.length) {
      // 根据绑定的前台账户（可能同时绑定多个前台账户）生成对应的布局配置
      const newConfigList = newBinds.map(i => ({
        bindUserId: i,
        adminUserId: userId,
        layout, // 布局选择：1 上下布局，2 左右布局
        layoutSet, // 是否开启布局切换：1 开启，2 不开启
        cardLayout, // 卡片展示控制：1 左右布局模式，2 上下布局模式
        coverImgs, // 首页封面图（默认选择两张）
        createTime: new Date().valueOf(),
      }))

      await PageConfig.create(newConfigList);
    }
  }
}

module.exports = new PageConfigServer();
