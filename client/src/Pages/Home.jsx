import AllBooks from "../Components/AllBooks";
import AnimationBooks from '../Components/AnimationBooks'
import Search from "../Components/Search";
export default function Home() {

    return (
        <div className="px-4 md:px-10 lg:px-24 xl:px-40 overflow-hidden">
            <Search />
            <AnimationBooks />
            <AllBooks />
        </div>
    );
};
