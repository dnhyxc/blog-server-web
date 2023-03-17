### 启动本地 mongodb

进入到 mongodb 文件目录：/usr/local/mongodb。

后台启动运行：mongod --fork --dbpath data --logpath log/mongo.log --logappend。

新开一个终端

- 运行命令：mongo。

终止 mongo：

- 运行： use admin

- 运行：db.shutdownServer()

- 再执行一次 ctrl + c 即可

### [(#unwind 操作符](https://mongodb.net.cn/manual/reference/operator/aggregation/unwind/)

该操作符用于从输入文档中解构一个数组字段，以输出每个元素的文档。

```json
{
  $unwind:
    {
      // 数组字段的字段路径。要指定字段路径，请在字段名称前加一个美元符号$并用引号引起来。
      path: "$需要查询数组对象",
      // 可选的。一个新字段的名称，用于保存元素的数组索引。名称不能以$开头。
      includeArrayIndex: <string>,
      /**
        可选的。
        如果为true，则如果path为null，丢失或为空数组，则$unwind输出文档。
        如果为false，如果path为null，缺少或为空数组，$unwind则不会输出文档。
        默认值为false。
      */
      preserveNullAndEmptyArrays: <boolean>
    }
}
```

具体示例：

```js
// 创建一个inventory2示例集合
db.inventory2.insertMany([
  { _id: 1, item: "ABC", price: NumberDecimal("80"), sizes: ["S", "M", "L"] },
  { _id: 2, item: "EFG", price: NumberDecimal("120"), sizes: [] },
  { _id: 3, item: "IJK", price: NumberDecimal("160"), sizes: "M" },
  { _id: 4, item: "LMN", price: NumberDecimal("10") },
  { _id: 5, item: "XYZ", price: NumberDecimal("5.75"), sizes: null },
]);

// 以下$unwind操作是等效的，并为该sizes字段中的每个元素返回一个文档。如果该sizes 字段不能解析为数组但不丢失，为null或为空数组，$unwind则将非数组操作数视为单个元素数组。

// 第一种写法
db.inventory2.aggregate([{ $unwind: "$sizes" }]);

// 第二种写法
db.inventory2.aggregate([{ $unwind: { path: "$sizes" } }]);

// 该操作返回以下文档：
{ "_id" : 1, "item" : "ABC", "price" : NumberDecimal("80"), "sizes" : "S" }
{ "_id" : 1, "item" : "ABC", "price" : NumberDecimal("80"), "sizes" : "M" }
{ "_id" : 1, "item" : "ABC", "price" : NumberDecimal("80"), "sizes" : "L" }
{ "_id" : 3, "item" : "IJK", "price" : NumberDecimal("160"), "sizes" : "M" }
```

### 聚合管道

$lookup：用于多表联合查询。

$project：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。对应 project() 方法。

$match：用于过滤数据，只输出符合条件的文档。$match 使用 MongoDB 的标准查询操作。对应 match()。

$limit：用来限制 MongoDB 聚合管道返回的文档数。对应 limit() 方法。

$skip：在聚合管道中跳过指定数量的文档，并返回余下的文档。对应 skip()。

$unwind：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。对应 unwind() 方法。

$group：将集合中的文档分组，可用于统计结果。对应 group()方法。

$sort：将输入文档排序后输出。对应 sort() 方法。

$geoNear：输出接近某一地理位置的有序文档。对应 near()。

### 查询字段不包含某个属性或该属性不存在的值

```js
// 查询集合c中y的值为null或者不存在
db.c.find({y: null})

// 查询集合c中y的值为null，（仅返回y的值为null的数据，不会返回不存在的）
db.c.find({y: {$type : 10}}) // $type为10表示Null

// 或者
db.c.find({y: {“$in”: [null], “$exists”: true}})


// 查询集合c中y的值不存在（不会返回y的值为null的数据）
db.c.find({y: {$exists: false}})

// 查询集合c中y的值不为null且存在的记录
db.c.find({y: {"$ne": null, $exists: true}})

// 或者
db.c.find({y: {"$ne":null}})
```

### 表达式说明

$sum：计算总和。

$avg：计算平均值。

$min：获取每一组集合中所有文档对应值得最小值。

$max：获取每一组集合中所有文档对应值得最大值。

$push：在结果文档中插入值到一个数组中。

$addToSet：在结果文档中插入值到一个数组中，但不创建副本。

$first：根据资源文档的排序获取第一个文档数据。
