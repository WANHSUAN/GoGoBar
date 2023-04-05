import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {getAuth, signOut} from "firebase/auth";
import {db} from "../App";
import {collection, getDocs} from "firebase/firestore";

const LogOutButton = styled.button`
  width: 150px;
  height: 30px;
  border: 1px solid #87c3e1;
  border-radius: 5px;
  font-size: 15px;
`;

const Wrapper = styled.div`
  width: 500px;
  height: 800px;
  margin: 50px auto;
  padding: 10px;
  text-align: center;
  border: 1px solid #000;
  border-radius: 5px;
`;

const QuestionSection = styled.div``;

const QuestionTitle = styled.legend`
  font-size: 25px;
`;

const QuestionFieldset = styled.fieldset``;

const QuestionLabel = styled.label`
  display: flex;
  justify-content: center;
`;

const Checkbox = styled.input``;

const SubmitButton = styled.button``;

const Hashtags = styled.div``;

const HashtagList = styled.ul`
  list-style: none;
`;

const HashtagItem = styled.li``;

const NoMatch = styled.div``;

interface IBar {
  id: string;
  name: string;
  img: string;
  type: string[];
}

interface IOption {
  text: string;
  hashtag: string;
  group: string; // 新增屬性
}

const options = [
  {text: "Afternoon", hashtag: "afternoon", group: "time"},
  {text: "Night", hashtag: "night", group: "time"},
  {text: "Alone", hashtag: "alone", group: "situation"},
  {text: "Together", hashtag: "together", group: "situation"},
  {text: "Classic", hashtag: "classic", group: "mood"},
  {text: "Special", hashtag: "special", group: "mood"},
  {text: "Simple", hashtag: "simple", group: "atmosphere"},
  {text: "Vision", hashtag: "vision", group: "atmosphere"},
  {text: "Couple", hashtag: "couple", group: "relationship"},
  {text: "Friend", hashtag: "friend", group: "relationship"},
];

const groups = {
  time: "Time",
  situation: "Situation",
  mood: "Mood",
  atmosphere: "Atmosphere",
  relationship: "Relationship",
};

export interface IQuestionProps {}

const QuestionPage: React.FC<IQuestionProps> = (props: IQuestionProps) => {
  const auth = getAuth();
  const [bars, setBars] = useState<IBar[]>([]);
  const barsCollectionRef = collection(db, "bars");

  useEffect(() => {
    const getBars = async () => {
      const data = await getDocs(barsCollectionRef);
      setBars(data.docs.map((doc) => ({...(doc.data() as IBar), id: doc.id})));
    };

    getBars();
  }, []);
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>([]);
  const [matchingBars, setMatchingBars] = useState<string[]>([]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const option = options.find((option) => option.text === value)!;

    if (option.group in groups) {
      const existingOption = selectedOptions.find(
        (o) => o.group === option.group
      );

      if (existingOption) {
        if (existingOption.text === option.text) {
          return;
        }

        setSelectedOptions((prev) =>
          prev.filter((o) => o.group !== option.group)
        );
      }
    }

    setSelectedOptions((prev) => [
      ...prev.filter((o) => o.group !== option.group),
      option,
    ]);

    const selectedGroupOptions = selectedOptions.filter(
      (o) => o.group === option.group
    );
    const selectedGroupOptionHashtags = selectedGroupOptions.map(
      (o) => o.hashtag
    );
    const selectedBars = bars?.filter((bar) =>
      selectedGroupOptionHashtags.every((hashtag) =>
        bar?.type?.includes(hashtag)
      )
    );
    setBars(selectedBars);
  };

  const handleButtonClick = () => {
    const selectedHashtags = selectedOptions.map((option) => option.hashtag);
    const selectedBars = bars
      ? bars.filter((bar) =>
          selectedHashtags.every((hashtag) => bar.type.includes(hashtag))
        )
      : [];
    const matchingBarNames = selectedBars.map((bar) => bar.name);
    setMatchingBars(matchingBarNames);
  };

  return (
    <>
      <LogOutButton onClick={() => signOut(auth)}>
        Sign out of Firebase
      </LogOutButton>
      <Wrapper>
        <QuestionSection>
          {Object.entries(groups).map(([key, label]) => (
            <QuestionFieldset key={key}>
              <QuestionTitle>{label}</QuestionTitle>
              {options
                .filter((option) => option.group === key)
                .map((option) => (
                  <div key={option.hashtag}>
                    <QuestionLabel>
                      <Checkbox
                        type="checkbox"
                        value={option.text}
                        checked={selectedOptions.some(
                          (o) => o.text === option.text
                        )}
                        onChange={handleOptionChange}
                      />
                      {option.hashtag}
                    </QuestionLabel>
                  </div>
                ))}
            </QuestionFieldset>
          ))}
          <SubmitButton onClick={handleButtonClick}>
            Show Selected Bars
          </SubmitButton>
          <Hashtags>
            {matchingBars.length > 0 ? (
              <HashtagList>
                {matchingBars.map((matchingBar, index) => (
                  <HashtagItem key={index}>{matchingBar}</HashtagItem>
                ))}
              </HashtagList>
            ) : (
              <NoMatch>No matching bars found.</NoMatch>
            )}
          </Hashtags>
        </QuestionSection>
      </Wrapper>
    </>
  );
};

export default QuestionPage;
