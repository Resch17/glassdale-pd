import { criminalList } from './criminals/CriminalList.js';
import { convictionSelect } from './convictions/ConvictionSelect.js';
import { officerSelect } from './officers/OfficerSelect.js';
import { NoteForm } from './notes/NoteForm.js';
import { NoteList } from './notes/NoteList.js';
import { associatesFunction } from './criminals/Associates.js';
import { witnessList } from './witnesses/WitnessList.js';


criminalList();
NoteForm();
NoteList();
convictionSelect();
officerSelect();
associatesFunction();
witnessList();
