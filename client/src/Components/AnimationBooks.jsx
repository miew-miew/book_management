
function AnimationBooks() {
    return (
        <div>
            {/* affichage pour petit ecran */}
            <div className="md:hidden">
                <div className="flex flex-row gap-">
                        <div className="flex flex-col p-4 justify-end w-[75vw] h-[60vh] bg-blue-500 rounded-xl">
                            <span className="text-[2rem] font-bold text-white ">Title</span>
                            <span className="text-white">Desciption</span>
                        </div>
                    </div>
            </div>
            {/* affichage avec l'animation pour ecran large*/}
            <div className="hidden md:block">
                <div className="flex flex-row gap-20">
                    <div className="w-[70vw] bg-blue-500 rounded-2xl">
                        <div></div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-row gap-10 items-center p-2 w-[20vw] h-[15vh] bg-blue-500 rounded-xl">
                            <div className="w-[6vw] bg-white h-[13vh] rounded-md"></div>
                            <span className="text-white text-[1.2rem] font-bold ">Title</span>
                        </div>
                        <div className="w-[20vw] h-[15vh] bg-blue-500 rounded-xl">
                        </div>
                        <div className="w-[20vw] h-[15vh] bg-blue-500 rounded-xl">
                        </div>
                        <div className="w-[20vw] h-[15vh] bg-blue-500 rounded-xl">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnimationBooks;