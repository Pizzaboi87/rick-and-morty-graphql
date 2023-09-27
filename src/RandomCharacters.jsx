import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

export const GET_SINGLE_CHARACTER = gql`
  query Character($id: ID!) {
    character(id: $id) {
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
`;

export const RandomCharacter = () => {
	const [randomNumber, setRandomNumber] = useState(
		Math.floor(Math.random() * 200)
	);
	const { loading, error, data } = useQuery(GET_SINGLE_CHARACTER, {
		variables: { id: randomNumber },
	});

	return (
		<div>
			<p className="intro">
				Sorry, we couldn't find that character 😞
				<br />
				<br />
				How about this one instead? 😉
			</p>

			{/*loading && <p>loading...</p>*/}
			{loading && (
				<div className="loader-container">
					<div className="loader"></div>
				</div>
			)}
			{error && <p> error </p>}

			{data && (
				<>
					<div
						className="card"
						key={data.character.name}
						style={{
							backgroundImage: `url(${data.character.image})`,
							backgroundRepeat: "no-repeat",
						}}
					>
						<div className="info">
							<h2 className="h3">{data.character.name}</h2>
							<p>Status: {data.character.status}</p>
							<p>Species: {data.character.species}</p>
							<p>Type: {data.character.type}</p>
							<p>Gender: {data.character.gender}</p>
							<p>Origin: {data.character.origin.name}</p>
							<p>Location: {data.character.location.name}</p>
						</div>
					</div>
				</>
			)}
		</div>
	);
};
