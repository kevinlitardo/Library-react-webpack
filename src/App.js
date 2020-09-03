import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { BookProvider } from "./contexts/BookContext";
import { FavsProvider } from "./contexts/FavsContext";
import Menu from "./containers//Menu/Menu";
import BookList from "./containers//BookList/BookList";
import FavBooksList from "./containers/FavBooksList/FavBooksList";
import MobileMenu from "./components/MobileMenu/MobileMenu";
import PanelAdd from "./components/PanelAdd/PanelAdd";
import DesktopMenu from "./components/DesktopMenu/DesktopMenu";

export default function App() {
  const [menu, setMenu] = useState(false);
  const [newItemPanel, setNewItemPanel] = useState(false);

  const add = () => setNewItemPanel(true);
  const onCancel = () => setNewItemPanel(false);

  const showMenu = () => setMenu(true);
  const hideMenu = () => setMenu(false);

  return (
    <BookProvider>
      <FavsProvider>
        <Router>
          <>
            <Menu showMenu={showMenu} />
            <Route path="/" exact component={BookList} />
            <Route path="/favlist" component={FavBooksList} />
            <DesktopMenu hideMenu={hideMenu} add={add} />
            {menu && <MobileMenu hideMenu={hideMenu} add={add} />}
            {newItemPanel && (
              <PanelAdd onCancel={onCancel} hideMenu={hideMenu} />
            )}
          </>
        </Router>
      </FavsProvider>
    </BookProvider>
  );
}
