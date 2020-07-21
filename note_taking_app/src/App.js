import React, { useState, useEffect } from "react";
import './App.css';

function MainText({ determineValidSelection, determineLocation, addMainTextHighlight }) {

  const [text, setText] = useState([
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
        <div className="text-block" key ={index} index={index}>
          <div className="selectable-text-area" id={`title-${index}`} onMouseDown={(e) => determineLocation(e)} onMouseUp={() => determineValidSelection()}>
            {content.title}
          </div>
          <div className="selectable-text-area" id={`content-${index}`} onMouseDown={(e) => determineLocation(e)} onMouseUp={() => determineValidSelection()}>
            {content.content}
          </div>
        </div>
      ))}
    </section>
  );
}

function HighlightButton({ isValid, addNote, handleHighlightBtnClick }){

  const [highlights, setHighlights] = useState();

  const handleHighlightEvent = (e) => {

    const highlight = addNote();
    setHighlights(highlight);
    handleHighlightBtnClick(true);
  };

  return (
    <button id="highlight-btn" style={{ display: !isValid ? 'none' : 'block' }} title="Click to Highlight this Selection" className="fas fa-highlighter" onClick={(e) => handleHighlightEvent(e)}></button>
  );
}

function SidebarItem({ note, index }){

  const [location, setLocation] = useState();

  useEffect(() => {
    setLocation({ coordX: note.startCoordX, coordY: note.startCoordY })
  }, [note.startCoordX, note.startCoordY]);

  const handleListLinkEvent = () => {
    const section = document.querySelector('section');
    const div = document.querySelector(`#content-${index}`)
    //const span = document.querySelector(`location-${index}`);
    //console.log(document.querySelector(`content-${index}`));
    console.log(section.scrollTop);
    section.scrollTo(div.coordX, div.coordY);
    console.log(location);
  };

  return(
    <li onClick={handleListLinkEvent}>
      <p>
        {note.text}
      </p>
    </li>
  );
}


function App() {

  const [location, setLocation] = useState({coordX: 0, coordY: 0});

  const [isValid, setValidityValue] = useState(false);
  
  const [text, setText] = useState('');

  const [notes, setNotes] = useState([]);

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
    const compiledNote = { startCoordX: location.coordX, startCoordY: location.coordY, text };
    const newNotes = [...notes, compiledNote ]
    setNotes(newNotes);
    return(
      newNotes
    );
  };

  const determineLocation = (e) => {
    const x = e.pageX;
    const y = e.pageY;
    setLocation({ coordX: x, coordY: y });
  };

  const addMainTextHighlight = (index) => {

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
  };

  const handleHighlightBtnClick = (btnClicked) => {
      if(btnClicked){
        addMainTextHighlight();
      }
  };

  return (
    <div className="App">
      <header>
        <h1>AP Spanish Language and Culture</h1>
        <HighlightButton isValid={isValid} addNote={addNote} handleHighlightBtnClick={handleHighlightBtnClick} />
      </header>
      <main className="text-container">
        <MainText determineValidSelection={setValidityValue} determineLocation={determineLocation} addMainTextHighlight={addMainTextHighlight} />
        <aside>
          <h2>Notey notes</h2>
          <ol>
            {notes.map((note, index) => (
              <SidebarItem key={index} index={index} note={note}  />
            ))}
          </ol>
        </aside>
      </main>
    </div>
  );
}

export default App;


/* --------------------------------------------- */
/* GRAVEYARD */
/* ---------------------------------------------

  *****POTENTIALLY USEFUL FOR ADD HIGHLIGHT COMPONENT FUNCTION*******
  
    //if (e.target.classList.contains('selectable-text-area')){
      //setValue(window.getSelection().toString().trim());
      //addHighlight(value);
      //setValue('');

      { display: isValid ? "block" : "none" }

        const addNote = (text) => {
    const newNotes = [...notes, { text }];
    setNotes(newNotes);
  };

    const [notes, setNotes] = useState([
    {
      text: 'test test test test test test test test test test test.'
    },
  ]);


          {notes.map((note, index) => (
            <SidebarItem key={index} index={index} note={note} />
          ))}

            const checkTextTestTest = () => {
    var isValidTextSelection;
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
      console.log('checkTextTestTest If Statement Triggered - Pre Check;');
      console.log('isValidTextSelection: ', isValidTextSelection);
      console.log('isValid (State var): ', isValid);
      isValidTextSelection = true;
      setValidityValue(isValidTextSelection);
    } else {
      console.log('checkTextTestTest Else Statement Triggered - Pre Check;');
      console.log('isValidTextSelection: ', isValidTextSelection);
      console.log('isValid (State var): ', isValid);
      isValidTextSelection = false;
      setValidityValue(isValidTextSelection);
    }
    console.log('checkTextTestTest - Post Check;');
    console.log('isValidTextSelection: ', isValidTextSelection);
    console.log('isValid (State var): ', isValid);
  };

    const determineCoords = (win) => {
    win = win || window;
    var doc = win.document;
    var sel = doc.selection, range, rects, rect;
    var x = 0, y = 0;
    if (sel) {
      if (sel.type != "Control") {
        range = sel.createRange();
        range.collapse(true);
        x = range.boundingLeft;
        y = range.boundingTop;
      }
    } else if (win.getSelection) {
      sel = win.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0).cloneRange();
        if (range.getClientRects) {
          range.collapse(true);
          rects = range.getClientRects();
          if (rects.length > 0) {
            rect = rects[0];
          }
          x = rect.left;
          y = rect.top;
        }
        // Fall back to inserting a temporary element
        if (x == 0 && y == 0) {
          var span = doc.createElement("span");
          if (span.getClientRects) {
            // Ensure span has dimensions and position by
            // adding a zero-width space character
            span.appendChild(doc.createTextNode("\u200b"));
            range.insertNode(span);
            rect = span.getClientRects()[0];
            x = rect.left;
            y = rect.top;
            var spanParent = span.parentNode;
            spanParent.removeChild(span);

            // Glue any broken text nodes back together
            spanParent.normalize();
          }
        }
      }
    }

    console.log('x: ', x, 'y: ', y );
  }

            {notes.map((note, index) => (

          ))}
*/