import { useState } from 'react';
import useUsers from '@/components/Dashboard/Users/hooks/useGetUsers';
import useDeleteUsers from '@/components/Dashboard/Users/hooks/useDeleteUsers';

const Users = () => {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const { users, isLoading, userFilter, handleUser } = useUsers();
  const { mutate: deleteUser } = useDeleteUsers();

  const handleDelete = async (userId: string) => {
    if (window.confirm('Сигурен ли сте, че искате да изтриете този потребител?')) {
      setIsDeleting(userId);
      deleteUser(BigInt(userId));
    }
  };

  if (isLoading) {
    return <div className="p-4">Зареждане...</div>;
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Невалидна дата';
      }
      return date.toLocaleDateString('bg-BG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Невалидна дата';
    }
  };

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
          <div key={user.id} className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center p-4 border-b border-gray-200 hover:bg-gray-50">
            <p className="px-5">{user.email}</p>
            <p className="px-5">{user.is_admin ? 'Админ' : 'Потребител'}</p>
            <p className="px-5">{formatDate(user.createdAt)}</p>
            <div className="px-5 text-end">
              <button
                onClick={() => handleDelete(user.id)}
                disabled={isDeleting === user.id}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-red-300"
              >
                {isDeleting === user.id ? 'Изтривам...' : 'Изтрий'}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-xl mt-16">Не са намерени потребители спрямо зададения критерии</p>
      )}
    </div>
  );
};

export default Users; 