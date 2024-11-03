import { useParams } from 'react-router-dom';

function ProgramDetailPage() {
  const { id } = useParams();
  return <div>{id}</div>;
}
export default ProgramDetailPage;
