import cn from "@/util/cn";
import useGetSources from "./hooks/useGetSources";

type SourceListProps = {
    selectSource: (id: string) => void;
    selectedSource: string | undefined;
};

const SourceList = ({ selectSource, selectedSource }: SourceListProps) => {
    const { data: sources } = useGetSources();

    const sourceList = sources?.reduce<{ label: string; value: string }[]>(
        (acc, source) => {
            if (!source.display_name) return acc; // Skip if display_name is missing

            let label = source.display_name;

            if (label.includes("РИОСВ - ")) {
                label = label.replace("РИОСВ - ", "");
            } else {
                const match = label.match(/\((.+)\)/);
                if (match) label = match[1];
            }

            acc.push({ label, value: source.id });
            return acc;
        },
        []
    );

    return (
        <div className="flex gap-2 flex-wrap py-4 border-t border-[#b8e6c9]">
            {sourceList?.map((source) => (
                <button
                    onClick={() => selectSource(source.value)}
                    className={cn(
                        "px-3 py-1.5 rounded-2xl border border-[#95d9af] text-[#0e381e] text-[15px] font-normal text-center hover:bg-[#B8E6C9] transform-gpu delay-100",
                        selectedSource === source.value
                            ? "bg-[#B8E6C9]"
                            : "bg-white"
                    )}
                    key={source.value}
                >
                    {source.label}
                </button>
            ))}
        </div>
    );
};

export default SourceList;
