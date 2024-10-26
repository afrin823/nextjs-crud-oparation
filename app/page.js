// app/page.js
'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', { redirect: false, email, password });
    if (res?.error) alert(res.error);
  };
  console.log(session);

  useEffect(() => {
    if (session) {
      fetchItems(); // Fetch items only if the user is logged in
    }
  }, [session]);

  // Fetch items from API
  const fetchItems = async () => {
    const response = await fetch('/api/items');
    const data = await response.json();
    setItems(data);
  };

  // Create a new item
  const handleCreateItem = async () => {
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: itemName, description: itemDesc }),
      });

      if (!res.ok) {
        throw new Error('Failed to add item');
      }

      const data = await res.json();
      setItems([...items, data]);
      setItemName('');
      setItemDesc('');
      console.log('Item added successfully:', data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Update an item
  const handleUpdateItem = async (id) => {
    try {
      const res = await fetch(`/api/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: itemName, description: itemDesc }),
      });

      if (!res.ok) {
        throw new Error('Failed to update item');
      }

      setEditingItemId(null);
      setItemName('');
      setItemDesc('');
      fetchItems();
      console.log('Item updated successfully');
    } catch (error) {
      console.error(error.message);
    }
  };

  // Delete an item
  const handleDeleteItem = async (id) => {
    try {
      const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete item');

      setItems(items.filter((item) => item._id !== id));
      console.log('Item deleted successfully');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {session ? (
        <div className={styles.userInfo}>
          <h1>Welcome, {session.user.name || 'User'}</h1>
          <p>Email: {session.user.email}</p>
          <button onClick={() => signOut()}>Logout</button>

          <h2>Items</h2>
          <div>
            {items.map((item) => (
              <div key={item._id}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <button onClick={() => { 
                  setEditingItemId(item._id); 
                  setItemName(item.name); 
                  setItemDesc(item.description); 
                }}>Edit</button>
                <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
              </div>
            ))}
          </div>

          <h3>{editingItemId ? 'Edit Item' : 'Add Item'}</h3>
          <input 
            type="text" 
            placeholder="Item Name" 
            value={itemName} 
            onChange={(e) => setItemName(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Description" 
            value={itemDesc} 
            onChange={(e) => setItemDesc(e.target.value)} 
          />
          <button
            onClick={() => {
              if (editingItemId) {
                handleUpdateItem(editingItemId);
              } else {
                handleCreateItem();
              }
            }}
          >
            {editingItemId ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      ) : (
        <>
          <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
          </form>
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </>
      )}
    </>
  );
}
