import { Comments, Like } from "../models";

class commentServer {
  // 创建评论
  async createComments({ params }) {
    try {
      const comment: any = await Comments.create({
        ...params,
      });
      return comment;
    } catch (error) {
      console.error("createComments", error);
      throw new Error(error as any);
    }
  }

  // 根据userId更新里层点赞状态
  static async updateReplyList(id, replyList) {
    await Comments.updateOne(
      { _id: id },
      {
        $set: {
          replyList: replyList,
        },
      }
    );
  }

  // 查询用户是否点赞
  static async checkLikeStatus(userId, articleId) {
    const likes = await Like.find({ userId });

    const likeFilter = likes.map((i) => i.likeCommentId);

    const filterIn: any = await Comments.find({
      "replyList._id": { $in: likeFilter },
    });

    const filterNin: any = await Comments.find({
      "replyList._id": { $nin: likeFilter },
    });

    // 根据userId查询到的commentId更新里层点赞状态，filterIn（在likeFilter中的comment）
    filterIn.forEach((i) => {
      if (i.replyList.length > 0) {
        const res = i.replyList.map((j) => {
          if (likeFilter.includes(j.id)) {
            j.isLike = true;
          } else {
            j.isLike = false;
          }
          return j;
        });
        commentServer.updateReplyList(i.id, res);
      }
    });

    // 根据userId查询到的commentId更新里层点赞状态，filterNin（不在likeFilter中的comment）
    filterNin.forEach((i) => {
      if (i.replyList.length > 0) {
        const res = i.replyList.map((j) => {
          if (likeFilter.includes(j.id)) {
            j.isLike = true;
          } else {
            j.isLike = false;
          }
          return j;
        });
        commentServer.updateReplyList(i.id, res);
      }
    });

    await Comments.updateMany(
      { _id: { $nin: likeFilter } },
      {
        $set: {
          isLike: false,
        },
      }
    );

    await Comments.updateMany(
      { _id: { $in: likeFilter } },
      {
        $set: {
          isLike: true,
        },
      }
    );
  }

  // 根据文章id查找评论
  async findCommentById(articleId, userId) {
    await commentServer.checkLikeStatus(userId, articleId);
    const comment: any = await Comments.find({ articleId });
    return comment;
  }

  // 回复评论
  async updateComments(commentId, params) {
    try {
      const { fromCommentId } = params;

      const filter = fromCommentId
        ? {
            articleId: params.articleId,
            "replyList._id": fromCommentId,
          }
        : { _id: commentId, articleId: params.articleId };

      const comment: any = await Comments.updateOne(
        {
          $and: [filter],
        },
        // 向查找到的document中的replyList数组中插入一条评论
        // 注意：如果要使用排序，$sort必须与$each一起使用才会生效
        {
          $push: {
            replyList: {
              // ...params, // 不适用$each包一下sort不会生效
              $each: [{ ...params }], // $each 向replyList插入多条
              // $sort: { date: 1 }, // 正序排列
            },
          },
        },
        {
          $set: {
            "replyList.$.fromUserId": params.fromUserId,
            "replyList.$.fromUsername": params.fromUsername,
            "replyList.$.formContent": params.formContent,
          },
        }
      );

      return comment;
    } catch (error) {
      console.error("createComments", error);
      throw new Error(error as any);
    }
  }
  // 点赞
  async giveLike(commentId, fromCommentId, status) {
    const filter = fromCommentId
      ? {
          "replyList._id": fromCommentId, // 选择数组replyList中某个对象中的_id属性
        }
      : { _id: commentId };

    const comment: any = await Comments.updateOne(
      {
        $and: [filter],
      },
      // $inc：自增自减运算符，传入正值为自增，负值为自减
      {
        $inc: fromCommentId
          ? {
              "replyList.$.likeCount": status ? -1 : 1, // replyList.$.likeCount：表示选择数组replyList中某个对象的likeCount属性
            }
          : { likeCount: status ? -1 : 1 },
        $set: fromCommentId
          ? {
              "replyList.$.isLike": status ? false : true,
            }
          : {
              isLike: status ? false : true,
            },
      }
    );

    return comment;
  }
  // 删除评论
  async deleteComment(commentId, fromCommentId) {
    const filter = fromCommentId
      ? {
          "replyList._id": fromCommentId, // 选择数组replyList中某个对象中的_id属性
        }
      : { _id: commentId };

    const comment: any = await Comments.updateOne(
      {
        $and: [filter],
      },
      // $inc：自增自减运算符，传入正值为自增，负值为自减
      {
        $set: fromCommentId
          ? {
              "replyList.$.isDelete": true,
            }
          : {
              isDelete: true,
            },
      }
    );

    return comment;
  }
}

export default new commentServer();
