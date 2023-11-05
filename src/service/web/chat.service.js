const { Chat, CacheChats, NewChats } = require("../../models");

class chatServer {
  // 添加聊天
  addChat = async ({ from, to, content, chatId, createTime }) => {
    const chat = [
      {
        userId: from,
        chat: {
          from,
          to,
          content,
          chatId,
          createTime,
        }
      },
      {
        userId: to,
        chat: {
          from,
          to,
          content,
          chatId,
          createTime,
        }
      },
    ]

    const res = await CacheChats.create(chat);
    this.addNewChat(chat);
    return res;
  };

  // 添加最新聊天
  addNewChat = async (chat) => {
    // const findOne = await NewChats.findOne({ chatId });
    // if (findOne) {
    //   await NewChats.updateOne(
    //     { chatId },
    //     {
    //       $set: {
    //         from,
    //         to,
    //         content,
    //         chatId,
    //         createTime,
    //         userId,
    //       },
    //     }
    //   );
    // } else {
    // }
    await NewChats.create(chat);
    return chat;
  };

  // 更新最新消息
  updateNewChat = async ({ from, to, content, chatId, createTime }) => {
    const res = await NewChats.updateOne(
      { 'chat.chatId': chatId },
      {
        $set: {
          chat: {
            from,
            to,
            content,
            chatId,
            createTime
          }
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
      { 'chat.chatId': { $in: chatIds } },
      {
        _id: 0,
        id: "$_id",
        userId: 1,
        chat: 1,
      }
    );
    return res;
  };

  // 获取新增的缓存消息
  getCacheChats = async ({ chatId, userId }) => {
    const res = await CacheChats.find(
      { 'chat.chatId': chatId },
      {
        _id: 0,
        id: "$_id",
        userId: 1,
        chat: 1,
      }
    );
    return res;
  };

  // 获取未读消息
  getUnReadChat = async ({ chatId, userId }) => {
    const res = await this.getCacheChats({ chatId, userId });
    return res;
  };

  // 合并消息列表
  mergeChats = async ({ chatId, userId }) => {
    const chats = await this.getCacheChats({ chatId, userId });
    if (chats?.length) {
      await Chat.insertMany(chats);
      await CacheChats.deleteMany({ 'chat.chatId': chatId });
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
      { $match: { 'chat.chatId': chatId } },
      {
        $facet: {
          total: [{ $count: "count" }],
          data: [
            {
              $project: {
                _id: 0,
                id: "$_id",
                userId: 1,
                chat: 1,
              },
            },
            { $sort: { 'chat.createTime': -1 } },
            { $skip: (pageNo - 1) * pageSize },
            { $limit: pageSize },
          ],
        },
      },
    ]);
    if (list?.length) {
      const { total, data } = list[0];
      const sortData = data.sort((a, b) => a.chat.createTime - b.chat.createTime);
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
