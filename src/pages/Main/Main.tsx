import React, {useState, useEffect} from "react";
import styled, {keyframes} from "styled-components/macro";
import {Link} from "react-router-dom";
import {db} from "../../App";
import {collection, getDocs, Timestamp} from "firebase/firestore";
import Calendar from "../Calendar/Calendar";
import MainMap from "./MainMap";
import Hashtag from "./Hashtag";
import main from "../Question/main.png";
import "./styles.css";

const Wrapper = styled.div`
  text-align: center;
  width: 1100px;
  margin: 0 auto;
  padding-top: 60px;
  position: relative;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const ArrowWrapper = styled.div`
  cursor: pointer;
  margin-top: 50px;
  display: table;
  width: 100%;
  height: 100%;
`;

const WrapperInner = styled.div`
  display: table-cell;
  vertical-align: middle;
  width: 100%;
  height: 100%;
`;

const elasticus = keyframes`
  0% {
    transform-origin: 0% 0%;
    transform: scale(1, 0);
  }
  50% {
    transform-origin: 0% 0%;
    transform: scale(1, 1);
  }
  50.1% {
    transform-origin: 0% 100%;
    transform: scale(1, 1);
  }
  100% {
    transform-origin: 0% 100%;
    transform: scale(1, 0);
  }
`;

const ScrollDown = styled.div`
  display: block;
  position: relative;
  padding-top: 79px;
  text-align: center;

  &::before {
    content: " ";
    animation: ${elasticus} 1.2s cubic-bezier(1, 0, 0, 1) infinite;
    position: absolute;
    top: 0px;
    left: 50%;
    margin-left: -1px;
    width: 2px;
    height: 90px;
    background: #d19b18;
  }
`;

const ArrowDown = styled.span`
  display: block;
  margin: 0 auto;
  width: 10px;
  height: 80px;

  &::after {
    content: "";
    display: block;
    margin: 0;
    padding: 0;
    width: 8px;
    height: 8px;
    border-top: 2px solid #d19b18;
    border-right: 2px solid #d19b18;
    behavior: url(-ms-transform.htc);
    transform: rotate(135deg);
  }
`;

const ScrollTitle = styled.span`
  display: block;
  text-transform: uppercase;
  color: #d19b18;
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 0.1em;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Slogan = styled.p`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  font-size: 130px;
  color: #fff;
  letter-spacing: 10px;
  text-align: center;
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const MainImg = styled.img`
  width: 100%;
  height: 550px;
  margin-top: 270px;
  vertical-align: bottom;
  object-fit: cover;
`;

const fadeInPosition = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Title = styled.p`
  font-size: 70px;
  color: #fff;
  padding: 50px;
  text-align: center;
  margin: 380px 0;

  animation: ${fadeInPosition} 1s ease-in-out;
`;

const AllBarTitleSection = styled.div`
  text-align: left;
`;

const AllBarSubTitle = styled.p`
  color: #d19b18;
  font-size: 20px;
  margin-bottom: 20px;
`;

const AllBarTitle = styled.h2`
  color: #fff;
  font-size: 40px;
  margin-bottom: 20px;
`;

const AllBarSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin: 100px 0;
  justify-content: center;
`;

const BarSection = styled(Link)`
  text-decoration: none;
`;

const BarTitle = styled.div`
  width: 250px;
  font-size: 20px;
  padding-top: 10px;
  color: #ffffffb9;
  margin: 20px 0;
`;

// const BarImg = styled.img`
//   width: 200px;
//   height: 200px;
//   border-radius: 50%;
//   padding: 10px;
//   border: 1px solid #ffffff7c;
//   margin-right: 10px;
// `;

const MoreBarsButton = styled.button`
  padding: 13px 40px;
  border: 1px solid #ffffff7c;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  font-size: 15px;
  margin-top: 80px;
  cursor: pointer;

  &:hover {
    background-color: #d19b18;
    color: #000;
    border: 1px solid #d19b18;
    transition: linear 0.2s;
  }
`;

const CalendarSubTitle = styled.p`
  color: #d19b18;
  margin: 200px 0 10px 0;
  font-size: 20px;
`;

const CalendarTitle = styled.h2`
  color: #fff;
  margin-bottom: 150px;
  font-size: 40px;
`;

const MapSubTitle = styled.p`
  font-size: 20px;
  margin: 200px 0 10px 0;
  color: #d19b18;
`;

const MapTitle = styled.p`
  font-size: 40px;
  color: #fff;
`;

