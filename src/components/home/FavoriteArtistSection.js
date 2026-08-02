import React, { memo } from "react";
import { useHomeSection } from "hook/useHomeSection";
import Section from "components/ui/Section";
import FavoriteArtistCard from "components/card/FavoriteArtistCard";

const matchFavoriteArtist = (s) =>
  s?.sectionType === "artistSpotlight" ||
  /nghệ sĩ yêu thích/i.test(s?.title || "");

const FavoriteArtistSection = () => {
  const { section, isLoading } = useHomeSection(matchFavoriteArtist);
  const datas = section?.items;

  if (!section && !isLoading) return null;
  if (!section) return null;

  return (
    <Section title={section?.title}>
      {datas?.length > 0 &&
        datas.map((e, index) => {
          let classGird = "col l-2-4 m-3 c-5";
          if (index > 4) return null;
          if (index === 4) {
            classGird = "col l-2-4 m-0 c-5";
          }

          return (
            <FavoriteArtistCard
              key={e.encodeId}
              clasName={classGird}
              item={e}
            ></FavoriteArtistCard>
          );
        })}
    </Section>
  );
};

export default memo(FavoriteArtistSection);
