import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import './App.css';
import ApiContext from '../ApiContext';

class App extends Component {
  state = {
      notes: [],
      folders: []
  };

  
  componentDidMount() {
      // fake date loading from API call
    this.getFolders()
    this.getNotes();
  }

  getFolders = () => {
    fetch('http://localhost:9090/folders')
    .then(response => response.json())
    .then(resjson => {
      this.setState({
        folders: resjson
      })
    })
  }

  getNotes = () => {
    fetch('http://localhost:9090/notes')
    .then(response => response.json())
    .then(resjson => {
      this.setState({
        notes: resjson
      })
    })
  }

  deleteNote = noteId => {
    this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
    });
};


  renderNavRoutes() {
    return (
        <>
            {['/', '/folder/:folderId'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    component={NoteListNav}/>
                    )
                  )}
            <Route path="/note/:noteId" component={NotePageNav}/>
            <Route path="/add-folder" component={NotePageNav} />
            <Route path="/add-note" component={NotePageNav} />
        </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
            <Route
                exact
                key={path}
                path={path}
                component={NoteListMain}
                        />
            ))}
        <Route path="/note/:noteId" component={NotePageMain} />
      </>
  );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote
  };
    return (
     <ApiContext.Provider value={value}>
          <div className="App">
              <nav className="App__nav">{this.renderNavRoutes()}</nav>
              <header className="App__header">
                  <h1>
                      <Link to="/">Noteful</Link>{' '}
                      <FontAwesomeIcon icon="check-double" />
                  </h1>
              </header>
              <main className="App__main">{this.renderMainRoutes()}</main>
          </div>
      </ApiContext.Provider>
      );
  }
}

export default App;
