'use client';

import { useGetCharacters } from '../../hooks/useGetCharacters';

const Profile = () => {
  const { characters, isFetching } = useGetCharacters();

  return (
    <div>
      <h1>Profile</h1>
      <div>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {characters.map(character => (
              <li key={character.id}>
                <p>{character.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
