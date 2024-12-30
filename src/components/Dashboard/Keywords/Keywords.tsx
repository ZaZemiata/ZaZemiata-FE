import { useState } from "react";
import AddKeyWords from "./AddKeyWords";
import useGetKeywords from "./hooks/useGetKeywords";
import KeyWordCard from "./KeyWordCard";

const Keywords = () => {
    // useGetKeywords hook to get the keywords
    const { handleKeyWord, keywordFilter, keywords } = useGetKeywords();

    // state to check all the checkboxes
    const [isCheckAll, setIsCheckAll] = useState(false);

    return (
        <div>
            <ul className="p-4 border-b border-gray-200 flex items-center gap-7">
                <li>
                    <input
                        className="max-w-52 outline-none border-b border-gray-300 p-2 ml-10"
                        type="text"
                        value={keywordFilter}
                        onChange={(e) => handleKeyWord(e.target.value)}
                        placeholder="Search"
                    />
                </li>
                <li>
                    <AddKeyWords />
                </li>
            </ul>
            <div className="grid grid-cols-[5rem_1fr_10rem_5rem_1fr] items-center p-4 border-b border-gray-200">
                <input type="checkbox" checked={isCheckAll} onClick={() => setIsCheckAll((prev) => !prev)} />
                <p className="px-5">Ключова дума</p>
                <p className="px-5">Тежест</p>
                <p className="px-5">Активност</p>
                <p className="px-5 text-end">Действия</p>
            </div>
            {keywords &&
                keywords.map((keyword) => <KeyWordCard key={keyword.id} {...keyword} keyWordFilter={keywordFilter} checked={isCheckAll} />)}
        </div>
    );
};

export default Keywords;
