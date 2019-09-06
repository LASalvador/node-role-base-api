const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');

const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
]

module.exports = {
    authenticate,
    getAll,
    getById
};

async function authenticate({username, password}) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({sub: user.id, role: user.role}, config.secret);
        const { password, ...userWithoutPassWord} = user;
        return {
            ...userWithoutPassWord,
            token 
        }
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassWord } = u;
        return userWithoutPassWord
    })
}

async function getById(id) {
    const user = users.find(u => u.id === parseInt(id));
    if(!user) return;
    const { password, ...userWithoutPassWord } = user;
    return userWithoutPassWord
}