import React, { useMemo } from "react";
import { getHerosByPublisher } from "../../selectors/getHeroByPublisher";
import { HeroCard } from "./HeroCard";

export const HeroList = ({ publisher }) => {
  const heroes = useMemo(() => getHerosByPublisher(publisher), [publisher]);

  return (
    <div className="row row-cols-1 row-cols-md-3 animate__animated animate__fadeIn">      
        {heroes.map((hero) => (
          <HeroCard            
            key={hero.id}
            {...hero}
          ></HeroCard>
        ))}      
    </div>
  );
};