const AlertWrapper = styled.div`
  position: absolute;
  top: 6%;
  left: 33%;
  z-index: 3;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #0000009d;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

const AlertSection = styled.div`
  width: 400px;
  height: 130px;
  border: 1px solid #fff;
  background-color: #d19b18;
  color: #fff;
  border-radius: 10px;
  text-align: left;
  padding: 15px;
  position: absolute;
  top: 50%;
  left: 32%;
`;

const AlertMessage = styled.div`
  font-size: 15px;
  padding: 15px 0;
  line-height: 20px;
`;

const AlertCheck = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonSection = styled.div``;

const CheckboxWrapper = styled.label`
  width: 120px;
  text-align: left;
`;

const CheckboxInput = styled.input`
  vertical-align: middle;
`;

const CheckboxLabel = styled.span`
  font-size: 10px;
  margin-left: 10px;
`;

const StyledEnterButton = styled.button`
  width: 60px;
  height: 20px;
  border: none;
  font-size: 10px;
  border-radius: 3px;

  &:hover {
    background-color: #cd863a;
  }
`;

const EnterButton = styled(Link)`
  text-decoration: none;
  color: #000;
  cursor: pointer;
`;

const CloseButton = styled.button`
  width: 60px;
  height: 20px;
  font-size: 10px;
  border: none;
  border-radius: 3px;
  margin-left: 5px;
  color: #000;
  cursor: pointer;

  &:hover {
    background-color: #cd863a;
  }
