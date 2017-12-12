import mongoose from 'mongoose';

import PlayListSchema from '../schemas/playlist';

const PlayListModel = mongoose.model('playlist', PlayListSchema);

export default PlayListModel; 