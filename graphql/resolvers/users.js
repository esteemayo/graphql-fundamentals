import User from "../../models/User";

export const userResolvers = {
  Query: {
    getUsers: async () => {
      return await User.find().populate("items");
    },
    getUser: async (_, { id }) => {
      const user = await User.findById(id).populate("items");

      if (user) {
        return user;
      }
      throw new Error("No user found with that ID.");
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const user = await User.create({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        age: input.age,
        gender: input.gender,
        items: input.items,
        createdAt: new Date().toISOString(),
      });

      return await User.findById(user._id).populate("items");
    },
    updateUser: async (_, { id, input }) => {
      const user = await User.findByIdAndUpdate(id, input, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        throw new Error("No user found with that ID.");
      }

      return await User.findById(user._id).populate("items");
    },
    deleteUser: async (_, { id }) => {
      const user = await User.findByIdAndDelete(id);

      if (user) {
        return "User successfully deleted!";
      } else {
        throw new Error("No user found with that ID.");
      }
    },
  },
};
