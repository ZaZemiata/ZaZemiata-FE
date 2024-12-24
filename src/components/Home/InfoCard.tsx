import dayjs from "dayjs";
import "dayjs/locale/bg";

type InfoCardProps = {
    // title: string;
    contractor: string;
    date: Date;
    text: string;
};

const InfoCard = ({ contractor, date, text }: InfoCardProps) => {
    const formattedDate = dayjs(date).locale("bg").format("D MMMM YYYY");
    return (
        <div className="w-full rounded-[36px] border-2 border-[#19ad52]">
            <div className="flex gap-4 items-center py-4 my-4 mx-9 border-b border-[#19ad52] text-[#3b3b3b]">
                <h2 className="text-xl font-bold leading-tight">Title</h2>
                <p className="text-base font-normal leading-none">{contractor}</p>
                <p className="text-base font-normal leading-none">{formattedDate}</p>
            </div>
            <p className="my-4 mx-9 text-base font-normal leading-normal">{text}</p>
        </div>
    );
};
export default InfoCard;
