import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { RandomCharacter } from "./RandomCharacters";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

export const GET_CHARACTERS = gql`
query Characters($actualPage: Int, $name: String){
  characters(page: $actualPage, filter: {name: $name}) {
    info {
      pages
    },
    results {
      name
      species
      status
      type
      gender
      origin{name}
      location{name}
      image
    },
  },
}
`;

export const CharacterList = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [charactersData, setCharactersData] = useState(null);
	const [actualPage, setActualPage] = useState(1);
	const [allPage, setAllPage] = useState(0);
	const { loading, error, data } = useQuery(GET_CHARACTERS, {
		variables: { actualPage, name: searchTerm },
	});

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
		setActualPage(1);
	};

	useEffect(() => {
		if (data) {
			setCharactersData(data.characters.results);
			setAllPage(data.characters.info.pages);
		}
	}, [data]);

	const handlePageChange = (event, value) => {
		setActualPage(value);
	};

	return (
		<div>
			<input
				type="text"
				name="search"
				placeholder="search for Rick and Morty characters"
				value={searchTerm}
				onChange={handleChange}
				className="search-input"
			/>
			{loading && (
				<div className="loader-container">
					<div className="loader"></div>
				</div>
			)}
			{error && <p>error</p>}
			{data?.characters.results.length === 0 && (
				<>
					<RandomCharacter />
				</>
			)}
			{data && (
				<div className="container">
					{charactersData.map((character, index) => (
						<div
							className="card"
							key={`${character.name}-${index}`}
							style={{
								backgroundImage: `url(${character.image})`,
								backgroundRepeat: "no-repeat",
							}}
						>
							<div className="info">
								<h2 className="h3">{character.name}</h2>
								<p> Status: {character.status}</p>
								<p> Species: {character.species} </p>
								<p> Type: {character.type}</p>
								<p> Gender: {character.gender}</p>
								<p> Origin: {character.origin.name}</p>
								<p> Location: {character.location.name}</p>
							</div>
						</div>
					))}
				</div>
			)}
			<div className="pagination">
				<Stack spacing={2}>
					<Pagination
						count={allPage}
						page={actualPage}
						onChange={handlePageChange}
						color="primary"
					/>
				</Stack>
			</div>
		</div>
	);
};
