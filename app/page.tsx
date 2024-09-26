import Link from 'next/link';

const HomePage = () => (
  <div className="container mx-auto mt-10">
    <h1>Welcome to Student Management</h1>
    <Link className="text-blue-500" href="/students">
      Go to Student List
    </Link>
  </div>
);

export default HomePage;