const { Chat } = require("../../models");

class chatServer {
  // 添加聊天
  addChat = async ({ from, to, content }) => {
    const chatId = [from, to].sort().join("_");
    const res = await Chat.create({
      from,
      to,
      content,
      chatId,
      createTime: new Date().valueOf(),
    });

    console.log(res, "res");
  };
  // 删除聊天
  deleteChat = async (id) => {
    const res = await Chat.deleteOne({ _id: id });
    return res;
  };

  // 分页获取聊天消息列表
  getChatListWithTotal = async ({ from, to, pageNo, pageSize }) => {
    const chatId = [from, to].sort().join("_");
    console.log(chatId, "chatId");

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
      return {
        total: total[0]?.count || 0,
        list: data || [],
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
