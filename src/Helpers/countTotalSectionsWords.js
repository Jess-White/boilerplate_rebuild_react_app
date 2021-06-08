import countSectionWords from "./countSectionWords";

const countTotalSectionsWords = (sections = []) => {
  return sections?.reduce(
    (total, section) => total + countSectionWords(section),
    0
  );
};

export default countTotalSectionsWords;
