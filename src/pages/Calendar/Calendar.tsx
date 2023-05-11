import {collection, getDocs} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {SlArrowLeft, SlArrowRight} from "react-icons/sl";
import {TiDeleteOutline} from "react-icons/ti";
import {Link} from "react-router-dom";
import styled from "styled-components/macro";
import {db} from "../../utils/firebase";
import "../Calendar/Calendar.css";

const CalendarWrapper = styled.div`
  width: 800px;
  margin-left: 50px;
  position: relative;
  border-radius: 5px;
  font-size: 16px;
  margin: 0 auto;
`;

const CalendarSection = styled.div`
  width: 800px;
  height: 720px;
  background-color: #ffffff33;
  border: 1px solid #ffffff7c;
  box-shadow: 2px 3px 10px #a27610;
  margin: 0 auto;
  border-radius: 10px;
`;

const CalendarSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  border-radius: 8px 8px 0 0;
  color: #fff;
`;

const CalendarWeekdaysSection = styled.div`
  display: flex;
  justify-content: space-around;
  color: #fff;
  padding: 8px;
  font-size: 4rem;
`;

const CalendarButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 2rem;
  color: #fff;
  margin: 0 20px;
  padding-top: 15px;
`;

const CalendarMonth = styled.div`
  font-weight: bold;
  font-size: 4rem;
`;

const Arrow = styled.div`
  display: flex;
`;

const CalendarDay = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  padding-left: 34%;

  &.calendar__day--today {
    background-color: #c48370;
    color: #fff;
    margin-left: 15px;
    padding-left: 5px;
  }
  &.calendar__day--event {
    background-color: #ff8800a0;
    color: #fff;
    margin-left: 15px;
    padding-left: 5px;

    &:hover {
      background-color: #e39b489f;
      transition: ease 0.5s;
      transform: translateY(-5px);
    }
  }
  &.calendar__day--selected {
    background-color: #e6af70b7;
    color: #fff;
    margin-left: 15px;
    padding-left: 5px;
  }
`;

const CalendarDaysSection = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  padding: 10px;
  border-radius: 0 0 8px 8px;
  color: #fff;
`;

const CalendarDayEmpty = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  border-radius: 50%;
  background-color: #f5f5f55c;
  cursor: pointer;
  margin-left: 20px;
`;

const CalendarDayHeader = styled.div`
  width: 140px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
`;

const OuterDiv = styled.div`
  width: 90%;
  height: 480px;
  border: 1px solid #ffffff7c;
  padding: 10px;
  margin: 0 auto;
  position: relative;
  background-color: #ffffffbb;
  box-shadow: 5px 3px 10px #ffffff7c;
`;

const InnerDiv = styled.div`
  width: 100%;
  height: 510px;
  border: 1px solid #ffffff7c;
  margin-top: -25px;
  background-color: #ffffffbb;
  padding: 40px;
  box-shadow: 5px 3px 10px #ffffff7c;
`;

const Delete = styled.div`
  height: 40px;
  font-size: 2rem;
  color: #d19b18;
  text-align: right;

  &:hover {
    cursor: pointer;
    color: #d19a18a5;
    transition: ease 0.5s;
  }
`;

const EventSection = styled.div`
  width: 600px;
  height: 500px;
  position: absolute;
  top: 13%;
  left: 12%;
  border-radius: 10px;
`;

const EventTitle = styled.p`
  color: #d19b18;
  font-size: 2rem;
  margin: 20px 0 30px;
  font-weight: 700;
`;

const EventName = styled.p`
  color: #000;
  font-size: 1.5rem;
  margin-bottom: 40px;
`;

const EventContent = styled.p`
  color: #000000ac;
  font-size: 1rem;
  line-height: 18px;
  text-align: left;
  white-space: pre-wrap;
`;

const StyledEventButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0);
  position: absolute;
  bottom: 5%;
  right: 50%;
  cursor: pointer;
`;
const EventButton = styled(Link)`
  text-decoration: none;
  color: #d19b18;
  font-size: 1.5rem;
`;

interface IEvent {
  content: string;
  time: {
    seconds: number;
  };
  bar: string;
  id: string;
}

export interface ICalendarProps {}

const Calendar: React.FC<ICalendarProps> = (props: ICalendarProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<IEvent[]>([]);
  const eventsCollectionRef = collection(db, "events");

  useEffect(() => {
    const getEvents = async () => {
      const data = await getDocs(eventsCollectionRef);
      setEvents(
        data.docs.map((doc) => ({...(doc.data() as IEvent), id: doc.id}))
      );
    };

    getEvents();
  }, []);

  const prevMonth = () => {
    setSelectedDate((prevDate) => {
      const prevMonth = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() - 1,
        1
      );
      return prevMonth;
    });
  };

  const nextMonth = () => {
    setSelectedDate((prevDate) => {
      const nextMonth = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() + 1,
        1
      );
      return nextMonth;
    });
  };

  return (
    <CalendarWrapper>
      <CalendarSection>
        <CalendarHeader
          selectedDate={selectedDate}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
        <CalendarWeekdays />
        <CalendarDays
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          events={events}
        />
      </CalendarSection>
    </CalendarWrapper>
  );
};

