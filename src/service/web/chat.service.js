const { Chat, CacheChats } = require("../../models");

class chatServer {
  // 添加聊天
  addChat = async ({ from, to, content, chatId, createTime }) => {
    const res = await CacheChats.create({
      from,
      to,
      content,
      chatId,
      createTime,
    });
    return res;
  };

  // 合并消息列表
  mergeChats = async ({ chatId }) => {
    const chats = await CacheChats.find(
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
  deleteChat = async (chatId) => {
    const res = await Chat.deleteOne({ chatId });
    return res;
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
