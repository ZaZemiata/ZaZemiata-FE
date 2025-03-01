import { useState } from "react";
import AddKeyWords from "./AddKeyWords";
import useGetKeywords from "./hooks/useGetKeywords";
import KeyWordCard from "./KeywordCard";

const Keywords = () => {
    // useGetKeywords hook to get the keywords
    const { handleKeyWord, keywordFilter, keywords } = useGetKeywords();
    const [searchError, setSearchError] = useState(""); // state to check if the search input is valid

    // state to check all the checkboxes
    const [isCheckAll, setIsCheckAll] = useState(false);

    const validateCyrillicAndDigitsInput = (value: string) => {
        const cyrillicAndDigitsRegex = /^[\u0400-\u04FF0-9\s]*$/; // Regex to match Cyrillic characters, digits, and spaces
        if (!cyrillicAndDigitsRegex.test(value)) {
            setSearchError("Моля използвайте само символи на кирилица и цифри."); // Display error message
            return;
        } else {
            setSearchError(""); // Clear error message
        }
        handleKeyWord(value); // Pass valid input to handleKeyWord function
    };

    return (
        <div>
            <ul className="p-4 border-b border-gray-200 flex items-center gap-7">
                <li>
                    <input
                        className="max-w-52 outline-none border-b border-gray-300 p-2 ml-10"
                        type="text"
                        value={keywordFilter}
                        onChange={(e) => validateCyrillicAndDigitsInput(e.target.value)}
                        placeholder="Search"
                    />
                </li>
                <li>
                    <AddKeyWords />
                </li>
                {searchError && <p className="text-red-500 text-nowrap">{searchError}</p>}
            </ul>
            <div className="grid grid-cols-[5rem_1fr_10rem_5rem_1fr] items-center p-4 border-b border-gray-200">
                <input type="checkbox" checked={isCheckAll} onChange={() => setIsCheckAll((prev) => !prev)} />
                <p className="px-5">Ключова дума</p>
                <p className="px-5">Тежест</p>
                <p className="px-5">Активност</p>
                <p className="px-5 text-end">Действия</p>
            </div>
            {keywords && keywords.length > 0 ? (
                keywords.map((keyword) => (
                    <KeyWordCard key={keyword.id} {...keyword} keyWordFilter={keywordFilter} checked={isCheckAll} />
                ))
            ) : (
                <p className="text-center text-xl mt-16 ">Не са намерени ключови думи спрямо зададения критерии</p>
            )}
        </div>
    );
};

export default Keywords;
