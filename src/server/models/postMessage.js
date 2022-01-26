import mongoose from 'mongoose';

const postSchema = mongoose.Schema({

    quote: String,
    character: String,
    movie: String,
    actor: String,
    year: String,
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;