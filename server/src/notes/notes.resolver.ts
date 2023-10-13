import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Note } from './models/note.model'
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/createNoteDto';
import { UpdateNoteDto } from './dto/updateNoteDto';

@Resolver(of => Note)
export class NotesResolver {
    constructor (private noteService: NotesService) {}

    @Query(returns => [Note])
    async getNotes() {
        const notes = await this.noteService.getNotes();
        return notes
    }

    @Query(returns => Note)
    async getNote(@Args('id') id: number) {
        const note = await this.noteService.getNote(id);
        return note
    }

    @Mutation(returns => Note)
    async createNote(@Args('newNoteData') createNoteDto: CreateNoteDto) {
        const note = await this.noteService.createNote(createNoteDto);
        return note
    }

    @Mutation(returns => Note)
    async updateNote(@Args('updateNoteData') updateNoteDto: UpdateNoteDto) {
        const note = await this.noteService.updateNote(updateNoteDto);
        return note
    }

    @Mutation(returns => Note)
    async deleteNote(@Args('id') id: number) {
        return await this.noteService.deleteNote(id);
    }   
}
