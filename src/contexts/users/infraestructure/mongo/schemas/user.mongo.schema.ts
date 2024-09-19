import * as mongoose from 'mongoose';

const UserMongoSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      default: null,
    },
    socket_id: {
      type: String,
      required: false,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);
export default UserMongoSchema;
