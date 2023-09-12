const database = require("../database/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    async index(req, res, next) {
        try {
            const response = await database("platform")
                .select(
                    "id",
                    "name",
                    "password",
                    "wallet_address",
                );

            return res.json(response);

        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    create(req, res, next) {
        const user = req.body;

        hashPassword(user.password)
        .then((hashedPassword) => {
            delete user.password
            user.hashPassword = hashedPassword
        }).then(() => createUser(user))
        .then(user => {
            if (user.error != undefined) {
                return res.status(404).json({ error: user.error })
            }
            delete user.hashPassword
            return res.status(201).json({ user: user[0], token: createtokenUser(user.id) });
        }).catch((err) => {
            console.log(err);
            res.status(404).json({ err: "Erro ao cadastrar a plataforma, por favor tente novamente mais tarde", error: err });
            next(err)
        })
    },

    login(req, res, next) {
        const userReq = req.body;
        let user;

        findUser(userReq)
            .then(foundUser => {
                user = foundUser
                return checkPassword(userReq.password, foundUser);
            })
            .then(() => {
                delete user.password
                res.status(200).json({ name: user, token: createtokenUser(user.id) })
            })
            .catch((err) => {
                console.log(err);
                res.json({ error: 'Login ou senha incorreto' });
            })
    }

}

async function createUser(user) {
    try {
        let mensagerError = '';

        const consultLogin = await database('platform').select('*').where('name', user.name);

        if (consultLogin.length >= 1) {
            mensagerError = { error: 'Login já cadastrado' };
            return mensagerError;
        }

        const createData = await database('platform').returning(['id', 'name', 'password']).insert({
            name: user.name,
            password: user.hashPassword,
            wallet_address: user.walletAddress,
        });
        return createData
    } catch (error) {
        console.log(error)
        console.log("Erro ao cadastrar a plataforma, por favor tente novamente mais tarde");
    }
}

const hashPassword = (password) => {
    return new Promise((resolve, reject) =>
        bcrypt.hash(password, 10, (err, hash) => {
            err ? reject(err) : resolve(hash);
        })
    )
}

const createtokenUser = (userID) => {
    return jwt.sign({ id: userID }, 'streamingChain!', { expiresIn: '600s' });
}

const findUser = (userReq) => {
    const selectUser = database.raw("SELECT * FROM platform WHERE name = ?", [userReq.name])
        .then((data) => data.rows[0]);

    return selectUser;
}

const checkPassword = (reqPassword, foundUser) => {
    return new Promise((resolve, reject) =>
        bcrypt.compare(reqPassword, foundUser.password, (err, response) => {
            if (err) {
                reject(err);
            } else if (response) {
                resolve(response);
            } else {
                reject(new Error('Password do not match.'));
            }
        })
    )
}