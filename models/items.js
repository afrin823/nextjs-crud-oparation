// models/items.js
import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true, // Ensure this field is required
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const Item = mongoose.models.Item || mongoose.model('Item', ItemSchema);
export default Item;
