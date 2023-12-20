import { getResults } from '../utility/getResults';
const bcrypt = require('bcrypt');

export const createUser = async (req, res) => {
    try {
        const { user_name, password, email } = req.body;

        const sql = /* sql */`
            insert into users (user_name, password, email)
            values (?, ?, ?);
        `;

        const hashPass = await bcrypt.hash(password, 10);
        const results = await getResults(sql, [user_name, hashPass, email]);

        if (results.length > 0) {
            return res.status(200).send({
                success: true,
                message: 'successfully registered user',
                data: results
            })
        } else {
            return res.status(400).send({
                success: false,
                message: 'failed to create user'
            })
        }
    } catch (err) {
        console.error(err);

        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            return res.status (403).send({
                message: 'user id is required'
            })
        }

        const sql = /* sql */`
            select
                u.user_id,
                u.user_name,
                u.password,
                u.email,
                u.created_at
            from users as u
            where u.user_id = ?
            limit 1
        `;

        const result = await getResults(sql, [user_id]);

        if (result.length === 0) {
            return res.status(404).send({
                message: 'User not found'
            });
        } else {
        }
        return res.status(201).send({
            message: 'successfully retrieved user by id',
            data: result[0]
        })

    } catch (error) {
        console.error(error);

        return res.status(500).send({
             message: 'Internal server error'
        });
    }
};

export const getSingleUser = async (req, res) => {
    try {
        const {user_id} = req.params.user_id;

        if (!user_id) {
            return res.status(503).send({
                success: false,
                message: 'user id is required'
            });
        }

        const sql = /* sql */`
            select u.user_id 
            from users as u
            where u.user_id =?;
        `;

        const result = await getResults(sql, [user_id]);

        if (!result) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        } else {
            return res.status(200).send({
                success: true,
                message: 'User successfully retrieved',
                results: result
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const sql = /* sql */`
            select * from users
        `;

        const users = await getResults(sql);

        if (users.length === 0) {
            return res.status(403).send({
                success: false,
                message: 'error executing query'
            });
        } else {
            return res.status(200).send({
                success: true,
                message: 'successfully retrieved all users',
                data: users
            });
        }
    } catch (error) {
        console.error(error);

        return res.status(503).send({
            message: "Internal Server Error"
        })
    }
};

export const updateUser = async (req, res) => {
    try {

        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).send({
                message: 'user id is required'
            })
        }

        const {user_name, password, email, created_at } = req.body;

        const sql = /* sql */`
            update users set user_name, password, email, created_at
            where user_id=?
        `;

        const updatedUser = await getResults(sql, [
            user_name, password, email, created_at
        ])
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params.user_id;

        if (!user_id) {
            return res.status( 403).send({
                message: 'user id is required'
            });
        }

        const sql = /* sql */`
             delete from users where user_id = ? 
        `;

        const results = await getResults(sql);
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }
};
