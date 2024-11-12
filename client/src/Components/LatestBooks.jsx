
function LatestBooks() {
    return (
        <div className="flex flex-col gap-4 pt-16">
                <span className="font-semibold">Latest Book</span>
                <div className="flex flex-row gap-6">
                    <div className="flex flex-col gap-2 items-start">
                        <div className="w-[40vw] xl:w-[16vw] h-[35vh] xl:h-[40vh] bg-blue-500 rounded-xl"></div>
                        <div className="flex flex-col gap-1">
                            <span>Author</span>
                            <span className="font-bold text-[1.3rem] ">Title</span>
                        </div>
                        <button className="bg-red-400 px-4 py-1 rounded-full text-white">Read</button>
                    </div>
                    {/* 2 */}
                    <div className="flex flex-col gap-2 items-start">
                        <div className="w-[40vw] xl:w-[16vw] h-[35vh] xl:h-[40vh] bg-blue-500 rounded-xl"></div>
                        <div className="flex flex-col gap-1">
                            <span>Author</span>
                            <span className="font-bold text-[1.3rem] ">Title</span>
                        </div>
                        <button className="bg-red-400 px-4 py-1 rounded-full text-white">Read</button>
                    </div>
                    {/* 3 */}
                    <div className="flex flex-col gap-2 items-start">
                        <div className="w-[40vw] xl:w-[16vw] h-[35vh] xl:h-[40vh] bg-blue-500 rounded-xl"></div>
                        <div className="flex flex-col gap-1">
                            <span>Author</span>
                            <span className="font-bold text-[1.3rem] ">Title</span>
                        </div>
                        <button className="bg-red-400 px-4 py-1 rounded-full text-white">Read</button>
                    </div>
                    {/* 4 */}
                    <div className="flex flex-col gap-2 items-start">
                        <div className="w-[40vw] xl:w-[16vw] h-[35vh] xl:h-[40vh] bg-blue-500 rounded-xl"></div>
                        <div className="flex flex-col gap-1">
                            <span>Author</span>
                            <span className="font-bold text-[1.3rem] ">Title</span>
                        </div>
                        <button className="bg-red-400 px-4 py-1 rounded-full text-white">Read</button>
                    </div>
                    {/* 5    */}
                    <div className="flex flex-col gap-2 items-start">
                        <div className="w-[40vw] xl:w-[16vw] h-[35vh] xl:h-[40vh] bg-blue-500 rounded-xl"></div>
                        <div className="flex flex-col gap-1">
                            <span>Author</span>
                            <span className="font-bold text-[1.3rem] ">Title</span>
                        </div>
                        <button className="bg-red-400 px-4 py-1 rounded-full text-white">Read</button>
                    </div>
                </div>
        </div>
    );
}

export default LatestBooks;