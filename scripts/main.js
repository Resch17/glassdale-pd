import { criminalList } from "./criminals/CriminalList.js";
import { convictionSelect } from "./convictions/ConvictionSelect.js";
import { officerSelect } from "./officers/OfficerSelect.js";
import { NoteForm } from "./notes/NoteForm.js";
import { NoteList } from "./notes/NoteList.js";
import { associatesFunction } from "./criminals/Associates.js";


NoteForm();
criminalList();
convictionSelect();
officerSelect();
NoteList();
associatesFunction();