`;

interface IMainBar {
  id: string;
  name: string;
  img: string;
  description: string;
}

interface IMainEvent {
  bar: string;
  content: string;
  time: Timestamp;
  id: string;
}

interface IAlertEvent {
  time: {
    seconds: number;
  };
  bar: string;
  id: string;
}

export interface IMainProps {}

const MainPage: React.FC<IMainProps> = (props: IMainProps) => {
  const [bars, setBars] = useState<IMainBar[]>([]);
  const [events, setEvents] = useState<IMainEvent[]>([]);
  const [showMore, setShowMore] = useState(false);
  const barsCollectionRef = collection(db, "bars");
  const eventsCollectionRef = collection(db, "events");

  useEffect(() => {
    // window.scrollTo(0, 0);
    const getBars = async () => {
      const data = await getDocs(barsCollectionRef);
      setBars(
        data.docs.map((doc) => ({...(doc.data() as IMainBar), id: doc.id}))
      );
    };

    const getEvents = async () => {
      const data = await getDocs(eventsCollectionRef);
      setEvents(
        data.docs.map((doc) => ({
          ...(doc.data() as IMainEvent),
          id: doc.id,
        }))
      );
    };

    getBars();
    getEvents();
  }, []);

  if (bars.length === 0) {
    return <p>Loading...</p>;
  }

  const slicedData = bars.slice(0, 8);

  // 當按鈕被點擊時，將 showMore 設為 true
  const handleShowMore = () => {
    setShowMore(true);
  };

  return (
    <>
      <Wrapper>
        <Alert events={events} />
        <ImageContainer>
          <Slogan>
            YOUR
            <br />
            HAPPINESS
          </Slogan>
          <MainImg src={main} />
        </ImageContainer>
        <ArrowWrapper>
          <WrapperInner>
            <ScrollDown>
              <ArrowDown></ArrowDown>
              <ScrollTitle>Scroll down</ScrollTitle>
            </ScrollDown>
          </WrapperInner>
        </ArrowWrapper>
        <Title>
          We've prepared various <br />
          types of bars for You!
        </Title>
        <Hashtag />
        <AllBarTitleSection>
          <AllBarSubTitle>ALL BARS LIST</AllBarSubTitle>
          <AllBarTitle>
            The adventure <br />
            starts now
          </AllBarTitle>
        </AllBarTitleSection>
        <AllBarSection>
          {slicedData.map((item) => (
            <BarSection to={`/bars/${item.id}`} key={item.id}>
              <BarTitle>
                {/* <div className="link">
                  <svg
                    viewBox="0 0 200 200"
                    width="100"
                    height="100"
                    xmlns="http://www.w3.org/2000/svg"
                    className="link__svg"
                    aria-labelledby="link1-title link1-desc"
                  >
                    <defs>
                      <clipPath id="circle-clip">
                        <path d="M 20, 100 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
                      </clipPath>
                    </defs>
                    <image
                      className="link__image"
                      xlinkHref={item.img[2]}
                      clipPath="url(#circle-clip)"
                      height="100%"
                      width="100%"
                      preserveAspectRatio="xMidYMid slice"
                    />
                    <path
                      id="link-circle"
                      className="link__path"
                      d="M 20, 100 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                      stroke="none"
                      fill="none"
                    />
                    <text className="link__text" textLength="460">
                      <textPath href="#link-circle" stroke="none">
                        {item.name} {item.name}
                      </textPath>
                    </text>
                  </svg>
                </div> */}
              </BarTitle>
            </BarSection>
          ))}
          {!showMore && (
            <MoreBarsButton onClick={handleShowMore}>More Bars</MoreBarsButton>
          )}
          {showMore && (
            <>
              {bars.slice(8).map((bar) => (
                <BarSection to={`/bars/${bar.id}`} key={bar.id}>
                  <BarTitle>
                    {/* <div className="link">
                      <svg
                        viewBox="0 0 200 200"
                        width="100"
                        height="100"
                        xmlns="http://www.w3.org/2000/svg"
                        className="link__svg"
                        aria-labelledby="link1-title link1-desc"
                      >
                        <defs>
                          <clipPath id="circle-clip">
                            <path d="M 20, 100 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" />
                          </clipPath>
                        </defs>
                        <image
                          className="link__image"
                          xlinkHref={bar.img[2]}
                          clipPath="url(#circle-clip)"
                          height="100%"
                          width="100%"
                          preserveAspectRatio="xMidYMid slice"
                        />
                        <path
                          id="link-circle"
                          className="link__path"
                          d="M 20, 100 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                          stroke="none"
                          fill="none"
                        />
                        <text className="link__text" textLength="480">
                          <textPath href="#link-circle" stroke="none">
                            {bar.name.toUpperCase()} {bar.name.toUpperCase()}
                          </textPath>
                        </text>
                      </svg>
                    </div> */}
                  </BarTitle>
                </BarSection>
              ))}
            </>
          )}
        </AllBarSection>
        <CalendarSubTitle>BAR EVENTS</CalendarSubTitle>
        <CalendarTitle>It's time to join the Bar Event!</CalendarTitle>
        <Calendar />
        <MapSubTitle>POSITION</MapSubTitle>
        <MapTitle>Where is the Bar?</MapTitle>
        <MainMap />
      </Wrapper>
    </>
  );
};

const Alert = ({events}: {events: IAlertEvent[]}) => {
  const [showAlert, setShowAlert] = useState(true);
  const [ischecked, setIsChecked] = useState(false);
  const [showBackground, setShowBackground] = useState(true); // 新增的狀態變數

  useEffect(() => {
    const hideAlertToday = localStorage.getItem("hideAlertToday");
    if (hideAlertToday === "true") {
      setShowAlert(false);
      setShowBackground(false);
    }
  }, []);

  if (events.length === 0) {
    return null;
  }

  const isToday = new Date().toDateString();

  const hasEvent = events.map((event) => {
    const eventDate = new Date(event.time.seconds * 1000);
    return eventDate.toDateString() === isToday;
  });

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setIsChecked(true);
      localStorage.setItem("hideAlertToday", "true");
    }
    return;
  }

  function handleCloseClick() {
    setShowAlert(false);
    setShowBackground(false); // 更新狀態變數
  }

  return (
    <>
      {showBackground && <Background />}
      <AlertWrapper>
        {showAlert &&
          events.map((event, index) => {
            return hasEvent[index] ? (
              <AlertSection key={index}>
                <AlertMessage>
                  今日 {event.bar} 有特別活動！
                  <br />
                  邀請您來共襄盛舉～
                </AlertMessage>
                <AlertCheck>
                  <CheckboxWrapper>
                    <CheckboxInput
                      type="checkbox"
                      checked={ischecked}
                      onChange={handleOnChange}
                    />
                    <CheckboxLabel>今日不再顯示</CheckboxLabel>
                  </CheckboxWrapper>
                  <ButtonSection>
                    <StyledEnterButton>
                      <EnterButton to={`/events/${event.id}`} key={event.id}>
                        Enter
                      </EnterButton>
                    </StyledEnterButton>
                    <CloseButton onClick={handleCloseClick}>Close</CloseButton>
                  </ButtonSection>
                </AlertCheck>
              </AlertSection>
            ) : null;
          })}
      </AlertWrapper>
    </>
  );
};

export default MainPage;
