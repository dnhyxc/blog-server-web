const { Chat, CacheChats } = require("../../models");

class chatServer {
  // 添加聊天
  addChat = async ({ from, to, content, chatId, createTime }) => {
    console.log(chatId, 'chatId');
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
    const chats = CacheChats.find({ chatId }, {
      _id: 0,
      id: "$_id",
      from: 1,
      to: 1,
      chatId: 1,
      createTime: 1,
      content: 1,
    })
    const result = await Chat.insertMany(chats);
    console.log(result, 'result')
    return result;
  }

  getChatlist = async ({ chatId, pageNo, pageSize }) => {
    const result = await Chat.aggregate([
      // 根据查询条件筛选数据
      { $match: { chatId } },
      // 使用 $facet 查询 Chats 和 CacheChats 的总数量
      {
        $facet: {
          chats: [
            // 联合查询 CacheChats 表中的数据
            {
              $lookup: {
                from: "CacheChats",
                localField: "_id",
                foreignField: "chatId",
                as: "cacheChats"
              }
            },
            // 对结果进行分页处理
            { $skip: (pageNo - 1) * pageSize },
            { $limit: pageSize },
            // 对结果进行排序
            { $sort: { createTime: -1 } },
            // 对结果进行格式化处理
            {
              $project: {
                _id: 1,
                chatId: 1,
                createTime: 1,
                content: 1,
                from: 1,
                to: 1,
                read: 1,
                cacheChats: {
                  $arrayElemAt: ["$cacheChats", 0]
                }
              }
            }
          ],
          totalCounts: [
            // 查询 Chats 的总数量
            { $count: "chats" },
            // 查询 CacheChats 的总数量
            {
              $lookup: {
                from: "CacheChats",
                let: {},
                pipeline: [
                  { $count: "cacheChats" }
                ],
                as: "cacheChats"
              }
            }
          ]
        }
      },
      // 重新格式化结果
      {
        $project: {
          chats: 1,
          totalCounts: {
            $mergeObjects: {
              $arrayElemAt: ["$totalCounts", 0]
            }
          }
        }
      }
    ]);

    const chats = result[0].chats;
    const totalCounts = result[0].totalCounts;

    console.log(chats, 'chats', totalCounts.chats);
    return {
      total: totalCounts.chats,
      list: chats,
    };
  }

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
