
import bycrypt from "bcryptjs"

const hassPassword = async(password) => {
    const salt = await bycrypt.genSalt(10);
    return await bycrypt.hash(password, salt)
};

export {hassPassword};