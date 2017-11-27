import bcryptjs from 'bcryptjs';
import config from './config';

const encrypt = async (password) => {
    const salt = await  bcryptjs.genSalt(config.passwordSaltRounds);
    const hash = await bcryptjs.hash(password, salt);
    return hash;
}

const validate = async (password, hash) => {
    return await bcryptjs.compare(password, hash);
}

export default {
    encrypt,
    validate
}