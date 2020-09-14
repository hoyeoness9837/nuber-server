import jwt from "jsonwebtoken";
import { User } from "../types/graph";

const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN || "");
    const { id } = decoded;
    const user = await User.findOne({ id });
    return user;
  } catch (error) {
    return undefined;
  }
};

export default decodeJWT;
