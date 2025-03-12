import dayjs from "dayjs";
import "dayjs/locale/bg";

type InfoCardProps = {
    contractor: string;
    date: Date;
    text: string;
    sourceArticle: string | null;
    SourceUrls: {
        url: string;
        Sources: {
            display_name: string;
        };
    };
};

const InfoCard = ({ contractor, date, text, sourceArticle, SourceUrls }: InfoCardProps) => {
    const formattedDate = dayjs(date).locale("bg").format("D MMMM YYYY");
    const sourceLink = sourceArticle || SourceUrls.url;

    return (
        <div className="w-full rounded-[36px] border-2 border-[#19ad52]">
            <div className="flex gap-4 items-center py-4 my-4 mx-9 border-b border-[#19ad52] text-[#3b3b3b] justify-between">
                <div className="flex gap-4">
                    <a 
                        href={sourceLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-base font-normal leading-none text-[#19ad52] hover:underline"
                    >
                        {SourceUrls.Sources.display_name}
                    </a>
                    <p className="text-base font-normal leading-none">{formattedDate}</p>
                </div>
                <p className="text-base font-bold leading-none">{contractor}</p>
            </div>
            <p className="my-4 mx-9 text-base font-normal leading-normal">{text}</p>
        </div>
    );
};

export default InfoCard;
