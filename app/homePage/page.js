// // app/homePage/page.js
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../api/auth/[...nextauth]/route'; // Ensure this path is correct

// const Page = async () => {
//     const session = await getServerSession(authOptions); // Fetch the session
//     console.log(session);

//     return (
//         <div>
//             <h1>Welcome {session ? session.user.name : "Guest"}</h1>
//         </div>
//     );
// };

// export default Page;











// 'use client';
// import styles from './page.module.css';
// import { signIn, signOut, useSession } from 'next-auth/react';
// import { useState } from 'react';

// export default function Home() {
//   const { data: session } = useSession();

//   // State variables for email, password, and form mode
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSignUp, setIsSignUp] = useState(false); // Toggle between signup and signin

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await signIn('credentials', {
//       redirect: false,
//       email,
//       password,
//     });

//     if (res?.error) {
//       alert(res.error); // Handle error appropriately in production
//     }
//   };

//   return (
//     <>
//       {session ? (
//         <div className={styles.userInfo}>
//           <h1>Welcome, {session.user.name || 'User'}</h1>
//           <p>Email: {session.user.email}</p>
//           <button onClick={() => signOut()}>Logout</button>
//         </div>
//       ) : (
//         <>
//           <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>

//           <form onSubmit={handleSubmit} className={styles.form}>
//             <label>
//               Email:
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </label>
//             <label>
//               Password:
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </label>
//             <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
//           </form>

//           <p>
//             {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
//             <button onClick={() => setIsSignUp(!isSignUp)}>
//               {isSignUp ? 'Sign In' : 'Sign Up'}
//             </button>
//           </p>
//         </>
//       )}
//     </>
//   );
// }

