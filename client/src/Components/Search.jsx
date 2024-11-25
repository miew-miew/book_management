function Search() {
    return (
        <div className="flex gap-2 items-center bg-[#404044]/80 rounded-full px-4 py-2 w-64 my-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CFCFD0" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input type="text" className="bg-transparent text-white focus:outline-none" placeholder="Search" />
        </div>
    );
}

export default Search;