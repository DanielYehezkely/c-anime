import { useEffect, useState } from "react";
import { getAnimeList } from "./services/animeApi/animeApiService";
import { Anime } from "./types/Anime";
import { Loader } from "./components";



function App() {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const animeData = await getAnimeList();
        setAnime(animeData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeList();
  }, []);


  if (loading) {
    return (
      <>
      <Loader />
      <div>Loading...</div>
      </>
    )
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="">
        <div>
          <h1>Anime List</h1>
          <ul>
            {anime.map((singleAnime) => (
              <li key={singleAnime.node.id}>{singleAnime.node.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;

