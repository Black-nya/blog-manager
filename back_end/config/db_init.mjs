import { MongoClient, ServerApiVersion } from "mongodb";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const credentials = path.join(__dirname, '/../../X509-cert-7895691143232349000.pem');
const client = new MongoClient('mongodb+srv://black-nyan.bh7utmz.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
    sslKey: credentials,
    sslCert: credentials,
    serverApi: ServerApiVersion.v1
});
const db = client.db();
await db.createCollection('users', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            title: "User Object Validation",
            required: ["name", "id", "password", "posts"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "'name' must be a string and is required"
                },
                id: {
                    bsonType: "string",
                    description: "'id' must be a string"
                },
                password: {
                    bsonType: "string",
                    description: "'password' must be a string"
                },
                posts: {
                    bsonType: "array",
                }
            }
        }
    }
});
await db.createCollection('menus', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            title: "Menu Object Validation",
            required: ["id", "title", "key"],
            properties: {
                id: {
                    bsonType: "int",
                    description: "'id' must be a int"
                },
                title: {
                    bsonType: "string",
                    description: "'title' must be a string"
                },
                key: {
                    bsonType: "string",
                    description: "'key' must be a string"
                },
                pagepermission: {
                    bsonType: ["int"],
                    description: "'pagepermission' must be a int"
                },
                children: {
                    bsonType: ["array"],
                },
                grade: {
                    bsonType: ["number"],
                }
            }
        }
    }
});
function removeEmpty(obj) {
    return Object.fromEntries(Object.entries(obj)
        .filter(([_, v]) => v != null)
        .map(([k, v]) => [k, Array.isArray(v) ? v.map(item => removeEmpty(item)) : v]));
}
function generate(id, title, key, pagepermission, grade, children) {
    return removeEmpty({
        id, title, key, pagepermission, children, grade
    });
}
const data_menus = [generate(1, "Home", "/home", 1, 1),
    generate(2, "User Manage", "/user-manage", 1, 1, [generate(3, "Add User", "/user-manage/add", undefined, 2),
        generate(4, "Remove User", "/user-manage/remove", undefined, 2),
        generate(5, "Edit User", "/user-manage/edit", undefined, 2),
        generate(6, "Userlist", "/user-manage/list", 1, 2)]),
    generate(7, "Authorization Manage", "/auth-manage", 1, 1, [
        generate(8, "Role List", "/auth-manage/role/list", 1, 2),
        generate(9, "Right List", "/auth-manage/right/list", 1, 2),
        generate(10, "Edit Role", "/auth-manage/role/edit", undefined, 2),
        generate(11, "Delete Role", "/auth-manage/role/remove", undefined, 2),
        generate(12, "Modify Right", "/auth-manage/right/edit", undefined, 2),
        generate(13, "Remove Right", "/auth-manage/right/remove", undefined, 2)
    ]),
    generate(14, "Blog Manage", "/blog-manage", 1, 1, [
        generate(15, "Blog List", "/blog-manage/list", undefined, 2),
        generate(16, "New Blog", "/blog-manage/add", 1, 2),
        generate(17, "Update Blog", "/blog-manage/update/:id", undefined, 2),
        generate(18, "Preview Blog", "/blog-manage/preview/:id", undefined, 2),
        generate(19, "Draft", "/blog-manage/draft", 1, 2),
        generate(20, "Tags", "/blog-manage/tags", 1, 2),
    ]),
    generate(21, "Review", "/review-manage", 1, 1, [
        generate(22, "Blog review", "/review-manage/review", 1, 2),
        generate(23, "Review List", "/review-manage/list", 1, 2),
    ]),
    generate(24, "Publish", "/publish-manage", 1, 1, [
        generate(25, "Approved", "/publish-manage/approved", 1, 2),
        generate(26, "Published", "/publish-manage/published", 1, 2),
        generate(27, "Archived", "/publish-manage/archived", 1, 2),
    ])];
const menus = db.collection('menus');
await menus.insertMany(data_menus);
client.close();
export default db;
