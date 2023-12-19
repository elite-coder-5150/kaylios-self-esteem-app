 import { getResults } from '../utility/getResults';

 export const createNote = async  (req, res) => {
    try {
        const { nmte_id } = req.params;

        if (!note_id) {
            return res.status(402).send({
                message: 'note id is required'
            });
        }

        const { 
            user_id,  title, content, created_at, 
            updated_at, has_attachment 
        } = req.body;

        const sql = /* sql */`
            insert into notes (user_id, title, content, created_at, updated_at, has_attachment)
            values(?, ?, ?, ?, ?, ?)
        `;

        const results = await getResults(sql, [
            user_id, title, content, created_at, 
            updated_at, has_attachment
        ]);

        if (results.length > 0) {
            return res.status(201).send({
                success: true,
                message: 'successfully created note',
                result: results
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'error executing query'
            })
        }
    } catch (error) {
        console.log(error);

        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
 };
 
 export const getAllNotes = async (req, res) => {
    try {
        const sql = /* sql */`
            select * from notes
        `;

        const notes = await getResults(sql);

        if (notes.length === 0) {
            return res.status(404).send({
                message: 'No notes found'
            })
        } else {
            return res.status(200).send({
                message: 'successfully retrieved all the notes from the database',
                result: notes
            });
        }
    } catch (error) {
        console.error(error);
    }
 };
 
 export const getSingleNote = async (req, res) => {
    try {
        const { note_id } = req.params;

        const { 
            user_id, title, content, 
            create_at, updated_at, has_attachment } = req.body;
        if (!note_id) {
            return res.status(403).send({
                message: 'Note id is required'
            });
        }

        const sql = /* sql */`
            select 
                n.node_id, 
                n.user_id, 
                n.title, 
                n.content, 
                n.created_at, 
                n.updated_at, 
                n.has_attachment 
                from notes as n
                where n.user_id =? 
        `;

        const result = await getResults(sql, [
            user_id, title, content, 
            create_at, updated_at, has_attachment
        ]);

        if (result.length === 0) {
            return res.status(404).send({
                message: 'note not found',
            });
        } else {
            return res.status(200).send({
                message: 'successfully retreived note',
                data: result
            });
        }
    } catch (error) {
        console.error(error);

        return res.status(500).send({
             message: 'Internal server error'
        });
    }
 };
 
 export const updateNote = async (req, res) => {
    try {
        const { note_id } = req.params.note_id;
        const { 
            user_id,
            title,
            content,
            created_at,
            updated_at,
            has_attachment
        } = req.body;

        if (!note_id) {
            return res.status(400).send({
                message: 'Note id is required'
            });
        }

        const sql = /* sql */`
            update notes set user_id = ?, title = ?, content = ?, 
                         created_at = ?, updated_at = ?. has_attachment = ?
            where user_id = ?
        `;

        const result = await getResults(sql, [
            user_id,
            title,
            content,
            created_at,
            updated_at,
            has_attachment
        ]);

        if (result.affectedRows > 0) {
            return res.status(200).send({
                message: 'note updated successfully',
                data: result
            })
        } else {
            return res.status(404).send({
                message: 'note not found or no changes were made'
            });
        }
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            message: 'Internal server error'
       });
    }
 };
 
 export const deleteNote = async (req, res) => {
    try {
        const { note_id } = req.params.note_id;

        if (!note_id) {
            return res.status( 403).send({
                message: 'note id is required'
            });
        }

        const sql = /* sql */`
            delete from notes where note_id = ?
        `;

        const results = getResults(sql);
    } catch (error) {
        console.error(error);

        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }
 };