import mongoose from 'mongoose';

import sequenceSchema from '../schemas/sequence';

const sequenceModel = mongoose.model('sequence', sequenceSchema);

export default sequenceModel;