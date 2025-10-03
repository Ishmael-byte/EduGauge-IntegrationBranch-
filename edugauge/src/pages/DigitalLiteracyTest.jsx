import React, { useState } from "react";
import './DigitalLiteracyTest.css';

function DigitalLiteracyTest() {
  const pages = [
    {
      title: "File & Folder Management",
      questions: [
        {
          question: "Which of the following is the correct way to create a new folder on most computers?",
          options: [
            "a) Right-click → New → Folder", 
            "b) Delete old folders → Rename desktop", 
            "c) Press Ctrl+Alt+Del", 
            "d) Search in Google"],
          name: "q1"
        },
        {
          question: "A file with the extension .docx is usually opened with:",
          options: [
            "a) Microsoft Word", 
            "b) Microsoft Excel", 
            "c) Microsoft PowerPoint", 
            "d) Adobe Photoshop"],
          name: "q2"
        },
        {
          question: "What does it mean to 'zip' a file or folder?",
          options: [
            "a) Delete it permanently", 
            "b) Compress it into a smaller size for storage or sharing", 
            "c) Encrypt it with a password", 
            "d) Convert it to a PDF"],
          name: "q3"
        },
        {
          question: "Which file format is best for sharing a read-only version of a document?",
          options: [
            "a) .docx", 
            "b) .xlsx", 
            "c) .pdf", 
            "d) .pptx"],
          name: "q4"
        },
        {
          question: "If a file is accidentally deleted and sent to the Recycle Bin/Trash, you can:",
          options: [
            "a) Recover it by restoring from the bin", 
            "b) Access it without doing anything", 
            "c) It is permanently gone", 
            "d) Find it in the Downloads folder"],
          name: "q5"
        },
        {
          question: "The main folder or location where all files are stored in Windows is called:",
          options: [
            "a) Desktop", 
            "b) Documents", 
            "c) C: Drive", 
            "d) System32"],
          name: "q6"
        },
        {
          question: "Which symbol is used to separate folders in a file path (Windows)?",
          options: [
            "a) /", 
            "b) \\", 
            "c) :", 
            "d) -"],
          name: "q7"
        },
        {
          question: "To quickly rename a file in Windows, you can:",
          options: [
            "a) Press F2 after selecting the file", 
            "b) Press Ctrl + N", 
            "c) Right-click and choose 'Copy'", 
            "d) Drag the file to another folder"],
          name: "q8"
        }
      ]
    },
    {
      title: "Microsoft Word",
      questions: [
        {
          question: "Which feature helps you automatically generate a list of chapter titles and page numbers?",
          options: [
            "a) Mail Merge", 
            "b) Table of Contents", 
            "c) Word Count", 
            "d) Track Changes"
          ],
          name: "q9"
        },
        {
          question: "To insert a citation or reference in Word, you should use:",
          options: [
            "a) Insert → Picture", 
            "b) References → Insert Citation", 
            "c) Layout → Breaks", 
            "d) Review → Spell Check"
          ],
          name: "q10"
        },
        {
          question: "Which shortcut saves your work in Word?",
          options: [
            "a) Ctrl + C", 
            "b) Ctrl + V", 
            "c) Ctrl + S", 
            "d) Ctrl + Z"
          ],
          name: "q11"
        },
        {
          question: "'Track Changes' in Word is useful for:",
          options: [
            "a) Changing font color", 
            "b) Reviewing and suggesting edits", 
            "c) Checking grammar only", 
            "d) Copying text between documents"
          ],
          name: "q12"
        },
        {
          question: "To adjust the line spacing in a document, go to:",
          options: [
            "a) File → Save As", 
            "b) Review → Spelling", 
            "c) Home → Line and Paragraph Spacing", 
            "d) Insert → Symbol"
          ],
          name: "q13"
        },
        {
          question: "The function of 'Styles' in Word is to:",
          options: [
            "a) Change the document layout", 
            "b) Apply consistent formatting across headings and text", 
            "c) Check for spelling errors", 
            "d) Insert page numbers"
          ],
          name: "q14"
        },
        {
          question: "Where do you insert a header or footer in Word?",
          options: [
            "a) Insert → Header & Footer", 
            "b) Layout → Page Setup", 
            "c) Review → Comments", 
            "d) References → Insert Citation"
          ],
          name: "q15"
        },
        {
          question: "Which feature in Word checks spelling and grammar automatically?",
          options: [
            "a) Mail Merge", 
            "b) SmartArt", 
            "c) Proofing Tool", 
            "d) Hyperlink"
          ],
          name: "q16"
        },
        {
          question: "A 'Page Break' in Word does what?",
          options: [
            "a) Deletes a page", 
            "b) Moves content to the next page", 
            "c) Closes the document", 
            "d) Adds a table"
          ],
          name: "q17"
        }
      ]
    },
    {
      title: "Microsoft PowerPoint",
      questions: [
        {
          question: "The 'Slide Master' is used for:",
          options: [
            "a) Creating tables in Excel", 
            "b) Managing overall design and layout for all slides", 
            "c) Adding audio to slides", 
            "d) Printing slides as notes"
          ],
          name: "q18"
        },
        {
          question: "Which file extension belongs to PowerPoint presentations?",
          options: [
            "a) .xlsx", 
            "b) .pptx", 
            "c) .docx", 
            "d) .zip"
          ],
          name: "q19"
        },
        {
          question: "To make a slide transition, you should go to:",
          options: [
            "a) Transitions tab", 
            "b) Insert tab", 
            "c) Review tab", 
            "d) File tab"
          ],
          name: "q20"
        },
        {
          question: "What's the most effective way to add a graph from Excel into a PowerPoint?",
          options: [
            "a) Screenshot the graph", 
            "b) Copy and Paste → Keep Source Formatting (or Embed)", 
            "c) Type the numbers manually", 
            "d) Use a photo editor"
          ],
          name: "q21"
        },
        {
          question: "When giving a presentation, which key starts the slideshow from the beginning?",
          options: [
            "a) F2", 
            "b) F5", 
            "c) Esc", 
            "d) Ctrl + P"
          ],
          name: "q22"
        },
        {
          question: "The 'Animation Pane' allows you to:",
          options: [
            "a) Adjust background colors", 
            "b) Control timing of text and object animations", 
            "c) Save a slideshow as PDF", 
            "d) Insert new slides"
          ],
          name: "q23"
        },
        {
          question: "Presenter View allows you to:",
          options: [
            "a) See your notes and upcoming slides while presenting", 
            "b) Print slides with notes", 
            "c) Switch between Word and PowerPoint", 
            "d) Hide animations"
          ],
          name: "q24"
        },
        {
          question: "Which option prints PowerPoint slides as handouts for students?",
          options: [
            "a) File → Export", 
            "b) File → Print → Handouts", 
            "c) Slide Sorter View", 
            "d) Design → Themes"
          ],
          name: "q25"
        },
        {
          question: "To insert a video in PowerPoint, you should:",
          options: [
            "a) Insert → Video", 
            "b) Review → Comments", 
            "c) View → Slide Master", 
            "d) File → Options"
          ],
          name: "q26"
        }
      ]
    },
    {
      title: "Microsoft Excel",
      questions: [
        {
          question: "In Excel, a formula always starts with:",
          options: [
            "a) =", 
            "b) +", 
            "c) #", 
            "d) :"
          ],
          name: "q27"
        },
        {
          question: "What is the function of =SUM(A1:A10)?",
          options: [
            "a) Adds up values in cells A1 to A10", 
            "b) Counts how many cells are filled in A1 to A10", 
            "c) Finds the average of A1 to A10", 
            "d) Subtracts A1 from A10"
          ],
          name: "q28"
        },
        {
          question: "Which symbol is used for multiplication in Excel formulas?",
          options: [
            "a) x", 
            "b) *", 
            "c) X", 
            "d) /"
          ],
          name: "q29"
        },
        {
          question: "To sort a list of names alphabetically in Excel, you should use:",
          options: [
            "a) Data → Sort A to Z", 
            "b) File → Save As", 
            "c) Home → Paste", 
            "d) Review → Comments"
          ],
          name: "q30"
        },
        {
          question: "Which chart type is best for showing proportions of a whole?",
          options: [
            "a) Line chart", 
            "b) Pie chart", 
            "c) Column chart", 
            "d) Scatter plot"
          ],
          name: "q31"
        },
        {
          question: "To filter only students who scored above 50 in Excel, you use:",
          options: [
            "a) Data → Filter", 
            "b) Insert → Chart", 
            "c) File → Options", 
            "d) View → Page Layout"
          ],
          name: "q32"
        },
        {
          question: "Which of these is an example of an absolute cell reference?",
          options: [
            "a) A1", 
            "b) $A$1", 
            "c) A$1", 
            "d) 1A"
          ],
          name: "q33"
        },
        {
          question: "Which feature applies formatting automatically when a condition is met?",
          options: [
            "a) Data Validation", 
            "b) Conditional Formatting", 
            "c) Freeze Panes", 
            "d) AutoSum"
          ],
          name: "q34"
        },
        {
          question: "The fill handle in Excel is used to:",
          options: [
            "a) Copy formulas or extend series", 
            "b) Print multiple sheets", 
            "c) Save the file", 
            "d) Insert a comment"
          ],
          name: "q35"
        }
      ]
    },
    {
      title: "Digital Collaboration & Cloud",
      questions: [
        {
          question: "Google Drive, OneDrive, and Dropbox are examples of:",
          options: [
            "a) Word processors", 
            "b) Cloud storage services", 
            "c) Antivirus programs", 
            "d) Internet browsers"
          ],
          name: "q36"
        },
        {
          question: "If multiple students need to edit the same file at the same time, the best tool is:",
          options: [
            "a) Microsoft Paint", 
            "b) Google Docs", 
            "c) Notepad", 
            "d) Calculator"
          ],
          name: "q37"
        },
        {
          question: "To share a file but prevent editing, you should:",
          options: [
            "a) Convert it to PDF before sharing", 
            "b) Share the editable link", 
            "c) Upload the original .docx file only", 
            "d) Remove the file name"
          ],
          name: "q38"
        },
        {
          question: "Which of the following allows real-time video meetings with screen sharing?",
          options: [
            "a) Zoom", 
            "b) Word", 
            "c) Excel", 
            "d) VLC Media Player"
          ],
          name: "q39"
        },
        {
          question: "In Microsoft Teams or Google Meet, the 'mute' function does what?",
          options: [
            "a) Turns off your video", 
            "b) Stops your microphone from transmitting sound", 
            "c) Ends the meeting", 
            "d) Deletes the chat history"
          ],
          name: "q40"
        },
        {
          question: "The option 'View Version History' in Google Docs allows you to:",
          options: [
            "a) Recover or see earlier edits of the file", 
            "b) Translate the document", 
            "c) Create a backup copy in Word", 
            "d) Lock the document permanently"
          ],
          name: "q41"
        },
        {
          question: "What does 'Share with specific people only' mean in cloud storage?",
          options: [
            "a) Anyone on the internet can view", 
            "b) Only chosen people with access can open it", 
            "c) The file is deleted after sharing", 
            "d) Everyone in the university gets access"
          ],
          name: "q42"
        },
        {
          question: "The main advantage of cloud storage compared to USB drives is:",
          options: [
            "a) Files can be edited offline only", 
            "b) Files are accessible from any device with internet", 
            "c) Files cannot be shared", 
            "d) Files are always encrypted automatically"
          ],
          name: "q43"
        }
      ]
    },
    {
      title: "Academic Practices",
      questions: [
        {
          question: "Why is it important to back up your files to the cloud or an external drive?",
          options: [
            "a) To make your computer faster", 
            "b) To protect against loss from crashes or accidental deletion", 
            "c) To automatically format documents", 
            "d) To avoid plagiarism"
          ],
          name: "q44"
        },
        {
          question: "Which referencing tool helps avoid plagiarism when writing papers?",
          options: [
            "a) Slide Master", 
            "b) Citation manager (Zotero, Mendeley, Word References)", 
            "c) Animation Pane", 
            "d) Data Validation"
          ],
          name: "q45"
        },
        {
          question: "What does 'Ctrl + Z' do in most programs?",
          options: [
            "a) Undo the last action", 
            "b) Save the file", 
            "c) Redo the last action", 
            "d) Zoom in"
          ],
          name: "q46"
        },
        {
          question: "Which file format is best for submitting an essay to your professor (unless specified otherwise)?",
          options: [
            "a) .mp3", 
            "b) .docx or .pdf", 
            "c) .zip", 
            "d) .exe"
          ],
          name: "q47"
        },
        {
          question: "If you need to send multiple files for an assignment in one upload, the best method is:",
          options: [
            "a) Put them all in a folder and zip the folder", 
            "b) Attach each file separately in multiple emails", 
            "c) Convert all files into images", 
            "d) Post them on social media"
          ],
          name: "q48"
        },
        {
          question: "Which tool is commonly used to check for plagiarism?",
          options: [
            "a) Grammarly", 
            "b) Turnitin", 
            "c) EndNote", 
            "d) Excel"
          ],
          name: "q49"
        },
        {
          question: "An academic database like JSTOR or Google Scholar is mainly used for:",
          options: [
            "a) Playing videos", 
            "b) Finding peer-reviewed research articles", 
            "c) Checking internet speed", 
            "d) Storing assignments"
          ],
          name: "q50"
        },
        {
          question: "Which referencing style is often used in social sciences?",
          options: [
            "a) APA", 
            "b) MLA", 
            "c) Harvard", 
            "d) Chicago"
          ],
          name: "q51"
        }
      ]
    },
    {
      title: "Word Referencing & Shortcuts",
      questions: [
        {
          question: "In Word, the feature used to create a list of sources at the end of your document is called:",
          options: [
            "a) Table of Contents", 
            "b) Bibliography", 
            "c) Footnote", 
            "d) Index"
          ],
          name: "q52"
        },
        {
          question: "What is the main difference between a footnote and an endnote in Word?",
          options: [
            "a) Footnotes appear at the bottom of the page; endnotes appear at the end of the document", 
            "b) Footnotes are only for pictures; endnotes are for text", 
            "c) Endnotes are shorter than footnotes", 
            "d) They are the same"
          ],
          name: "q53"
        },
        {
          question: "To insert a citation in Word, you go to:",
          options: [
            "a) Review → Spelling & Grammar", 
            "b) References → Insert Citation", 
            "c) Insert → Picture", 
            "d) Layout → Breaks"
          ],
          name: "q54"
        },
        {
          question: "Which Word feature automatically formats citations and bibliographies in APA, MLA, or Chicago style?",
          options: [
            "a) Mail Merge", 
            "b) Source Manager", 
            "c) Styles Pane", 
            "d) SmartArt"
          ],
          name: "q55"
        },
        {
          question: "If you need numbered references that match to superscripts in your text, you should use:",
          options: [
            "a) Cross-reference", 
            "b) Endnotes", 
            "c) Track Changes", 
            "d) Page Numbers"
          ],
          name: "q56"
        },
        {
          question: "Which shortcut copies selected text?",
          options: [
            "a) Ctrl + P", 
            "b) Ctrl + C", 
            "c) Ctrl + X", 
            "d) Ctrl + V"
          ],
          name: "q57"
        },
        {
          question: "Which shortcut pastes copied or cut text?",
          options: [
            "a) Ctrl + A", 
            "b) Ctrl + Z", 
            "c) Ctrl + V", 
            "d) Ctrl + Y"
          ],
          name: "q58"
        },
        {
          question: "Which shortcut lets you quickly find a word in a document or webpage?",
          options: [
            "a) Ctrl + F", 
            "b) Ctrl + E", 
            "c) Ctrl + O", 
            "d) Ctrl + R"
          ],
          name: "q59"
        },
        {
          question: "VWhich shortcut lets you select all content in a document?",
          options: [
            "a) Ctrl + A", 
            "b) Ctrl + Q", 
            "c) Ctrl + L", 
            "d) Ctrl + T"
          ],
          name: "q60"
        },
        {
          question: "Which shortcut lets you redo an action that was just undone?",
          options: [
            "a) Ctrl + Y", 
            "b) Ctrl + U", 
            "c) Ctrl + B", 
            "d) Ctrl + P"
          ],
          name: "q61"
        }
      ]
    }
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});

  function handleNext() {
        if (currentPage < pages.length - 1) 
          setCurrentPage(currentPage + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
    }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSave = () => {
    alert("Your answers have been saved!");
  };

  const handleAnswerChange = (e) => {
    const { name, value } = e.target;
    setAnswers({
      ...answers,
      [name]: value
    });
  };

  const handleSubmit = () => {
    alert("Your answers have been submitted!");
    console.log("Submitted answers:", answers);
  };

  const page = pages[currentPage];

  return (
       <div className="page-container">
      {/* Sidebar */}
      

      {/* Main content */}
      <main className="main-content">
        <header className="main-header">
          <h1 className="header-title">Digital Literacy Test</h1>
          <div className="profile-section">
            <span className="profile-icon">👤</span>
            <span>Profile</span>
          </div>
        </header>

        <section className="content-body">
          <div className="content-box">
            <h3>{page.title}</h3>
            {page.questions.map((q, idx) => (
              <div key={idx} className="question-box">
                <p><strong>Question {idx + 1}</strong>: {q.question}</p>
                <form>
                  {q.options.map((opt, i) => (
                    <label key={i} className="option-label">
                      <input
                        type="radio"
                        name={q.name}
                        value={opt}
                        checked={answers[q.name] === opt}
                        onChange={handleAnswerChange}
                      />
                      {opt}
                    </label>
                  ))}
                </form>
              </div>
            ))}
          </div>
        </section>

        <section className="navigation-buttons">
          <button onClick={handlePrevious} disabled={currentPage === 0}>
            Previous
          </button>
          <button onClick={handleSave}>Save</button>
          {currentPage < pages.length - 1 && (
            <button onClick={handleNext}>Next</button>
          )}
          {currentPage === pages.length - 1 && (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </section>
      </main>
    </div>
  );
}

export default DigitalLiteracyTest;