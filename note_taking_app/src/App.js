import React, { useState, useEffect } from "react";
import './styles/App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from './components/pages/Home.js';
import { makeStyles, withTheme } from "@material-ui/core/styles";
import { Drawer } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";


function MainText({ determineValidSelection, determineLocation }) {

  const [text] = useState([
    {
      content: <p>This course is primarily a comprehensive review of all previous knowledge pertaining to the Spanish language. This class builds upon the skills developed within introductory and intermediate Spanish classes by applying each skill to a specific, contemporary context (health, education, careers, literature, history, family, relationships, and environment being common themes). Thus, the students strive to refine their skills in writing, reading, speaking, and understanding spoken Spanish. Students concentrate on developing proficiency in such skills specifically in preparation for the AP Spanish Language examination. In addition, this course will emphasize mastery of linguistic competencies at a very high level of proficiency.
      Despite the best attempts by the College Board the AP Spanish Language curriculum is very fluid. Individual teachers can choose to present as much or as little information as possible. Because teachers inherently have different methods of pedagogy, issues arise that pertain to the necessity of a standardized Spanish curriculum for the exam. Because the Spanish language is so eclectic and can be tested in a plethora of manners, a more solidified curriculum covering specific vocabulary, verb forms and usages, expressions, and other facets of the language may be required in the future.
        While some students may be concerned about their ability to demonstrate proficiency in an assessment that native speakers of Spanish also take, only the scores of students who study Spanish as a second language are factored when creating the distribution curve of scores 1-5. Native speakers or heritage language speakers of Spanish are then compared to non-native distribution and assigned a score accordingly.</p>,
      title: <h2> The course</h2>
    },
    {
      content: <p>As of May 2017, the exam, normally administered on a Tuesday morning in May, is divided into seven sections. Section one contains sections of reading comprehension, in which students read four different passages and then answer multiple-choice questions about them. This section is 40 minutes.
      Section two contains readings with audio accompaniment, and asks students multiple-choice questions to compare and contrast the two as well as synthesize each one individually. Section three contains audio presentations of approximately three minutes and has multiple-choice questions. The two sections combined are allotted 55 minutes.
      In section four, students respond to a formal e-mail with a short response and ask questions to the author. This section is 15 minutes.
      In section five, a formal writing component takes the shape of a document-based question. Students must use two sources as well as listen to a recording to give a written answer to the question.
      Section six is an informal speaking section, where students are expected to interact to a recorded dialogue, during which they have 20 seconds to answer each section. Section seven asks students to give a formal oral presentation with a cultural comparison document and have four minutes to prepare and two minutes to record.
      The test is approximately three and 1/2 hours in length.
        Note: As of 2017, all audio responses must be digitally submitted online as an mp3 file. CD players are no longer accepted.</p>,
    title: <h2> The exam</h2>
    },
    {
      content: <p>Greatly Lorems the amet from incoming ipsum when loreming with an ipsum. Whether we wanted it or not, we've stepped into a war with the Cabal on Mars.So let's get to taking out their command, one by one.
        Valus Ta'aurc. From what I can gather he commands the Siege Dancers from an Imperial Land Tank outside of Rubicon. He's well protected, but with the right team, we can punch through those defences, take this beast out, and break their grip of Freehold.</p>,
      title: <h2>How to lorem without ipsuming</h2>
    }
  ]);


  return (
    <section className="main-text">
      {text.map((content, index) => (
        <div className="text-block" id={`text-block-${index}`} key ={index} index={index}>
          <div className="selectable-text-area" id={`title-${index}`} onMouseDown={(e) => determineLocation(e, index)} onMouseUp={() => determineValidSelection()}>
            {content.title}
          </div>
          <div className="selectable-text-area" id={`content-${index}`} onMouseDown={(e) => determineLocation(e, index)} onMouseUp={() => determineValidSelection()}>
            {content.content}
          </div>
        </div>
      ))}
    </section>
  );
}

function HighlightButton({ isValid, addNote, handleHighlightBtnClick, location }){

  const [highlights, setHighlights] = useState();


  // const btnWidth = getComputedStyle(highlightBtn).width.slice(0, -2); btnWidth*0.5
  // const btnHeight = getComputedStyle(highlightBtn).height.slice(0, -2); btnHeight*0.5
  const invisible = { display: 'none', top: '0px', left: '0px' };

  useEffect(() => {
    if (isValid) {
      const highlightBtn = document.querySelector('button');

      const btnWidth = getComputedStyle(highlightBtn).width.slice(0, -2);
      const btnHeight = getComputedStyle(highlightBtn).height.slice(0, -2);

      const visible = { display: 'block', top: `${location.coordY - btnHeight}px`, left: `${location.coordX - btnWidth}px` };

      setHighlights(visible);
    } else {
      setHighlights(invisible);
    }
  }, [location, isValid])

  const handleHighlightEvent = () => {
    addNote();
    handleHighlightBtnClick(true);
    setHighlights(invisible);
  };

  // const determineButtonStyles = () => {
  //   if(isValid){
  //     return (
  //       console.log('visible'),
  //       { display: 'block', top: `${location.coordY}px`, left: `${location.coordX}px` }
  //     );
  //   } else {
  //     return (
  //       console.log('not visible'),
  //       { display: 'none', top: '0px', left: '0px' }
  //     );
  //   }
  // };

  return (
    <button id="highlight-btn" style={highlights} title="Click to Highlight this Selection" className="fas fa-highlighter" onClick={(e) => handleHighlightEvent(e)}></button>
  );
}

