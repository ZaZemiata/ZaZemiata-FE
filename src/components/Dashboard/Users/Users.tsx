import useUsers from '@/components/Dashboard/Users/hooks/useGetUsers';
import UserCard from './UserCard';

const Users = () => {
  const { users, isLoading, userFilter, handleUser } = useUsers();

  if (isLoading) {
    return <div className="p-4">Зареждане...</div>;
  }

  return (
    <div>
      <ul className="p-4 border-b border-gray-200 flex items-center gap-7">
        <li>
          <input
            className="max-w-52 outline-none border-b border-gray-300 p-2 ml-10"
            type="text"
            value={userFilter}
            onChange={(e) => handleUser(e.target.value)}
            placeholder="Търсене по имейл"
          />
        </li>
      </ul>
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center p-4 border-b border-gray-200 bg-gray-50 font-semibold">
        <p className="px-5">Имейл</p>
        <p className="px-5">Роля</p>
        <p className="px-5">Създаден на</p>
        <p className="px-5 text-end">Действия</p>
      </div>
      {users && users.length > 0 ? (
        users.map((user) => (
          <UserCard key={user.id} {...user} userFilter={userFilter} />
        ))
      ) : (
        <p className="text-center text-xl mt-16">Не са намерени потребители спрямо зададения критерии</p>
      )}
    </div>
  );
};

export default Users; 