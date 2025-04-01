import { User } from "./types";
import useDeleteUsers from "./hooks/useDeleteUsers";
import { useState } from "react";
import formatDate from "./utils/formatDate";
import { ReactComponent as Trash } from "@/assets/svgs/trash.svg";


type UserCardProps = User & { userFilter: string };

const UserCard = ({ email, is_admin, createdAt, id, userFilter }: UserCardProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const { mutate: deleteUser } = useDeleteUsers();

    const handleDelete = async () => {
        if (window.confirm('Сигурен ли сте, че искате да изтриете този потребител?')) {
            setIsDeleting(true);
            deleteUser(BigInt(id));
        }
    };

    // Define regex and parts conditionally
    const regex = userFilter.trim() ? new RegExp(`(${userFilter})`, "gi") : null;
    const parts = regex ? email.split(regex) : [email];

    return (
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center p-4 border-b border-gray-200 hover:bg-gray-50">
            <div className="px-5">
                {parts.map((part, index) =>
                    regex && regex.test(part) ? (
                        <span key={index} className="bg-blue-200">
                            {part}
                        </span>
                    ) : (
                        <span key={index}>{part}</span>
                    )
                )}
            </div>
            <p className="px-5">{is_admin ? 'Админ' : 'Потребител'}</p>
            <p className="px-5">{formatDate(createdAt)}</p>
            <div className="px-5 text-end">
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    aria-label="Delete"
                >
                    <Trash />
                </button>
            </div>
        </div>
    );
};

export default UserCard; 