import React, {useState} from 'react';
import {Recipes} from './Recipes';

const RecipeFind: React.FC = () => {

    interface Recipe {
        Name: string;
        Description: string;
        Stats: {
            Weight: number;
            Health: number;
            Stamina: number;
            Eitr?: number;
            Duration: string;
            Healing: string;
            Max_Capacity: number;
        };
        Ingredients: { [key: string]: number | undefined }[]
    }

    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [searchPerformed, setSearchPerformed] = useState(false)

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();

        const searchTextLower = searchText.toLowerCase();

        const foundRecipes = Recipes.filter(recipe => {
            // Prüfen, ob der Rezeptname den Suchtext enthält
            const isNameMatch = recipe.Name.toLowerCase().includes(searchTextLower);

            // Prüfen, ob irgendeine Zutat den Suchtext enthält
            const isIngredientMatch = recipe.Ingredients.some(ingredient =>
                Object.keys(ingredient).some(key =>
                    key.toLowerCase().includes(searchTextLower)
                )
            );

            // Rezept wird in die Ergebnisliste aufgenommen, wenn entweder der Name oder eine Zutat übereinstimmt
            return isNameMatch || isIngredientMatch;
        });

        setFilteredRecipes(foundRecipes);
        setSearchPerformed(true);
    };


    return (
        <div
            className="relative flex flex-col items-center justify-center w-full h-full"
        >
            <div
                className="sticky top-0 left-0 w-full h-full bg-[#1F1F1F] bg-center p-5 bg-opacity-95"
            >
                <div className="relative flex items-center justify-center w-full h-full p-8">
                    <h1 className="text-red-500 font-bold text-5xl">Find Recipe</h1>
                </div>

                <form
                    onSubmit={handleSearch}
                >
                    <input
                        type="text"
                        placeholder="Type an ingredient..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="border border-gray-400 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                    <button
                        type="submit"
                        disabled={!searchText}
                        className="bg-[#191718] hover:bg-[#070102] text-[#D9D9D9] font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
                    >
                        Search
                    </button>

                </form>

            </div>

            <div
                className="flex flex-col items-center justify-center w-full h-full p-8"
            >
                {searchPerformed && filteredRecipes.length > 0 ? (
                    filteredRecipes.map(recipe => (
                        <div key={recipe.Name}
                             className="bg-[#191718] hover:bg-[#070102] text-[#D9D9D9] font-bold py-2 px-4 rounded transition duration-150 ease-in-out m-10 w-full"
                        >
                            <h3 className="text-2xl text-amber-50">{recipe.Name}</h3>
                            <p className="text-amber-50 text-lg">{recipe.Description}</p>
                            <p className="text-amber-50 text-lg">Stats:</p>
                            <p className="text-amber-50 text-lg">Weight: {recipe.Stats.Weight}</p>
                            <p className="text-amber-50 text-lg">Health: {recipe.Stats.Health}</p>
                            <p className="text-amber-50 text-lg">Stamina: {recipe.Stats.Stamina}</p>
                            {recipe.Stats.Eitr && <p className="text-amber-50 text-lg">{`Eitr: ${recipe.Stats.Eitr}`}</p>}
                            <p className="text-amber-50 text-lg">Duration: {recipe.Stats.Duration}</p>
                            <p className="text-amber-50 text-lg">Healing: {recipe.Stats.Healing}</p>
                            <p className="text-amber-50 text-lg">Max Capacity: {recipe.Stats.Max_Capacity}</p>
                            <p className="text-amber-50 text-lg">Ingredients:</p>
                            <ul>
                                {recipe.Ingredients.map((ingredient, index) => {
                                    const ingredientName = Object.keys(ingredient)[0] as keyof typeof ingredient;
                                    return <li
                                        className="text-amber-50 text-lg"
                                        key={index}>{ingredientName}: {ingredient[ingredientName]}
                                    </li>;
                                })}
                            </ul>

                        </div>
                    ))
                ) : searchPerformed ? (
                    <div className="text-amber-50 text-lg">Keine Rezepte gefunden, die der Zutat '{searchText}'
                        entsprechen.</div>
                ) : null}
            </div>
        </div>
    );
};

export default RecipeFind;