const CalendarHeader = ({
  selectedDate,
  prevMonth,
  nextMonth,
}: {
  selectedDate: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}) => {
  const monthYear = selectedDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <CalendarSectionHeader>
      <CalendarMonth>{monthYear}</CalendarMonth>
      <Arrow>
        <CalendarButton onClick={prevMonth}>
          <SlArrowLeft />
        </CalendarButton>
        <CalendarButton onClick={nextMonth}>
          <SlArrowRight />
        </CalendarButton>
      </Arrow>
    </CalendarSectionHeader>
  );
};

const CalendarWeekdays = () => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <CalendarWeekdaysSection>
      {weekdays.map((weekday) => (
        <CalendarDayHeader key={weekday}>{weekday}</CalendarDayHeader>
      ))}
    </CalendarWeekdaysSection>
  );
};

const CalendarDays = ({
  selectedDate,
  setSelectedDate,
  events,
}: {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  events: IEvent[];
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isOuterDivVisible, setIsOuterDivVisible] = useState(true);

  if (events.length === 0) {
    return <p>Loading...</p>;
  }

  const startOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );

  const endOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  );
  const startWeekday = startOfMonth.getDay();

  const daysInMonth = endOfMonth.getDate();

  const days = [];
  for (let i = 1; i <= startWeekday; i++) {
    days.push(<CalendarDayEmpty key={`empty-${i}`} />);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      i
    );

    const isToday = date.toDateString() === new Date().toDateString();
    const isSelected = date.toDateString() === selectedDate.toDateString();
    const hasEvent = events.some((event) => {
      const eventDate = new Date(event.time.seconds * 1000); // 將時間戳記轉換為日期
      return eventDate.toDateString() === date.toDateString();
    });

    const handleClick = () => {
      setSelectedDate(date);
      const targetDate = new Date(date);
      targetDate.setHours(0, 0, 0, 0); // 將時間設定為 0
      const targetSeconds = Math.floor(targetDate.getTime() / 1000);
      setSeconds(targetSeconds);
    };

    days.push(
      <CalendarDay
        key={`day-${i}`}
        className={`
        ${isSelected ? "calendar__day--selected" : ""}
        ${hasEvent ? "calendar__day--event" : ""}
        ${isToday ? "calendar__day--today" : ""} 
        `}
        onClick={handleClick}
      >
        {i}
      </CalendarDay>
    );
  }

  const handleDeleteClick = () => {
    setIsOuterDivVisible(false);
  };

  return (
    <>
      <CalendarDaysSection>{days}</CalendarDaysSection>
      {events.map((event, index) => {
        const EventContentWithLineBreaks = event.content.replace(/。/g, "。\n");
        const daySeconds = event.time.seconds;
        if (seconds < daySeconds && daySeconds <= seconds + 86400) {
          return (
            <EventSection key={index}>
              <div>
                {isOuterDivVisible ? (
                  <OuterDiv>
                    <InnerDiv>
                      <Delete onClick={handleDeleteClick}>
                        <TiDeleteOutline />
                      </Delete>
                      <EventTitle>Today's Event</EventTitle>
                      <EventName>{event.bar}</EventName>
                      <EventContent>{EventContentWithLineBreaks}</EventContent>
                      <StyledEventButton>
                        <EventButton to={`/events/${event.id}`}>
                          <div className="btn">
                            <span className="btn__circle"></span>
                            <span className="btn__white-circle">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                id="icon-arrow-right"
                                viewBox="0 0 21 12"
                              >
                                <path d="M17.104 5.072l-4.138-4.014L14.056 0l6 5.82-6 5.82-1.09-1.057 4.138-4.014H0V5.072h17.104z"></path>
                              </svg>
                            </span>
                            <span className="btn__text">
                              Go to the Bar Event!
                            </span>
                          </div>
                        </EventButton>
                      </StyledEventButton>
                    </InnerDiv>
                  </OuterDiv>
                ) : null}
              </div>

              {/* {isOuterDivVisible && (
                <OuterDiv>
                  <InnerDiv>
                    <Delete onClick={handleDeleteClick}>
                      <TiDeleteOutline />
                    </Delete>
                    <EventTitle>Today's Event</EventTitle>
                    <EventName>{event.bar}</EventName>
                    <EventContent>{EventContentWithLineBreaks}</EventContent>
                    <StyledEventButton>
                      <EventButton to={`/events/${event.id}`}> */}
              {/* <main className="content" data-form-type="card"> */}
              {/* <div className="btn">
                          <span className="btn__circle"></span>
                          <span className="btn__white-circle">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              id="icon-arrow-right"
                              viewBox="0 0 21 12"
                            >
                              <path d="M17.104 5.072l-4.138-4.014L14.056 0l6 5.82-6 5.82-1.09-1.057 4.138-4.014H0V5.072h17.104z"></path>
                            </svg>
                          </span>
                          <span className="btn__text">
                            Go to the Bar Event!
                          </span>
                        </div> */}
              {/* </main> */}
              {/* </EventButton>
                    </StyledEventButton>
                  </InnerDiv>
                </OuterDiv> */}
              {/* )} */}
            </EventSection>
          );
        }
      })}
    </>
  );
};

export default Calendar;
