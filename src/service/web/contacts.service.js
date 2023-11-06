const { Contacts, User } = require("../../models");
const { getNewChat, getUnReadChat } = require("./chat.service");
const { adminGetUserList } = require("../admin/user.service");
const { contactsRes } = require("../../constant");

class contactsServer {
  // 添加聊天联系人
  addContacts = async ({ userId, contactId, createTime }) => {
    // 联系人禁止自己添加自己
    if (contactId === userId) return;
    const findOne = await this.findContact({ contactId, userId });
    if (findOne) {
      return false;
    } else {
      const res = await Contacts.create({
        userId,
        contactId,
        createTime,
        noReadCount: 0,
        isUnDisturb: false,
        isTop: false,
      });
      return res;
    }
  };

  // 查找是否已添加联系人
  findContact = async ({ contactId, userId }) => {
    const res = Contacts.findOne({ userId, contactId }, { contactId });
    return res;
  };

  // 删除联系人
  deleteContacts = async ({ contactIds }) => {
    const res = await Contacts.deleteMany({
      contactId: { $in: contactIds },
    });
    return res;
  };

  // 更新联系人
  onUpdateContact = async ({
    contactId,
    createTime,
    isUnDisturb,
    isTop,
    userId,
  }) => {
    const res = await Contacts.updateOne(
      { userId, contactId },
      {
        $set: {
          createTime,
          isUnDisturb,
          isTop,
        },
      }
    );
    return res;
  };

  // 获取用户列表
  getUserList = async ({ contactIds }) => {
    const userList = await User.find(
      {
        userId: { $in: contactIds },
      },
      {
        userId: "$_id",
        _id: 1,
        username: 1,
        headUrl: 1,
        job: 1,
      }
    );
    return userList;
  };

  // 分页获取联系人
  getContactList = async ({ pageNo, pageSize, userId }) => {
    const list = await Contacts.aggregate([
      { $match: { userId } },
      {
        $facet: {
          total: [{ $count: "count" }],
          data: [
            {
              $project: {
                _id: 0,
                id: "$_id",
                ...contactsRes,
              },
            },
            { $sort: { isTop: -1, createTime: -1 } },
            { $skip: (pageNo - 1) * pageSize },
            { $limit: pageSize },
          ],
        },
      },
    ]);
    if (list?.length) {
      const { total, data } = list[0];
      const contactIds = data.map((i) => i.contactId);
      const userList = await this.getUserList({ contactIds });
      const chatIds = [];
      data.forEach((i) => {
        userList.forEach((j) => {
          if (i.contactId === j._id.toString()) {
            const chatId = [userId, j._id.toString()].sort().join("_");
            chatIds.push(chatId);
            i.headUrl = j.headUrl;
            i.job = j.job;
            i.chatId = chatId;
            i.username = j.username;
          }
        });
      });
      // 获取新消息
      const chats = await (chatIds?.length && getNewChat(chatIds));
      // 获取未读消息
      const unReadChats = await (chatIds?.length &&
        getUnReadChat({ chatId: chatIds, userId }));
      data.forEach((i) => {
        unReadChats.forEach((u) => {
          // u.from 判断未读消息是否是别人发给我的，并且判断联系人Id（contactId） 是否是否是发送消息的人
          if (i.contactId === u.chat.from && !i.isUnDisturb) {
            i.noReadCount += 1;
          }
        });
        chats.forEach((j) => {
          if (j.chat.chatId === i.chatId) {
            i.message = j.chat.content;
            i.sendTime = j.chat.createTime;
          }
        });
      });
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

  // 联系人查询
  searchContacts = async ({ userId, keyword, pageNo, pageSize }) => {
    const { list: userList } = await adminGetUserList({
      keyword,
      pageNo: 1,
      pageSize: 999999,
      userId,
    });

    const userIds =
      userList
        .filter((j) => j.id.toString() !== userId)
        .map((i) => i.id.toString()) || [];

    const list = await Contacts.aggregate([
      { $match: { contactId: { $in: userIds }, userId } },
      {
        $facet: {
          total: [{ $count: "count" }],
          data: [
            {
              $project: {
                _id: 0,
                id: "$_id",
                ...contactsRes,
              },
            },
            { $sort: { isTop: -1, createTime: -1 } },
            { $skip: (pageNo - 1) * pageSize },
            { $limit: pageSize },
          ],
        },
      },
    ]);

    if (list?.length) {
      const { data, total } = list[0];
      const newList = data.map((i) => {
        userList.forEach((j) => {
          if (j?.id?.toString() === i.contactId) {
            i.username = j.username;
            i.headUrl = j.headUrl;
          }
        });
        return i;
      });
      return {
        total: total?.[0]?.count || 0,
        list: newList || [],
      };
    } else {
      return {
        total: 0,
        list: [],
      };
    }
  };
}

module.exports = new contactsServer();
