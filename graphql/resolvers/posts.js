import Post from "../../models/Post";

export const postResolvers = {
  Query: {
    getPosts: async () => {
      return await Post.find();
    },
    getPost: async (_, { id }) => {
      try {
        const post = await Post.findById(id);

        if (post) {
          return post;
        }
        throw new Error("No post found with that ID.");
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createPost: async (_, { input: { title, text, createdAt } }) => {
      return await Post.create({
        title,
        text,
        createdAt: new Date().toISOString(),
      });
    },
    updatePost: async (_, { id, input }) => {
      const post = await Post.findByIdAndUpdate(id, input, {
        new: true,
        runValidators: true,
      });

      if (!post) {
        throw new Error("No post found with that ID.");
      }

      return post;
    },
    deletePost: async (_, { id }) => {
      const post = await Post.findByIdAndDelete(id);

      if (post) {
        return "Post deleted successfully";
      }
      throw new Error("No post found with that ID.");
    },
  },
};
