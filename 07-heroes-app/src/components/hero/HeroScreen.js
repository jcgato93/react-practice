import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = () => {
  const { heroId } = useParams();
  const navigate = useNavigate();
  
  const hero = getHeroById(heroId);

  const handleReturn = () => {
    navigate(-1);
  }

  if (!hero) {
    return <Navigate to="/" />;
  }

  const imagePath = `/assets/${hero.id}.jpg`;

  return (
    <div className='row mt-5'>
      <div className="col-4">
        <img src={imagePath} alt={hero.superhero}
          className="img-thumbnail animate__animated animate__fadeInLeft"
        />
      </div>

      <div className="col-8 animate__animated animate__fadeIn">
        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter ego: </b>
            {hero.alter_ego}
          </li>
          <li className="list-group-item">
            <b>Primera aparicion: </b>
            {hero.first_appearance}
          </li>
          <li className="list-group-item">
            <b>Personajes: </b>
            {hero.characters}
          </li>
        </ul>

        <button
          className='btn btn-outline-info mt-3'
          onClick={handleReturn}
        >Regresar</button>
        </div>
    </div>
  )
}
