import User from "../../../entities/User";
import {
  EmailSignInMutationArgs,
  EmailSignInResponse,
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return {
            ok: false,
            error: "no user with the email",
            token: null,
          };
        }
        const checkPassword = await user.comparePassword(password);
        if (checkPassword) {
          return {
            ok: true,
            error: null,
            token: "coming soon",
          };
        } else {
          return {
            ok: false,
            error: "wrong password",
            token: null,
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }
    },
  },
};

export default resolvers;
