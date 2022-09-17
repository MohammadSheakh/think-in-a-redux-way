import { useSelector } from "react-redux";
import Todo from "./Todo";

export default function TodoList() {
    // ebar amra filtering kore content dekhabo .. age shob gula todo e dekhaitam

    // amra je ekta kore todo pacchi .. tar pore just todo ta dekhiye dicchi .. ei kaj
    // ta na kore .. ei map er age amader ke filter korte hobe ..
    // ekta korte hobe .. amader jei status ta selected ase .. shei status diye filter korte
    // hobe .. jodi ekhane she incomplete dey .. tahole shei todo ta ke map korar age ..
    // amake age filter kore niye ashte hobe .. jei gula shudhu incomplete ... shegula
    // shudhu niye asho ... jodi kono color selected thake .. shei color diye o kintu
    // filter korte hobe ..
    const todos = useSelector((state) => state.todos);
    const filters = useSelector((state) => state.filters);

    // shobar age status diye filtering kore feli cholen ..
    const filterByStatus = (todo) => {
        // protibar ekta kore todo pabo .. filter er moddhe amra jani je .. jei jei
        // jinish ta rakhte chai .. shei jinish tar jonno true return kori.... ar jeita
        // rakhte chai na .. shetar jonno amra false return kori ..
        const { status } = filters; // amake jante hobe je .. amar kon filters ta ashole
        // selected .. kon status ta ashole selected ..
        switch (status) {
            case "Complete":
                return todo.completed; // jegula completed .. shetar jonno true return
            // korte hobe
            // todo.completed jeta true .. sheta return korsi
            case "Incomplete":
                return !todo.completed; // jeta completed false .. sheta return korbo

            default:
                // kono tai select na thakle shob gula return korbo .. mane true return korbo
                return true;
        }
    };

    const filterByColors = (todo) => {
        const { colors } = filters; // colors ta ber kore niye ashbo .. eta ekta array
        if (colors.length > 0) {
            return colors.includes(todo?.color); // todo er color jodi color array te
            // thake ba includes thake ..tailei ami return korbo
            // ekhon shob gular moddhe color attribute ta kintu na o thakte pare
            // tai conditional use korbo
        }
        // kono color selected na thakle true return kore dite hobe
        // mane kono filtering e korbo na .. shob element e ami return kore dibo
        return true;
    };

    return (
        <div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
            {/* ei je map ta je ghotacche .. ei map er age amar filter lagbe .. */}
            {/* amra jani array te method chaining kora jay */}
            {todos
                .filter(filterByStatus)
                .filter(filterByColors)
                .map((todo) => (
                    <Todo todo={todo} key={todo.id} />
                ))}
        </div>
    );
}
