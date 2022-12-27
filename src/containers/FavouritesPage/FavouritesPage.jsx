import { useEffect, useState } from "react";
import ItemGrid from "../ItemGrid/ItemGrid";
import { getAllItems, updateItemFavourite } from "../../services/items";

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const fetchItems = async () => {
    try {
      const data = await getAllItems();
      console.log(data);
      setFavourites(data.filter((item) => item.favourited === true));
    } catch (e) {
      console.log(e.message);
    }
  };

  const removeFavourite = async (id, status) => {
    await updateItemFavourite(id, status);
    setRefresh((prev) => prev + 1);
  };

  useEffect(() => {
    fetchItems();
  }, [refresh]);

  return (
    <div>
      <h2>Favourites</h2>

      {favourites && favourites.length > 0 ? (
        <ItemGrid
          products={favourites}
          favourites={true}
          removeFavourite={removeFavourite}
        />
      ) : (
        <p>There are currently no favourited items.</p>
      )}
    </div>
  );
};

export default FavouritesPage;
