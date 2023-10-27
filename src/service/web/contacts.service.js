const { Contacts, User } = require("../../models");

class contactsServer {
  // 添加聊天联系人
  addContacts = async ({ userId, contactId, createTime }) => {
    const findOne = await this.findContact(contactId);
    if (findOne) {
      return false;
    } else {
      const res = await Contacts.create({
        userId,
        contactId,
        createTime,
      });
      return res;
    }
  };

  // 查找是否已添加联系人
  findContact = async (contactId) => {
    const res = Contacts.findOne({ contactId }, { contactId });
    return res;
  };

  // 删除联系人
  deleteContacts = async ({ userId }) => {
    const res = await Contacts.deleteOne({
      userId,
    });
    return res;
  };

  // 置顶联系人
  toTopContacts = async ({ userId, createTime }) => {
    const res = await Contacts.updateOne({
      userId,
      createTime,
    });
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
                userId: 1,
                contactId: 1,
                createTime: 1,
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
      const contactIds = data.map((i) => i.contactId);
      const res = await this.getUserList({ contactIds });
      const cloneData = JSON.parse(JSON.stringify(data));
      cloneData.forEach((i) => {
        res.forEach((j) => {
          if (i.contactId === j._id.toString()) {
            i.headUrl = j.headUrl;
            i.job = j.job;
            i.username = j.username;
          }
        });
      });
      return {
        total: total[0]?.count || 0,
        list: cloneData || [],
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
