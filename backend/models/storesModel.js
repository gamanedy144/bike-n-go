import mongoose from 'mongoose';

const storesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Stores = mongoose.model('Stores', storesSchema);

export default Stores;