function SidebarItem({ note, index }){

  const [location, setLocation] = useState();

  useEffect(() => {
    setLocation({ coordX: note.startCoordX, coordY: note.startCoordY, highlightLink: note.highlightLink })
  }, [note.startCoordX, note.startCoordY, note.highlightLink]);

  const handleListLinkEvent = () => {
    const targetHighlightLink = document.querySelector(location.highlightLink);
    targetHighlightLink.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
  };

  return(
    <li onClick={handleListLinkEvent}>
      <p>
        {note.text}
      </p>
    </li>
  );
}

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: "inherit",
    display: "inline-block",
    height: "40px",
    overflowY: "hidden",
  },
  menuArrowStyles: {
    color: theme.palette.primary.light,
    fontSize: "300%",
    position: "absolute",
    textAlign: "center",
    left: `${window.innerWidth / 2}px`,
    transform: "translate(0, -20px)",
    display: "block",
  },
}));


function App() {

  const [location, setLocation] = useState({ coordX: 0, coordY: 0, highlightLink: ''});

  const [isValid, setValidityValue] = useState(false);
  
  const [text, setText] = useState('');

  const [notes, setNotes] = useState([]);

  const [isOpen, setMenuOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {

      const selection = window.getSelection();
      const selectedText = selection.toString().trim();
      if (selectedText.length > 0) {
        setText(selectedText);
        setValidityValue(true);
      } else {
        setValidityValue(false);
      }
  }, [isValid]);

  const addNote = () => {
    const compiledNote = { startCoordX: location.coordX, startCoordY: location.coordY, highlightLink: location.highlightLink, text };
    const newNotes = [...notes, compiledNote ]
    setNotes(newNotes);
    return(
      newNotes
    );
  };

  const determineLocation = (e) => {
    const x = e.pageX;
    const y = e.pageY;
    //const parentContainer = e.target.parentElement.id;
    const highlightLink=`span#location-${document.querySelectorAll('span').length-1}`;
    //console.log(highlightLink);
    setLocation({ coordX: x, coordY: y, highlightLink: highlightLink });
    setValidityValue(false);
  };

  const addMainTextHighlight = () => {

    function windowSelect() {
      return(window.getSelection());
    }

    let i = document.querySelectorAll('span').length -1;

    let myAnchorNodeValue = windowSelect().anchorNode.nodeValue;
    //BEGINNING COORD OF SELECTION
    let myAnchorOffset = windowSelect().anchorOffset;
    //END COORD OF SELECTION
    let myFocusOffset = windowSelect().focusOffset;
    //RETURNS USER SPECIFIED SELECTION
    let userSelection = myAnchorNodeValue.slice(myAnchorOffset, myFocusOffset);

    let selectionId = (windowSelect().anchorNode.parentElement.parentElement.getAttribute('id'));

    let p = document.querySelectorAll(`#${selectionId} p`);

    p.forEach((element, index) => {
      element.setAttribute('id', index);
    });

    let selectedChild = windowSelect().anchorNode.parentElement.getAttribute('id');

    let foobar = p[selectedChild].firstChild;

    let bar = foobar.splitText(myAnchorOffset);
    
    //CREATING AND ATTACHING HIGHLIGHT
    let span = document.createElement('span');
    span.classList.add('highlight');
    span.setAttribute('id', `location-${i}`);
    span.appendChild(document.createTextNode(userSelection));
    p[selectedChild].insertBefore(span, bar);

    //REMOVES THE PLAIN, NON-HIGHLIGHTED TEXT
    let myFocusNodeValue = windowSelect().focusNode.nodeValue;
    windowSelect().focusNode.nodeValue = myFocusNodeValue.slice(myFocusOffset - myAnchorOffset);
    p[selectedChild].normalize();

    windowSelect().removeAllRanges();
    setValidityValue(false);
  };

  const handleHighlightBtnClick = (btnClicked) => {
      if(btnClicked){
        addMainTextHighlight();
      }
  };

  const handleMenuOpen = (e) => {
    let y = e.clientY;

    if(y <= 40){
      setMenuOpen(true);
    }
    else{
      setMenuOpen(false);
    }
  };

  return (
    <Router>
      <div className="App" onMouseMove={(e) => handleMenuOpen(e)}>
      <div>
        <Drawer
          variant="temporary"
          anchor="top"
          open={isOpen}
          classes={{ paper: classes.drawerPaper }}
          >
            <Link to="/" style={{ left: `${window.innerWidth / 2}px` }} >Home</Link>
            &nbsp;|&nbsp;
            <Link to="/notes">Notey</Link>
            <ArrowDropUpIcon className={classes.menuArrowStyles} />
        </Drawer>
        
        <ArrowDropDownIcon className={classes.menuArrowStyles} />
      </div>
        <Switch>
          <Route path="/notes" render={() => (
            <React.Fragment>
              <header>
                <h1>AP Spanish Language and Culture</h1>
              </header>
              <main className="text-container">
                <HighlightButton isValid={isValid} location={location} addNote={addNote} handleHighlightBtnClick={handleHighlightBtnClick} />
                <MainText determineValidSelection={setValidityValue} determineLocation={determineLocation} addMainTextHighlight={addMainTextHighlight} />
                <aside>
                  <h2>Notey notes</h2>
                  <ol>
                    {notes.map((note, index) => (
                      <SidebarItem key={index} index={index} note={note} />
                    ))}
                  </ol>
                </aside>
              </main>
            </React.Fragment>
          )} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;


/* --------------------------------------------- */
/* GRAVEYARD */
/* ---------------------------------------------

        <Drawer
          variant="persistent"
          anchor="top"
          open={true}
          classes={{ paper: classes.drawerPaper }} 
          >
          <Link to="/">Home</Link>
          &nbsp;|&nbsp;
          <Link to="/notes">Notey</Link>
        </Drawer>

*/