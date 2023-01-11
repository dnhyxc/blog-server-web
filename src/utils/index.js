const errorHandler = (err, ctx) => {
  let status = 500;
  switch (err.code) {
    case "10001":
      status = 200;
      break;
    case "10002":
      status = 200;
      break;
    case "10003":
      status = 200;
      break;
    case "10004":
      status = 200;
      break;
    case "10005":
      status = 200;
      break;
    case "10006":
      status = 409;
      break;
    case "10009":
      status = 406;
      break;
    case "10101":
      status = 401;
      break;
    case "10102":
      status = 409;
      break;
    default:
      status = 500;
      break;
  }
  ctx.status = status;
  ctx.body = err;
};

// 获取高级搜索搜索条件
const getAdvancedSearchFilter = ({ filterList, keyword }) => {
  const keywordReg = (keyword && new RegExp(keyword, "i")) || "";

  const filters = [];

  if (filterList.includes("title")) {
    filters.push({ title: { $regex: keywordReg } });
  }

  if (filterList.includes("tag")) {
    filters.push({ tag: { $regex: keywordReg } });
  }

  if (filterList.includes("classify")) {
    filters.push({ classify: { $regex: keywordReg } });
  }

  if (filterList.includes("abstract")) {
    filters.push({ abstract: { $regex: keywordReg } });
  }

  if (filterList.includes("authorName")) {
    filters.push({ authorName: { $regex: keywordReg } });
  }

  if (filterList.includes("content")) {
    filters.push({ content: { $regex: keywordReg } });
  }

  if (filterList.includes("articleId")) {
    filters.push({ articleId: { $regex: keywordReg } });
  }

  const filterKey = filters.length
    ? {
        $or: filters,
        isDelete: { $nin: [true] },
      }
    : {
        isDelete: { $nin: [true] },
        $or: [
          { title: { $regex: keywordReg } },
          { tag: { $regex: keywordReg } },
          { classify: { $regex: keywordReg } },
          { abstract: { $regex: keywordReg } },
          { content: { $regex: keywordReg } },
          { authorName: { $regex: keywordReg } },
          { articleId: { $regex: keywordReg } },
        ],
      };

  return filterKey;
};

// 获取高级搜索排序条件
const getSortType = (filterList) => {
  let sortType = {};

  if (filterList.includes("all")) {
    sortType = {};
  }
  if (filterList.includes("likeCount")) {
    sortType.likeCount = -1;
  }
  if (filterList.includes("replyCount")) {
    sortType.replyCount = -1;
  }

  return sortType;
};

// 解析 ws query 参数
const parseQuery = (url) => {
  const lastIndex = url.lastIndexOf("?");

  if (lastIndex > -1) {
    const search = url.substring(lastIndex + 1, url.length);
    const pairs = search ? search.split("&") : [];
    const query = {};
    for (let i = 0; i < pairs.length; ++i) {
      const [key, value] = pairs[i].split("=");
      query[key] = value;
    }
    return query;
  } else {
    return { id: "" };
  }
};

module.exports = {
  errorHandler,
  getAdvancedSearchFilter,
  getSortType,
  parseQuery,
};
