import Avatar from '../ui/Avatar';

function ProfilUser() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Avatar
        alt=""
        size="md"
        src="https://images.unsplash.com/photo-1561505457-3bcad021f8ee?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <h1 className="text-xl font-semibold">James Due</h1>
    </div>
  );
}
export default ProfilUser;
