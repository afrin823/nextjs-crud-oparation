// app/api/items/route.js
import Item from '@models/items';
import { connectToDB } from '@utils/database';

// Handle GET requests to fetch all items
export async function GET() {
  try {
    await connectToDB();
    const items = await Item.find({});
    return new Response(JSON.stringify(items), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Handle POST requests to create a new item
export async function POST(req) {
  try {
    await connectToDB();
    const { name, description } = await req.json(); // Destructure the body correctly
    const newItem = new Item({ name, description });
    await newItem.save();
    return new Response(JSON.stringify(newItem), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// Handle DELETE requests to delete an item by ID
export async function DELETE(req) {
  try {
    await connectToDB();
    const { id } = await req.json(); // Get the ID from the request body
    const deletedItem = await Item.findByIdAndDelete(id); // Delete the item

    if (!deletedItem) {
      return new Response(JSON.stringify({ error: 'Item not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Item deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
