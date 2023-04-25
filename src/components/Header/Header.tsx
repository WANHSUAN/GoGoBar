import {useState} from "react";
import styled from "styled-components/macro";
import "./styles.css";
import {Link} from "react-router-dom";
import algoliasearch from "algoliasearch/lite";
import {
  SearchBox,
  Hits,
  Index,
  Highlight,
  InstantSearch,
  Snippet,
  CurrentRefinements,
} from "react-instantsearch-hooks-web";

import {HiBars3CenterLeft} from "react-icons/hi2";
import {TfiClose} from "react-icons/tfi";
import side from "./side.png";

const searchClient = algoliasearch(
  "W1FJ2ENITZ",
  "2e0351bed6525d14fcf871febd4909f2"
);

const Wrapper = styled.div`
  position: fixed;
  z-index: 4;
`;

const Nav = styled.div`
  width: 100vw;
  height: 60px;
  background-color: #000;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
`;

const Menu = styled.p`
  color: #fff;
  margin: 0;
  font-size: 20px;
`;

const MenuSection = styled.div`
  display: flex;
  gap: 20px;
  padding-top: 5px;
`;

const NavButton = styled.button`
  width: 20px;
  height: 25px;
  border: none;
  color: #fff;
  background-color: #000;
  cursor: pointer;
`;

const Title = styled(Link)`
  font-size: 35px;
  color: #fff;
  text-decoration: none;
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
`;

const SearchItem = styled.button`
  width: 100px;
  height: 30px;
  background-color: #000;
  color: #fff;
  border: none;
  font-size: 20px;
  position: relative;
  cursor: pointer;
`;

const SideMenuWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url(${side}) no-repeat center center fixed;
  background-size: cover;
  z-index: 1;
`;

const SideMenuList = styled.ul`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  text-align: center;
  margin: 10% auto;
  gap: 40px;
`;

const MenuItem = styled.li`
  width: 400px;
  list-style: none;
  font-size: 70px;
  margin: 20px 0;
  padding: 0 30px;
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 16px;
  color: #fff;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const SearchWrapper = styled.div`
  text-align: center;
  margin: 0 auto;
`;

const InstantSearchContainer = styled.div`
  width: 400px;
  position: absolute;
  top: 30px;
  right: 0;
  ul,
  ol {
    list-style: none;
    padding: 0;
    margin: 0;
    position: relative;
    top: 0;
    right: 11%;
  }
`;

const SelectBarsButton = styled.button`
  width: 97px;
  height: 30px;
  border: 1px solid #fff;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(3px);
  color: #fff;
  position: absolute;
  top: 80px;
  right: 145px;
  cursor: pointer;

  &:hover {
    background-color: #d19b18;
    border: #d19b18;
  }
`;

const SelectEventsButton = styled.button`
  width: 97px;
  height: 30px;
  border: 1px solid #fff;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(3px);
  color: #fff;
  position: absolute;
  top: 80px;
  right: 45px;
  cursor: pointer;

  &:hover {
    background-color: #d19b18;
    border: #d19b18;
  }
`;

const SearchBarSection = styled(Link)`
  text-decoration: none;
`;

const StyledSearchBarSection = styled.div`
  padding: 5px;
  text-align: left;
  line-height: 30px;
`;

const BarName = styled.p`
  color: #d19b18;
  font-size: 35px;
  padding: 10px;
`;

const BarAddress = styled.p`
  color: #fff;
  font-size: 15px;
  padding: 10px;
`;

const BarTel = styled.p`
  color: #c3c1c4;
  font-size: 15px;
  padding: 10px;
`;

const BarIntroduction = styled.p`
  color: #be7808;
  font-size: 15px;
  padding: 5px;
  text-align: left;
`;

const StyledSearchEventSection = styled.div``;

const SearchEventSection = styled(Link)`
  text-decoration: none;
`;

const EventBar = styled.p`
  color: #d19b18;
  font-size: 35px;
  padding: 15px;
  text-align: left;
`;

const EventContent = styled.p`
  color: #be7808;
  font-size: 15px;
  padding: 20px;
  text-align: left;
