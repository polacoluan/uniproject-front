import StudentsTable from '../components/student/StudentsTable';

const StudentsPage = () => (
  <div className="container mx-auto">
    <h1 className="text-2xl font-bold mb-4 mt-4 text-center">Lista de Estudantes</h1>
    <StudentsTable />
  </div>
);

export default StudentsPage;