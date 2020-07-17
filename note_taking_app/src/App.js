import React, { useState } from "react";
import './App.css';

function MainText({ addhighlight }) {

  const [text] = useState([
    {
      content: `This course is primarily a comprehensive review of all previous knowledge pertaining to the Spanish language. This class builds upon the skills developed within introductory and intermediate Spanish classes by applying each skill to a specific, contemporary context (health, education, careers, literature, history, family, relationships, and environment being common themes). Thus, the students strive to refine their skills in writing, reading, speaking, and understanding spoken Spanish. Students concentrate on developing proficiency in such skills specifically in preparation for the AP Spanish Language examination. In addition, this course will emphasize mastery of linguistic competencies at a very high level of proficiency.
        Despite the best attempts by the College Board the AP Spanish Language curriculum is very fluid. Individual teachers can choose to present as much or as little information as possible. Because teachers inherently have different methods of pedagogy, issues arise that pertain to the necessity of a standardized Spanish curriculum for the exam. Because the Spanish language is so eclectic and can be tested in a plethora of manners, a more solidified curriculum covering specific vocabulary, verb forms and usages, expressions, and other facets of the language may be required in the future.
        While some students may be concerned about their ability to demonstrate proficiency in an assessment that native speakers of Spanish also take, only the scores of students who study Spanish as a second language are factored when creating the distribution curve of scores 1-5. Native speakers or heritage language speakers of Spanish are then compared to non-native distribution and assigned a score accordingly.`,
      title: 'The course'
    },
    {
      content: `As of May 2017, the exam, normally administered on a Tuesday morning in May, is divided into seven sections. Section one contains sections of reading comprehension, in which students read four different passages and then answer multiple-choice questions about them. This section is 40 minutes.
        Section two contains readings with audio accompaniment, and asks students multiple-choice questions to compare and contrast the two as well as synthesize each one individually. Section three contains audio presentations of approximately three minutes and has multiple-choice questions. The two sections combined are allotted 55 minutes.
        In section four, students respond to a formal e-mail with a short response and ask questions to the author. This section is 15 minutes.
        In section five, a formal writing component takes the shape of a document-based question. Students must use two sources as well as listen to a recording to give a written answer to the question.
        Section six is an informal speaking section, where students are expected to interact to a recorded dialogue, during which they have 20 seconds to answer each section. Section seven asks students to give a formal oral presentation with a cultural comparison document and have four minutes to prepare and two minutes to record.
        The test is approximately three and 1/2 hours in length.
        Note: As of 2017, all audio responses must be digitally submitted online as an mp3 file. CD players are no longer accepted.`,
      title: 'The exam'
    },
    {
      content: `Greatly Lorems the amet from incoming ipsum when loreming with an ipsum. Whether we wanted it or not, we've stepped into a war with the Cabal on Mars.So let's get to taking out their command, one by one.
        Valus Ta'aurc. From what I can gather he commands the Siege Dancers from an Imperial Land Tank outside of Rubicon. He's well protected, but with the right team, we can punch through those defences, take this beast out, and break their grip of Freehold.`,
      title: 'How to lorem without ipsuming'
    }
  ]);

  return (
    <section className="main-text">
      {text.map((content, index) => (
        <div className="text-block" key ={index} index={index}>
          <h2 className="selectable-text-area">
            {content.title}
          </h2>
          <p className="selectable-text-area">
            {content.content}
          </p>
        </div>
      ))}
    </section>
  );
}

function Highlighter(addHighlight){

  const [value, setValue] = useState('');

  const handleHighlight = (e) => {
    //if (e.target.classList.contains('selectable-text-area')){
      //const selectedText = window.getSelection().toString().trim();
      setValue(window.getSelection().toString().trim());
      addHighlight(value);
      setValue('');
      console.log('leedle');
    
  }
  
  return (
      <ion-icon onClick={handleHighlight} name="enter-outline"></ion-icon>
  );
}

function SidebarItem(note){
  return(
    <p>

      {note.text}
    </p>
  );
}


function App() {

  const [notes, setNotes] = useState([
    {
      text: 'test test test test test test test test test test test.'
    }
  ]);


  const addHighlight = text => {
    const newNotes = [...notes, { text }];
    setNotes(newNotes);
  }

  return (
    <div className="App">
      <header>
        <h1>AP Spanish Language and Culture</h1>
      </header>
      <main className="text-container">
        <MainText />
        <Highlighter addHighlight={addHighlight} />
        <aside>
            {notes.map((note, index) => (
              console.log(note, index),
              <SidebarItem key={index} index={index} note={note} />
            ))}
        </aside>
      </main>
    </div>
  );
}

export default App;
