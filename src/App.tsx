import { useEffect, useState } from "react";
import { getAnimeList } from "./services/animeApi/animeApiService";
import { Anime } from "./types/Anime";



function App() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const animesData = await getAnimeList();
        setAnimes(animesData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeList();
  }, []);

  console.log(animes);

  if (loading) {
    return <div>Loading...</div>;
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
            {animes.map((anime) => (
              <li key={anime.node.id}>{anime.node.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
