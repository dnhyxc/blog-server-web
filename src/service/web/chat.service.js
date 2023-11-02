const { Chat, CacheChats, NewChats } = require("../../models");

class chatServer {
  // 添加聊天
  addChat = async ({ from, to, content, chatId, createTime, userId }) => {
    const res = await CacheChats.create({
      from,
      to,
      content,
      chatId,
      createTime,
    });
    this.addNewChat({ from, to, content, chatId, createTime });
    return res;
  };

  // 添加最新聊天
  addNewChat = async ({ from, to, content, chatId, createTime }) => {
    const findOne = await NewChats.findOne({ chatId });
    if (findOne) {
      await NewChats.updateOne(
        { chatId },
        {
          $set: {
            from,
            to,
            content,
            chatId,
            createTime,
          },
        }
      );
    } else {
      await NewChats.create({
        from,
        to,
        content,
        chatId,
        createTime,
      });
    }
    return {
      from,
      to,
      content,
      chatId,
      createTime,
    };
  };

  // 更新最新消息
  updateNewChat = async ({ from, to, content, chatId, createTime }) => {
    const res = await NewChats.updateOne(
      { chatId },
      {
        $set: {
          from,
          to,
          content,
          chatId,
          createTime,
        },
      }
    );
    return res;
  };

  // 删除缓存及最新消息
  deleteChatMesaage = async (params) => {
    const res = await Promise.all([
      this.deleteNewChat(params),
      this.deleteCatchChat(params),
    ]);
    return res;
  };

  // 删除最新消息
  deleteNewChat = async ({ chatId }) => {
    const res = await NewChats.deleteOne({ chatId });
    return res;
  };

  // 删除缓存聊天记录
  deleteCatchChat = async ({ id }) => {
    const res = await CacheChats.deleteOne({ _id: id });
    return res;
  };

  // 获取最新聊天
  getNewChat = async (chatIds) => {
    const res = await NewChats.find(
      { chatId: { $in: chatIds } },
      {
        _id: 0,
        id: "$_id",
        from: 1,
        to: 1,
        chatId: 1,
        createTime: 1,
        content: 1,
      }
    );
    return res;
  };

  // 获取新增的缓存消息
  getCacheChats = async (chatId) => {
    const res = await CacheChats.find(
      { chatId },
      {
        _id: 0,
        id: "$_id",
        from: 1,
        to: 1,
        chatId: 1,
        createTime: 1,
        content: 1,
      }
    );
    return res;
  };

  // 获取未读消息
  getUnReadChat = async (chatId) => {
    const res = await this.getCacheChats(chatId);
    return res;
  };

  // 合并消息列表
  mergeChats = async ({ chatId }) => {
    const chats = await this.getCacheChats(chatId);
    if (chats?.length) {
      await Chat.insertMany(chats);
      await CacheChats.deleteMany({ chatId });
    }
  };

  // 添加聊天
  createChat = async ({ from, to, content, chatId, createTime }) => {
    const res = await Chat.create({
      from,
      to,
      content,
      chatId,
      createTime,
    });
    return res;
  };

  // 删除聊天
  deleteChats = async ({ delIds }) => {
    const res = await Chat.deleteMany({ _id: { $in: delIds } });
    return res.deletedCount;
  };

  // 分页获取聊天消息列表
  getChatListWithTotal = async ({ chatId, pageNo, pageSize }) => {
    const list = await Chat.aggregate([
      { $match: { chatId } },
      {
        $facet: {
          total: [{ $count: "count" }],
          data: [
            {
              $project: {
                _id: 0,
                id: "$_id",
                from: 1,
                to: 1,
                chatId: 1,
                createTime: 1,
                content: 1,
              },
            },
            { $sort: { createTime: -1 } },
            { $skip: (pageNo - 1) * pageSize },
            { $limit: pageSize },
          ],
        },
      },
    ]);
    if (list?.length) {
      const { total, data } = list[0];
      const sortData = data.sort((a, b) => a.createTime - b.createTime);
      return {
        total: total[0]?.count || 0,
        list: sortData || [],
      };
    } else {
      return {
        total: 0,
        list: [],
      };
    }
  };
}

module.exports = new chatServer();
