import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto } from './dto/createNoteDto';
import { UpdateNoteDto } from './dto/updateNoteDto';

@Injectable()
export class NotesService {
    constructor (private prismaService: PrismaService) {}

    getNotes() {
        return this.prismaService.note.findMany({ include: { links: true, board: true, } });
    }

    getNote(id) {
        return this.prismaService.note.findUnique({ where: { id }, include: { links: true, board: true } });
    }

    createNote(createNoteDto: CreateNoteDto) {
        return this.prismaService.note.create({
            data: {
                title: createNoteDto.title,
                details: createNoteDto.details,
                links: { 
                    createMany: { data: createNoteDto.links }
                },
                boardId: createNoteDto.boardId
            },
            include: { links: true, board: true }
        })
    }

    updateNote(updateNoteDto: UpdateNoteDto) {
        return this.prismaService.note.update({
            where: { id: updateNoteDto.id },
            data: {
                title: updateNoteDto.title,
                details: updateNoteDto.details,
                links: {
                    set: updateNoteDto.links
                },
            },
            include: { links: true, board: true }
        })
    }

    deleteNote(id: number) {
        return this.prismaService.note.delete({ where: { id }})
    }

    getNoteLinks(noteId: number) {
        return this.prismaService.noteLink.findMany({ where: { noteId }})
    }
}
