import './App.css'
import { useQuery, useMutation,useQueryClient } from '@tanstack/react-query'
import { fetchUsers, addUser } from './api/api'

function App() {

  const queryClient = useQueryClient();
  // Query for fetching users
  const { data, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  // Mutation for adding a user
  const { mutate, isError: isPostError, isLoading: isPosting, error: postError, reset } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      reset(); // Reset mutation state
      // Optionally refetch users or use query cache to update user list
    }
  });

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      emailId: formData.get('emailId'),
      password: formData.get('password'),
      age: formData.get('age'),
      gender: formData.get('gender')
    };
    mutate(user);
    e.target.reset();
  };
  // console.log(firstName);
  

  return (
    <>
      <h1>Learn about React Query</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your name" className="input" name="firstName" />
        <input type="text" placeholder="Enter your last name" className="input" name="lastName" />
        <input type="email" placeholder="Enter your Email Id" className="input" name="emailId" />
        <input type="password" placeholder="Enter your Password" className="input" name="password" />
        <input type="number" placeholder="Enter your Age" className="input" name="age" />
        <input type="text" placeholder="Enter your gender" className="input" name="gender" />
        <button type="submit" disabled={isPosting}>Submit</button>
      </form>

      {/* Display feedback messages */}
      {isLoading && <p>Loading users...</p>}
      {error && <p>Error fetching users: {error.message}</p>}
      {isPostError && <p>Error adding user: {postError?.message}</p>}

      {/* Render user list */}
      {data && data.map((user) => (
        <div key={user._id}>
          <p>{user.firstName} {user.lastName}</p>
        </div>
      ))}
    </>
  );
}

export default App;
