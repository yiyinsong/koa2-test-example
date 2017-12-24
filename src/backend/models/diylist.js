import mongoose from 'mongoose';

import DiyListSchema from '../schemas/playlist';

const DiyListModel = mongoose.model('diylist', DiyListSchema);

export default DiyListModel; 