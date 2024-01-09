const { Books } = require("../../models");

class BooksServer {
  // 添加书
  async addBook({ userId, url, fileName, size, type }) {
    const res = await Books.create({
      userId,
      url,
      createTime: new Date().valueOf(),
      fileName,
      size,
      type,
    });

    return {
      userId: res.userId,
      createTime: res.createTime,
      url: res.url,
      id: res._id,
      fileName: res.fileName,
      size: res.size,
      type: res.type,
    };
  }

  async findBook({ url }) {
    const res = await Books.findOne(
      {
        url,
      },
      {
        id: "$_id",
        _id: 0,
        createTime: 1,
        url: 1,
        userId: 1,
        type: 1,
        fileName: 1,
        size: 1,
      }
    );

    return res;
  }

  // 更新书信息
  async updateBookInfo({
    id,
    fileName,
    coverImg,
    author,
    translator,
    language,
  }) {
    const res = await Books.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          fileName,
          coverImg,
          author,
          translator,
          language,
        },
      }
    );
    return res.modifiedCount;
  }

  // 获取书集列表
  async getBooksWithTotal({ pageNo, pageSize, userId, bookType = "epub" }) {
    const type = bookType !== "pdf" ? /epub|epub\.zip/ : /pdf/;
    const list = await Books.aggregate([
      { $match: { type } },
      {
        $facet: {
          total: [{ $count: "count" }],
          data: [
            {
              $project: {
                id: "$_id",
                _id: 0,
                userId: 1,
                url: 1,
                createTime: 1,
                isDelete: 1,
                fileName: 1,
                coverImg: 1,
                author: 1,
                translator: 1,
                language: 1,
                size: 1,
                type: 1,
              },
            },
            {
              $sort: { createTime: -1 },
            },
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
  }

  // 查找书籍url
  async findBookUrl({ id }) {
    const res = await Books.findOne({ _id: id }, { url: 1, coverImg: 1 });
    return res;
  }

  // 删除书籍
  async deleteBook({ id }) {
    const res = await Books.deleteOne({ _id: id });
    return res.deletedCount;
  }
}

module.exports = new BooksServer();
