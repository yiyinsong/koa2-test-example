import mongoose from 'mongoose';

import SongSchema from '../schemas/song';

const SongModel = mongoose.model('song', SongSchema);

export default SongModel;