import type { chat } from '@/store'
import type { User } from '@prisma/client';

export interface block {
    id: number,
    label?: string,
    sections: section[]
}

export interface section {
    owner: User,
    chats: chat[]
}

function isToday(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const d = date.getDate();

    const now = new Date();
    if (now.getDate() === d && now.getMonth() === month && now.getFullYear() === year) {
        return true;
    }

    return false;
}

export default function transformChats(chats: chat[]) {
    const blocks: block[] = []
    let currentBlock: block | null = null
    let currentSection: section | null = null

    chats.forEach(chat => {
        const date = isToday(new Date(chat.createdAt)) ? "Today" : new Date(chat.createdAt).toDateString()

        // create new block if necessary
        if (!currentBlock || currentBlock.label !== date) {
            currentBlock = { id: Date.now(), label: date, sections: [] }
            blocks.push(currentBlock)
            currentSection = null
        }

        // create new section if necessary
        if (!currentSection || currentSection.owner.id !== chat.owner.id) {
            currentSection = { owner: chat.owner, chats: [] }
            currentBlock.sections.push(currentSection)
        }

        // add chat to current section
        currentSection.chats.push(chat)
    })

    return blocks;
}