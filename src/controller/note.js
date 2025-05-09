import NoteModel from "../model/note.js";


export const getNotes = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const data = await NoteModel.find()
            .where('isArchived').equals(false)
            .sort({ isPinned: -1 }).sort({ _id: -1 })
            .skip(skip).limit(limit).exec();

        return res.status(200).json({
            status: 200,
            message: 'Note retrieved successfully',
            data: data,
            meta: {
                page: page,
                limit: limit,
                total: data.length
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

export const searchNotes = async (req, res) => {
    try {
        const { keyword } = req.query;
        const data = await NoteModel.find({
            title: { $regex: keyword, $options: 'i' }

        });
        return res.status(200).json({
            status: 200,
            message: 'Note retrieved successfully',
            data: data
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

export const getArchivedNotes = async (req, res) => {
    try {
        const data = await NoteModel.find({ "isArchived": true })
            .sort({ isPinned: -1 }).sort({ _id: -1 });

        return res.status(200).json({
            status: 200,
            message: 'Note retrieved successfully',
            data: data
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                status: 400,
                message: 'Title or content must not be empty'
            });
        }
        const note = new NoteModel({
            title: title,
            content: content
        });
        await note.save();

        return res.status(201).json({
            status: 201,
            message: 'Note created successfully',
            data: note
        });

    } catch (error) {
        console.log(error);

        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { title, content, isPinned, isArchived } = req.body;

        const data = await NoteModel.findByIdAndUpdate(req.params.id,
            {
                title, content, isPinned, isArchived
            }, { new: true });
        return res.status(200).json({
            status: 200,
            message: 'Note updated successfully',
            data: data
        });

    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

export const deleteNote = async (req, res) => {
    try {

        const existingNote = await NoteModel.findById(req.params.id);
        if (!existingNote) {
            return res.status(400).json({
                status: 400,
                message: 'Note not found'
            });
        }
        await NoteModel.deleteOne({ _id: req.params.id });
        return res.status(200).json({
            status: 200,
            message: 'Note deleted successfully'
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};
