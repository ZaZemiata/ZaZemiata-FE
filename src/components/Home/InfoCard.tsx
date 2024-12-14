type InfoCardProps = {
    title: string;
    contractor: string;
    date: string;
    text: string;
};

const InfoCard = ({ title, contractor, date, text }: InfoCardProps) => {
    return (
        <div className="max-w-[75rem] rounded-[36px] border-2 border-[#19ad52]">
            <div className="flex gap-4 items-center py-4 my-4 mx-9 border-b border-[#19ad52] text-[#3b3b3b]">
                <h2 className="text-xl font-bold leading-tight">{title}</h2>
                <p className="text-base font-normal leading-none">{contractor}</p>
                <p className="text-base font-normal leading-none">{date}</p>
            </div>
            <p className="my-4 mx-9 text-base font-normal leading-normal">{text}</p>
        </div>
    );
};
export default InfoCard;
