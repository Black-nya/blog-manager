const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb")
const credentials = __dirname + '/../../X509-cert-7895691143232349000.pem'
const client = new MongoClient('mongodb+srv://black-nyan.bh7utmz.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
  sslKey: credentials,
  sslCert: credentials,
  serverApi: ServerApiVersion.v1
});
const db = client.db()
const dbmodel = {
  getMenus: async () => {
    const menuCursor = db.collection("menus").find()
    return await menuCursor.toArray()
  },
  deleteMenu: async (key) => {
    const keys = key.split('/');
    if(keys.length > 2){
      return await db.collection("menus").updateOne(
        {key: '/'+keys[1]},
        {$pull: { 'children': {key}}}
      )
    }else{
      return await db.collection("menus").deleteOne(
        {key}
      )
    }
  },
  updateMenu: async (key, data) => {
    const keys = key.split('/');
    if(keys.length > 2){
      return await db.collection("menus").updateOne(
        {key: '/'+keys[1]},
        {$set: {
          "children.$[submenu].pagepermission": data
        }},
        { arrayFilters: [  { "submenu.key": { $eq: key} } ] }
      )
    }else{
      return await db.collection("menus").updateOne(
        {key},{
          $set:{
            "pagepermission" : data
          }
        }
      )
    }
  },
  getRoles: async ()=>{
    const roleCursor = db.collection("roles").find()
    return await roleCursor.toArray()
  },
  deleteRole: async (id)=>{
    return await db.collection("roles").deleteOne(
      {_id:ObjectId(id)}
    )
  },
  updateRole: async (id, data) => {
    return await db.collection("roles").updateOne(
      {_id:ObjectId(id)},
      {$set:data}
    )
   },

  getUsers: async ()=>{
    const roleCursor = db.collection("users").aggregate(
      [
        {
          $lookup:
          {
            from: "roles",
            localField: "roleId",
            foreignField: "_id",
            as:"role"
          }
        },
        {$unwind: '$role'}
      ]
    )
    return await roleCursor.toArray()
  },
  deleteUser: async (id)=>{
    return await db.collection("users").deleteOne(
      {_id:ObjectId(id)}
    )
  },
  updateUser: async (id, data) => {
    if(data.roleId){
      data.roleId=ObjectId(data.roleId);
    }
    return await db.collection("users").updateOne(
      {_id:ObjectId(id)},
      {$set:data}
    )
   },
   addUser: async (data)=>{
    return await db.collection("users").insertOne(
      {
        ...data,
        roleId: ObjectId(data.roleId)
      }
    )
   },
   checkUser: async(data) => await db.collection("users").aggregate(
    [
      {
        $match: {...data, roleState:true}
      },
      {
        $lookup:
        {
          from: "roles",
          localField: "roleId",
          foreignField: "_id",
          as:"role"
        }
      },
      {
        $unwind: '$role'
      }
    ]
  ).toArray(),
  getRegions: async()=> await db.collection("regions").find().toArray()
}
module.exports = dbmodel