`;

type HandleSideMenuType = () => void;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isToggle, setIsToggle] = useState(false);

  const handleSideMenu: HandleSideMenuType = () => {
    setIsToggle(!isToggle);
  };

  function OpenSearch() {
    setIsOpen(!isOpen);
  }

  return (
    <Wrapper>
      <Nav>
        <MenuSection>
          <NavButton onClick={handleSideMenu}>
            {isToggle ? <TfiClose /> : <HiBars3CenterLeft />}
          </NavButton>
          {isToggle && <SideMenu handleSideMenu={handleSideMenu} />}
          <Menu>MENU</Menu>
        </MenuSection>
        <Title to={"./main"}>CHEERS</Title>
        <SearchSection>
          <SearchItem onClick={OpenSearch}>SEARCH</SearchItem>
          {isOpen && <Search />}
        </SearchSection>
      </Nav>
    </Wrapper>
  );
};

function SideMenu({handleSideMenu}: {handleSideMenu: HandleSideMenuType}) {
  return (
    <>
      <SideMenuWrapper>
        <SideMenuList>
          <MenuItem>
            <StyledLink onClick={handleSideMenu} to={"/member"}>
              Member
            </StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink onClick={handleSideMenu} to={"/main"}>
              All Bars
            </StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink onClick={handleSideMenu} to={"/category"}>
              Category
            </StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink onClick={handleSideMenu} to={"/main"}>
              Log Out
            </StyledLink>
          </MenuItem>
        </SideMenuList>
      </SideMenuWrapper>
    </>
  );
}

const MySearchComponent = () => {
  const [showBars, setShowBars] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [searchBoxVisible, setSearchBoxVisible] = useState(true); // 新增一個狀態用來控制 SearchBox 的顯示

  const BarsTemplate = ({
    hit,
  }: {
    hit: {
      objectID: string;
      name: string;
      address: string;
      tel: string;
      introduction: string;
      __position: number;
    };
  }) => {
    return (
      <StyledSearchBarSection onClick={() => setSearchBoxVisible(false)}>
        <SearchBarSection to={`/bars/${hit.objectID}`}>
          <BarName>
            <Highlight
              attribute="name"
              hit={hit}
              nonHighlightedTagName="span"
            />
          </BarName>
          <BarAddress>
            <Highlight
              attribute="address"
              hit={hit}
              nonHighlightedTagName="span"
              highlightedTagName="mark"
            />
          </BarAddress>
          <BarTel>
            <Highlight attribute="tel" hit={hit} nonHighlightedTagName="span" />
          </BarTel>
          <BarIntroduction>
            <Snippet
              attribute="introduction"
              hit={hit}
              nonHighlightedTagName="span"
              highlightedTagName="mark" // 指定 highlight 顯示的標籤
            />
          </BarIntroduction>
        </SearchBarSection>
      </StyledSearchBarSection>
    );
  };

  const EventsTemplate = ({
    hit,
  }: {
    hit: {objectID: string; bar: string; content: string; __position: number};
  }) => {
    return (
      <StyledSearchEventSection onClick={() => setSearchBoxVisible(false)}>
        <SearchEventSection to={`/events/${hit.objectID}`}>
          <EventBar>
            <Highlight attribute="bar" hit={hit} nonHighlightedTagName="span" />
          </EventBar>
          <EventContent>
            <Snippet
              attribute="content"
              hit={hit}
              nonHighlightedTagName="span"
            />
          </EventContent>
        </SearchEventSection>
      </StyledSearchEventSection>
    );
  };

  const handleBarsClick = () => {
    setShowBars(true);
    setShowEvents(false);
    setSearchBoxVisible(true); // 當切換到 Bars 時，顯示 SearchBox
  };

  const handleEventsClick = () => {
    setShowBars(false);
    setShowEvents(true);
    setSearchBoxVisible(true); // 當切換到 Bars 時，顯示 SearchBox
  };
  return (
    <>
      <InstantSearchContainer>
        <InstantSearch searchClient={searchClient} indexName="bars">
          <CurrentRefinements />
          {searchBoxVisible && (
            <>
              <SearchBox
                placeholder="Search"
                searchAsYouType={true}
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowBars(!showBars);
                  setShowEvents(!showEvents);
                }}
              />
              <SelectBarsButton onClick={handleBarsClick}>
                Bars
              </SelectBarsButton>
              <SelectEventsButton onClick={handleEventsClick}>
                Events
              </SelectEventsButton>
              {showBars ? <Hits hitComponent={BarsTemplate} /> : null}
              <Index indexName="events">
                {showEvents ? <Hits hitComponent={EventsTemplate} /> : null}
              </Index>
            </>
          )}
        </InstantSearch>
      </InstantSearchContainer>
    </>
  );
};

const Search = () => {
  return (
    <SearchWrapper>
      <MySearchComponent />
    </SearchWrapper>
  );
};

export default Header;
