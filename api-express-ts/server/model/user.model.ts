import establishConnection from "../config/connection";

const UserModel = {
    async getUsers() {
        let connection = await establishConnection();
        let [result, metaData] = await connection.query("SELECT *, BIN_TO_UUID(id) id FROM user;");
        return result;
    },
    async getUser(id: string) {
        let connection = await establishConnection();
        let [result, metaData] = await connection.query(`SELECT *, BIN_TO_UUID(id) id FROM user WHERE id = UUID_TO_BIN("${id}")`);
        return result;
    },
    async getUserByEmail(email: string) {
        let connection = await establishConnection();
        let [result, metaData] = await connection.query(`SELECT *, BIN_TO_UUID(id) id FROM user WHERE email = ("${email}")`);
        return result;
    },
    async createUser(user: any) {
        let connection = await establishConnection();
        let { name, email, role, password } = user;
        let [result, metaData] = await connection.query("INSERT INTO user (name, email, role, password) VALUES (?, ?, ?, ?)", [name, email, role, password]);
        return result;
    },
    async updateUser(id: string, user: any) {
        let connection = await establishConnection();
        let { name, email, role, password } = user;
        const [result, metaData] = await connection.query(
            "UPDATE user SET name = ?, email = ?, role = ?, password = ? WHERE id = UUID_TO_BIN(?)",
            [name, email, role, password, id]
        );
        return result;
    },
    async deleteUser(id: string) {
        let connection = await establishConnection();
        const [result, metaData] = await connection.query("DELETE FROM user WHERE id = UUID_TO_BIN(?)", [id]);
        return result;
    },

}

export default UserModel;