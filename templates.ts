// import { useEffect, useState } from "react";

// function template() {
//   const [anime, setAnime] = useState<Anime[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAnimeList = async () => {
//       try {
//         const animeData = await getAnimeList();
//         setAnime(animeData);
//       } catch (error: any) {
//         setError(error);
//         throw new Error("Data is not an array");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnimeList();
//   }, []);

//   if (loading) {
//     return (
//       <>
//         <Loader actionLabel="Fetching anime ..." />
//       </>
//     );
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <>
   
//     </>
//   );
// }
